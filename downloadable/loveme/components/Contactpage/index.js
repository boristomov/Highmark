import React from 'react';
import RSVP from '../RSVP'
import Reveal from '../Reveal'


const Contactpage = () => {

    return (
        <section className="wpo-contact-pg-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-10 offset-lg-1">
                        <Reveal variant="fade-up" delay={60} className="office-info">
                            <div className="row align-items-stretch">
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12 d-flex">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <i className="ti-sharethis"></i>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>Social Media</h2>
                                            <div className="social-icons-contact">
                                                <a href="https://www.instagram.com/highmarkeventrentals/" target="_blank" rel="noopener noreferrer" title="Instagram">
                                                    <i className="ti-instagram"></i>
                                                </a>
                                                <a href="https://www.linkedin.com/company/highmarkeventrentals/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                                    <i className="ti-linkedin"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12 d-flex">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-email"></i>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>Email Us</h2>
                                            <p>info@highmarkeventrentals.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12 d-flex">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-phone-call"></i>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>Call Now</h2>
                                            <p>+1 925 856 5618</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                        <RSVP />
                    </div>
                </div>
            </div>
            <section className="wpo-contact-map-section">
                <div className="wpo-contact-map">
                    <iframe src="https://www.google.com/maps?q=Danville,+CA&center=37.8216,-121.9999&z=13&output=embed" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>
        </section>
    )

}

export default Contactpage;
