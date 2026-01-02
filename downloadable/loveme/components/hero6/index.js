import React from "react";
import Slider from "react-slick";
import Link from "next/link";




const Hero6 = () => {

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
        <section className="wpo-hero-slider wpo-hero-slider-s3">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <Slider {...settings}>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'/images/boris/homepageServices/3.jpg'})` }}>
                                <div className="container">
                                    <div className="slide-content">
                                        <div className="slide-title">
                                            <h2>Gorgeous Gowns</h2>
                                        </div>
                                        <div className="slide-text">
                                            <p>The Most Wonderful Wedding Dress And Jewellery In The World.</p>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="slide-btns">
                                            <Link href="/shop" className="theme-btn-s4">Shop Now</Link>
                                        </div>
                                        <div className="site-border"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'/images/boris/homepageServices/6.jpg'})` }}>
                                <div className="container">
                                    <div className="slide-content">
                                        <div className="slide-title">
                                            <h2>Gorgeous Gowns</h2>
                                        </div>
                                        <div className="slide-text">
                                            <p>The Most Wonderful Wedding Dress And Jewellery In The World.</p>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="slide-btns">
                                            <Link href="/shop" className="theme-btn-s4">Shop Now</Link>
                                        </div>
                                        <div className="site-border"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'/images/boris/homepageServices/9.jpg'})` }}>
                                <div className="container">
                                    <div className="slide-content">
                                        <div className="slide-title">
                                            <h2>Gorgeous Gowns</h2>
                                        </div>
                                        <div className="slide-text">
                                            <p>The Most Wonderful Wedding Dress And Jewellery In The World.</p>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="slide-btns">
                                            <Link href="/shop" className="theme-btn-s4">Shop Now</Link>
                                        </div>
                                        <div className="site-border"></div>
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

export default Hero6;