import React from 'react';
import Navbar from '../../components/Navbar/index';
import PageTitle from '../../components/pagetitle';
import ServiceSection2 from '../../components/ServiceSection2';
import FunFact from '../../components/FunFact';
import PricingSection from '../../components/PricingSection';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const ServicePage = (props) => {

    return (
        <div>
            <Navbar />
            <PageTitle pageTitle={'Service'} pagesub={'Service'} />
            <ServiceSection2 sSClass={'wpo-service-section-s3'} />
            <FunFact fClass={'wpo-fun-fact-section-s2 section-padding pt-0'} />
            <PricingSection ptClass={'pt-0'} />
            <Footer />
            <Scrollbar />
        </div>
    )
};
export default ServicePage;


