import React, { Fragment } from 'react';
import Navbar from '../components/Navbar/index';
import Scrollbar from '../components/scrollbar';
import { connect } from "react-redux";
import Product from '../components/Product/Product';
import { addToCart } from "../store/actions/action";
import api from "../api";
import Hero from '../components/hero';
import PartnerSection from '../components/PartnerSection';
import ServiceSection from '../components/ServiceSection';
import VideoSection from '../components/VideoSection';
import FamilyStory from '../components/FamilyStory';
import FunFact from '../components/FunFact';
import ProjectSection from '../components/ProjectSection';
import Testimonial from '../components/Testimonial';
import CtaSection from '../components/CtaSection';
import PricingSection from '../components/PricingSection';
import BannerSection from '../components/BannerSection';
import CaliforniaMap from '../components/CaliforniaMap';
import RSVP from '../components/RSVP';
// import BlogSection from '../components/BlogSection'; // Commented out - component missing
import Footer from '../components/footer';
import Reveal from '../components/Reveal';


const HomePage = (props) => {

    const productsArray = api();

    const addToCartProduct = (product, qty = 1) => {
        props.addToCart(product, qty);
    };

    const products = productsArray


    return (
        <div>
            <Navbar />
            <Reveal variant="fade-up" delay={80}>
                <Hero />
            </Reveal>
            <Reveal variant="fade-up" delay={120}>
                <CaliforniaMap />
            </Reveal>
            <div className="wpo-box-style">
                {/* <PartnerSection /> */}

                <Reveal variant="fade-up" delay={140}><VideoSection /></Reveal>
                <Reveal variant="fade-up" delay={180}><FamilyStory /></Reveal>
                <Reveal variant="fade-up" delay={220}><ServiceSection /></Reveal>
                {/* <Reveal variant="fade-up" delay={260}><FunFact /></Reveal> */}
                {/* <Reveal variant="fade-up" delay={300}><ProjectSection /></Reveal> */}
                {/* <Testimonial /> */}
                {/* <Reveal variant="fade-up" delay={340}>
                    <Product
                        addToCartProduct={addToCartProduct}
                        products={products}
                    />
                </Reveal> */}
                {/* <CtaSection /> */}
                {/* <PricingSection /> */}
                {/* <BannerSection /> */}
                <Reveal variant="fade-up" delay={380}><RSVP /></Reveal>
                {/* <Reveal variant="fade-up" delay={200}><BlogSection /></Reveal> */}
                <Reveal variant="fade-up" delay={420}><Footer /></Reveal>
            </div>
            <Scrollbar />
        </div>
    )
};
export default connect(null, { addToCart })(HomePage);


