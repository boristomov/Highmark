import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import heros1 from '/public/images/slider/shape3.png'
import heros2 from '/public/images/slider/shape4.png'


const Hero3 = () => {

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
        <section className="wpo-hero-slider wpo-hero-slider-s2">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <Slider {...settings}>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'/images/slider/slide-4.jpg'})` }}>
                                <div className="container-fluid">
                                    <div className="slide-content">
                                        <div className="slide-title">
                                            <h2>Sarah & Daniel</h2>
                                        </div>
                                        <div className="slide-text">
                                            <p>We Are Getting Married Nov 22,2022</p>
                                        </div>
                                        <div className="border-1"></div>
                                        <div className="border-2"></div>
                                        <div className="border-3"></div>
                                        <div className="border-4"></div>
                                        <div className="s-img-1"><Image src={heros1} alt="" /></div>
                                        <div className="s-img-2"><Image src={heros2} alt="" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'/images/slider/slide-5.jpg'})` }}>
                                <div className="container-fluid">
                                    <div className="slide-content">
                                        <div className="slide-title">
                                            <h2>Sarah & Daniel</h2>
                                        </div>
                                        <div className="slide-text">
                                            <p>We Are Getting Married Nov 22,2022</p>
                                        </div>
                                        <div className="border-1"></div>
                                        <div className="border-2"></div>
                                        <div className="border-3"></div>
                                        <div className="border-4"></div>
                                        <div className="s-img-1"><Image src={heros1} alt="" /></div>
                                        <div className="s-img-2"><Image src={heros2} alt="" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'/images/slider/slide-6.jpg'})` }}>
                                <div className="container-fluid">
                                    <div className="slide-content">
                                        <div className="slide-title">
                                            <h2>Sarah & Daniel</h2>
                                        </div>
                                        <div className="slide-text">
                                            <p>We Are Getting Married Nov 22,2022</p>
                                        </div>
                                        <div className="border-1"></div>
                                        <div className="border-2"></div>
                                        <div className="border-3"></div>
                                        <div className="border-4"></div>
                                        <div className="s-img-1"><Image src={heros1} alt="" /></div>
                                        <div className="s-img-2"><Image src={heros2} alt="" /></div>
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

export default Hero3;