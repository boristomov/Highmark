import React from 'react';
import Navbar from '../../components/Navbar/index';
import PageTitle from '../../components/pagetitle';
import ProjectSection from '../../components/ProjectSection';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const PortfolioMashonaryS2Page = (props) => {

    return (
        <div>
            <Navbar/>
            <PageTitle pageTitle={'Portfolio Masonry'} pagesub={'Portfolio'}/> 
            <ProjectSection prClass={'pt-120'}/>
            <Footer/>
            <Scrollbar/>
        </div>
    )
};
export default PortfolioMashonaryS2Page;


