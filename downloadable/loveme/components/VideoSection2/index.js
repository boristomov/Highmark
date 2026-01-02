import Image from 'next/image'
import React from 'react'
import VideoModal from '../ModalVideo'
import vimg from '/public/images/cta2.jpg'

const VideoSection2 = (props) => {
    return(
        <section className="wpo-video-section-s2">
            <div className="wpo-video-item">
                <div className="wpo-video-img">
                    <Image src={vimg} alt=""/>
                    <VideoModal/>
                </div>
            </div>
        </section>
    )
}

export default VideoSection2;