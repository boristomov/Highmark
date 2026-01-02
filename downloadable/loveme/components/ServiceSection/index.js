import React from "react";
import Slider from "react-slick";
import Link from 'next/link'
import Image from "next/image";


const ServiceSection = (props) => {

    var settings = {
        dots: false,
        arrows: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    // Home page carousel should act like category shortcuts into the shop
    const categories = [
        {
            id: 'tent',
            title: 'Tents',
            image: '/images/boris/homepageServices/tent2.jpg',
            fIcon1: 'flaticon-edit',
        },
        {
            id: 'chair',
            title: 'Chairs',
            image: '/images/boris/homepageServices/9.jpg',
            fIcon1: 'flaticon-gallery',
        },
        {
            id: 'table',
            title: 'Tables',
            image: '/images/boris/homepageServices/french chairs pics 2.avif',
            fIcon1: 'flaticon-serving-dish',
        },
        {
            // Linens live under "accessories" category in the database for now
            id: 'accessories',
            title: 'Linens',
            image: '/images/boris/homepageServices/4.jpg',
            fIcon1: 'flaticon-wedding',
        },
    ];

    return (

        <section className={`wpo-service-section ${props.pbClass}`}>
            <div className="container-fluid">
                <div className="wpo-section-title">
                    <span>What We Offer</span>
                    <h2>Our Collections</h2>
                    <div className="section-title-img">
                        <span className="section-title-initials">HM</span>
                    </div>
                </div>
                <div className="wpo-service-active owl-carousel">
                    <Slider {...settings}>
                        {categories.map((category, sitem) => (
                            <div className="wpo-service-item" key={sitem}>
                                <div className="wpo-service-img">
                                    <Image src={category.image} alt={category.title} width={1200} height={800} />
                                    <div className="wpo-service-text">
                                        <div className="s-icon">
                                            <i className={`fi  ${category.fIcon1}`}></i>
                                        </div>
                                        <Link onClick={ClickHandler} href={`/shop?category=${category.id}`}>{category.title}</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default ServiceSection;