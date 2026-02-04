import React from 'react'
import vimg from '../../public/images/boris/IMG_1631.jpeg'
import Image from 'next/image'
import { withBasePath } from '../../utils/basePath'

const VideoSection = (props) => {
    return (
        <section className="wpo-video-section section-padding">
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
                    <div className="wpo-video-img">
                        <Image src={vimg} alt="Highmark Event Rentals" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoSection;