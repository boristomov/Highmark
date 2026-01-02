import React, { useEffect, useMemo, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import styles from './CaliforniaMap.module.scss';

const TOPO_COUNTIES_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';
const CALIFORNIA_PREFIX = '06';
const NAPA_ID = '06055';
const SONOMA_ID = '06097';
const BAY_AREA_COUNTY_IDS = [
    '06001', // Alameda
    '06013', // Contra Costa
    '06041', // Marin
    '06055', // Napa
    '06075', // San Francisco
    '06081', // San Mateo
    '06085', // Santa Clara
    '06095', // Solano
    '06097', // Sonoma
];

const REGION_META = {
    bay: {
        title: 'BAY AREA',
        desc: 'We serve San Francisco, East Bay, Peninsula, and South Bay with delivery and installation for modern event furnishings.'
    },
    napa: {
        title: 'NAPA VALLEY',
        desc: 'Premium delivery to Napa Valley venues, including wineries and estates. White-glove setup and strike available.'
    },
    sonoma: {
        title: 'SONOMA',
        desc: 'Serving Sonoma County events from coast to valleys. Flexible logistics for indoor and outdoor venues.'
    }
};

const DEFAULT_META = {
    title: 'SERVING THE BAY',
    desc: 'Highmark Event Rentals services the San Francisco Bay Area, Napa Valley, and Sonoma County — including San Francisco, the East Bay, Peninsula, South Bay, North Bay, and the wider wine country.'
};

const CaliforniaMap = () => {
    const [activeRegion, setActiveRegion] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleToggle = (regionKey) => {
        setActiveRegion((prev) => (prev === regionKey ? null : regionKey));
    };

    const countyFill = (id) => {
        // Black / Silver / Bronze theme
        if (id === NAPA_ID) return 'var(--map-bronze)';
        if (id === SONOMA_ID) return 'var(--map-silver)';
        if (BAY_AREA_COUNTY_IDS.includes(id)) return '#1f2937'; // near-black for Bay cluster
        return '#2f2f2f'; // dark gray base
    };

    const countyOpacity = (id) => {
        if (activeRegion === 'napa') return id === NAPA_ID ? 0.98 : 0.3;
        if (activeRegion === 'sonoma') return id === SONOMA_ID ? 0.98 : 0.3;
        if (activeRegion === 'bay') return BAY_AREA_COUNTY_IDS.includes(id) ? 0.94 : 0.28;
        return 0.8;
    };

    const handleCountyClick = (id) => {
        if (id === NAPA_ID) return handleToggle('napa');
        if (id === SONOMA_ID) return handleToggle('sonoma');
        if (BAY_AREA_COUNTY_IDS.includes(id)) return handleToggle('bay');
        return null;
    };

    const labelText = useMemo(() => {
        if (activeRegion === 'napa') return 'Napa Valley';
        if (activeRegion === 'sonoma') return 'Sonoma County';
        if (activeRegion === 'bay') return 'Bay Area';
        return '';
    }, [activeRegion]);

    return (
        <section className={styles.section} aria-label="California Regions">
            <div className={styles.content}>
                <div className={styles.headerWrap}>
                    <div className={styles.headerInner}>
                        <div className="wpo-section-title">
                            <span style={{ display: 'inline-block' }}>
                                FIND US!
                            </span>
                            <h2>Where You Can Find Our Services</h2>
                            <div className="section-title-img">
                                <span className="section-title-initials">HM</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.mapWrap}>
                    {isClient && (
                        <ComposableMap
                            className={styles.svg}
                            projection="geoMercator"
                            projectionConfig={{ scale: 2300, center: [-122.2, 38.2] }}
                        >
                            <Geographies geography={TOPO_COUNTIES_URL}>
                                {({ geographies }) =>
                                    geographies
                                        .filter((geo) => {
                                            const id = String(geo.id).padStart(5, '0');
                                            return id.slice(0, 2) === CALIFORNIA_PREFIX;
                                        })
                                        .map((geo) => {
                                            const id = String(geo.id).padStart(5, '0');
                                            const isInteractive = id === NAPA_ID || id === SONOMA_ID || BAY_AREA_COUNTY_IDS.includes(id);
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    onClick={() => isInteractive && handleCountyClick(id)}
                                                    style={{
                                                        default: {
                                                            fill: countyFill(id),
                                                            opacity: countyOpacity(id),
                                                            stroke: 'var(--map-silver)',
                                                            strokeWidth: 0.7,
                                                            outline: 'none',
                                                            cursor: isInteractive ? 'pointer' : 'default'
                                                        },
                                                        hover: {
                                                            fill: countyFill(id),
                                                            opacity: Math.min(countyOpacity(id) + 0.08, 1),
                                                            stroke: '#e5e7eb',
                                                            strokeWidth: 1,
                                                            outline: 'none',
                                                            cursor: isInteractive ? 'pointer' : 'default'
                                                        },
                                                        pressed: {
                                                            fill: countyFill(id),
                                                            opacity: 1,
                                                            stroke: 'var(--map-bronze)',
                                                            strokeWidth: 1,
                                                            outline: 'none'
                                                        }
                                                    }}
                                                    className={isInteractive ? styles.serviceable : undefined}
                                                />
                                            );
                                        })
                                }
                            </Geographies>
                        </ComposableMap>
                    )}
                    {/* Removed floating overlay label for cleaner UI */
                    }
                </div>
                <aside className={styles.panelVisible} aria-live="polite">
                    <div className={styles.infoPanel}>
                        <h2 className={styles.infoHeadline}>{(activeRegion ? REGION_META[activeRegion] : DEFAULT_META).title}</h2>
                        <p className={styles.infoDesc}>{(activeRegion ? REGION_META[activeRegion] : DEFAULT_META).desc}</p>
                        {/* <ul className={styles.infoList}>
                            <li>Delivery and pickup</li>
                            <li>On-site installation</li>
                            <li>Design assistance</li>
                            <li>Rush options</li>
                        </ul> */}
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default CaliforniaMap;


