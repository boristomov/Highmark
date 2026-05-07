import React from 'react';
import styles from './CaliforniaMap.module.scss';
import { withBasePath } from '../../utils/basePath';

const serviceAreas = [
    'San Francisco',
    'East Bay',
    'Peninsula',
    'South Bay',
    'North Bay',
    'Tri-Valley',
    'Napa Valley',
    'Sonoma County',
    'Monterey Peninsula',
];

const CaliforniaMap = () => {
    return (
        <section className={styles.section} aria-label="Serving the Bay Area and beyond">
            <div className={styles.videoFrame}>
                <video
                    className={styles.video}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="auto"
                    poster={withBasePath('/images/boris/iStock-1137980721.jpg')}
                >
                    <source src={withBasePath('/images/boris/serving-bay-area-optimized.mp4')} type="video/mp4" />
                </video>
                <div className={styles.videoOverlay}></div>
                <div className={styles.videoText}>
                    <h2>Serving the Bay Area &amp; Beyond</h2>
                    <img src={withBasePath('/images/boris/highmark-h-logo.png')} alt="Highmark" className="section-title-h-logo" />
                </div>
                <div className={styles.servicePanel} aria-label="Service areas">
                    <p>Delivery, setup, and pick up across:</p>
                    <ul>
                        {serviceAreas.map((area) => (
                            <li key={area}>{area}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default CaliforniaMap;


