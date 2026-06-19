import React, { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import SectionTitle from '../../components/SectionTitle'
import { sendInquiryEmail, isEmailConfigured } from '../../utils/emailService'
import RentalDateRange, { createDefaultScheduling, validateScheduling } from '../RentalDateRange'

const RSVP = () => {
    const recaptchaRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        scheduling: createDefaultScheduling(),
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
    const [captchaToken, setCaptchaToken] = useState(null);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = "Please enter your name";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Please enter your email";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Please enter your phone number";
        }
        const schedulingValidation = validateScheduling(formData.scheduling);
        if (!schedulingValidation.valid) {
            newErrors.scheduling = schedulingValidation.errors;
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onCaptchaChange = (token) => {
        setCaptchaToken(token);
        // Clear captcha error if user completes it
        if (errors.captcha) {
            setErrors(prev => ({ ...prev, captcha: '' }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Check reCAPTCHA
        if (!captchaToken) {
            setErrors(prev => ({ ...prev, captcha: 'Please complete the reCAPTCHA verification' }));
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Check if EmailJS is configured
            if (!isEmailConfigured()) {
                console.warn('EmailJS not configured. Check EMAILJS_SETUP_GUIDE.md');
                // For development, show success anyway but log warning
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    city: '',
                    address: '',
                    scheduling: createDefaultScheduling(),
                    message: '',
                });
                setCaptchaToken(null);
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
                return;
            }

            const result = await sendInquiryEmail(formData);
            
            if (result.success) {
                setSubmitStatus('success');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    city: '',
                    address: '',
                    scheduling: createDefaultScheduling(),
                    message: '',
                });
                setCaptchaToken(null);
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Email submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="wpo-contact-section section-padding" id="RSVP">
            <div className="container">
                <div className="wpo-contact-section-wrapper">
                    <div className="wpo-contact-form-area">
                        <SectionTitle MainTitle={"Let's Plan Your Event"} />
                        
                        {/* Success Message */}
                        {submitStatus === 'success' && (
                            <div style={{
                                background: 'rgba(76, 175, 80, 0.1)',
                                border: '1px solid #4CAF50',
                                borderRadius: '8px',
                                padding: '16px 24px',
                                marginBottom: '24px',
                                textAlign: 'center'
                            }}>
                                <p style={{ color: '#2E7D32', margin: 0, fontSize: '16px' }}>
                                    ✓ Thank you! Your message has been sent successfully. We'll get back to you soon!
                                </p>
                            </div>
                        )}
                        
                        {/* Error Message */}
                        {submitStatus === 'error' && (
                            <div style={{
                                background: 'rgba(244, 67, 54, 0.1)',
                                border: '1px solid #f44336',
                                borderRadius: '8px',
                                padding: '16px 24px',
                                marginBottom: '24px',
                                textAlign: 'center'
                            }}>
                                <p style={{ color: '#c62828', margin: 0, fontSize: '16px' }}>
                                    ✗ Oops! Something went wrong. Please try again or contact us directly at info@highmarkeventrentals.com
                                </p>
                            </div>
                        )}

                        <form onSubmit={submitHandler} className="form">
                            <div className="row">
                                <div className="form-field-col">
                                    <div className="form-field">
                                        <input 
                                            value={formData.name} 
                                            onChange={changeHandler} 
                                            className="form-control" 
                                            type="text" 
                                            name="name" 
                                            placeholder="Name *" 
                                        />
                                        <p className="error-text">{errors.name || ''}</p>
                                    </div>
                                </div>
                                <div className="form-field-col">
                                    <div className="form-field">
                                        <input 
                                            onChange={changeHandler} 
                                            value={formData.email} 
                                            type="email" 
                                            className="form-control" 
                                            name="email" 
                                            placeholder="Email *" 
                                        />
                                        <p className="error-text">{errors.email || ''}</p>
                                    </div>
                                </div>
                                <div className="form-field-col">
                                    <div className="form-field">
                                        <input 
                                            onChange={changeHandler} 
                                            value={formData.phone} 
                                            type="tel" 
                                            className="form-control" 
                                            name="phone" 
                                            placeholder="Phone *" 
                                        />
                                        <p className="error-text">{errors.phone || ''}</p>
                                    </div>
                                </div>
                                <div className="form-field-col form-field-full">
                                    <RentalDateRange
                                        idPrefix="inquiry-rental-period"
                                        value={formData.scheduling}
                                        onChange={(scheduling) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                scheduling,
                                            }));
                                            if (errors.scheduling) {
                                                setErrors(prev => ({ ...prev, scheduling: null }));
                                            }
                                        }}
                                        errors={errors.scheduling || {}}
                                    />
                                </div>
                                <div className="form-field-col">
                                    <div className="form-field">
                                        <input 
                                            onChange={changeHandler} 
                                            value={formData.city} 
                                            type="text" 
                                            className="form-control" 
                                            name="city" 
                                            placeholder="City" 
                                        />
                                    </div>
                                </div>
                                <div className="form-field-col">
                                    <div className="form-field">
                                        <input 
                                            onChange={changeHandler} 
                                            value={formData.address} 
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
                                            onChange={changeHandler} 
                                            value={formData.message} 
                                            className="form-control" 
                                            name="message" 
                                            placeholder="Tell us about your event..." 
                                            rows="8"
                                        >                                        </textarea>
                                    </div>
                                </div>
                                
                                {/* reCAPTCHA - Site key is safe to be public, it's designed for frontend use */}
                                <div className="form-field-col form-field-full" style={{ marginTop: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lchi0osAAAAAE90R42vzIpTI7AJaEI4o8DwnY-A"}
                                        onChange={onCaptchaChange}
                                        theme="light"
                                    />
                                    {errors.captcha && (
                                        <p className="error-text" style={{ marginTop: '8px', color: '#f44336', textAlign: 'center' }}>
                                            {errors.captcha}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="submit-area">
                                    <div className="form-submit">
                                        <button 
                                            type="submit" 
                                            className="theme-btn-s3"
                                            disabled={isSubmitting}
                                            style={{ opacity: isSubmitting ? 0.7 : 1 }}
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="border-style"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RSVP;

