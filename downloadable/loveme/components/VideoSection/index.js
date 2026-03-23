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
                        <Image
                            src={marJennyPic}
                            alt="Marc and Jenny, founders of Highmark Event Rentals"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoSection;