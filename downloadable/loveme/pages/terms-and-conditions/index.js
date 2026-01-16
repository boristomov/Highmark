import React from 'react';
import Navbar from '../../components/Navbar/index';
import PageTitle from '../../components/pagetitle';
import Footer from '../../components/footer';
import Scrollbar from '../../components/scrollbar';

const TermsAndConditionsPage = () => {
    return (
        <div>
            <Navbar alwaysWhite withOffsetBand />
            <PageTitle pageTitle={'Terms & Conditions'} pagesub={'Terms & Conditions'} />
            <section className="privacy-policy-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="privacy-content">
                                <div className="privacy-header">
                                    <p className="last-updated">Last Updated: January 15, 2026</p>
                                    <p className="intro-text highlight">
                                        By placing an order or reserving rental items with Highmark Event Rentals LLC ("Highmark," "we," or "us"), you ("Client") agree to the following terms.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>Reservations & Payments</h2>
                                    <ul className="privacy-list">
                                        <li>A non-refundable reservation deposit is required to secure your rental items.</li>
                                        <li>Full payment is due before delivery or pickup, unless otherwise agreed to in writing.</li>
                                        <li>Reservations are not confirmed until payment is received.</li>
                                    </ul>
                                </div>

                                <div className="privacy-section">
                                    <h2>Cancellations & Changes</h2>
                                    <ul className="privacy-list">
                                        <li>Cancellations or order reductions made within our cancellation window are non-refundable.</li>
                                        <li>Changes requested outside the cancellation window may be accommodated based on availability and at Highmark's discretion.</li>
                                        <li>Deposits are non-refundable once items are reserved.</li>
                                    </ul>
                                </div>

                                <div className="privacy-section">
                                    <h2>Rental Period</h2>
                                    <ul className="privacy-list">
                                        <li>The rental period begins when items are delivered or picked up and ends when they are returned or retrieved by Highmark.</li>
                                        <li>Rental items may not be relocated without prior approval.</li>
                                    </ul>
                                </div>

                                <div className="privacy-section">
                                    <h2>Responsibility for Rental Items</h2>
                                    <ul className="privacy-list">
                                        <li>Client is responsible for all rented items during the rental period.</li>
                                        <li>Client will be charged for loss, theft, or damage beyond normal wear and tear, including full replacement cost if necessary.</li>
                                    </ul>
                                </div>

                                <div className="privacy-section">
                                    <h2>Care & Protection</h2>
                                    <ul className="privacy-list">
                                        <li>All items must be used properly and protected from weather, moisture, fire, excessive heat, and misuse.</li>
                                        <li>Equipment must remain covered and secured at all times.</li>
                                        <li>Damage caused by improper protection will be billed to the Client.</li>
                                    </ul>
                                </div>

                                <div className="privacy-section">
                                    <h2>Weather Policy</h2>
                                    <ul className="privacy-list">
                                        <li>Weather is not grounds for cancellation or refund.</li>
                                        <li>Client assumes responsibility for protecting rental items regardless of weather conditions.</li>
                                    </ul>
                                </div>

                                <div className="privacy-section">
                                    <h2>Liability & Assumption of Risk</h2>
                                    <ul className="privacy-list">
                                        <li>Client assumes all risks associated with the use of rented items.</li>
                                        <li>Highmark is not responsible for injuries or damages resulting from use or misuse of rental equipment, to the extent permitted by law.</li>
                                    </ul>
                                </div>

                                <div className="privacy-section">
                                    <h2>Indemnification</h2>
                                    <p>
                                        Client agrees to indemnify and hold Highmark harmless from any claims, damages, or expenses arising from the rental or use of equipment.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>Substitutions</h2>
                                    <p>
                                        Highmark may substitute comparable items of equal or greater value if necessary due to availability or unforeseen circumstances.
                                    </p>
                                </div>

                                <div className="privacy-section">
                                    <h2>Access & Site Conditions</h2>
                                    <ul className="privacy-list">
                                        <li>Client is responsible for ensuring safe and timely access for delivery and pickup.</li>
                                        <li>Additional labor fees will apply for difficult access, stairs, long carries, delays, or unsafe conditions.</li>
                                    </ul>
                                </div>

                                <div className="privacy-section">
                                    <h2>Governing Law</h2>
                                    <p>
                                        These terms are governed by the laws of the State of California.
                                    </p>
                                </div>

                                <div className="privacy-section contact-section">
                                    <h2>Contact Us</h2>
                                    <p>
                                        If you have questions about these Terms & Conditions, please contact us:
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

export default TermsAndConditionsPage;

