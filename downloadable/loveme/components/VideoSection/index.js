import React from 'react'
import { useRouter } from 'next/router'

/** Path under `public/` (leading slash). Prefix with router.basePath so URLs match Next dev + static export + GitHub Pages. */
const MARC_JENNY_PHOTO = '/images/boris/marc-jenny-homepage-pic.jpeg'
const H_LOGO = '/images/boris/highmark-h-logo.png'

const VideoSection = (props) => {
    const { basePath = '' } = useRouter()
    const asset = (path) => `${basePath}${path}`

    return (
        <section className="wpo-video-section wpo-video-section--light section-padding">
            <div className="container">
                <div className="row">
                    <div className="wpo-section-title">
                        <h2>We Are Highmark</h2>
                        <div className="section-title-img">
                            <img src={asset(H_LOGO)} alt="Highmark" className="section-title-h-logo" />
                        </div>
                    </div>
                </div>
                <div className="wpo-video-item">
                    <div className="wpo-video-img wpo-video-img--portrait">
                        {/* Native img fills aspect-ratio box cleanly (no Next/Image fill wrapper bezel) */}
                        <div className="who-we-are-photo-frame">
                            <img
                                src={asset(MARC_JENNY_PHOTO)}
                                alt="Marc and Jenny, founders of Highmark Event Rentals"
                                className="who-we-are-photo-img"
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