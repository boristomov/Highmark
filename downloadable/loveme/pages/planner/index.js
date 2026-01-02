import React from 'react';
import Navbar from '../../components/Navbar/index';
import PageTitle from '../../components/pagetitle';
import TeamSection from '../../components/team';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'

const PlannerPage = (props) => {

    return (
        <div>
            <Navbar/>
            <PageTitle pageTitle={'Our Planners'} pagesub={'Planners'}/> 
            <TeamSection/>
            <Footer/>
            <Scrollbar/>
        </div>
    )
};
export default PlannerPage;


