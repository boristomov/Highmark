import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import abimg from '/public/images/boris/IMG_1631.jpeg'
import apartImg from '/public/images/boris/iStock-2166246204.jpg'
import serveImg from '/public/images/boris/iStock-1137980721.jpg'
import { withBasePath } from '../../utils/basePath'
import Reveal from '../Reveal'

const About2 = (props) => {

    return (
        <section className="wpo-about-section-modern section-padding">
            <div className="container">
                <div className="about-modern-wrapper">
                    <Reveal variant="fade-up" delay={60} as="article" className="about-content-block">
                        <div className="about-section-heading">
                            <h2>Our Story</h2>
                            <img src={withBasePath('/images/boris/highmark-h-logo.png')} alt="Highmark" className="about-sep-h-logo" />
                        </div>
                        <div className="about-image-modern">
                            <div className="about-image-frame">
                                <Image src={abimg} alt="Marc and Jenny, founders of Highmark Event Rentals" />
                            </div>
                        </div>
                        <div className="about-text-modern">
                            <div className="about-card">
                                <div className="about-story">
                                    <p className="about-intro">
                                        Highmark Event Rentals is a family-run event and party rental company built on care, trust, and a commitment to doing things right. With nearly two decades of experience in the events industry, we bring a deep understanding of what it takes to deliver events that feel seamless, organized, and well executed.
                                    </p>
                                    <p className="about-intro">
                                        Marc&apos;s background in managing venues and coordinating events of all sizes has shaped a detail-driven approach focused on reliability and execution. Jenny&apos;s experience in healthcare brings a natural sense of care and attentiveness that influences every interaction and every event we support.
                                    </p>
                                    <p className="about-intro">
                                        Together, we&apos;ve built Highmark on a simple belief: quality rentals and reliable service make all the difference. From clear communication to on-time delivery, every part of the process is designed to be smooth, efficient, and easy to trust.
                                    </p>
                                    <p className="about-intro">
                                        Whether it&apos;s a small gathering or a large event, our goal is to help bring your vision to life while making the experience straightforward and stress free.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal variant="fade-up" delay={60} as="article" className="about-content-block">
                        <div className="about-section-heading">
                            <h2>What Sets Highmark Apart</h2>
                            <img src={withBasePath('/images/boris/highmark-h-logo.png')} alt="Highmark" className="about-sep-h-logo" />
                        </div>
                        <div className="about-image-modern about-image-modern--wide">
                            <div className="about-image-frame">
                                <Image src={apartImg} alt="Outdoor event tables, chairs, and linens arranged for a celebration" />
                            </div>
                        </div>
                        <div className="about-text-modern">
                            <div className="about-card">
                                <div className="about-story">
                                    <p className="about-intro">
                                        At Highmark, we specialize in a comprehensive range of event and party rentals, including tables, chairs, linens, tents, and essential event equipment for weddings, corporate events, private parties, and celebrations across the Bay Area and beyond. Our focus is simple. We provide quality event rentals with reliable delivery and a seamless experience every step of the way.
                                    </p>
                                    <p className="about-intro">
                                        We prioritize clear communication, competitive and transparent pricing, and dependable service so you know exactly what to expect. Whether you are planning a backyard gathering, birthday party, bridal shower, or a large-scale event, we make it easy to find what you need and feel confident in your setup.
                                    </p>
                                    <p className="about-intro">
                                        Our curated and continuously growing inventory balances quality, functionality, and modern design, making it easy to create an event that feels intentional and well put together.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal variant="fade-up" delay={60} as="article" className="about-content-block about-content-block--last">
                        <div className="about-section-heading">
                            <h2>Where We Serve</h2>
                            <img src={withBasePath('/images/boris/highmark-h-logo.png')} alt="Highmark" className="about-sep-h-logo" />
                        </div>
                        <div className="about-image-modern about-image-modern--wide">
                            <div className="about-image-frame">
                                <Image src={serveImg} alt="Golden Gate Bridge and the San Francisco Bay Area" />
                            </div>
                        </div>
                        <div className="about-text-modern">
                            <div className="about-card">
                                <div className="about-story">
                                    <p className="about-intro">
                                        We proudly serve the San Francisco Bay Area, including San Francisco, the East Bay, Peninsula, South Bay, and North Bay, as well as Napa Valley and Sonoma County.
                                    </p>
                                    <p className="about-intro">
                                        Based in Danville, CA, we are rooted in the Tri-Valley region, encompassing Danville, San Ramon, Alamo, Blackhawk, Dublin, Pleasanton, and Livermore, with extended service as far as the Monterey Peninsula.
                                    </p>
                                    <p className="about-intro about-cta-line">
                                        <Link href="/contact">Get a Quote</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

export default About2;