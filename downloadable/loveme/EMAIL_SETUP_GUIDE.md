# Email Quote System Setup Guide

## Overview
The automated email system sends beautiful confirmation emails to customers when they request a quote from the cart page.

## Features
- ✨ Beautiful HTML email template with gradient header
- 📋 Full quote summary with cart items and pricing
- 📧 Automatic confirmation to customer
- 🔔 Notification email sent to you (boristomov2002@gmail.com)
- ⏰ Professional messaging about 1-2 business day response time

## Setup Instructions

### Step 1: Install Nodemailer

```bash
cd downloadable/loveme
npm install nodemailer
```

### Step 2: Enable Gmail App Passwords

Since you're using Gmail (boristomov2002@gmail.com), you need to create an "App Password":

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google," enable **2-Step Verification** (if not already enabled)
4. After enabling 2-Step, go back to Security
5. Click on **App passwords** (you'll only see this after 2-Step is enabled)
6. Select:
   - **App**: Mail
   - **Device**: Other (Custom name)
   - **Name**: Enter "Highmark Rentals Website"
7. Click **Generate**
8. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

### Step 3: Create Environment File

Create a file named `.env.local` in the `downloadable/loveme` directory:

```env
# Email Configuration
EMAIL_USER=boristomov2002@gmail.com
EMAIL_PASSWORD=your-16-char-app-password-here
```

**Important:** 
- Replace `your-16-char-app-password-here` with the app password from Step 2
- Do NOT use your regular Gmail password
- Never commit this file to Git (it's already in .gitignore)

### Step 4: Test the System

1. Start your development server:
```bash
npm run dev
```

2. Go to the cart page and add some items
3. Fill out the quote request form
4. Click "Request Quote and Approval"
5. Check your email inbox for the beautiful confirmation email

### Step 5: Verify Both Emails

You should receive TWO emails:

1. **Customer Confirmation** (to the email entered in the form)
   - Beautiful branded template
   - Full quote summary
   - "Thank you" message
   - 1-2 business day timeline

2. **Admin Notification** (to boristomov2002@gmail.com)
   - Simple notification of new quote request
   - Customer contact info
   - Quick summary of their request

## Email Template Features

The customer receives a beautiful email with:

- 🎨 **Gradient Header** - Purple gradient with "Thank You" message
- 👋 **Personalized Greeting** - Uses customer's name
- 📋 **Event Details Section** - Date, address, phone, message
- 🛒 **Cart Summary Table** - All selected items with quantities and prices
- 💰 **Pricing Breakdown** - Subtotal, tax (7.25%), delivery (TBD), total
- ⏰ **Next Steps Box** - Clear messaging about 1-2 business day response
- 📧 **Contact Information** - Your email and their phone for easy communication
- 🎯 **Professional Footer** - Branded Highmark Rentals footer

## Troubleshooting

### Error: "Invalid login"
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled on your Google Account

### Error: "Failed to send email"
- Check that nodemailer is installed: `npm list nodemailer`
- Verify your .env.local file exists and has the correct values
- Make sure there are no extra spaces in the EMAIL_PASSWORD

### Email not received
- Check spam/junk folder
- Verify the email address entered in the form is correct
- Check the browser console and terminal for error messages

### Success message doesn't show
- Open browser developer tools (F12)
- Check the Network tab for the API call to `/api/send-quote-email`
- Look for any error responses

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform's dashboard:
   - `EMAIL_USER=boristomov2002@gmail.com`
   - `EMAIL_PASSWORD=your-app-password`

2. For Vercel:
   - Go to Project Settings → Environment Variables
   - Add both variables
   - Redeploy your site

3. For Netlify:
   - Go to Site Settings → Build & Deploy → Environment
   - Add both variables
   - Redeploy your site

## Security Notes

✅ **Good practices in this setup:**
- Using App Passwords instead of account password
- Environment variables for sensitive data
- .env.local excluded from Git

⚠️ **Additional recommendations:**
- Consider using a dedicated email service like SendGrid or AWS SES for production
- Implement rate limiting to prevent abuse
- Add CAPTCHA for additional security

## Support

If you encounter any issues:
1. Check the browser console for client-side errors
2. Check the terminal/server logs for API errors
3. Verify all environment variables are set correctly
4. Test with a simple email first before troubleshooting the template

---

**Made with ❤️ for Highmark Rentals**

