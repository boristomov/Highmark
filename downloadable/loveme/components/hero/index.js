import React from "react";
import Slider from "react-slick";
import Link from 'next/link'
import { withBasePath } from '../../utils/basePath'

const Hero = () => {

    var settings = {
        dots: false,
        arrows: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        fade: true
    };

    return (
        <section className="wpo-hero-slider">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <Slider {...settings}>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-video" style={{ backgroundImage: `url(${withBasePath('/images/boris/background.avif')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="hero-video-bg"
                                    poster={withBasePath('/images/boris/background.avif')}
                                >
                                    <source src={withBasePath('/images/boris/iStock-1455282879.mp4')} type="video/mp4" />
                                </video>
                                <div className="video-overlay"></div>
                                <div className="container-fluid">
                                    <div className="slide-content">
                                        <div className="slide-title slide-title-slogan">
                                            <h2>Care and Craft in Every Detail</h2>
                                        </div>
                                        <div className="hero-separator">
                                            <img src={withBasePath('/images/boris/highmark-h-logo.png')} alt="Highmark" className="hero-h-logo" />
                                        </div>
                                        <div className="slide-btns">
                                            <Link href="/shop" className="theme-btn">Shop Rentals</Link>
                                            <Link href="/contact" className="theme-btn">Let's Connect</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-video" style={{ backgroundImage: `url(${withBasePath('/images/boris/homepageServices/7.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="hero-video-bg"
                                    poster={withBasePath('/images/boris/homepageServices/7.jpg')}
                                >
                                    <source src={withBasePath('/images/boris/iStock-2207627637.mp4')} type="video/mp4" />
                                </video>
                                <div className="video-overlay"></div>
                                <div className="container-fluid">
                                    <div className="slide-content">
                                        <div className="slide-title slide-title-slogan">
                                            <h2>Care and Craft in Every Detail</h2>
                                        </div>
                                        <div className="hero-separator">
                                            <img src={withBasePath('/images/boris/highmark-h-logo.png')} alt="Highmark" className="hero-h-logo" />
                                        </div>
                                        <div className="slide-btns">
                                            <Link href="/shop" className="theme-btn">Shop Rentals</Link>
                                            <Link href="/contact" className="theme-btn">Let's Connect</Link>
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