import emailjs from '@emailjs/browser';

// EmailJS Configuration
// You need to set these values in your environment or replace them directly
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_INQUIRY = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY || 'YOUR_INQUIRY_TEMPLATE_ID';
const EMAILJS_TEMPLATE_QUOTE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE || 'YOUR_QUOTE_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

// Initialize EmailJS (call this once in your app)
export const initEmailJS = () => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
};

/**
 * Send a contact/inquiry form submission
 * @param {Object} formData - Form data with name, email, phone, address, eventDate, message
 * @returns {Promise} - EmailJS send promise
 */
export const sendInquiryEmail = async (formData) => {
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        event_address: formData.address || 'Not provided',
        event_date: formData.eventDate || 'Not provided',
        message: formData.message || 'No message provided',
        to_email: 'info@highmarkeventrentals.com',
    };

    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_INQUIRY,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );
        console.log('Inquiry email sent successfully:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Failed to send inquiry email:', error);
        return { success: false, error };
    }
};

/**
 * Send a quote request email with cart items
 * @param {Object} formData - Customer form data
 * @param {Array} cartItems - Array of cart items
 * @param {Object} totals - Subtotal, tax, and grand total
 * @returns {Promise} - EmailJS send promise
 */
export const sendQuoteEmail = async (formData, cartItems, totals) => {
    // Format cart items as a readable list
    const itemsList = cartItems.map(item => 
        `• ${item.title} - Qty: ${item.qty} - $${(item.price * item.qty).toFixed(2)}`
    ).join('\n');

    // Create HTML version for prettier emails
    const itemsHtml = cartItems.map(item => 
        `<tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.title}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.qty).toFixed(2)}</td>
        </tr>`
    ).join('');

    const templateParams = {
        // Customer info
        from_name: `${formData.fname} ${formData.lname}`,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        address: formData.address || 'Not provided',
        city: formData.dristrict || '',
        post_code: formData.post_code || '',
        order_notes: formData.note || 'None',
        
        // Event details
        event_date: formData.eventDate || 'Not specified',
        event_location: formData.eventLocation || formData.address || 'Not provided',
        
        // Cart details (plain text)
        items_list: itemsList,
        items_count: cartItems.length,
        
        // Cart details (HTML)
        items_html: itemsHtml,
        
        // Totals
        subtotal: `$${totals.subtotal.toFixed(2)}`,
        tax: `$${totals.tax.toFixed(2)}`,
        total: `$${totals.total.toFixed(2)}`,
        
        // Business email
        to_email: 'info@highmarkeventrentals.com',
    };

    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_QUOTE,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );
        console.log('Quote email sent successfully:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Failed to send quote email:', error);
        return { success: false, error };
    }
};

/**
 * Check if EmailJS is properly configured
 * @returns {boolean} - True if all required env vars are set
 */
export const isEmailConfigured = () => {
    return (
        EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
        EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
        (EMAILJS_TEMPLATE_INQUIRY !== 'YOUR_INQUIRY_TEMPLATE_ID' || 
         EMAILJS_TEMPLATE_QUOTE !== 'YOUR_QUOTE_TEMPLATE_ID')
    );
};

