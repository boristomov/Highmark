# EmailJS Setup Guide for Highmark Rentals

This guide explains how to set up EmailJS for the contact form and quote request emails. EmailJS allows you to send emails directly from JavaScript without a backend server - perfect for static hosting like GitHub Pages!

## Why EmailJS?

- ✅ **Free tier**: 200 emails/month (plenty for a rental business)
- ✅ **No backend required**: Works with static GitHub Pages hosting
- ✅ **Simple setup**: Just configure and add your keys
- ✅ **Professional emails**: Beautiful HTML email templates

---

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** and create a free account
3. Verify your email address

---

## Step 2: Connect Your Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended) - easiest setup
   - **Outlook**
   - **Custom SMTP** (for business emails like info@highmarkeventrentals.com)
4. Follow the connection instructions
5. **Note your Service ID** (e.g., `service_abc123`)

### For Gmail:
- Click "Connect Account" and authorize with your Gmail
- This will be the email that sends the notifications

### For Custom Business Email (info@highmarkeventrentals.com):
- Choose "Custom SMTP"
- Enter your email provider's SMTP settings
- Test the connection

---

## Step 3: Create Email Templates

You need **two templates**: one for contact inquiries and one for quote requests.

### Template 1: Contact/Inquiry Form

1. Go to **Email Templates** → **Create New Template**
2. Name it: `contact_inquiry`
3. Set up the template:

**Subject:**
```
New Inquiry from {{from_name}}
```

**Content (HTML):**
```html
<h2>New Contact Form Submission</h2>

<p><strong>From:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Event Date:</strong> {{event_date}}</p>
<p><strong>Event Address:</strong> {{event_address}}</p>

<h3>Message:</h3>
<p>{{message}}</p>

<hr>
<p><em>This inquiry was submitted via the Highmark Event Rentals website.</em></p>
```

4. Set **To Email**: `info@highmarkeventrentals.com`
5. Set **From Name**: `Highmark Website`
6. Set **Reply To**: `{{from_email}}`
7. Save and **note the Template ID** (e.g., `template_inquiry123`)

### Template 2: Quote Request

1. Create another template named: `quote_request`
2. Set up the template:

**Subject:**
```
Quote Request from {{from_name}} - {{items_count}} items
```

**Content (HTML):**
```html
<h2>🎉 New Quote Request</h2>

<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
  <tr>
    <td style="padding: 10px; background: #f5f5f5;"><strong>Customer:</strong></td>
    <td style="padding: 10px;">{{from_name}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; background: #f5f5f5;"><strong>Email:</strong></td>
    <td style="padding: 10px;"><a href="mailto:{{from_email}}">{{from_email}}</a></td>
  </tr>
  <tr>
    <td style="padding: 10px; background: #f5f5f5;"><strong>Phone:</strong></td>
    <td style="padding: 10px;">{{phone}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; background: #f5f5f5;"><strong>Event Date:</strong></td>
    <td style="padding: 10px;">{{event_date}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; background: #f5f5f5;"><strong>Event Location:</strong></td>
    <td style="padding: 10px;">{{event_location}}</td>
  </tr>
</table>

<h3>Requested Items:</h3>
<table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
  <thead>
    <tr style="background: #E9E1D3;">
      <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Item</th>
      <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Qty</th>
      <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Subtotal</th>
    </tr>
  </thead>
  <tbody>
    {{{items_html}}}
  </tbody>
</table>

<table style="width: 100%; margin-top: 20px;">
  <tr>
    <td style="padding: 8px; text-align: right;"><strong>Subtotal:</strong></td>
    <td style="padding: 8px; text-align: right; width: 100px;">{{subtotal}}</td>
  </tr>
  <tr>
    <td style="padding: 8px; text-align: right;"><strong>Est. Tax (7.25%):</strong></td>
    <td style="padding: 8px; text-align: right;">{{tax}}</td>
  </tr>
  <tr style="font-size: 18px;">
    <td style="padding: 8px; text-align: right;"><strong>Total:</strong></td>
    <td style="padding: 8px; text-align: right;"><strong>{{total}}</strong></td>
  </tr>
</table>

<h3>Notes:</h3>
<p>{{order_notes}}</p>

<hr>
<p><em>Reply directly to this email to respond to the customer.</em></p>
```

3. Set **To Email**: `info@highmarkeventrentals.com`
4. Set **From Name**: `Highmark Website`
5. Set **Reply To**: `{{from_email}}`
6. Save and **note the Template ID** (e.g., `template_quote456`)

---

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_ABCdef123456`)
3. Copy this key

---

## Step 5: Configure Environment Variables

Create a `.env.local` file in the `downloadable/loveme/` directory:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY=your_inquiry_template_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE=your_quote_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

🔒 **Your actual values are in `EMAILJS_CONFIG.txt` (gitignored for security)**

Replace the placeholder values above with your actual EmailJS keys from your dashboard.

---

## Step 6: For GitHub Pages Deployment

Since GitHub Pages hosts static files, you need to set these as GitHub Secrets:

1. Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Add these 4 secrets with YOUR values from `EMAILJS_CONFIG.txt`:

| Secret Name | Where to get the value |
|-------------|------------------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | From your EmailJS dashboard |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY` | From your EmailJS dashboard |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE` | From your EmailJS dashboard |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | From your EmailJS dashboard |

3. Update your GitHub Actions workflow to include these environment variables during build:

```yaml
- name: Build
  run: npm run build
  env:
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: ${{ secrets.NEXT_PUBLIC_EMAILJS_SERVICE_ID }}
    NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY: ${{ secrets.NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY }}
    NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE: ${{ secrets.NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE }}
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: ${{ secrets.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }}
```

---

## Testing

1. Run the development server: `npm run dev`
2. Go to the Contact page and submit the form
3. Check the console for success/error messages
4. Verify the email arrives at `info@highmarkeventrentals.com`

---

## Troubleshooting

### "EmailJS not configured" warning
- Make sure all 4 environment variables are set
- Restart the development server after adding `.env.local`

### Emails not sending
- Check the browser console for errors
- Verify your EmailJS service is connected
- Make sure template variable names match exactly

### Rate limiting
- Free tier: 200 emails/month
- If you exceed this, upgrade to a paid plan or implement rate limiting

---

## Free Tier Limits

EmailJS Free Plan includes:
- 200 emails per month
- 2 email templates
- 1 email service
- EmailJS branding in emails

For higher volume, consider upgrading to a paid plan.

---

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Dashboard: https://dashboard.emailjs.com/

