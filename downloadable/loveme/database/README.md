# 📚 Database Documentation - SIMPLIFIED

## Files in this Directory

| File | Purpose |
|------|---------|
| `schema.sql` | Complete database schema - creates table, indexes, and sample data |

---

## 🗄️ Database Structure - ONE TABLE!

### `products` Table
Everything you need in one simple table.

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique identifier (auto-generated) |
| `name` | VARCHAR(255) | Product name |
| `slug` | VARCHAR(255) | URL-friendly name (unique) |
| `sku` | VARCHAR(100) | Your inventory code (optional) |
| `description` | TEXT | Full product description |
| `short_description` | TEXT | Short description for cards |
| `price` | DECIMAL | Price per day |
| `category` | VARCHAR(50) | Must be: `chair`, `table`, `tent`, or `accessories` |
| `quantity_available` | INTEGER | How many in stock |
| `image_url` | TEXT | Cloudinary image URL |
| `tags` | TEXT[] | Array of strings (e.g., `['gold', 'elegant', 'wedding']`) |
| `active` | BOOLEAN | Show/hide product |
| `featured` | BOOLEAN | Featured on homepage |
| `created_at` | TIMESTAMP | Auto-set on creation |
| `updated_at` | TIMESTAMP | Auto-updated on changes |

---

## 🔍 Common Queries

### Get All Active Products
```sql
SELECT * FROM products 
WHERE active = true 
ORDER BY featured DESC, created_at DESC;
```

### Get Products by Category
```sql
SELECT * FROM products 
WHERE category = 'chair' AND active = true;
```

### Get Products by Price Range
```sql
SELECT * FROM products
WHERE price BETWEEN 10 AND 50 
  AND active = true
ORDER BY price ASC;
```

### Search Products by Name
```sql
SELECT * FROM products
WHERE name ILIKE '%chair%' 
  AND active = true;
```

### Get Products with a Specific Tag
```sql
SELECT * FROM products
WHERE 'wedding' = ANY(tags) 
  AND active = true;
```

### Get All Unique Tags
```sql
SELECT DISTINCT unnest(tags) as tag 
FROM products 
WHERE active = true
ORDER BY tag;

---

## ➕ Adding New Products

### Using Supabase Dashboard (Easy!)

1. Go to Supabase Dashboard → Table Editor
2. Select `products` table
3. Click "Insert row"
4. Fill in the fields:
   - **name**: Product Name
   - **slug**: `product-name` (lowercase, dashes)
   - **sku**: `YOUR-SKU-001` (optional)
   - **description**: Full description
   - **short_description**: Brief description for cards
   - **price**: `25.00`
   - **category**: Select from: `chair`, `table`, `tent`, `accessories`
   - **quantity_available**: `50`
   - **image_url**: Cloudinary URL
   - **tags**: `{"gold","elegant","wedding"}` (PostgreSQL array syntax)
   - **active**: `true`
   - **featured**: `false` (or `true` for homepage)
5. Click Save!

### Using SQL

```sql
INSERT INTO products (
  name, slug, sku,
  description, short_description,
  price, category, quantity_available,
  image_url, tags, featured, active
) VALUES (
  'Rustic Wood Table',
  'rustic-wood-table',
  'TABLE-002',
  'Beautiful handcrafted rustic wood table perfect for outdoor events...',
  'Handcrafted rustic wood table',
  45.00,
  'table',
  20,
  'https://your-cloudinary-url.com/rustic-table.jpg',
  ARRAY['wood', 'rustic', 'outdoor', 'wedding'],
  false,
  true
);
```

---

## 🏷️ Working with Tags

Tags are just strings in an array. Super simple!

### Add Tags to Existing Product
```sql
UPDATE products
SET tags = ARRAY['gold', 'elegant', 'wedding', 'new-tag']
WHERE slug = 'gold-chiavari-chair';
```

### Add a Tag to Existing Tags
```sql
UPDATE products
SET tags = array_append(tags, 'outdoor')
WHERE slug = 'white-folding-chair';
```

### Remove a Tag
```sql
UPDATE products
SET tags = array_remove(tags, 'old-tag')
WHERE slug = 'product-slug';
```

### See All Tags Being Used
```sql
SELECT DISTINCT unnest(tags) as tag 
FROM products 
WHERE active = true
ORDER BY tag;
```

---

## 📊 Useful Reports

### Inventory Summary by Category
```sql
SELECT 
  category,
  COUNT(*) as product_count,
  SUM(quantity_available) as total_quantity,
  AVG(price) as avg_price
FROM products
WHERE active = true
GROUP BY category
ORDER BY category;
```

### Products by Price Range
```sql
SELECT 
  CASE 
    WHEN price < 10 THEN 'Under $10'
    WHEN price BETWEEN 10 AND 25 THEN '$10-$25'
    WHEN price BETWEEN 25 AND 50 THEN '$25-$50'
    ELSE 'Over $50'
  END as price_range,
  COUNT(*) as count
FROM products
WHERE active = true
GROUP BY price_range
ORDER BY MIN(price);
```

### Most Popular Tags
```sql
SELECT 
  unnest(tags) as tag, 
  COUNT(*) as usage_count
FROM products
WHERE active = true
GROUP BY tag
ORDER BY usage_count DESC
LIMIT 20;
```

---

## 🔧 Quick Updates

### Update Product Price
```sql
UPDATE products
SET price = 6.50
WHERE sku = 'CHAIR-001';
```

### Update Stock Quantity
```sql
UPDATE products
SET quantity_available = 45
WHERE sku = 'CHAIR-001';
```

### Hide Product (don't delete!)
```sql
UPDATE products
SET active = false
WHERE slug = 'old-product';
```

### Make Product Featured
```sql
UPDATE products
SET featured = true
WHERE slug = 'gold-chiavari-chair';
```

---

## 🚨 Important Notes

- ✅ **Never delete products** - Set `active = false` instead
- ✅ **Always use slugs** for URLs (SEO-friendly)
- ✅ **Store images in Cloudinary** (not in database - just URLs)
- ✅ **Tags are flexible** - Just add strings, no pre-defined list needed
- ✅ **Categories are enforced** - Must be: `chair`, `table`, `tent`, or `accessories`
- ✅ **Updated_at auto-updates** when you edit a product

---

## 📈 Performance

- ✅ Indexes set up on `category`, `price`, `active`, `slug`, and `tags`
- ✅ GIN index on `tags` for fast tag searches
- ✅ All queries are optimized for speed

---

## 🆘 Troubleshooting

**"Check constraint violation"** when inserting:
- Category must be exactly: `chair`, `table`, `tent`, or `accessories` (lowercase!)

**"Duplicate key value violates unique constraint"**:
- Slug or SKU already exists - choose a different one

**"Invalid input syntax for type array"**:
- Tags should be: `ARRAY['tag1', 'tag2']` or in dashboard: `{"tag1","tag2"}`

---

## 📞 Need Help?

Check the main setup guide: `SUPABASE_SETUP_GUIDE.md`

