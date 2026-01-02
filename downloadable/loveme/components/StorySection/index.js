import Image from 'next/image'
import React from 'react'
import SectionTitleS2 from '../SectionTitleS2'
import sImg1 from '/public/images/portfolio/1.jpg'
import sImg2 from '/public/images/portfolio/2.jpg'
import sImg3 from '/public/images/portfolio/3.jpg'
import sImg4 from '/public/images/portfolio/4.jpg'
import shape from '/public/images/story/shape.png'




const StorySection = (props) => {
    return (
        <section className="story-section section-padding" id="story">
            <div className="container">
                <SectionTitleS2 MainTitle={'Our Love Story'} />
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="story-timeline">
                            <div className="round-shape"></div>
                            <div className="row">
                                <div className="col col-lg-6 col-12">
                                    <div className="story-text right-align-text">
                                        <h3>First time we meet</h3>
                                        <span className="date">Nov 12,2022</span>
                                        <p>I must explain to you how all this mistaken idea of denouing pleasure and praising pain was born and I will give you com acount of system,the actual teach</p>
                                    </div>
                                </div>
                                <div className="col col-lg-6 col-12">
                                    <div className="img-holder">
                                        <Image src={sImg1} alt="" className="img img-responsive" />
                                        <div className="story-shape-img">
                                            <Image src={shape} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-lg-6 col-12">
                                    <div className="img-holder right-align-text left-site">
                                        <Image src={sImg2} alt="" className="img img-responsive" />
                                        <div className="story-shape-img">
                                            <Image src={shape} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-lg-6 col-12 text-holder">
                                    <span className="heart">
                                        <i className="fi flaticon-heart"></i>
                                    </span>
                                    <div className="story-text">
                                        <h3>First Date</h3>
                                        <span className="date">Dec 25,2022</span>
                                        <p>I must explain to you how all this mistaken idea of denouing pleasure and praising pain was born and I will give you com acount of system,the actual teach</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-lg-6 col-12 text-holder right-heart">
                                    <span className="heart">
                                        <i className="fi flaticon-calendar"></i>
                                    </span>
                                    <div className="story-text right-align-text">
                                        <h3>Marriage Proposal</h3>
                                        <span className="date">Nov 12,2022</span>
                                        <p>I must explain to you how all this mistaken idea of denouing pleasure and praising pain was born and I will give you com acount of system,the actual teach</p>
                                    </div>
                                </div>
                                <div className="col col-lg-6 col-12">
                                    <div className="img-holder right-align-text">
                                        <Image src={sImg3} alt="" className="img img-responsive" />
                                        <div className="story-shape-img">
                                            <Image src={shape} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-lg-6 col-12">
                                    <div className="img-holder video-holder left-site">
                                        <Image src={sImg4} alt="" className="img img-responsive" />
                                        <div className="story-shape-img">
                                            <Image src={shape} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-lg-6 col-12 text-holder">
                                    <span className="heart">
                                        <i className="fi flaticon-dove"></i>
                                    </span>
                                    <div className="story-text">
                                        <h3>Our Engagement</h3>
                                        <span className="date">Dec 25,2022</span>
                                        <p>I must explain to you how all this mistaken idea of denouing pleasure and praising pain was born and I will give you com acount of system,the actual teach</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col offset-lg-6 col-lg-6 col-12 text-holder">
                                    <span className="heart">
                                        <i className="fi flaticon-wedding-rings"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StorySection;