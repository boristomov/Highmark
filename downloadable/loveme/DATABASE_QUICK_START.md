# 🚀 DATABASE QUICK START

## ✅ What's Done

- ✅ Supabase client installed
- ✅ Simple database schema (ONE table!)
- ✅ API functions ready
- ✅ 6 sample products included

---

## 🎯 Your Database

### ONE Table: `products`

```
products
├── name              → "Gold Chiavari Chair"
├── slug              → "gold-chiavari-chair"
├── sku               → "CHAIR-001"
├── price             → 5.00
├── category          → chair | table | tent | accessories
├── quantity          → 100
├── image_url         → Cloudinary URL
├── tags              → ['gold', 'elegant', 'wedding']
├── description       → Full description
├── short_description → Card description
├── active            → true/false
└── featured          → true/false
```

---

## 🔥 Setup (10 min)

### 1. Create Supabase Account
→ [supabase.com](https://supabase.com) → Sign up → Create project

### 2. Get API Keys
→ Project Settings → API → Copy URL + anon key

### 3. Create `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### 4. Run Schema
→ SQL Editor → Copy `database/schema.sql` → Run

### 5. Test
```bash
npm run dev
```
Visit: `/test-db` (see SUPABASE_SETUP_GUIDE.md for test code)

---

## 💻 Using the API

### Get All Products
```javascript
import { getProducts } from '../lib/api/products';
const products = await getProducts();
```

### Filter by Category
```javascript
const chairs = await getProducts({ category: 'chair' });
const tables = await getProducts({ category: 'table' });
```

### Filter by Price
```javascript
const affordable = await getProducts({ 
  minPrice: 0, 
  maxPrice: 10 
});
```

### Filter by Tag
```javascript
const wedding = await getProducts({ tag: 'wedding' });
```

### Get Featured
```javascript
import { getFeaturedProducts } from '../lib/api/products';
const featured = await getFeaturedProducts(8);
```

### Get One Product
```javascript
import { getProductBySlug } from '../lib/api/products';
const product = await getProductBySlug('gold-chiavari-chair');
```

### Search
```javascript
import { searchProducts } from '../lib/api/products';
const results = await searchProducts('chair');
```

### Get All Tags
```javascript
import { getAllTags } from '../lib/api/products';
const tags = await getAllTags();
```

---

## ➕ Add Products

### Dashboard
Table Editor → products → Insert row → Fill fields

### SQL
```sql
INSERT INTO products (
  name, slug, price, category, quantity_available, 
  image_url, tags
) VALUES (
  'Product Name', 'product-slug', 25.00, 'chair', 50,
  'https://cloudinary.com/image.jpg',
  ARRAY['tag1', 'tag2']
);
```

---

## 🏷️ Tags

Add ANY strings - no pre-definition needed!

**Ideas:**
- Colors: white, gold, black, ivory
- Events: wedding, corporate, birthday
- Styles: elegant, rustic, modern
- Materials: wood, metal, glass
- Features: stackable, foldable, outdoor

---

## 📚 Full Guides

- **Setup:** `SUPABASE_SETUP_GUIDE.md`
- **Database:** `database/README.md`
- **Summary:** `SETUP_SUMMARY.md`

---

## 🎯 Next Steps

1. ✅ Set up Supabase (follow guide above)
2. ⏭️ Set up Cloudinary (for images)
3. ⏭️ Update shop page to use database
4. ⏭️ Update product-single page
5. ⏭️ Build filtering UI

---

## 🆘 Quick Troubleshooting

**"Missing env variables"**  
→ Create `.env.local` + restart server

**"Check constraint violation"**  
→ Category must be: `chair`, `table`, `tent`, or `accessories`

**"Array syntax error"**  
→ Use: `ARRAY['tag1', 'tag2']` in SQL or `{"tag1","tag2"}` in dashboard

---

**START HERE:** `SUPABASE_SETUP_GUIDE.md` 👈

