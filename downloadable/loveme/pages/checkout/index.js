import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import { connect } from "react-redux";
import Scrollbar from '../../components/scrollbar';
import CheckoutSection from '../../components/CheckoutSection';

const submitHandler = (e) => {
    e.preventDefault()
}


const CheckoutPage =({cartList}) => {



    return (
        <Fragment>
            <Navbar />
            <PageTitle pageTitle='Checkout' pagesub="Checkout" />
            <CheckoutSection cartList={cartList}/>
            <Footer />
            <Scrollbar/>
        </Fragment>
    )
};


const mapStateToProps = state => {
    return {
        cartList: state.cartList.cart,
        symbol: state.data.symbol
    }
};

export default connect(mapStateToProps)(CheckoutPage);

