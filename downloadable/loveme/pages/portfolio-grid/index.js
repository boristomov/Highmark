import React from 'react';
import Navbar from '../../components/Navbar/index';
import PageTitle from '../../components/pagetitle';
import ProjectSection from '../../components/ProjectSection';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const PortfolioGridPage = (props) => {

    return (
        <div className="inspiration-page">
            <Navbar alwaysWhite withOffsetBand />
            <PageTitle pageTitle={'Our Inspiration'} pagesub={'Inspiration'} />
            <ProjectSection prClass={'pt-120'} />
            <Footer />
            <Scrollbar />
        </div>
    )
};
export default PortfolioGridPage;


