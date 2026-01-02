import React from 'react'
import LocationMap from '../Modal'


const Hero7 = (props) => {
    return (
        <section className="static-hero-s3">
            <div className="hero-container">
                <div className="hero-inner">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="wpo-event-item">
                                    <div className="wpo-event-text">
                                        <h2>Sarah & Daniel</h2>
                                        <p>We Are Getting Married Nov 22,2022</p>
                                        <ul>
                                            <li>Monday, 25 Sep, 2022 <br />
                                                1:00 PM – 4:30 PM</li>
                                            <li>Estern Comunity Centure, 525 Road 123, USA</li>
                                            <li>Phone : +12345678910</li>
                                            <li><LocationMap /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero7;