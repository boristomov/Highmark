import React from 'react';
import Navbar from '../../components/Navbar/index';
import PageTitle from '../../components/pagetitle';
import CoupleSection from '../../components/CoupleSection';
import VideoSection2 from '../../components/VideoSection2';
import PortfolioSection from '../../components/PortfolioSection';
import StorySection from '../../components/StorySection';
import PartnerSection from '../../components/PartnerSection';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const StoryPage = (props) => {

    return (
        <div>
            <Navbar/>
            <PageTitle pageTitle={'Our Story'} pagesub={'Story'}/> 
            <CoupleSection cClass={'pt-160'}/>
            <VideoSection2/>
            <StorySection/>
            <PortfolioSection/>
            <PartnerSection/>
            <Footer/>
            <Scrollbar/>
        </div>
    )
};
export default StoryPage;


