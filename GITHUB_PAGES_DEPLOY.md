## GitHub Pages Deployment (Highmark Rentals)

This repo contains a Next.js site in `downloadable/loveme/`. GitHub Pages can only host **static** sites, so we deploy via **`next export`** using GitHub Actions.

### What works on GitHub Pages
- Home, Shop (Supabase client-side), Cart, Contact, Inspiration pages
- Category filtering via URL query (e.g. `/shop?category=chair`)

### What does NOT work on GitHub Pages
- Any `pages/api/*` routes (no server runtime)
- Dynamic routes like `/product-single/[slug]` (not exported)

### Required GitHub Secrets
In your GitHub repo: **Settings → Secrets and variables → Actions → Secrets**

**Supabase (Required):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**EmailJS (Required for Contact Form & Quote Requests):**
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

*(Get these values from your local `EMAILJS_CONFIG.txt` file - gitignored for security)*

**reCAPTCHA (Optional but Recommended - Prevents Spam):**
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

*(Get from Google reCAPTCHA - See `RECAPTCHA_SETUP.md` for setup)*

### Email / Quote Requests
✅ **EmailJS Integration Active!**

The contact form and quote requests now use EmailJS to send emails directly from the browser (no backend needed).

**Setup Required:**
1. Add the EmailJS secrets listed above to GitHub Actions
2. Make sure your EmailJS templates are configured in your EmailJS dashboard
3. See `EMAILJS_CONFIG.txt` and `EMAILJS_SETUP_GUIDE.md` for detailed setup

All quote requests and contact form submissions will be sent to `info@highmarkeventrentals.com`.

### Deploy
This repo includes a GitHub Actions workflow:
- `.github/workflows/deploy-github-pages.yml`

To enable:
1. Push to `main`
2. In GitHub: **Settings → Pages**
3. Set **Source** to **GitHub Actions**

The site will publish automatically on each push to `main`.

### Your site URL
Because this is a **project** repo (`boristomov/Highmark`), GitHub Pages will serve it at:
- `https://boristomov.github.io/Highmark/`

If you see a 404 at `https://boristomov.github.io/`, that’s expected (that URL is only for `boristomov.github.io` repos).


