import React from 'react';
import Navbar from '../../components/Navbar/index';
import PageTitle from '../../components/pagetitle';
import CoupleSection from '../../components/CoupleSection';
import TimeCountDown from '../../components/countdown';
import CtaSection2 from '../../components/CtaSection2';
import EventSection from '../../components/EventSection';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const AccomodationPage = (props) => {

    return (
        <div>
            <Navbar/>
            <PageTitle pageTitle={'Accomodation'} pagesub={'Accomodation'}/> 
            <TimeCountDown dateClass={'pt-120'}/>
            <CoupleSection cClass={'pt-160'}/>
            <CtaSection2/>
            <EventSection/>
            <Footer/>
            <Scrollbar/>
        </div>
    )
};
export default AccomodationPage;


