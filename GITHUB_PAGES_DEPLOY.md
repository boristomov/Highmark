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

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

These are required because the static build imports the Supabase client.

### Email / Quote Requests
GitHub Pages cannot run the `/api/send-quote-email` endpoint.

Current behavior:
- If `NEXT_PUBLIC_QUOTE_ENDPOINT` is **not** set, the Cart "Request Quote" button opens a **mailto:** draft to `highmarkrentals@gmail.com`.
- If you later deploy a backend, set `NEXT_PUBLIC_QUOTE_ENDPOINT` to your server URL and it will POST the quote payload there.

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


