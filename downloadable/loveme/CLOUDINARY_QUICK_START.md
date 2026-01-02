# ☁️ CLOUDINARY QUICK START

## 🔥 5-Minute Setup

### 1. Create Account
→ [cloudinary.com/register](https://cloudinary.com/users/register/free)

### 2. Get Credentials
Dashboard → Copy:
- Cloud Name
- API Key  
- API Secret

### 3. Add to `.env.local`
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Upload Images
Media Library → Upload → Drag & drop images

### 5. Get URLs
Click image → Copy URL

---

## 🖼️ Image URL Format

**Basic:**
```
https://res.cloudinary.com/YOUR-CLOUD/image/upload/v123/image.jpg
```

**Optimized (400px wide, auto format):**
```
https://res.cloudinary.com/YOUR-CLOUD/image/upload/w_400,f_auto/image.jpg
```

**Thumbnail (400x400):**
```
https://res.cloudinary.com/YOUR-CLOUD/image/upload/w_400,h_400,c_fill,f_auto/image.jpg
```

---

## 💻 Using in Next.js

### Method 1: Next.js Image
```javascript
import Image from 'next/image';

<Image 
  src="https://res.cloudinary.com/your-cloud/image/upload/chair.jpg"
  alt="Chair"
  width={400}
  height={400}
/>
```

### Method 2: Cloudinary Component
```javascript
import { CldImage } from 'next-cloudinary';

<CldImage
  src="products/chair-gold"
  alt="Chair"
  width={400}
  height={400}
  crop="fill"
/>
```

---

## 📸 Image Sizes for Your Shop

**Product Cards:** 400px wide
```
/w_400,q_80,f_auto/image.jpg
```

**Product Detail:** 800px wide
```
/w_800,q_85,f_auto/image.jpg
```

**Thumbnails:** 150x150px
```
/w_150,h_150,c_fill,f_auto/image.jpg
```

---

## 🎯 Naming Convention

```
chair-gold-chiavari-01.jpg
chair-white-folding-01.jpg
table-round-60-01.jpg
tent-white-20x30-01.jpg
```

Match your SKU system!

---

## ➕ Add to Database

```sql
UPDATE products
SET image_url = 'https://res.cloudinary.com/your-cloud/image/upload/v123/chair.jpg'
WHERE slug = 'gold-chiavari-chair';
```

---

## ✅ Setup Checklist

- [ ] Created Cloudinary account
- [ ] Added credentials to `.env.local`
- [ ] Installed `next-cloudinary` (already done!)
- [ ] Configured `next.config.js` (already done!)
- [ ] Uploaded images
- [ ] Updated database with URLs
- [ ] Restarted dev server

---

**Full Guide:** `CLOUDINARY_SETUP_GUIDE.md`

