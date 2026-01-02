import React from 'react';
import Navbar from '../../components/Navbar/index';
import PageTitle from '../../components/pagetitle';
import About2 from '../../components/about2'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const AboutPage = (props) => {

    return (
        <div>
            <Navbar alwaysWhite withOffsetBand />
            <PageTitle pageTitle={'About Us'} pagesub={'About'} />
            <About2 />
            <Footer />
            <Scrollbar />
        </div>
    )
};
export default AboutPage;


