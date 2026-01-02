import React, { Component } from "react";
import { connect } from "react-redux";
import MobileMenu2 from "../../components/MobileMenu2";
import { removeFromCart } from "../../store/actions/action";
import { Link } from 'react-scroll'
import NavLink from 'next/link'


class Header2 extends Component {
  state = {
    isSearchShow: false,
    isCartShow: false,
  }

  searchHandler = () => {
    this.setState({
      isSearchShow: !this.state.isSearchShow
    })
  }
  cartHandler = () => {
    this.setState({
      isCartShow: !this.state.isCartShow
    })
  }

  render() {
    const { isSearchShow, isCartShow } = this.state;

    const SubmitHandler = (e) => {
      e.preventDefault()
    }

    const ClickHandler = () => {
      window.scrollTo(10, 0);
    }

    const { carts } = this.props;

    let totalPrice = 0;
    if (carts && carts.length > 0) {
      for (let i = 1; i <= carts.length; i++) {
        totalPrice += Number(carts[i - 1].price);
      }
    }

    return (
      <header id="header" className={this.props.topbarNone}>
        <div className={`wpo-site-header ${this.props.hclass}`}>
          <nav className="navigation navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                  <div className="mobail-menu">
                    <MobileMenu2 />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-6">
                  <div className="navbar-header">
                    <NavLink className="navbar-brand" href="/home">
                      <img src='/images/boris/HighmarkLogo.PNG' alt="" />
                    </NavLink>
                  </div>
                </div>
                <div className="col-lg-6 col-md-1 col-1">
                  <div id="navbar" className="collapse navbar-collapse navigation-holder">
                    <button className="menu-close"><i className="ti-close"></i></button>
                    <ul className="nav navbar-nav mb-2 mb-lg-0">
                      <li className="menu-item-has-children">
                        <Link activeClass="active" to="home" spy={true} smooth={true} duration={500} >Home</Link>
                        <ul className="sub-menu">
                          <li><NavLink onClick={ClickHandler} href="/home">Main Home</NavLink></li>
                          <li><NavLink onClick={ClickHandler} href="/home2">Wedding Planner</NavLink></li>
                          <li><NavLink onClick={ClickHandler} href="/home3">Announcement S1</NavLink></li>
                          <li><NavLink onClick={ClickHandler} href="/home4">Announcement S2</NavLink></li>
                          <li><NavLink onClick={ClickHandler} href="/home5">Wedding Home</NavLink></li>
                          <li><NavLink onClick={ClickHandler} href="/home6">Shop Home</NavLink></li>
                          <li><NavLink onClick={ClickHandler} href="/home7">Invitation</NavLink></li>
                        </ul>
                      </li>
                      <li><Link activeClass="active" to="couple" spy={true} smooth={true} duration={500} offset={-100}>Couple</Link></li>
                      <li><Link activeClass="active" to="story" spy={true} smooth={true} duration={500} offset={-50}>Story</Link></li>
                      <li><Link activeClass="active" to="gallery" spy={true} smooth={true} duration={500} offset={-100}>Gallery</Link></li>
                      <li><Link activeClass="active" to="RSVP" spy={true} smooth={true} duration={500} offset={-50}>RSVP</Link></li>
                      <li><Link activeClass="active" to="events" spy={true} smooth={true} duration={500} offset={-50}>Events</Link></li>
                      <li className="menu-item-has-children">
                        <NavLink onClick={ClickHandler} href="/blog">Blog</NavLink>
                        <ul className="sub-menu">
                          <li><NavLink onClick={ClickHandler} href="/blog">Blog right sidebar</NavLink></li>
                          <li><NavLink onClick={ClickHandler} href="/blog-left-sidebar">Blog left sidebar</NavLink></li>
                          <li><NavLink onClick={ClickHandler} href="/blog-fullwidth">Blog fullwidth</NavLink></li>
                          <li className="menu-item-has-children">
                            <NavLink onClick={ClickHandler} href="/">Blog details</NavLink>
                            <ul className="sub-menu">
                              <li><NavLink onClick={ClickHandler} href="/blog-single/1">Blog details right sidebar</NavLink>
                              </li>
                              <li><NavLink onClick={ClickHandler} href="/blog-single-left-sidebar/1">Blog details left
                                sidebar</NavLink></li>
                              <li><NavLink onClick={ClickHandler} href="/blog-single-fullwidth/1">Blog details
                                fullwidth</NavLink></li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>

                  </div>
                </div>
                <div className="col-lg-3 col-md-2 col-2">
                  <div className="header-right">
                    <div className="header-search-form-wrapper">
                      <div className="cart-search-contact">
                        <button onClick={this.searchHandler} className="search-toggle-btn"><i
                          className={`${isSearchShow ? 'ti-close' : 'ti-search'}`}></i></button>
                        <div className={`header-search-form ${isSearchShow ? 'header-search-content-toggle' : ''}`}>
                          <form onSubmit={SubmitHandler}>
                            <div>
                              <input type="text" className="form-control"
                                placeholder="Search here..." />
                              <button type="submit"><i
                                className="fi flaticon-search"></i></button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="mini-cart">
                      <button
                        onClick={this.cartHandler}
                        className="cart-toggle-btn"
                      >
                        {" "}
                        <i className="fi flaticon-shopping-cart"></i>{" "}
                        <span className="cart-count">{carts.length}</span>
                      </button>
                      <div
                        className={`mini-cart-content ${isCartShow ? "mini-cart-content-toggle" : ""
                          }`}
                      >
                        <button
                          onClick={this.cartHandler}
                          className="mini-cart-close"
                        >
                          <i className="ti-close"></i>
                        </button>
                        <div className="mini-cart-items">
                          {carts &&
                            carts.length > 0 &&
                            carts.map((cart, i) => (
                              <div className="mini-cart-item clearfix" key={i}>
                                <div className="mini-cart-item-image">
                                  <img src={cart.proImg} alt="icon" />
                                </div>
                                <div className="mini-cart-item-des">
                                  <p>{cart.title}</p>
                                  <span className="mini-cart-item-price">
                                    ${cart.price}
                                  </span>
                                  <span className="mini-cart-item-quantity">
                                    <button
                                      onClick={() =>
                                        this.props.removeFromCart(cart.id)
                                      }
                                      className="btn btn-sm btn-danger"
                                    >
                                      <i className="ti-close"></i>
                                    </button>{" "} {cart.qty}
                                  </span>
                                </div>
                              </div>
                            ))}

                        </div>
                        <div className="mini-cart-action clearfix">
                          <span className="mini-checkout-price">
                            Total: ${totalPrice}
                          </span>
                          <div className="mini-btn">
                            <NavLink href="/checkout" className="view-cart-btn s1">
                              Checkout
                            </NavLink>
                            <NavLink href="/cart" className="view-cart-btn">
                              View Cart
                            </NavLink>
                          </div>
                        </div>
                        <div className="visible-icon">
                          <img src='/images/love.png' alt="icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
  };
};

export default connect(mapStateToProps, { removeFromCart })(Header2);
