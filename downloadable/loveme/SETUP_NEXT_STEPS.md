# 📧 EmailJS Setup - Next Steps

## ✅ What's Already Done

Your EmailJS integration is configured:
- `EMAILJS_CONFIG.txt` - 🔒 **GITIGNORED** - Contains your keys (local only, safe)
- `EMAILJS_TEMPLATES.html` - Template HTML for EmailJS dashboard (no keys)
- `.github/workflows/deploy-github-pages.yml` - Uses GitHub Secrets (secure)
- `EMAILJS_SETUP_GUIDE.md` - Instructions without exposing keys

## 🎯 What You Need to Do

### 1. Create Local Environment File (For Development)

Create a file named `.env.local` in the `downloadable/loveme/` directory:

```bash
# Copy-paste these exact lines:
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_gnd1ale
NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY=template_ovqel89
NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE=template_vq2emn8
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=kh9KkUPz8DXMeYtN0

# Optional: Add reCAPTCHA to prevent spam (recommended!)
# Get your Site Key from: https://www.google.com/recaptcha/admin/create
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
```

**Note:** See `RECAPTCHA_SETUP.md` for reCAPTCHA setup instructions.

### 2. Add GitHub Secrets (For Deployment)

Go to your GitHub repository:
1. Click **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each of these:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_gnd1ale` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY` | `template_ovqel89` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE` | `template_vq2emn8` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `kh9KkUPz8DXMeYtN0` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | (your reCAPTCHA site key - optional) |

### 3. Verify EmailJS Dashboard Templates

Make sure you have BOTH templates set up in your EmailJS dashboard:

**Template 1: Contact/Inquiry Form** (`template_ovqel89`)
- Subject: `New Inquiry from {{from_name}}`
- To Email: `info@highmarkeventrentals.com`
- Reply To: `{{from_email}}`
- Content: Copy from `EMAILJS_TEMPLATES.html` (lines 13-96)

**Template 2: Quote Request** (`template_vq2emn8`)
- Subject: `Quote Request from {{from_name}} - {{items_count}} items`
- To Email: `info@highmarkeventrentals.com`
- Reply To: `{{from_email}}`
- Content: Copy from `EMAILJS_TEMPLATES.html` (lines 113-248)

### 4. Test It!

#### Local Testing:
```bash
cd downloadable/loveme
npm run dev
```

Then visit:
- Contact form: `http://localhost:3000/contact`
- Cart quote: Add items to cart, click "Request Quote"

#### After GitHub Deployment:
- Push to `main` branch
- Visit your GitHub Pages site
- Test both forms
- Check `info@highmarkeventrentals.com` for emails

## 📁 Reference Files

- `EMAILJS_CONFIG.txt` - 🔒 **GITIGNORED** - Your keys (local reference only)
- `EMAILJS_SETUP_GUIDE.md` - Detailed setup instructions
- `EMAILJS_TEMPLATES.html` - Email template HTML (safe to commit)
- `RECAPTCHA_SETUP.md` - reCAPTCHA spam protection setup
- `GITHUB_PAGES_DEPLOY.md` - Deployment guide

## 🔐 Security Notes

✅ Your keys are SAFE:
- `EMAILJS_CONFIG.txt` is in `.gitignore` (won't be committed)
- `.env.local` is in `.gitignore` (won't be committed)
- Keys removed from `EMAILJS_TEMPLATES.html` (no keys in tracked files)
- GitHub Secrets are private (only visible to you)

## 🆘 Troubleshooting

**Forms not sending?**
1. Check browser console for errors
2. Verify `.env.local` file exists and has correct values
3. Verify EmailJS service is connected in EmailJS dashboard
4. Check EmailJS dashboard for error logs

**GitHub Pages deployment failing?**
1. Make sure all 4 EmailJS secrets are added to GitHub
2. Also ensure Supabase secrets are set
3. Check the Actions tab for build logs

---

**All set!** Create the `.env.local` file and you're ready to test! 🚀

