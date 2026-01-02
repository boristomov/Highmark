# 🚀 Supabase Setup Guide - SIMPLIFIED

## 📦 What's Already Done

✅ Installed `@supabase/supabase-js` package  
✅ Created **simple** database schema (ONE table!)  
✅ Created API utility functions  
✅ Created Supabase client

---

## 🎯 Your Database Structure

### ONE Simple Table: `products`

| Field | What It Is |
|-------|------------|
| `name` | Product name |
| `slug` | URL-friendly name |
| `sku` | Your inventory code |
| `price` | Price per day |
| `category` | `chair`, `table`, `tent`, or `accessories` |
| `quantity_available` | How many in stock |
| `image_url` | Cloudinary image URL |
| `tags` | Array like: `['gold', 'elegant', 'wedding']` |
| `description` | Full description |
| `short_description` | Short version for cards |
| `active` | Show/hide (true/false) |
| `featured` | Featured on homepage (true/false) |

**That's it!** No complex relationships, no junction tables. Simple.

---

## 📋 Setup Steps (10 minutes)

### Step 1: Create Supabase Account

1. **Go to** [https://supabase.com](https://supabase.com)
2. **Click** "Start your project" 
3. **Sign in** with GitHub (easiest) or email
4. **Create organization**: "Highmark Rentals" (or your name)
5. **Create new project**:
   - Name: `highmark-rentals`
   - Database Password: **Create a strong password** (save it!)
   - Region: Choose closest to your users (e.g., `East US`)
   - Plan: **Free** tier

6. **Wait** for project to provision (1-2 minutes) ☕

---

### Step 2: Get Your API Keys

1. **Go to** Project Settings (⚙️ gear icon, bottom left)
2. **Click** "API" in sidebar
3. **Copy these two values:**
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string under "Project API keys")

---

### Step 3: Create Environment File

1. **In your project** (`downloadable/loveme/`), create a file named `.env.local`

2. **Add this** (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **Save** the file

> ⚠️ `.env.local` is in `.gitignore` - it won't be committed to Git. Good!

---

### Step 4: Create Your Database Table

1. **Go back to** Supabase Dashboard
2. **Click** "SQL Editor" in left sidebar
3. **Click** "New query"
4. **Open** `downloadable/loveme/database/schema.sql` in your code editor
5. **Copy** the ENTIRE file contents
6. **Paste** into Supabase SQL Editor
7. **Click** "Run" (or press Ctrl+Enter)

✅ You should see "Success. No rows returned"

---

### Step 5: Verify It Worked

1. **Click** "Table Editor" in left sidebar
2. **You should see** the `products` table
3. **Click** on it - you should see **6 sample products**!

**Sample products included:**
- Gold Chiavari Chair
- White Folding Chair
- Round Table 60"
- White Frame Tent 20x30
- Gold Rim Charger Plate
- Ivory Tablecloth

---

### Step 6: Test the Connection

**Start your dev server:**

```bash
cd downloadable/loveme
npm run dev
```

**Create a test file:** `downloadable/loveme/pages/test-db.js`

```javascript
import { useEffect, useState } from 'react';
import { getProducts } from '../lib/api/products';

export default function TestDB() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '50px' }}>Loading...</div>;
  if (error) return <div style={{ padding: '50px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '50px' }}>
      <h1>✅ Database Connected!</h1>
      <h2>Products ({products.length}):</h2>
      {products.map(p => (
        <div key={p.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
          <h3>{p.name}</h3>
          <p><strong>Category:</strong> {p.category}</p>
          <p><strong>Price:</strong> ${p.price}/day</p>
          <p><strong>Stock:</strong> {p.quantity_available}</p>
          <p><strong>Tags:</strong> {p.tags?.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}
```

**Visit:** `http://localhost:3000/test-db`

**If you see your products, you're all set!** 🎉

---

## 🎨 Using Your New API

### Fetch All Products
```javascript
import { getProducts } from '../lib/api/products';

const products = await getProducts();
```

### Filter by Category
```javascript
const chairs = await getProducts({ category: 'chair' });
```

### Filter by Price Range
```javascript
const affordable = await getProducts({ 
  minPrice: 0, 
  maxPrice: 10 
});
```

### Filter by Tag
```javascript
const weddingItems = await getProducts({ tag: 'wedding' });
```

### Get Featured Products
```javascript
import { getFeaturedProducts } from '../lib/api/products';

const featured = await getFeaturedProducts(8);
```

### Get Single Product
```javascript
import { getProductBySlug } from '../lib/api/products';

const product = await getProductBySlug('gold-chiavari-chair');
```

### Search Products
```javascript
import { searchProducts } from '../lib/api/products';

const results = await searchProducts('chair');
```

### Get All Tags
```javascript
import { getAllTags } from '../lib/api/products';

const tags = await getAllTags(); // ['elegant', 'gold', 'modern', 'wedding', ...]
```

---

## ➕ Adding Your Own Products

### Using Supabase Dashboard

1. **Go to** Table Editor → products
2. **Click** "Insert row"
3. **Fill in**:
   - name: "Black Folding Chair"
   - slug: "black-folding-chair"
   - sku: "CHAIR-003"
   - description: "Durable black folding chairs..."
   - short_description: "Black folding chair"
   - price: 3.50
   - category: "chair" (select from dropdown)
   - quantity_available: 150
   - image_url: "https://your-cloudinary-url.com/black-chair.jpg"
   - tags: `{"black","modern","stackable"}` (use this format in dashboard!)
   - active: true
   - featured: false

4. **Click** Insert

### Using SQL
```sql
INSERT INTO products (
  name, slug, sku, description, short_description,
  price, category, quantity_available, image_url, tags
) VALUES (
  'Black Folding Chair',
  'black-folding-chair',
  'CHAIR-003',
  'Durable black folding chairs perfect for any event...',
  'Black folding chair',
  3.50,
  'chair',
  150,
  'https://your-cloudinary-url.com/black-chair.jpg',
  ARRAY['black', 'modern', 'stackable']
);
```

---

## 🏷️ How Tags Work

Tags are **super flexible** - just add any strings you want!

**Common tag ideas:**
- **Colors:** white, ivory, gold, silver, black, burgundy
- **Events:** wedding, corporate, birthday, outdoor
- **Styles:** elegant, rustic, modern, vintage
- **Materials:** wood, metal, glass, fabric
- **Features:** stackable, foldable, weather-resistant
- **Sizes:** small, medium, large, extra-large

**No need to pre-define them!** Just type whatever makes sense for filtering.

---

## 🎯 Next Steps

### 1. Set Up Cloudinary (Image Hosting)
- Create free account
- Upload product images
- Get URLs to use in database

### 2. Update Shop Page
- Fetch products from database
- Build category filter UI
- Add tag filtering
- Price range slider

### 3. Update Product Single Page
- Dynamic routing with slug
- Display product from database
- Show related products

---

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists in `downloadable/loveme/`
- Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

### "Check constraint violation"
- Category must be exactly: `chair`, `table`, `tent`, or `accessories` (lowercase!)

### Tables not showing up
- Run the entire `schema.sql` file in SQL Editor
- Check for any error messages

### "Invalid input syntax for type array"
- In dashboard, use: `{"tag1","tag2"}`
- In SQL, use: `ARRAY['tag1', 'tag2']`

---

## 📚 More Help

- **Database queries:** See `database/README.md`
- **API usage:** See code comments in `lib/api/products.js`

---

## ✅ What You Have Now

- ✅ Simple, fast database (ONE table!)
- ✅ 6 sample products ready to go
- ✅ API functions for fetching/filtering
- ✅ Tag system (add any tags you want!)
- ✅ Category filtering (4 categories)
- ✅ Price filtering
- ✅ Search functionality
- ✅ Featured products
- ✅ Inventory tracking

**You're ready to build your shop!** 🚀
