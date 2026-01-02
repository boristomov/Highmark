import React from 'react'
import SectionTitleS2 from '../SectionTitleS2'
import { Gallery, Item } from 'react-photoswipe-gallery'


const Portfolios = [
    {
        Pimg: '/images/portfolio/13.jpg',
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
        Pimg: '/images/portfolio/14.jpg',
    },
]

const PortfolioSection2 = (props) => {
    return (
        <section className={`wpo-portfolio-section-s3 section-padding ${props.pClass}`} id="gallery">
            <div className="container">
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

export default PortfolioSection2;