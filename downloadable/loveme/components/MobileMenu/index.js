import React, { Component } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';
import Link from 'next/link';
import Router from 'next/router';

const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/',
    },
    {
        id: 2,
        title: 'About',
        link: '/about',
    },
    {
        id: 3,
        title: 'Shop',
        link: '/shop',
    },
    {
        id: 4,
        title: 'Inspiration',
        link: '/portfolio-grid',
    },
    {
        id: 5,
        title: 'Contact',
        link: '/contact',
    }
]


export default class MobileMenu extends Component {

    state = {
        isMenuShow: false,
        isOpen: 0,
    }

    searchInputRef = React.createRef();

    menuHandler = () => {
        this.setState({
            isMenuShow: !this.state.isMenuShow
        })
    }

    setIsOpen = id => () => {
        this.setState({
            isOpen: id === this.state.isOpen ? 0 : id
        })
    }

    render() {

        const { isMenuShow, isOpen } = this.state;

        const ClickHandler = () => {
            window.scrollTo(10, 0);
        };

        const handleSearchSubmit = (e) => {
            e.preventDefault();
            const term = this.searchInputRef.current?.value?.trim() || "";
            this.menuHandler();
            if (term) {
                Router.push({ pathname: "/shop", query: { search: term } }, undefined, { shallow: false });
            }
            if (this.searchInputRef.current) this.searchInputRef.current.value = "";
        };

        return (
            <div>
                <div className={`mobileMenu ${isMenuShow ? 'show' : ''}`}>
                    <div className="menu-close">
                         <div className="clox" onClick={this.menuHandler}><i className="ti-close"></i></div>
                    </div>

                    <div className="mobile-menu-search">
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                ref={this.searchInputRef}
                                type="text"
                                placeholder="Search shop..."
                                aria-label="Search products"
                            />
                            <button type="submit" aria-label="Search">
                                <i className="ti-search"></i>
                            </button>
                        </form>
                    </div>

                    <ul className="responsivemenu">
                        {menus.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.submenu ? <p onClick={this.setIsOpen(item.id)}>
                                        {item.title}
                                        {item.submenu ? <i className="fa fa-angle-right" aria-hidden="true"></i> : ''}
                                    </p> : <Link onClick={ClickHandler} href={item.link}>{item.title}</Link>}
                                    {item.submenu ?
                                    <Collapse isOpen={item.id === isOpen}>
                                        <Card>
                                            <CardBody>
                                                <ul>
                                                    {item.submenu.map(submenu => (
                                                        <li key={submenu.id}><Link onClick={ClickHandler} className="active" href={submenu.link}>{submenu.title}</Link></li>
                                                    ))}
                                                </ul>
                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                    : ''}
                                </li>
                            )
                        })}
                    </ul>

                </div>

                <div className="showmenu" onClick={this.menuHandler}>
                    <button type="button" className="navbar-toggler open-btn">
                            <span className="icon-bar first-angle"></span>
                            <span className="icon-bar middle-angle"></span>
                            <span className="icon-bar last-angle"></span>
                    </button>
                </div>
            </div>
        )
    }
}
