# ☁️ Cloudinary Setup Guide - Image Hosting

## 🎯 Why Cloudinary?

- ✅ **Free tier:** 25GB storage + 25GB bandwidth
- ✅ **Auto-optimization:** Converts to WebP/AVIF automatically
- ✅ **Global CDN:** Fast loading worldwide
- ✅ **On-the-fly transforms:** Resize/crop images via URL
- ✅ **Next.js integration:** Built-in component support

---

## 📋 Setup Steps (10 minutes)

### Step 1: Create Cloudinary Account

1. **Go to** [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. **Sign up** with email or GitHub
3. **Fill out the form:**
   - Email
   - Password
   - Choose a cloud name (e.g., `highmark-rentals`)
   - Role: Developer
   - Primary interest: Web
4. **Click** "Create Account"
5. **Verify** your email

---

### Step 2: Get Your Credentials

1. **After login**, you'll see your Dashboard
2. **Copy these values** (top of dashboard):
   - **Cloud Name** (e.g., `highmark-rentals`)
   - **API Key** (numbers only)
   - **API Secret** (keep this private!)

---

### Step 3: Add to Environment Variables

**Edit your `.env.local` file** and add:

```env
# Supabase (already there)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key

# Cloudinary (add these)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Save and restart your dev server!**

---

### Step 4: Install Next.js Cloudinary

```bash
npm install next-cloudinary
```

---

### Step 5: Upload Your Product Images

#### Option A: Using Cloudinary Dashboard (Easy!)

1. **Go to** Cloudinary Dashboard
2. **Click** "Media Library" in left sidebar
3. **Click** "Upload" button (top right)
4. **Create a folder:** `products` (optional but recommended)
5. **Drag & drop** your product images
6. **Wait** for uploads to complete

#### Option B: Bulk Upload via CLI (Advanced)

I can help you set this up if you have many images!

---

### Step 6: Get Image URLs

**For each uploaded image:**

1. **Click** on the image in Media Library
2. **Copy** the URL (looks like: `https://res.cloudinary.com/your-cloud/image/upload/v123456/image.jpg`)
3. **Or use the "Copy URL" button**

**Image URL format:**
```
https://res.cloudinary.com/YOUR-CLOUD-NAME/image/upload/v1234567890/filename.jpg
```

---

## 🖼️ Using Images in Your Next.js App

### Method 1: Using Next.js Image Component (Recommended)

```javascript
import Image from 'next/image';

<Image 
  src="https://res.cloudinary.com/your-cloud/image/upload/v123/chair.jpg"
  alt="Gold Chiavari Chair"
  width={400}
  height={400}
  priority={false}
/>
```

### Method 2: Using Cloudinary Component (Best for transformations)

```javascript
import { CldImage } from 'next-cloudinary';

<CldImage
  src="products/chair-gold" // No URL needed, just the public ID!
  alt="Gold Chiavari Chair"
  width={400}
  height={400}
  crop="fill"
  gravity="auto"
/>
```

---

## 🎨 Image Transformations (On-the-Fly!)

### Basic Transformations via URL

**Original:**
```
https://res.cloudinary.com/your-cloud/image/upload/chair.jpg
```

**Resize to 400px wide:**
```
https://res.cloudinary.com/your-cloud/image/upload/w_400/chair.jpg
```

**Resize + Convert to WebP:**
```
https://res.cloudinary.com/your-cloud/image/upload/w_400,f_webp/chair.jpg
```

**Thumbnail (400x400, cropped):**
```
https://res.cloudinary.com/your-cloud/image/upload/w_400,h_400,c_fill/chair.jpg
```

**Quality reduction (smaller file):**
```
https://res.cloudinary.com/your-cloud/image/upload/w_400,q_80/chair.jpg
```

---

## 📸 Recommended Image Naming Convention

**For easy management, name your images like this:**

```
chair-gold-chiavari-01.jpg
chair-gold-chiavari-02.jpg
chair-white-folding-01.jpg
table-round-60-01.jpg
table-round-60-02.jpg
tent-white-20x30-01.jpg
accessories-charger-gold-01.jpg
```

**Benefits:**
- Easy to find
- Matches your SKU system
- Supports multiple images per product

---

## 🔄 Adding Images to Your Database

### Method 1: Update Existing Product

**In Supabase Table Editor:**

1. Go to Table Editor → products
2. Click on a product row
3. Edit the `image_url` field
4. Paste your Cloudinary URL
5. Save

**Or via SQL:**

```sql
UPDATE products
SET image_url = 'https://res.cloudinary.com/your-cloud/image/upload/v123/chair-gold.jpg'
WHERE slug = 'gold-chiavari-chair';
```

### Method 2: Add New Product with Image

```sql
INSERT INTO products (
  name, slug, sku, description, short_description,
  price, category, quantity_available, image_url, tags
) VALUES (
  'Gold Chiavari Chair',
  'gold-chiavari-chair',
  'CHAIR-001',
  'Elegant gold chiavari chairs...',
  'Classic elegant chair',
  5.00,
  'chair',
  100,
  'https://res.cloudinary.com/your-cloud/image/upload/v123/chair-gold.jpg',
  ARRAY['gold', 'elegant', 'wedding']
);
```

---

## 🎯 Optimized Product Image Sizes

### For Product Cards (Shop Page)
```
Width: 400px
Quality: 80
Format: Auto (WebP/AVIF)
URL: /w_400,q_80,f_auto/image.jpg
```

### For Product Detail Page (Main Image)
```
Width: 800px
Quality: 85
Format: Auto
URL: /w_800,q_85,f_auto/image.jpg
```

### For Thumbnails
```
Width: 150px, Height: 150px
Crop: Fill
URL: /w_150,h_150,c_fill,f_auto/image.jpg
```

---

## 🚀 Next.js Image Optimization Config

**Add to `next.config.js`:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig
```

---

## 📦 Bulk Upload Helper (Optional)

If you have many images, I can create a script to upload them all at once!

**What you need:**
- All images in a folder (e.g., `product-images/`)
- Named with your SKU or slug (e.g., `CHAIR-001.jpg`)

The script will:
1. Upload all images to Cloudinary
2. Get the URLs
3. Update your database automatically

Let me know if you want this!

---

## 🎨 Example: Product Card Component

```javascript
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="image-wrapper">
        <Image
          src={product.image_url}
          alt={product.name}
          width={400}
          height={400}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <h3>{product.name}</h3>
      <p>${product.price}/day</p>
      <p>{product.short_description}</p>
    </div>
  );
}
```

---

## ✅ Checklist

- [ ] Created Cloudinary account
- [ ] Got Cloud Name, API Key, API Secret
- [ ] Added credentials to `.env.local`
- [ ] Installed `next-cloudinary` package
- [ ] Uploaded product images
- [ ] Got image URLs
- [ ] Updated products in database with image URLs
- [ ] Configured `next.config.js`
- [ ] Tested images load on website

---

## 🆘 Troubleshooting

### Images not loading:
- Check `next.config.js` has `res.cloudinary.com` in domains
- Restart dev server after config changes

### "Invalid credentials":
- Check API Key and Secret are correct
- Make sure they're in `.env.local` (not `.env`)

### Images are slow:
- Add width/height props to Image components
- Use transformations to reduce file size
- Enable auto format (`f_auto`)

---

## 🎯 What's Next?

Now that you have images set up:

1. **Update all sample products** with real images
2. **Build the product card component** 
3. **Update the shop page** to display products
4. **Create the product detail page**

---

## 📞 Need Help?

Ask me to:
- Create a bulk upload script
- Build image components
- Optimize image loading
- Set up image galleries

**You're ready to add beautiful images to your rental shop!** 📸

