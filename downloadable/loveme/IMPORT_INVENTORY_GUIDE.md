# Inventory Import Guide

This guide will help you import your rental items from the CSV file into Supabase.

## 📋 Prerequisites

1. **Supabase Project Setup** - You need a Supabase project with the `products` table created
2. **Environment Variables** - Your Supabase credentials configured
3. **CSV File** - Your `Inventory - General.csv` file (already in place ✅)

## 🚀 Step-by-Step Instructions

### Step 1: Install Dependencies

Open a terminal in the `downloadable/loveme` directory and run:

```bash
cd downloadable/loveme
npm install
```

This will install the `dotenv` package needed for the import script.

### Step 2: Configure Environment Variables

Create a file named `.env.local` in the `downloadable/loveme` directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Where to find these values:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click on **Settings** (gear icon) → **API**
4. Copy the **Project URL**, **anon/public key**, and (for full replace) the **service role key**

### Step 3: Create the Database Table

If you haven't already created the `products` table in Supabase:

1. Go to your Supabase project
2. Click on **SQL Editor**
3. Open the file `database/schema.sql` from this project
4. Copy the contents and paste into the SQL Editor
5. Click **Run**

### Step 4: Run the Import Script

Now you're ready to import! Run:

```bash
npm run import:inventory
```

Or directly:

```bash
node scripts/import-inventory.js
```

Optionally, you can pass a specific CSV path:

```bash
node scripts/import-inventory.js "../../Inventory - Website - Inventory - Website.csv"
```

## 📊 What the Script Does

The import script will:

1. ✅ Read your CSV file (`Inventory - Website - Inventory - Website.csv` by default; falls back to `Inventory - General.csv`)
2. ✅ Map CSV columns to Supabase database fields (new format):
   - `Item Name` → `name` (and `short_description`)
   - `Product SKU` → `sku` (fallback to `Manufacturer Product Number` if missing)
   - `Type` → `category` (Chair → chair, Table → table, etc.)
   - `Price` → `price` (removes $ and converts to decimal)
   - `Stock` (legacy only) → `quantity_available` (defaults to 0 if empty)
   - `Status` (legacy only) → `active` (Temporarily unavailable = false; default true otherwise)
   - `Description` → `description`
3. ✅ Ignore the `Image` column (for reference only)
4. ✅ Generate URL-friendly slugs from product names
5. ✅ Delete all existing rows in `products` (full replace)
6. ✅ Insert products (in batches) into Supabase
7. ✅ Show a detailed summary of the import

## 📝 Expected Output

You should see something like:

```
🚀 Starting inventory import...

📄 Using CSV: C:\...\Inventory - Website - Inventory - Website.csv
📋 CSV Headers: Link, Item Name, Product SKU, Image, Manufacturer Product Number, Type, Price, Description, Details (...)
📊 Found 34 items to import

✅ Prepared 32 products for import
⚠️  Skipped 2 items:
   - Row 31: Missing name or price (empty)

🧹 Deleting existing products (full replace)...
✅ Existing products deleted.

📤 Inserting products into Supabase...

✅ Inserted: Plastic Samsonite Chairs - White ($1.95)
✅ Inserted: Plastic Samsonite Chairs - Black ($1.95)
✅ Inserted: Chiavari Chairs - Gold (resin) ($8.00)
...

============================================================
📊 Import Summary:
   ✅ Successfully imported: 32
   ❌ Errors: 0
   ⚠️  Skipped: 2
============================================================

✨ Import completed!
```

## ⚠️ Important Notes

### Items That Will Be Skipped
- Items without a name
- Items without a price
- Empty rows (like Barstool 1, Barstool 2 without details)

### Image URLs
- The script sets `image_url` to `null` for all products
- You'll need to add product images separately using Cloudinary
- See `CLOUDINARY_SETUP_GUIDE.md` for image upload instructions

### Full Replace Behavior
- The script deletes all rows from the `products` table before inserting the CSV contents
- For delete operations to bypass RLS, provide `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

### Categories
The script maps your `Type` column to one of four categories:
- `Chair` → `chair`
- `Table` → `table`
- `Tent` → `tent`
- Anything else → `accessories`

### Status Mapping
- Legacy CSV only: "Temporarily unavailable" → `active: false`, else `active: true`
- New CSV format defaults to `active: true`

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env.local` file exists in `downloadable/loveme/`
- Check that the variable names match exactly
- Verify your credentials are correct

### Error: "Failed to delete existing products"
- Use the service role key: add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- Confirm RLS settings allow deletes for anon keys if not using service role

### Error: "Cannot find module 'dotenv'"
- Run `npm install` to install dependencies

### Error: "relation 'products' does not exist"
- You need to create the database table first (see Step 3)

## ✨ Next Steps

After importing:

1. **Verify Import** - Check your Supabase dashboard to see the imported products
2. **Add Images** - Upload product images to Cloudinary and update `image_url` fields
3. **Update Website** - Your Next.js site should now display the products!
4. **Review Data** - Check prices, categories, and descriptions for accuracy

## 📞 Need Help?

- Check the Supabase logs for detailed error messages
- Review `database/schema.sql` to understand the table structure
- See `SUPABASE_SETUP_GUIDE.md` for Supabase setup instructions

