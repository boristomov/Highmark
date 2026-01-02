import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { formData, cartItems, totals } = req.body;

    try {
        // Check if email credentials are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            console.error('Email credentials not configured');
            return res.status(500).json({
                success: false,
                message: 'Email service not configured. Please check EMAIL_SETUP_GUIDE.md',
                error: 'Missing EMAIL_USER or EMAIL_PASSWORD in environment variables',
            });
        }

        console.log('Attempting to send email from:', process.env.EMAIL_USER);

        // Create transporter using Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Generate cart items HTML
        const cartItemsHTML = cartItems.map(item => `
      <tr style="border-bottom: 1px solid #E9E1D3;">
        <td style="padding: 18px 15px; text-align: left;">
          <strong style="font-weight: 400; color: rgba(47, 47, 47, 0.85); font-size: 15px;">${item.title}</strong>
          ${item.brand ? `<br/><small style="color: rgba(47, 47, 47, 0.6); font-size: 13px; font-weight: 300;">Brand: ${item.brand}</small>` : ''}
          ${item.size ? `<br/><small style="color: rgba(47, 47, 47, 0.6); font-size: 13px; font-weight: 300;">Size: ${item.size}</small>` : ''}
        </td>
        <td style="padding: 18px 15px; text-align: center; color: rgba(47, 47, 47, 0.75); font-size: 15px; font-weight: 300;">${item.qty}</td>
        <td style="padding: 18px 15px; text-align: right; color: rgba(47, 47, 47, 0.75); font-size: 15px; font-weight: 400;">$${(item.price * item.qty).toFixed(2)}</td>
      </tr>
    `).join('');

        // Create beautiful HTML email template
        const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Request Received - Highmark Rentals</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #F5F0E8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F0E8; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 0px; box-shadow: 0 8px 32px rgba(27,27,27,0.12); overflow: hidden;">
          
          <!-- Header with Beige Background -->
          <tr>
            <td style="background: linear-gradient(135deg, #E9E1D3 0%, #D4C9B8 100%); padding: 50px 40px; text-align: center; border-bottom: 2px solid rgba(27,27,27,0.1);">
              <h1 style="margin: 0 0 10px 0; color: rgba(47, 47, 47, 0.9); font-size: 48px; font-weight: 200; letter-spacing: 3px; text-transform: uppercase; font-family: 'Urbanist', sans-serif;">
                Highmark
              </h1>
              <p style="margin: 0; color: rgba(47, 47, 47, 0.7); font-size: 13px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">
                Care and Craft In Every Detail
              </p>
              <div style="margin: 25px 0 0 0; padding-top: 25px; border-top: 1px solid rgba(47, 47, 47, 0.15);">
                <p style="margin: 0; color: rgba(47, 47, 47, 0.8); font-size: 18px; font-weight: 300;">
                  Thank you for your inquiry ✨
                </p>
              </div>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding: 50px 40px 35px 40px; background-color: #ffffff;">
              <h2 style="margin: 0 0 25px 0; color: rgba(47, 47, 47, 0.9); font-size: 26px; font-weight: 300; font-family: 'Urbanist', sans-serif;">
                Hello ${formData.name},
              </h2>
              <p style="margin: 0 0 18px 0; color: rgba(47, 47, 47, 0.75); font-size: 16px; line-height: 1.8; font-weight: 300;">
                Thank you for inquiring about our rental services! We're absolutely thrilled that you're considering Highmark Rentals to help make your special event unforgettable.
              </p>
              <p style="margin: 0; color: rgba(47, 47, 47, 0.75); font-size: 16px; line-height: 1.8; font-weight: 300;">
                We would love to help you turn your event into a wonderful memory that you and your guests will cherish for years to come.
              </p>
            </td>
          </tr>

          <!-- Event Details -->
          <tr>
            <td style="padding: 0 40px 35px 40px;">
              <div style="background-color: #F5F0E8; border-left: 3px solid #D4C9B8; padding: 25px 30px; border-radius: 0px;">
                <h3 style="margin: 0 0 20px 0; color: rgba(47, 47, 47, 0.85); font-size: 18px; font-weight: 400; letter-spacing: 1px; text-transform: uppercase; font-family: 'Urbanist', sans-serif;">Your Event Details</h3>
                ${formData.eventDate ? `
                  <p style="margin: 0 0 12px 0; color: rgba(47, 47, 47, 0.75); font-size: 15px; font-weight: 300; line-height: 1.6;">
                    <strong style="font-weight: 400;">Event Date:</strong> ${new Date(formData.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                ` : ''}
                ${formData.address ? `
                  <p style="margin: 0 0 12px 0; color: rgba(47, 47, 47, 0.75); font-size: 15px; font-weight: 300; line-height: 1.6;">
                    <strong style="font-weight: 400;">Event Address:</strong> ${formData.address}
                  </p>
                ` : ''}
                ${formData.phone ? `
                  <p style="margin: 0 0 12px 0; color: rgba(47, 47, 47, 0.75); font-size: 15px; font-weight: 300; line-height: 1.6;">
                    <strong style="font-weight: 400;">Phone:</strong> ${formData.phone}
                  </p>
                ` : ''}
                ${formData.message ? `
                  <p style="margin: 15px 0 0 0; color: rgba(47, 47, 47, 0.75); font-size: 15px; font-weight: 300; line-height: 1.6;">
                    <strong style="font-weight: 400;">Your Message:</strong><br/>
                    <span style="font-style: italic;">${formData.message}</span>
                  </p>
                ` : ''}
              </div>
            </td>
          </tr>

          <!-- Cart Summary -->
          <tr>
            <td style="padding: 0 40px 35px 40px;">
              <h3 style="margin: 0 0 25px 0; color: rgba(47, 47, 47, 0.85); font-size: 18px; font-weight: 400; letter-spacing: 1px; text-transform: uppercase; border-bottom: 2px solid #E9E1D3; padding-bottom: 15px; font-family: 'Urbanist', sans-serif;">
                Your Selected Items
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #F5F0E8;">
                    <th style="padding: 15px; text-align: left; color: rgba(47, 47, 47, 0.75); font-size: 13px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Item</th>
                    <th style="padding: 15px; text-align: center; color: rgba(47, 47, 47, 0.75); font-size: 13px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Qty</th>
                    <th style="padding: 15px; text-align: right; color: rgba(47, 47, 47, 0.75); font-size: 13px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${cartItemsHTML}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Pricing Summary -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <div style="background-color: #F5F0E8; padding: 25px 30px; border-radius: 0px; border: 1px solid #E9E1D3;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 10px 0; color: rgba(47, 47, 47, 0.75); font-size: 15px; font-weight: 300;">Subtotal:</td>
                    <td style="padding: 10px 0; text-align: right; color: rgba(47, 47, 47, 0.75); font-size: 15px; font-weight: 300;">$${totals.subTotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: rgba(47, 47, 47, 0.75); font-size: 15px; font-weight: 300;">Tax:</td>
                    <td style="padding: 10px 0; text-align: right; color: rgba(47, 47, 47, 0.6); font-size: 15px; font-style: italic; font-weight: 300;">Calculate upon quote approval</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: rgba(47, 47, 47, 0.75); font-size: 15px; font-weight: 300;">Delivery:</td>
                    <td style="padding: 10px 0; text-align: right; color: rgba(47, 47, 47, 0.6); font-size: 15px; font-style: italic; font-weight: 300;">TBD</td>
                  </tr>
                  <tr style="border-top: 2px solid #D4C9B8;">
                    <td style="padding: 15px 0 0 0; color: rgba(47, 47, 47, 0.9); font-size: 18px; font-weight: 400; letter-spacing: 0.5px;">Total:</td>
                    <td style="padding: 15px 0 0 0; text-align: right; color: rgba(47, 47, 47, 0.9); font-size: 22px; font-weight: 500;">$${totals.grandTotal.toFixed(2)}</td>
                  </tr>
                </table>
                <p style="margin: 18px 0 0 0; color: rgba(47, 47, 47, 0.6); font-size: 13px; font-style: italic; font-weight: 300;">
                  *Tax and delivery fees will be included in our quote response
                </p>
              </div>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <div style="background: linear-gradient(135deg, #E9E1D3 0%, #D4C9B8 100%); padding: 35px 30px; border-radius: 0px; text-align: center; border: 1px solid rgba(27,27,27,0.08);">
                <h3 style="margin: 0 0 20px 0; color: rgba(47, 47, 47, 0.85); font-size: 20px; font-weight: 400; letter-spacing: 1px; text-transform: uppercase; font-family: 'Urbanist', sans-serif;">What Happens Next?</h3>
                <p style="margin: 0; color: rgba(47, 47, 47, 0.75); font-size: 16px; line-height: 1.8; font-weight: 300;">
                  Our team will carefully review your selection and prepare a personalized quote for you.
                </p>
                <p style="margin: 15px 0 0 0; color: rgba(47, 47, 47, 0.8); font-size: 16px; line-height: 1.8; font-weight: 400;">
                  Please allow <strong style="font-weight: 500;">1-2 business days</strong> for us to get back to you with all the details.
                </p>
                <div style="margin-top: 25px; padding: 18px; background-color: rgba(255,255,255,0.5); border-radius: 0px; border: 1px solid rgba(27,27,27,0.08);">
                  <p style="margin: 0; color: rgba(47, 47, 47, 0.85); font-size: 15px; font-weight: 400; letter-spacing: 0.5px;">
                    ✨ Expect a new email coming soon!
                  </p>
                </div>
              </div>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 0 40px 45px 40px;">
              <p style="margin: 0 0 12px 0; color: rgba(47, 47, 47, 0.7); font-size: 15px; text-align: center; font-weight: 300;">
                Have questions in the meantime? We're here to help!
              </p>
              <p style="margin: 0; color: rgba(47, 47, 47, 0.75); font-size: 15px; text-align: center; font-weight: 300;">
                <a href="mailto:boristomov2002@gmail.com" style="color: rgba(47, 47, 47, 0.8); text-decoration: none; border-bottom: 1px solid #D4C9B8; padding-bottom: 2px;">boristomov2002@gmail.com</a>
                ${formData.phone ? ` <span style="color: #D4C9B8; margin: 0 8px;">|</span> ${formData.phone}` : ''}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(to bottom, #F5F0E8 0%, #E9E1D3 100%); padding: 40px 30px; text-align: center; border-top: 2px solid rgba(27,27,27,0.08);">
              <p style="margin: 0 0 8px 0; color: rgba(47, 47, 47, 0.9); font-size: 24px; font-weight: 200; letter-spacing: 2px; text-transform: uppercase; font-family: 'Urbanist', sans-serif;">
                Highmark Rentals
              </p>
              <p style="margin: 0 0 18px 0; color: rgba(47, 47, 47, 0.65); font-size: 12px; font-weight: 300; letter-spacing: 1.5px; text-transform: uppercase;">
                Care and Craft In Every Detail
              </p>
              <p style="margin: 0; color: rgba(47, 47, 47, 0.55); font-size: 11px; font-weight: 300;">
                © ${new Date().getFullYear()} Highmark Rentals. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

        // Plain text version for email clients that don't support HTML
        const textVersion = `
Hello ${formData.name}!

Thank you for inquiring about our rental services! We're absolutely thrilled that you're considering Highmark Rentals to help make your special event unforgettable.

YOUR EVENT DETAILS:
${formData.eventDate ? `Event Date: ${new Date(formData.eventDate).toLocaleDateString()}` : ''}
${formData.address ? `Event Address: ${formData.address}` : ''}
${formData.phone ? `Phone: ${formData.phone}` : ''}
${formData.message ? `\nYour Message: ${formData.message}` : ''}

YOUR SELECTED ITEMS:
${cartItems.map(item => `- ${item.title} (Qty: ${item.qty}) - $${(item.price * item.qty).toFixed(2)}`).join('\n')}

PRICING SUMMARY:
Subtotal: $${totals.subTotal.toFixed(2)}
Tax: Calculate upon quote approval
Delivery: TBD
Total: $${totals.grandTotal.toFixed(2)}

WHAT HAPPENS NEXT?
Our team will carefully review your selection and prepare a personalized quote for you.
Please allow 1-2 business days for us to get back to you with all the details.

Expect a new email coming soon!

Have questions? Contact us at:
Email: boristomov2002@gmail.com
${formData.phone ? `Phone: ${formData.phone}` : ''}

Best regards,
Highmark Rentals Team
Making Your Events Memorable
    `;

        // Send email to customer
        await transporter.sendMail({
            from: {
                name: 'Highmark Rentals',
                address: process.env.EMAIL_USER || 'boristomov2002@gmail.com',
            },
            to: formData.email,
            subject: '✨ Quote Request Received - Highmark Rentals',
            text: textVersion,
            html: htmlTemplate,
        });

        // Optionally send a notification to yourself
        await transporter.sendMail({
            from: {
                name: 'Highmark Rentals Website',
                address: process.env.EMAIL_USER || 'boristomov2002@gmail.com',
            },
            to: process.env.EMAIL_USER || 'boristomov2002@gmail.com',
            subject: `🔔 New Quote Request from ${formData.name}`,
            text: `New quote request received!\n\nCustomer: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\n\nTotal: $${totals.grandTotal.toFixed(2)}\nItems: ${cartItems.length}`,
            html: `
        <h2>New Quote Request</h2>
        <p><strong>Customer:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Event Date:</strong> ${formData.eventDate || 'Not provided'}</p>
        <p><strong>Event Address:</strong> ${formData.address || 'Not provided'}</p>
        <p><strong>Message:</strong> ${formData.message || 'None'}</p>
        <hr/>
        <h3>Cart Summary</h3>
        <p><strong>Total Items:</strong> ${cartItems.length}</p>
        <p><strong>Total Amount:</strong> $${totals.grandTotal.toFixed(2)}</p>
      `,
        });

        return res.status(200).json({
            success: true,
            message: 'Quote request email sent successfully',
        });

    } catch (error) {
        console.error('Error sending email:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            command: error.command,
        });

        let userMessage = 'Failed to send email';

        // Provide specific error messages for common issues
        if (error.code === 'EAUTH') {
            userMessage = 'Email authentication failed. Please check your Gmail App Password is correct.';
        } else if (error.code === 'ESOCKET') {
            userMessage = 'Network error. Please check your internet connection.';
        } else if (error.message?.includes('Invalid login')) {
            userMessage = 'Invalid email credentials. Make sure you are using a Gmail App Password, not your regular password.';
        }

        return res.status(500).json({
            success: false,
            message: userMessage,
            error: error.message,
            code: error.code,
        });
    }
}

