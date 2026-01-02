import React from 'react'
import Image from 'next/image'
import abimg from '/public/images/boris/IMG_1631.jpeg'

const About2 = (props) => {

    return (
        <section className="wpo-about-section-modern section-padding">
            <div className="container">
                <div className="about-modern-wrapper">
                    {/* Main Content */}
                    {/* Image first - full width, landscape */}
                    <div className="row about-content-row">
                        <div className="col-12">
                            <div className="about-image-modern">
                                <div className="about-image-frame">
                                    <Image src={abimg} alt="Highmark Event Rentals" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text block below, wide landscape card */}
                    <div className="row">
                        <div className="col-12">
                            <div className="about-text-modern">
                                <div className="about-card">
                                    <div className="about-story">
                                        <p className="about-intro">
                                            Highmark Event Rentals is a small, family-run business built on care and trust,
                                            guided by a passion for craft and attention to every detail. With over a dozen
                                            years in the events industry, Marc brings deep experience managing venues and
                                            coordinating events of all sizes, always focused on ensuring every detail comes
                                            together seamlessly. His greatest reward is seeing clients' visions come to life.
                                        </p>
                                        <p className="about-story-p">
                                            Jenny's career in healthcare reflects her natural dedication to caring for others,
                                            a quality that shapes everything we do. Together, we've built Highmark on the simple
                                            belief that exceptional events start with genuine care and reliable service.
                                        </p>
                                        <p className="about-story-p">
                                            From quality rentals to attentive communication, we take pride in making every
                                            experience smooth, stress-free, and memorable.
                                        </p>
                                    </div>
                                    <div className="about-sep">
                                        <span className="about-sep-initials">HM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tagline */}
                    <div className="row">
                        <div className="col-12">
                            <div className="about-tagline">
                                <h2 className="tagline-text">Highmark. Care and Craft in Every Detail.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About2;