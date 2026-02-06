import emailjs from '@emailjs/browser';

// EmailJS Configuration - Public keys are safe to expose in frontend code
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_gnd1ale';
const EMAILJS_TEMPLATE_INQUIRY = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY || 'template_owqef03';
const EMAILJS_TEMPLATE_QUOTE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE || 'template_2qq0pky';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'kh9KkUPz8DXMeYtN0';

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
 * Customer-friendly template that BCCs the business
 * @param {Object} formData - Customer form data
 * @param {Array} cartItems - Array of cart items
 * @param {Object} totals - Subtotal, tax, and grand total
 * @returns {Promise} - EmailJS send promise
 */
export const sendQuoteEmail = async (formData, cartItems, totals) => {
    const baseUrl = 'https://www.highmarkeventrentals.com';

    // Format cart items as plain text list
    const itemsList = cartItems.map(item =>
        `• ${item.title} (Qty: ${item.qty}) - $${(item.price * item.qty).toFixed(2)}`
    ).join('\n');

    // Format cart items as HTML with images
    const itemsHtml = cartItems.map(item => {
        const imageUrl = item.proImg ? `${baseUrl}${item.proImg}` : `${baseUrl}/images/boris/placeholder.jpg`;
        return `
        <tr style="border-bottom: 1px solid #E9E1D3;">
            <td style="padding: 15px; width: 80px;">
                <img src="${imageUrl}" alt="${item.title}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px;" />
            </td>
            <td style="padding: 15px;">
                <p style="margin: 0 0 5px 0; font-weight: 500; color: rgba(47,47,47,0.9);">${item.title}</p>
                <p style="margin: 0; color: rgba(47,47,47,0.6); font-size: 13px;">Qty: ${item.qty}</p>
            </td>
            <td style="padding: 15px; text-align: right; font-weight: 500; color: rgba(47,47,47,0.85);">
                $${(item.price * item.qty).toFixed(2)}
            </td>
        </tr>`;
    }).join('');

    const templateParams = {
        // Customer info (sent TO customer, BCC to business)
        from_name: `${formData.fname} ${formData.lname}`,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',

        // Event details
        event_date: formData.eventDate || 'Not specified',
        event_location: formData.eventLocation || formData.address || 'Not provided',

        // Cart summary
        items_count: cartItems.length,
        items_list: itemsList,
        items_html: itemsHtml,

        // Totals
        subtotal: `$${totals.subtotal.toFixed(2)}`,
        total: `$${totals.subtotal.toFixed(2)}`,

        // Additional notes
        order_notes: formData.note || 'None',
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
    const isConfigured = (
        EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
        EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
        EMAILJS_TEMPLATE_INQUIRY !== 'YOUR_INQUIRY_TEMPLATE_ID' &&
        EMAILJS_TEMPLATE_QUOTE !== 'YOUR_QUOTE_TEMPLATE_ID'
    );

    // Initialize EmailJS if configured
    if (isConfigured) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    return isConfigured;
};

