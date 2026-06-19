import React from 'react'
// Bundled URL picks up Next basePath/assetPrefix on export (public/ path alone can 404 on GitHub Pages).
import marJennyPic from '../../public/images/boris/IMG_1631.jpeg'

const couplePhotoSrc =
    typeof marJennyPic === 'object' && marJennyPic?.src != null ? marJennyPic.src : marJennyPic

const VideoSection = (props) => {
    return (
        <section className="wpo-video-section wpo-video-section--light section-padding">
            <div className="container">
                <div className="row">
                    <div className="wpo-section-title">
                        <h2>We Are Highmark</h2>
                    </div>
                </div>
                <div className="wpo-video-item">
                    <div className="wpo-video-img wpo-video-img--portrait">
                        {/* Native img fills aspect-ratio box cleanly (no Next/Image fill wrapper bezel) */}
                        <div className="who-we-are-photo-frame">
                            <img
                                src={couplePhotoSrc}
                                alt="Marc and Jenny, founders of Highmark Event Rentals"
                                className="who-we-are-photo-img"
                                width={typeof marJennyPic === 'object' ? marJennyPic.width : undefined}
                                height={typeof marJennyPic === 'object' ? marJennyPic.height : undefined}
                                decoding="async"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoSection;