import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import vimg from '../../public/images/boris/IMG_1631.jpeg'
import Image from 'next/image'

const VideoSection = (props) => {
    return (
        <section className="wpo-video-section section-padding">
            <div className="container">
                <SectionTitle topTitle={'Rentals For Any Occassion'} MainTitle={'Celebrating Your Special Day'} />
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