// Script to test email configuration
// Run with: node scripts/test-email-setup.js

require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Checking Email Configuration...\n');

let hasErrors = false;

// Check if .env.local exists
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('\n📝 Please create a .env.local file in the downloadable/loveme directory with:');
  console.log('   EMAIL_USER=boristomov2002@gmail.com');
  console.log('   EMAIL_PASSWORD=your-app-password-here\n');
  hasErrors = true;
} else {
  console.log('✅ .env.local file found');
}

// Check EMAIL_USER
if (!process.env.EMAIL_USER) {
  console.error('❌ EMAIL_USER is not set');
  hasErrors = true;
} else {
  console.log(`✅ EMAIL_USER is set: ${process.env.EMAIL_USER}`);
}

// Check EMAIL_PASSWORD
if (!process.env.EMAIL_PASSWORD) {
  console.error('❌ EMAIL_PASSWORD is not set');
  hasErrors = true;
} else {
  const passLength = process.env.EMAIL_PASSWORD.length;
  console.log(`✅ EMAIL_PASSWORD is set (${passLength} characters)`);
  
  if (passLength < 16) {
    console.warn('⚠️  Warning: Gmail App Passwords are usually 16 characters long');
    console.warn('   Make sure you are using an App Password, not your regular Gmail password');
  }
}

// Check if nodemailer is installed
try {
  require('nodemailer');
  console.log('✅ nodemailer package is installed');
} catch (error) {
  console.error('❌ nodemailer package is NOT installed');
  console.log('\n📦 Please run: npm install nodemailer\n');
  hasErrors = true;
}

console.log('\n' + '='.repeat(60));

if (hasErrors) {
  console.log('\n❌ Configuration has errors. Please fix them before testing email.\n');
  console.log('📖 See EMAIL_SETUP_GUIDE.md for detailed instructions.\n');
  process.exit(1);
} else {
  console.log('\n✅ All basic checks passed!\n');
  console.log('📧 To test sending an actual email:');
  console.log('   1. Start the dev server: npm run dev');
  console.log('   2. Go to the cart page');
  console.log('   3. Add items and submit a quote request\n');
  console.log('💡 If you still get errors, check the terminal logs when you submit the form.\n');
}

