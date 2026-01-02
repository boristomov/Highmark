import React from 'react';
import Navbar from '../../components/Navbar/index';
import PageTitle from '../../components/pagetitle';
import Contactpage from '../../components/Contactpage'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const GalleryPage = (props) => {

    return (
        <div>
            <Navbar alwaysWhite withOffsetBand />
            <PageTitle pageTitle={'Contact Us'} pagesub={'Contact'} />
            <Contactpage />
            <Footer />
            <Scrollbar />
        </div>
    )
};
export default GalleryPage;


