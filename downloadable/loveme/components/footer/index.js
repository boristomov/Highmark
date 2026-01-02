import React from 'react'
import Link from 'next/link'
import Projects from '../../api/projects'

const Footer = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <footer className="wpo-site-footer">
            <div className="wpo-upper-footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                            <div className="widget about-widget">
                                <div className="logo widget-title">
                                    <img src="/images/boris/HighmarkLogo.PNG" alt="logo" style={{ maxWidth: 220, height: 'auto' }} />
                                </div>
                                <p>Welcome to Highmark Rentals — quality event rentals across the Bay Area.</p>
                                <ul>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-facebook"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-twitter-alt"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-instagram"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-google"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
                            <div className="widget link-widget">
                                <div className="widget-title">
                                    <h3>Information</h3>
                                </div>
                                <ul>
                                    <li><Link onClick={ClickHandler} href="/about">About Us</Link></li>
                                    <li><Link onClick={ClickHandler} href="/portfolio-grid">Inspiration</Link></li>
                                    <li><Link onClick={ClickHandler} href="/contact">Contact us</Link></li>
                                    <li><Link onClick={ClickHandler} href="/shop">Shop</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
                            <div className="widget wpo-service-link-widget">
                                <div className="widget-title">
                                    <h3>Contact </h3>
                                </div>
                                <div className="contact-ft">
                                    <p>Questions? Please feel free to contact us.</p>
                                    <ul>
                                        <li><i className="fi flaticon-email"></i>highmarkrentals@gmail.com</li>
                                        <li><i className="fi flaticon-phone-call"></i>+888 (123) 869523</li>
                                        <li><i className="fi flaticon-maps-and-flags"></i>123 Market St, San Jose, CA
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
                            <div className="widget instagram">
                                <div className="widget-title">
                                    <h3>Instagram</h3>
                                </div>
                                <ul className="d-flex">
                                    {Projects.slice(0, 6).map((project, pitem) => (
                                        <li key={pitem}><img src={project.pimg1} alt="" /></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="wpo-lower-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <p className="copyright"> &copy; 2022 Loveme Template. Design By <Link onClick={ClickHandler} href="/">wpOceans</Link>. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div> */}
        </footer>
    )
}

export default Footer;