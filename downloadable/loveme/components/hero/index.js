import React from "react";
import Slider from "react-slick";
import Link from 'next/link'




const Hero = () => {

    var settings = {
        dots: false,
        arrows: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        fade: true
    };

    return (
        <section className="wpo-hero-slider">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <Slider {...settings}>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'images/boris/background.avif'})` }}>
                                <div className="container-fluid">
                                    <div className="slide-content">
                                        <div className="slide-title">
                                            <h2>Highmark</h2>
                                        </div>
                                        <div className="slide-text">
                                            <p>Care and Craft In Every Detail</p>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="slide-btns">
                                            <Link href="/contact" className="theme-btn">Contact Us</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'images/boris/homepageServices/7.jpg'})` }}>
                                <div className="container-fluid">
                                    <div className="slide-content">
                                        <div className="slide-title">
                                            <h2>Highmark</h2>
                                        </div>
                                        <div className="slide-text">
                                            <p>Care and Craft In Every Detail</p>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="slide-btns">
                                            <Link href="/contact" className="theme-btn">Contact Us</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'images/boris/homepageServices/3.jpg'})` }}>
                                <div className="container-fluid">
                                    <div className="slide-content">
                                        <div className="slide-title">
                                            <h2>Highmark</h2>
                                        </div>
                                        <div className="slide-text">
                                            <p>Premium event rentals to elevate your experience.</p>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="slide-btns">
                                            <Link href="/contact" className="theme-btn">Contact Us</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Hero;