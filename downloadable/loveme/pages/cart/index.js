import React, { Fragment, useRef } from 'react';
import { Button, Grid } from "@mui/material";
import ReCAPTCHA from 'react-google-recaptcha';
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
import { sendQuoteEmail, isEmailConfigured } from '../../utils/emailService';
import RentalDateRange, { createDefaultScheduling, formatSchedulingForEmail, validateScheduling } from '../../components/RentalDateRange';


const CartPage = (props) => {
    const recaptchaRef = useRef(null);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    const { carts } = props;

    // Pricing calculations
    const subTotal = totalPrice(carts);

    // Quote form state
    const [quoteForm, setQuoteForm] = React.useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        scheduling: createDefaultScheduling(),
        eventLocation: '',
        note: '',
    });

    const [emailStatus, setEmailStatus] = React.useState({
        sending: false,
        success: false,
        error: null,
    });

    const [captchaToken, setCaptchaToken] = React.useState(null);
    const [schedulingErrors, setSchedulingErrors] = React.useState({});

    const handleQuoteChange = (e) => {
        const { name, value } = e.target;
        setQuoteForm(prev => ({ ...prev, [name]: value }));
    };

    const onCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleQuoteSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!quoteForm.fname || !quoteForm.email || !quoteForm.phone) {
            setEmailStatus({
                sending: false,
                success: false,
                error: 'Please fill in your name, email, and phone number.',
            });
            return;
        }

        const schedulingValidation = validateScheduling(quoteForm.scheduling);
        if (!schedulingValidation.valid) {
            setSchedulingErrors(schedulingValidation.errors);
            setEmailStatus({
                sending: false,
                success: false,
                error: 'Please add your event date and time. End times cannot be earlier than start times.',
            });
            return;
        }
        setSchedulingErrors({});

        if (carts.length === 0) {
            setEmailStatus({
                sending: false,
                success: false,
                error: 'Your cart is empty. Please add items before requesting a quote.',
            });
            return;
        }

        // Check reCAPTCHA
        if (!captchaToken) {
            setEmailStatus({
                sending: false,
                success: false,
                error: 'Please complete the reCAPTCHA verification before submitting.',
            });
            return;
        }

        setEmailStatus({ sending: true, success: false, error: null });

        try {
            // Check if EmailJS is configured
            if (isEmailConfigured()) {
                // Use EmailJS
                const result = await sendQuoteEmail(
                    quoteForm,
                    carts,
                    { subtotal: subTotal }
                );

                if (result.success) {
                    setEmailStatus({ sending: false, success: true, error: null });
                    setQuoteForm({
                        fname: '',
                        lname: '',
                        email: '',
                        phone: '',
                        scheduling: createDefaultScheduling(),
                        eventLocation: '',
                        note: '',
                    });
                    setSchedulingErrors({});
                    setCaptchaToken(null);
                    if (recaptchaRef.current) {
                        recaptchaRef.current.reset();
                    }
                } else {
                    throw new Error('Failed to send email via EmailJS');
                }
            } else {
                // Fallback: Open mailto link
                const lines = [];
                lines.push(`Name: ${quoteForm.fname} ${quoteForm.lname}`);
                lines.push(`Email: ${quoteForm.email}`);
                if (quoteForm.phone) lines.push(`Phone: ${quoteForm.phone}`);
                const schedulingSummary = formatSchedulingForEmail(quoteForm.scheduling);
                lines.push('Scheduling Preferences:');
                lines.push(schedulingSummary.summary);
                if (quoteForm.eventLocation) lines.push(`Event Location: ${quoteForm.eventLocation}`);
                if (quoteForm.note) lines.push(`Notes: ${quoteForm.note}`);
                lines.push('');
                lines.push('Requested Items:');
                carts.forEach((it) => {
                    lines.push(`- ${it.title} x ${it.qty} @ $${it.price}/ea = $${(it.qty * it.price).toFixed(2)}`);
                });
                lines.push('');
                lines.push(`Total: $${subTotal.toFixed(2)}`);

                const subject = encodeURIComponent('Highmark Event Rentals Quote Request');
                const body = encodeURIComponent(lines.join('\n'));
                window.open(`mailto:info@highmarkeventrentals.com?subject=${subject}&body=${body}`, '_blank');

                setEmailStatus({ sending: false, success: true, error: null });
                setQuoteForm({
                    fname: '',
                    lname: '',
                    email: '',
                    phone: '',
                    scheduling: createDefaultScheduling(),
                    eventLocation: '',
                    note: '',
                });
                setSchedulingErrors({});
                setCaptchaToken(null);
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
            }
        } catch (error) {
            console.error('Error sending quote email:', error);
            setEmailStatus({
                sending: false,
                success: false,
                error: 'Failed to send quote request. Please try again or email us directly at info@highmarkeventrentals.com',
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
                                                    Continue Browsing Rentals{" "}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cart-product-list">
                                        <ul>
                                            <li>
                                                Total product<span>( {carts.length} )</span>
                                            </li>
                                            <li className="cart-b">
                                                <strong>Price</strong><span><strong>${subTotal}</strong></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <p className="cart-pricing-note" style={{ fontSize: '16px', fontWeight: '700' }}>
                                        Each quote is tailored to your event. Quoted pricing will reflect applicable tax, labor, delivery, with full details provided via email after your request is reviewed.
                                    </p>

                                    {/* Quote Request Form */}
                                    <div className="quote-request-section" style={{ marginTop: '60px', padding: '40px', background: 'linear-gradient(135deg, rgba(233, 225, 211, 0.4) 0%, rgba(212, 201, 184, 0.3) 100%)', borderRadius: '12px' }}>
                                        <h3 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: '400', color: '#2f2f2f', textAlign: 'center' }}>
                                            Request a Quote
                                        </h3>
                                        <form onSubmit={handleQuoteSubmit}>
                                            <div className="row">
                                                <div className="col-md-6 col-12" style={{ marginBottom: '20px' }}>
                                                    <input
                                                        value={quoteForm.fname}
                                                        onChange={handleQuoteChange}
                                                        className="form-control"
                                                        type="text"
                                                        name="fname"
                                                        placeholder="First Name *"
                                                        style={{ padding: '14px 18px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '15px' }}
                                                    />
                                                </div>
                                                <div className="col-md-6 col-12" style={{ marginBottom: '20px' }}>
                                                    <input
                                                        value={quoteForm.lname}
                                                        onChange={handleQuoteChange}
                                                        className="form-control"
                                                        type="text"
                                                        name="lname"
                                                        placeholder="Last Name"
                                                        style={{ padding: '14px 18px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '15px' }}
                                                    />
                                                </div>
                                                <div className="col-md-6 col-12" style={{ marginBottom: '20px' }}>
                                                    <input
                                                        onChange={handleQuoteChange}
                                                        value={quoteForm.email}
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        placeholder="Email *"
                                                        style={{ padding: '14px 18px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '15px' }}
                                                    />
                                                </div>
                                                <div className="col-md-6 col-12" style={{ marginBottom: '20px' }}>
                                                    <input
                                                        onChange={handleQuoteChange}
                                                        value={quoteForm.phone}
                                                        type="tel"
                                                        className="form-control"
                                                        name="phone"
                                                        placeholder="Phone *"
                                                        style={{ padding: '14px 18px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '15px' }}
                                                    />
                                                </div>
                                                <div className="col-12" style={{ marginBottom: '20px' }}>
                                                    <RentalDateRange
                                                        idPrefix="quote-rental-period"
                                                        value={quoteForm.scheduling}
                                                        onChange={(scheduling) => {
                                                            setQuoteForm(prev => ({
                                                                ...prev,
                                                                scheduling,
                                                            }));
                                                            setSchedulingErrors({});
                                                            if (emailStatus.error) {
                                                                setEmailStatus(prev => ({ ...prev, error: null }));
                                                            }
                                                        }}
                                                        errors={schedulingErrors}
                                                    />
                                                </div>
                                                <div className="col-md-6 col-12" style={{ marginBottom: '20px' }}>
                                                    <input
                                                        onChange={handleQuoteChange}
                                                        value={quoteForm.eventLocation}
                                                        type="text"
                                                        className="form-control"
                                                        name="eventLocation"
                                                        placeholder="Event Location / Address"
                                                        style={{ padding: '14px 18px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '15px' }}
                                                    />
                                                </div>
                                                <div className="col-12" style={{ marginBottom: '20px' }}>
                                                    <textarea
                                                        onChange={handleQuoteChange}
                                                        value={quoteForm.note}
                                                        className="form-control"
                                                        name="note"
                                                        placeholder="Additional notes or special requests..."
                                                        rows="4"
                                                        style={{ padding: '14px 18px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '15px', resize: 'vertical' }}
                                                    ></textarea>
                                                </div>
                                                
                                                {/* reCAPTCHA - Site key is safe to be public, it's designed for frontend use */}
                                                <div className="col-12" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                                                    <ReCAPTCHA
                                                        ref={recaptchaRef}
                                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lchi0osAAAAAE90R42vzIpTI7AJaEI4o8DwnY-A"}
                                                        onChange={onCaptchaChange}
                                                        theme="light"
                                                    />
                                                </div>
                                                
                                                <div className="col-12" style={{ textAlign: 'center' }}>
                                                    <button
                                                        type="submit"
                                                        className="theme-btn-s3"
                                                        disabled={emailStatus.sending}
                                                        style={{
                                                            opacity: emailStatus.sending ? 0.7 : 1,
                                                            cursor: emailStatus.sending ? 'not-allowed' : 'pointer',
                                                            padding: '16px 40px',
                                                            fontSize: '16px'
                                                        }}
                                                    >
                                                        {emailStatus.sending ? 'Sending...' : 'Request Quote'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Success Message */}
                                            {emailStatus.success && (
                                                <div style={{
                                                    marginTop: '24px',
                                                    padding: '20px',
                                                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                                    border: '1px solid #4CAF50',
                                                    borderRadius: '8px',
                                                    textAlign: 'center'
                                                }}>
                                                    <p style={{ color: '#2E7D32', margin: 0, fontSize: '16px' }}>
                                                        ✓ Quote request sent successfully! We'll get back to you within 1-2 business days.
                                                    </p>
                                                </div>
                                            )}

                                            {/* Error Message */}
                                            {emailStatus.error && (
                                                <div style={{
                                                    marginTop: '24px',
                                                    padding: '20px',
                                                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                                    border: '1px solid #f44336',
                                                    borderRadius: '8px',
                                                    textAlign: 'center'
                                                }}>
                                                    <p style={{ color: '#c62828', margin: 0, fontSize: '16px' }}>
                                                        ✗ {emailStatus.error}
                                                    </p>
                                                </div>
                                            )}
                                        </form>
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
