import React from 'react';
import Navbar from '../../components/Navbar/index';
import PageTitle from '../../components/pagetitle';
import Footer from '../../components/footer';
import Scrollbar from '../../components/scrollbar';

const PrivacyPolicyPage = () => {
    return (
        <div>
            <Navbar alwaysWhite withOffsetBand />
            <PageTitle pageTitle={'Privacy Policy'} pagesub={'Privacy Policy'} />
            <section className="privacy-policy-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="privacy-content">
                                <div className="privacy-header">
                                    <p className="last-updated">Last Updated: January 7, 2026</p>
                                    <p className="intro-text">
                                        Highmark Event Rentals ("Highmark," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and protect personal information when you interact with our website, services, and communications.
                                    </p>
                                    <p className="intro-text">
                                        Highmark Event Rentals is based in Danville, California and provides event rental services. While we may serve clients outside of California, this Privacy Policy includes disclosures required under California privacy laws, which apply to California residents.
                                    </p>
                                    <p className="intro-text highlight">
                                        By using our website or services, you agree to the practices described in this Privacy Policy.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>Information We Collect</h2>
                                    <p>
                                        We collect personal information that you voluntarily provide to us when you inquire about our services, request a quote, place an order, enter into a rental agreement, or communicate with us. This information may include:
                                    </p>
                                    <ul className="privacy-list">
                                        <li>Name</li>
                                        <li>Email address</li>
                                        <li>Phone number</li>
                                        <li>Billing and delivery address</li>
                                        <li>Event details and rental preferences</li>
                                        <li>Payment and transaction information</li>
                                        <li>Communications with us</li>
                                    </ul>
                                    <p>
                                        We may also automatically collect limited information when you visit our website, such as IP address, browser type, device information, and website interaction data through cookies or similar technologies.
                                    </p>
                                    <p>
                                        We do not knowingly collect sensitive personal information as defined under California law unless required to fulfill a service you request.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>How We Use Personal Information</h2>
                                    <p>We use personal information for legitimate business purposes, including to:</p>
                                    <ul className="privacy-list">
                                        <li>Respond to inquiries and provide quotes</li>
                                        <li>Process reservations, payments, and rental agreements</li>
                                        <li>Coordinate deliveries, pickups, and event logistics</li>
                                        <li>Communicate with you regarding your order or services</li>
                                        <li>Maintain business records for accounting, tax, and legal compliance</li>
                                        <li>Improve our website, services, and customer experience</li>
                                    </ul>
                                    <p>We do not use personal information for automated decision-making or profiling.</p>
                                </div>

                                <div className="privacy-section">
                                    <h2>Cookies and Online Tracking</h2>
                                    <p>
                                        Our website may use cookies or similar tracking technologies to help us understand website traffic and usage patterns and to improve functionality.
                                    </p>
                                    <p>
                                        You can manage cookies through your browser settings. Disabling cookies may affect certain features of the website.
                                    </p>
                                    <p>
                                        At this time, our website does not respond to "Do Not Track" signals, as there is no uniform industry standard for compliance.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>Sharing of Personal Information</h2>
                                    <p>
                                        Highmark Event Rentals does not sell or share personal information as those terms are defined under California law.
                                    </p>
                                    <p>
                                        We may disclose personal information to trusted service providers only as necessary to operate our business, such as:
                                    </p>
                                    <ul className="privacy-list">
                                        <li>Payment processors</li>
                                        <li>Delivery or logistics partners</li>
                                        <li>Website hosting or technology providers</li>
                                    </ul>
                                    <p>
                                        These service providers are authorized to use personal information only as necessary to perform services on our behalf and are not permitted to use it for their own purposes.
                                    </p>
                                    <p>
                                        We may also disclose information if required by law, legal process, or to protect the rights, safety, or property of Highmark Event Rentals or others.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>Data Retention</h2>
                                    <p>
                                        We retain personal information only for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy, including compliance with legal, accounting, and tax obligations.
                                    </p>
                                    <p>
                                        When personal information is no longer needed, we take reasonable steps to securely delete or anonymize it.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>California Privacy Rights</h2>
                                    <p>
                                        If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), subject to certain exceptions. These rights may include:
                                    </p>
                                    <ul className="privacy-list">
                                        <li>The right to know what personal information we collect, use, and disclose</li>
                                        <li>The right to access your personal information</li>
                                        <li>The right to request deletion of your personal information</li>
                                        <li>The right to correct inaccurate personal information</li>
                                        <li>The right to limit the use or disclosure of sensitive personal information, if applicable</li>
                                        <li>The right to opt out of the sale or sharing of personal information (not applicable, as we do not sell or share personal information)</li>
                                        <li>The right not to be discriminated against for exercising your privacy rights</li>
                                    </ul>
                                    <p>
                                        California residents may also request information under California's Shine the Light law regarding disclosures of personal information for direct marketing purposes.
                                    </p>
                                    <p>
                                        To exercise any of these rights, please contact us using the information below. We may need to verify your identity before processing your request.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>Children's Privacy</h2>
                                    <p>
                                        Highmark Event Rentals does not knowingly collect personal information from children under the age of 16. If we learn that we have collected personal information from a child without appropriate consent, we will promptly delete it.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>Third-Party Websites</h2>
                                    <p>
                                        Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those third parties. We encourage you to review their privacy policies independently.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>Data Security</h2>
                                    <p>
                                        We take reasonable administrative, technical, and physical measures to protect personal information from unauthorized access, use, or disclosure. However, no method of transmission or storage can be guaranteed to be completely secure.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>Updates to This Privacy Policy</h2>
                                    <p>
                                        We may update this Privacy Policy from time to time to reflect changes in legal requirements or business practices. Updates will be posted on this page with a revised "Last Updated" date.
                                    </p>
                                </div>

                                <div className="privacy-section contact-section">
                                    <h2>Contact Us</h2>
                                    <p>
                                        If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
                                    </p>
                                    <div className="contact-info-box">
                                        <p className="company-name">Highmark Event Rentals LLC</p>
                                        <p>Danville, California</p>
                                        <p>
                                            <i className="fi flaticon-email"></i>
                                            <a href="mailto:info@highmarkeventrentals.com">info@highmarkeventrentals.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Scrollbar />
        </div>
    );
};

export default PrivacyPolicyPage;

