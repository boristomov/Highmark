import React from 'react'
import marJennyPic from '../../public/images/boris/marc-jenny-homepage-pic.jpeg'
import Image from 'next/image'
import { withBasePath } from '../../utils/basePath'

const VideoSection = (props) => {
    return (
        <section className="wpo-video-section wpo-video-section--light section-padding">
            <div className="container">
                <div className="row">
                    <div className="wpo-section-title">
                        <h2>We Are Highmark</h2>
                        <div className="section-title-img">
                            <img src={withBasePath('/images/boris/highmark-h-logo.png')} alt="Highmark" className="section-title-h-logo" />
                        </div>
                    </div>
                </div>
                <div className="wpo-video-item">
                    <div className="wpo-video-img wpo-video-img--portrait">
                        {/* Fixed aspect + explicit box avoids vh jump when mobile chrome shows/hides */}
                        <div className="who-we-are-photo-frame">
                            <Image
                                src={marJennyPic}
                                alt="Marc and Jenny, founders of Highmark Event Rentals"
                                fill
                                sizes="(max-width: 576px) 94vw, (max-width: 992px) 75vw, 520px"
                                className="who-we-are-photo-img"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoSection;