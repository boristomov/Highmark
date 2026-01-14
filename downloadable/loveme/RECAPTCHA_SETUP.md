# Google reCAPTCHA Setup Guide

This guide explains how to add Google reCAPTCHA v2 to protect your contact and quote forms from spam and bots.

## Why reCAPTCHA?

- ✅ **Free**: No cost for most websites
- ✅ **Easy to integrate**: Simple checkbox widget
- ✅ **Effective**: Stops automated bot submissions
- ✅ **Client-side only**: Works perfectly with static GitHub Pages

---

## Step 1: Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Sign in with your Google account
3. Fill out the registration form:

### Registration Form:
- **Label**: `Highmark Event Rentals`
- **reCAPTCHA type**: Select **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
- **Domains**: Add your domains:
  ```
  localhost
  boristomov.github.io
  ```
  (Add more domains if you have a custom domain)
- **Accept the terms** and click **Submit**

4. You'll receive two keys:
   - **Site Key** (public) - Goes in your frontend code
   - **Secret Key** (private) - NOT needed for client-side validation

5. **Save only the Site Key** - you don't need the Secret Key for EmailJS integration

---

## Step 2: Add to Environment Variables

### For Local Development

Add to your `.env.local` file:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
```

### For GitHub Pages Deployment

Add as a GitHub Secret:

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
4. Value: Your Site Key from Google reCAPTCHA

---

## Step 3: Install Dependencies

Run this command in the `downloadable/loveme/` directory:

```bash
npm install --legacy-peer-deps
```

This will install `react-google-recaptcha` which is already added to `package.json`.

---

## How It Works

### Contact Form
- User fills out the form
- Clicks "I'm not a robot" checkbox
- Only then can submit the form
- If reCAPTCHA is not completed, shows error message

### Quote Request Form (Cart)
- User adds items to cart and fills out info
- Must complete reCAPTCHA before submitting
- Prevents bots from spamming quote requests

### No Backend Validation Needed
Since we're using EmailJS (client-side), we just verify the reCAPTCHA token exists before sending. This is sufficient for:
- Stopping automated bots
- Preventing simple spam scripts
- Reducing form abuse

---

## Configuration Options

### Optional: Customize Theme

In the reCAPTCHA component, you can customize:

```javascript
<ReCAPTCHA
  sitekey={siteKey}
  theme="light"  // or "dark"
  size="normal"  // or "compact"
/>
```

### Optional: Make it Required

The integration already makes reCAPTCHA required - users cannot submit without completing it.

---

## Testing

### Development Testing:
1. Run `npm run dev`
2. Go to contact page or cart
3. Try submitting without completing reCAPTCHA - should show error
4. Complete reCAPTCHA and submit - should work

### Production Testing:
1. Deploy to GitHub Pages
2. Visit your live site
3. Test both forms with reCAPTCHA

### reCAPTCHA Not Showing?
- Check browser console for errors
- Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set
- Make sure domain is added in reCAPTCHA admin console
- For `localhost`, it should work automatically

---

## Troubleshooting

### "ERROR for site owner: Invalid domain for site key"
- Add your domain to the reCAPTCHA admin console
- For local dev, add `localhost`
- For GitHub Pages, add `yourusername.github.io`

### reCAPTCHA not loading
- Check that the Site Key is correct
- Verify env variable is properly named: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- Restart development server after adding `.env.local`

### Forms still submitting without reCAPTCHA
- Clear browser cache
- Check that the validation code is checking `captchaToken`
- Make sure reCAPTCHA component is rendering

---

## Security Note

🔒 **The Site Key is safe to expose** - it's meant to be public and visible in your frontend code. You do NOT need to hide it or add it to `.gitignore`.

❌ **Do NOT add the Secret Key** to your frontend or `.env.local` - it's not needed for client-side validation.

---

## Support

- [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/display)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)

