import React from 'react'
import SectionTitleS2 from '../SectionTitleS2'
import { Gallery, Item } from 'react-photoswipe-gallery'


const Portfolios = [
    {
        Pimg: '/images/portfolio/7.jpg',
    },
    {
        Pimg: '/images/portfolio/8.jpg',
    },
    {
        Pimg: '/images/portfolio/9.jpg',
    },
    {
        Pimg: '/images/portfolio/10.jpg',
    },
    {
        Pimg: '/images/portfolio/11.jpg',
    },
    {
        Pimg: '/images/portfolio/12.jpg',
    },
]

const PortfolioSection = (props) => {
    return (
        <section className={`wpo-portfolio-section-s2 section-padding ${props.pSclass}`} id="gallery">
            <div className="container-fluid">
                <SectionTitleS2 MainTitle={'Sweet Moments'} />
                <div className="sortable-gallery">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="portfolio-grids gallery-container clearfix">
                                <Gallery >
                                    {Portfolios.map((portfolio, pitem) => (
                                        <div className="grid" key={pitem}>
                                            <div className="img-holder">
                                                <Item
                                                    original={portfolio.Pimg}
                                                    thumbnail={portfolio.Pimg}
                                                    width="600"
                                                    height="700"
                                                >
                                                    {({ ref, open }) => (
                                                        <img ref={ref} onClick={open} src={portfolio.Pimg} />
                                                    )}
                                                </Item>
                                            </div>
                                        </div>
                                    ))}
                                </Gallery>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PortfolioSection;