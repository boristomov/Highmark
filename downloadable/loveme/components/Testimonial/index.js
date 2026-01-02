import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import test1 from '/public/images/testimonial/img-1.jpg'
import test2 from '/public/images/testimonial/img-2.jpg'
import test3 from '/public/images/testimonial/img-3.jpg'

import tsImg1 from '/public/images/testimonial/l-img.jpg'
import tsImg2 from '/public/images/testimonial/shape.png'
import tsImg3 from '/public/images/testimonial/shape2.png'




const Testimonials = [
    {
        tstImg: test1,
        name: 'Jenefer Marvella',
        date: '12/12/19',
        descriptoion: 'This is not only a wedding planning agency but also a dreamy friend. I am very glad to work with them.They make my dream come true. In my wedding I found them as my best friends.',
    },
    {
        tstImg: test2,
        name: 'Jenefer Marvella',
        date: '12/12/19',
        descriptoion: 'This is not only a wedding planning agency but also a dreamy friend. I am very glad to work with them.They make my dream come true. In my wedding I found them as my best friends.',
    },
    {
        tstImg: test3,
        name: 'Aliza Anney',
        date: '12/12/19',
        descriptoion: 'This is not only a wedding planning agency but also a dreamy friend. I am very glad to work with them.They make my dream come true. In my wedding I found them as my best friends.',
    },
]



const Testimonial = () => {
    var settings = {
        dots: true,
        arrows: false,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    };

    return (
        <section className="wpo-testimonials-section section-padding">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-12">
                        <div className="wpo-testimonials-img">
                            <Image src={tsImg1} alt="" />
                            <div className="wpo-testimonials-img-shape">
                                <Image src={tsImg2} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 offset-lg-1 col-12">
                        <div className="wpo-testimonials-wrap">
                            <h2>What Our Client Say</h2>
                            <div className="wpo-testimonials-active owl-carousel">
                                <Slider {...settings}>
                                    {Testimonials.map((tstml, tsm) => (
                                        <div className="wpo-testimonials-item" key={tsm}>
                                            <p>{tstml.descriptoion}</p>
                                            <div className="wpo-testimonial-info">
                                                <div className="wpo-testimonial-info-img">
                                                    <Image src={tstml.tstImg} alt="" />
                                                </div>
                                                <div className="wpo-testimonial-info-text">
                                                    <h5>{tstml.name}</h5>
                                                    <span>Wedding {tstml.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wpo-testimonials-shape">
                <Image src={tsImg3} alt="" />
            </div>
        </section>
    )
}

export default Testimonial;