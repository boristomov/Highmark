/**
 * Import inventory from CSV to Supabase
 * Run with: node scripts/import-inventory.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Prefer service role key for admin operations (delete/replace), fallback to anon
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Convert string to URL-friendly slug
 */
function createSlug(text) {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
}

/**
 * Parse CSV line (simple parser for quoted fields)
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());

    return result;
}

/**
 * Parse price string to decimal
 */
function parsePrice(priceStr) {
    if (!priceStr) return null;
    const cleaned = priceStr.replace(/[$,]/g, '');
    const price = parseFloat(cleaned);
    return isNaN(price) ? null : price;
}

/**
 * Determine category from type
 */
function normalizeCategory(type) {
    if (!type) return null;
    const lower = type.toLowerCase();
    const validCategories = ['chair', 'table', 'tent', 'accessories'];

    if (validCategories.includes(lower)) {
        return lower;
    }

    // Default to accessories if unknown
    return 'accessories';
}

/**
 * Resolve CSV path (CLI arg -> new root CSV -> legacy CSV)
 */
function resolveCsvPath() {
    // Allow passing a custom CSV path as the first arg
    const argPath = process.argv[2];
    if (argPath && fs.existsSync(argPath)) {
        return path.resolve(argPath);
    }

    // Prefer the new CSV at repository root
    const rootCsv = path.join(__dirname, '../../Inventory - Website - Inventory - Website.csv');
    if (fs.existsSync(rootCsv)) {
        return rootCsv;
    }

    // Fallback to legacy CSV inside downloadable/loveme
    const legacyCsv = path.join(__dirname, '../Inventory - General.csv');
    if (fs.existsSync(legacyCsv)) {
        return legacyCsv;
    }

    console.error('❌ Could not find a CSV file to import.');
    console.error('   Checked for:');
    console.error(`   - ${rootCsv}`);
    console.error(`   - ${legacyCsv}`);
    console.error('   Or pass a path: node scripts/import-inventory.js "path/to/file.csv"');
    process.exit(1);
}

/**
 * Build a header index map with relaxed matching
 */
function buildHeaderIndex(headers) {
    const lowerHeaders = headers.map(h => (h || '').toString().trim().toLowerCase());

    function findIndexBy(predicates) {
        for (let i = 0; i < lowerHeaders.length; i++) {
            const h = lowerHeaders[i];
            if (predicates.some(p => p(h))) {
                return i;
            }
        }
        return -1;
    }

    return {
        link: findIndexBy([h => h === 'link']),
        itemName: findIndexBy([h => h === 'item name', h => h === 'item name', h => h.includes('item name')]),
        productSku: findIndexBy([h => h === 'product sku', h => h.includes('product sku')]),
        manufacturerNumber: findIndexBy([h => h === 'manufacturer product number', h => h.includes('manufacturer') && h.includes('number')]),
        image: findIndexBy([h => h === 'image', h => h.includes('image')]),
        type: findIndexBy([h => h === 'type']),
        price: findIndexBy([h => h === 'price']),
        websiteName: findIndexBy([h => h === 'website name', h => h.includes('website') && h.includes('name')]),
        description: findIndexBy([h => h === 'description']),
        details: findIndexBy([h => h.startsWith('details'), h => h.includes('details')]),
        // legacy fields
        stock: findIndexBy([h => h === 'stock']),
        status: findIndexBy([h => h === 'status'])
    };
}

/**
 * Main import function
 */
async function importInventory() {
    console.log('🚀 Starting inventory import...\n');

    // Read CSV file
    const csvPath = resolveCsvPath();
    console.log(`📄 Using CSV: ${csvPath}\n`);
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').filter(line => line.trim());

    // Parse header
    const headers = parseCSVLine(lines[0]);
    const headerIndex = buildHeaderIndex(headers);
    console.log('📋 CSV Headers:', headers);
    console.log(`📊 Found ${lines.length - 1} items to import\n`);

    // Parse data rows
    const products = [];
    const skipped = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);

        // Safe getter for a column index
        const get = (idx) => (idx >= 0 && idx < values.length ? values[idx] : '');

        // Map CSV columns to a normalized row object (works with both new and legacy CSVs)
        const row = {
            link: get(headerIndex.link),
            itemName: get(headerIndex.itemName),
            productSku: get(headerIndex.productSku),
            manufacturerNumber: get(headerIndex.manufacturerNumber),
            // image column intentionally ignored
            type: get(headerIndex.type),
            price: get(headerIndex.price),
            stock: get(headerIndex.stock),
            status: get(headerIndex.status),
            websiteName: get(headerIndex.websiteName),
            description: get(headerIndex.description),
            details: get(headerIndex.details)
        };

        // Use Website Name as the primary name, fall back to Item name if empty
        const productName = row.itemName || row.websiteName;

        // Skip if no name or price
        if (!productName || !row.price) {
            skipped.push({ row: i + 1, reason: 'Missing name or price', data: productName });
            continue;
        }

        const price = parsePrice(row.price);
        const category = normalizeCategory(row.type);

        // Skip if invalid price or category
        if (price === null || category === null) {
            skipped.push({ row: i + 1, reason: 'Invalid price or category', data: productName });
            continue;
        }

        // Build product object for Supabase
        const product = {
            name: productName.trim(),
            slug: createSlug(productName),
            // Prefer internal Product SKU, fallback to manufacturer number
            sku: (row.productSku || row.manufacturerNumber || '').trim() || null,
            description: row.description || null,
            short_description: row.itemName || row.websiteName || null,
            price: price,
            category: category,
            quantity_available: row.stock ? parseInt(row.stock) || 0 : 0,
            image_url: null, // Will be updated later with Cloudinary URLs
            tags: [], // Optionally parse from details column
            active: row.status ? row.status !== 'Temporarily unavailable' : true,
            featured: false
        };

        products.push(product);
    }

    console.log(`✅ Prepared ${products.length} products for import`);
    if (skipped.length > 0) {
        console.log(`⚠️  Skipped ${skipped.length} items:`);
        skipped.forEach(s => console.log(`   - Row ${s.row}: ${s.reason} (${s.data || 'empty'})`));
    }
    console.log('');

    // Replace existing data
    console.log('🧹 Deleting existing products (full replace)...');
    try {
        const { error: delError } = await supabase
            .from('products')
            .delete()
            // Delete all rows; using a non-matching uuid to force a true predicate
            .neq('id', '00000000-0000-0000-0000-000000000000');
        if (delError) {
            console.error('❌ Failed to delete existing products:', delError.message);
            console.error('   Tip: Use SUPABASE_SERVICE_ROLE_KEY in .env.local for admin access.');
            process.exit(1);
        } else {
            console.log('✅ Existing products deleted.\n');
        }
    } catch (err) {
        console.error('❌ Exception while deleting products:', err.message);
        process.exit(1);
    }

    // Insert into Supabase
    console.log('📤 Inserting products into Supabase...\n');

    let successCount = 0;
    let errorCount = 0;

    // Insert in small batches for efficiency
    const batchSize = 50;
    for (let start = 0; start < products.length; start += batchSize) {
        const batch = products.slice(start, start + batchSize);
        try {
            const { error } = await supabase
                .from('products')
                .insert(batch)
                .select();

            if (error) {
                console.error(`❌ Error inserting batch starting at index ${start}:`, error.message);
                errorCount += batch.length;
            } else {
                successCount += batch.length;
                console.log(`✅ Inserted ${batch.length} products (total ${successCount}/${products.length})`);
            }
        } catch (err) {
            console.error(`❌ Exception inserting batch starting at index ${start}:`, err.message);
            errorCount += batch.length;
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Import Summary:');
    console.log(`   ✅ Successfully imported: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   ⚠️  Skipped: ${skipped.length}`);
    console.log('='.repeat(60));
}

// Run the import
importInventory()
    .then(() => {
        console.log('\n✨ Import completed!');
        process.exit(0);
    })
    .catch(err => {
        console.error('\n❌ Import failed:', err);
        process.exit(1);
    });

