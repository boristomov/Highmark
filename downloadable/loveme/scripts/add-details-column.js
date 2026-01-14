/**
 * Add details column to products table
 * Run: node scripts/add-details-column.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addDetailsColumn() {
    console.log('🔧 Adding details column to products table...\n');
    
    const { data, error } = await supabase.rpc('exec_sql', {
        sql: 'ALTER TABLE products ADD COLUMN IF NOT EXISTS details TEXT;'
    });
    
    if (error) {
        // Try alternative approach - direct query via REST
        console.log('ℹ️  RPC not available, trying direct approach...');
        console.log('\n⚠️  Please run this SQL in your Supabase SQL Editor:\n');
        console.log('   ALTER TABLE products ADD COLUMN IF NOT EXISTS details TEXT;\n');
        console.log('Then re-run the import script.');
        return;
    }
    
    console.log('✅ Details column added successfully!');
}

addDetailsColumn();

