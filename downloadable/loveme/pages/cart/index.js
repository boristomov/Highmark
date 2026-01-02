import React, { Fragment } from 'react';
import { Button, Grid } from "@mui/material";
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import { connect } from "react-redux";
import { totalPrice } from "../../utils";
import Link from "next/link";
import {
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
} from "../../store/actions/action";
import Scrollbar from '../../components/scrollbar';


const CartPage = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    const { carts } = props;
    const quoteEndpoint = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT; // optional external backend endpoint

    // Pricing calculations
    const subTotal = totalPrice(carts);
    // Tax will be calculated upon quote approval
    const grandTotal = subTotal;

    // Quote form state
    const [quoteForm, setQuoteForm] = React.useState({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        address: '',
        message: '',
    });

    const [emailStatus, setEmailStatus] = React.useState({
        sending: false,
        success: false,
        error: null,
    });

    const handleQuoteChange = (e) => {
        const { name, value } = e.target;
        setQuoteForm(prev => ({ ...prev, [name]: value }));
    };

    const handleQuoteSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!quoteForm.name || !quoteForm.email) {
            setEmailStatus({
                sending: false,
                success: false,
                error: 'Please fill in your name and email address.',
            });
            return;
        }

        setEmailStatus({ sending: true, success: false, error: null });

        try {
            // Prepare data for email
            const emailData = {
                formData: quoteForm,
                cartItems: carts,
                totals: {
                    subTotal,
                    grandTotal,
                },
            };

            // Static hosting fallback:
            // - If NEXT_PUBLIC_QUOTE_ENDPOINT is configured, POST there.
            // - Otherwise open a mailto draft so the site still "works" on GitHub Pages.
            if (!quoteEndpoint) {
                const lines = [];
                lines.push(`Name: ${quoteForm.name}`);
                lines.push(`Email: ${quoteForm.email}`);
                if (quoteForm.phone) lines.push(`Phone: ${quoteForm.phone}`);
                if (quoteForm.eventDate) lines.push(`Event Date: ${quoteForm.eventDate}`);
                if (quoteForm.address) lines.push(`Event Address: ${quoteForm.address}`);
                if (quoteForm.message) lines.push(`Message: ${quoteForm.message}`);
                lines.push('');
                lines.push('Requested Items:');
                carts.forEach((it) => {
                    lines.push(`- ${it.title} (qty: ${it.qty})`);
                });
                lines.push('');
                lines.push(`Subtotal: $${subTotal}`);
                lines.push(`Total: $${grandTotal}`);

                const subject = encodeURIComponent('Highmark Rentals Quote Request');
                const body = encodeURIComponent(lines.join('\n'));
                window.location.href = `mailto:highmarkrentals@gmail.com?subject=${subject}&body=${body}`;

                setEmailStatus({
                    sending: false,
                    success: true,
                    error: null,
                });
                // Reset form after successful submission
                setQuoteForm({
                    name: '',
                    email: '',
                    phone: '',
                    eventDate: '',
                    address: '',
                    message: '',
                });
                return;
            }

            // Send email via external backend endpoint
            const response = await fetch(quoteEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailData),
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok && result.success) {
                setEmailStatus({
                    sending: false,
                    success: true,
                    error: null,
                });
                // Reset form after successful submission
                setQuoteForm({
                    name: '',
                    email: '',
                    phone: '',
                    eventDate: '',
                    address: '',
                    message: '',
                });
            } else {
                const errorMessage = result.message || 'Failed to send email';
                const errorDetails = result.error ? ` (${result.error})` : '';
                throw new Error(errorMessage + errorDetails);
            }
        } catch (error) {
            console.error('Error sending quote email:', error);
            setEmailStatus({
                sending: false,
                success: false,
                error: error.message || 'Failed to send quote request. Please try again.',
            });
        }
    };

    const handleQuantityChange = (item, e) => {
        const value = e.target.value;
        // Allow empty string while typing
        if (value === '') {
            return;
        }
        // Parse and validate the number
        const quantity = parseInt(value, 10);
        if (!isNaN(quantity) && quantity > 0) {
            props.setQuantity(item, quantity);
        }
    };

    const handleQuantityBlur = (item, e) => {
        const value = e.target.value;
        // If empty or invalid on blur, reset to 1
        const quantity = parseInt(value, 10);
        if (isNaN(quantity) || quantity < 1) {
            props.setQuantity(item, 1);
        }
    };

    return (
        <Fragment>
            <Navbar alwaysWhite withOffsetBand />
            <PageTitle pageTitle='Cart' pagesub="Cart" />
            <div className="cart-area section-padding">
                <div className="container">
                    <div className="form">
                        <div className="cart-wrapper">
                            <div className="row">
                                <div className="col-12">
                                    <form action="cart">
                                        <table className="table-responsive cart-wrap">
                                            <thead>
                                                <tr>
                                                    <th className="images images-b">Image</th>
                                                    <th className="product-2">Product Name</th>
                                                    <th className="pr">Quantity</th>
                                                    <th className="ptice">Price</th>
                                                    <th className="stock">Total Price</th>
                                                    <th className="remove remove-b">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {carts &&
                                                    carts.length > 0 &&
                                                    carts.map((catItem, crt) => (
                                                        <tr key={crt}>
                                                            <td className="images">
                                                                <img src={catItem.proImg} alt="" />
                                                            </td>
                                                            <td className="product">
                                                                <ul>
                                                                    <li className="first-cart">
                                                                        {catItem.title}
                                                                    </li>
                                                                    <li>Brand : {catItem.brand}</li>
                                                                    <li>Size : {catItem.size}</li>
                                                                </ul>
                                                            </td>
                                                            <td className="stock">
                                                                <div className="pro-single-btn">
                                                                    <Grid className="quantity cart-plus-minus">
                                                                        <Button
                                                                            className="dec qtybutton"
                                                                            onClick={() =>
                                                                                props.decrementQuantity(catItem)
                                                                            }
                                                                        >
                                                                            -
                                                                        </Button>
                                                                        <input
                                                                            value={catItem.qty}
                                                                            type="number"
                                                                            min="1"
                                                                            onChange={(e) => handleQuantityChange(catItem, e)}
                                                                            onBlur={(e) => handleQuantityBlur(catItem, e)}
                                                                        />
                                                                        <Button
                                                                            className="inc qtybutton"
                                                                            onClick={() =>
                                                                                props.incrementQuantity(catItem)
                                                                            }
                                                                        >
                                                                            +
                                                                        </Button>
                                                                    </Grid>
                                                                </div>
                                                            </td>
                                                            <td className="ptice">${catItem.qty * catItem.price}</td>
                                                            <td className="stock">${catItem.qty * catItem.price}</td>
                                                            <td className="action">
                                                                <ul>
                                                                    <li
                                                                        className="w-btn"
                                                                        onClick={() =>
                                                                            props.removeFromCart(catItem.id)
                                                                        }
                                                                    >
                                                                        <i className="fi ti-trash"></i>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </form>
                                    <div className="submit-btn-area">
                                        <ul>
                                            <li>
                                                <Link
                                                    onClick={ClickHandler}
                                                    href="/shop"
                                                    className="theme-btn-s3"
                                                >
                                                    Continue Shopping{" "}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cart-product-list">
                                        <ul>
                                            <li>
                                                Total product<span>( {carts.length} )</span>
                                            </li>
                                            <li>
                                                Price<span>${subTotal}</span>
                                            </li>
                                            <li>
                                                Tax<span>Calculate upon quote approval</span>
                                            </li>
                                            <li>
                                                Delivery<span>TBD - available in return email upon sending a quote request</span>
                                            </li>
                                            <li className="cart-b">
                                                <strong>Total Price</strong><span><strong>${grandTotal}</strong></span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Quote Request Form - with same background as homepage contact */}
                                    <div className="wpo-contact-section" style={{ marginTop: '60px', paddingTop: '0', paddingBottom: '60px' }}>
                                        <div className="wpo-contact-section-wrapper">
                                            <div className="wpo-contact-form-area">
                                                <form onSubmit={handleQuoteSubmit} className="form">
                                                    <div className="row">
                                                        <div className="form-field-col">
                                                            <div className="form-field">
                                                                <input
                                                                    value={quoteForm.name}
                                                                    onChange={handleQuoteChange}
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="name"
                                                                    placeholder="Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-field-col">
                                                            <div className="form-field">
                                                                <input
                                                                    onChange={handleQuoteChange}
                                                                    value={quoteForm.email}
                                                                    type="email"
                                                                    className="form-control"
                                                                    name="email"
                                                                    placeholder="Email"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-field-col">
                                                            <div className="form-field">
                                                                <input
                                                                    onChange={handleQuoteChange}
                                                                    value={quoteForm.phone}
                                                                    type="tel"
                                                                    className="form-control"
                                                                    name="phone"
                                                                    placeholder="Phone"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-field-col">
                                                            <div className="form-field">
                                                                <input
                                                                    onChange={handleQuoteChange}
                                                                    value={quoteForm.eventDate}
                                                                    type={quoteForm.eventDate ? 'date' : 'text'}
                                                                    className="form-control"
                                                                    name="eventDate"
                                                                    placeholder="Event Date"
                                                                    onFocus={(e) => { e.target.type = 'date'; }}
                                                                    onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-field-col form-field-full">
                                                            <div className="form-field">
                                                                <input
                                                                    onChange={handleQuoteChange}
                                                                    value={quoteForm.address}
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="address"
                                                                    placeholder="Event Address"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-field-col form-field-full">
                                                            <div className="form-field">
                                                                <textarea
                                                                    onChange={handleQuoteChange}
                                                                    value={quoteForm.message}
                                                                    className="form-control"
                                                                    name="message"
                                                                    placeholder="Message"
                                                                    rows="8"
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="submit-area">
                                                            <div className="form-submit">
                                                                <button
                                                                    type="submit"
                                                                    className="theme-btn-s3"
                                                                    disabled={emailStatus.sending}
                                                                    style={{
                                                                        opacity: emailStatus.sending ? 0.7 : 1,
                                                                        cursor: emailStatus.sending ? 'not-allowed' : 'pointer'
                                                                    }}
                                                                >
                                                                    {emailStatus.sending ? 'Sending...' : 'Request Quote and Approval'}
                                                                </button>
                                                            </div>

                                                            {/* Success Message */}
                                                            {emailStatus.success && (
                                                                <div style={{
                                                                    marginTop: '20px',
                                                                    padding: '20px',
                                                                    backgroundColor: '#d4edda',
                                                                    border: '1px solid #c3e6cb',
                                                                    borderRadius: '8px',
                                                                    color: '#155724',
                                                                    textAlign: 'center'
                                                                }}>
                                                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>✅ Quote Request Sent Successfully!</h4>
                                                                    <p style={{ margin: 0, fontSize: '15px' }}>
                                                                        Thank you! Please check your email for a confirmation. We'll get back to you within 1-2 business days.
                                                                    </p>
                                                                </div>
                                                            )}

                                                            {/* Error Message */}
                                                            {emailStatus.error && (
                                                                <div style={{
                                                                    marginTop: '20px',
                                                                    padding: '20px',
                                                                    backgroundColor: '#f8d7da',
                                                                    border: '1px solid #f5c6cb',
                                                                    borderRadius: '8px',
                                                                    color: '#721c24',
                                                                    textAlign: 'center'
                                                                }}>
                                                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>❌ Error</h4>
                                                                    <p style={{ margin: 0, fontSize: '15px' }}>
                                                                        {emailStatus.error}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};


const mapStateToProps = (state) => {
    return {
        carts: state.cartList.cart,
    };
};
export default connect(mapStateToProps, {
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
})(CartPage);
