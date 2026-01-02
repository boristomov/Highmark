import React from 'react';
import Navbar from '../../components/Navbar/index';
import PageTitle from '../../components/pagetitle';
import RSVP from '../../components/RSVP';
import EventSection from '../../components/EventSection';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const RsvpPage = (props) => {

    return (
        <div>
            <Navbar/>
            <PageTitle pageTitle={'RSVP'} pagesub={'RSVP'}/> 
            <RSVP/>
            <EventSection eClass={'pt-0'}/>
            <Footer/>
            <Scrollbar/>
        </div>
    )
};
export default RsvpPage;


