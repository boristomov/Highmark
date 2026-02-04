import React, { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import Link from 'next/link'
import { withBasePath } from '../../utils/basePath'

const Hero = () => {

    const videoRefs = useRef([]);
    const durationsRef = useRef([]);
    const sliderRef = useRef(null);
    const advanceTimerRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = useMemo(() => ({
        dots: false,
        arrows: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: false, // advance when video finishes
        pauseOnHover: false,
        pauseOnFocus: false,
        fade: true,
        beforeChange: (current, next) => {
            clearAdvanceTimer();

            const currentVideo = videoRefs.current[current];
            const nextVideo = videoRefs.current[next];

            // Start next video early so the fade lands on motion, not poster/background.
            if (nextVideo) {
                try {
                    // If we've ever played it, reset to start.
                    // (Avoid seeking on every slide unless needed.)
                    if (nextVideo.currentTime > 0.05) nextVideo.currentTime = 0;
                } catch (_) { }
                try {
                    const p = nextVideo.play();
                    if (p && typeof p.catch === 'function') p.catch(() => { });
                } catch (_) { }
            }

            // Pause current after we've kicked off the next.
            if (currentVideo) {
                try { currentVideo.pause(); } catch (_) { }
            }
        },
        afterChange: (idx) => setActiveSlide(idx),
    }), []);

    const clearAdvanceTimer = () => {
        if (advanceTimerRef.current) {
            clearTimeout(advanceTimerRef.current);
            advanceTimerRef.current = null;
        }
    };

    const scheduleAdvance = (idx) => {
        clearAdvanceTimer();
        const duration = durationsRef.current[idx];
        const ms = Number.isFinite(duration) && duration > 0 ? Math.ceil(duration * 1000) : 6000;
        // buffer a hair so we don’t advance slightly early
        advanceTimerRef.current = setTimeout(() => {
            if (sliderRef.current && typeof sliderRef.current.slickNext === 'function') {
                sliderRef.current.slickNext();
            }
        }, ms + 100);
    };

    const playSlideVideo = (idx) => {
        const v = videoRefs.current[idx];
        if (!v) return;
        try {
            const p = v.play();
            if (p && typeof p.catch === 'function') p.catch(() => { });
        } catch (_) { }
    };

    useEffect(() => {
        // Pause everything except active, then play active and schedule next.
        videoRefs.current.forEach((v, i) => {
            if (!v) return;
            try {
                if (i !== activeSlide) {
                    v.pause();
                    // Keep non-active videos ready at the first frame.
                    if (v.currentTime > 0.05) v.currentTime = 0;
                }
            } catch (_) { }
        });

        playSlideVideo(activeSlide);
        scheduleAdvance(activeSlide);

        return () => clearAdvanceTimer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSlide]);

    return (
        <section className="wpo-hero-slider">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <Slider ref={sliderRef} {...settings}>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-video" style={{ backgroundImage: `url(${withBasePath('/images/boris/background.avif')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <video
                                    muted
                                    loop={false}
                                    playsInline
                                    preload="auto"
                                    className="hero-video-bg"
                                    poster={withBasePath('/images/boris/background.avif')}
                                    ref={(el) => { videoRefs.current[0] = el; }}
                                    onLoadedMetadata={(e) => {
                                        durationsRef.current[0] = e.currentTarget.duration;
                                        if (activeSlide === 0) scheduleAdvance(0);
                                    }}
                                    onEnded={() => sliderRef.current?.slickNext?.()}
                                >
                                    <source src={withBasePath('/images/boris/FirstCarousel.mp4')} type="video/mp4" />
                                </video>
                                <div className="video-overlay"></div>
                                <div className="container-fluid">
                                    <div className="slide-content">
                                        <div className="slide-title slide-title-slogan">
                                            <h2>Care and Craft in Every Detail</h2>
                                        </div>
                                        <div className="hero-separator">
                                            <img src={withBasePath('/images/boris/beige_H.png')} alt="Highmark" className="hero-h-logo" />
                                        </div>
                                        <div className="slide-btns">
                                            <Link href="/shop" className="theme-btn">Shop Rentals</Link>
                                            <Link href="/contact" className="theme-btn">Let's Connect</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-video" style={{ backgroundImage: `url(${withBasePath('/images/boris/homepageServices/7.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <video
                                    muted
                                    loop={false}
                                    playsInline
                                    preload="auto"
                                    className="hero-video-bg"
                                    poster={withBasePath('/images/boris/homepageServices/7.jpg')}
                                    ref={(el) => { videoRefs.current[1] = el; }}
                                    onLoadedMetadata={(e) => {
                                        durationsRef.current[1] = e.currentTarget.duration;
                                        if (activeSlide === 1) scheduleAdvance(1);
                                    }}
                                    onEnded={() => sliderRef.current?.slickNext?.()}
                                >
                                    <source src={withBasePath('/images/boris/iStock-2207627637.mp4')} type="video/mp4" />
                                </video>
                                <div className="video-overlay"></div>
                                <div className="container-fluid">
                                    <div className="slide-content">
                                        <div className="slide-title slide-title-slogan">
                                            <h2>Care and Craft in Every Detail</h2>
                                        </div>
                                        <div className="hero-separator">
                                            <img src={withBasePath('/images/boris/beige_H.png')} alt="Highmark" className="hero-h-logo" />
                                        </div>
                                        <div className="slide-btns">
                                            <Link href="/shop" className="theme-btn">Shop Rentals</Link>
                                            <Link href="/contact" className="theme-btn">Let's Connect</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-video" style={{ backgroundImage: `url(${withBasePath('/images/boris/background.avif')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <video
                                    muted
                                    loop={false}
                                    playsInline
                                    preload="auto"
                                    className="hero-video-bg"
                                    poster={withBasePath('/images/boris/background.avif')}
                                    ref={(el) => { videoRefs.current[2] = el; }}
                                    onLoadedMetadata={(e) => {
                                        durationsRef.current[2] = e.currentTarget.duration;
                                        if (activeSlide === 2) scheduleAdvance(2);
                                    }}
                                    onEnded={() => sliderRef.current?.slickNext?.()}
                                >
                                    <source src={withBasePath('/images/boris/iStock-1455282879.mp4')} type="video/mp4" />
                                </video>
                                <div className="video-overlay"></div>
                                <div className="container-fluid">
                                    <div className="slide-content">
                                        <div className="slide-title slide-title-slogan">
                                            <h2>Care and Craft in Every Detail</h2>
                                        </div>
                                        <div className="hero-separator">
                                            <img src={withBasePath('/images/boris/beige_H.png')} alt="Highmark" className="hero-h-logo" />
                                        </div>
                                        <div className="slide-btns">
                                            <Link href="/shop" className="theme-btn">Shop Rentals</Link>
                                            <Link href="/contact" className="theme-btn">Let's Connect</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Hero;