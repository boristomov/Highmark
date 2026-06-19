import React, { useEffect, useState } from 'react';
import styles from './CategorySelector.module.scss';
import { withBasePath } from '../../utils/basePath';

const BUSINESS_EMAIL = 'info@highmarkeventrentals.com';

const CategorySelector = ({ selectedCategory, onCategorySelect }) => {
    // Track the visually active card. Two cards can map to the same database
    // filter (e.g. Tents and Heating & Shades), so we track the card id
    // separately from the filter we report to the parent.
    const [activeId, setActiveId] = useState(null);
    const [comingSoon, setComingSoon] = useState(null);

    const categories = [
        {
            id: 'chair',
            filter: 'chair',
            title: 'Chairs',
            description: 'Elegant seating for every occasion',
            image: '/images/boris/homepageServices/9.jpg',
        },
        {
            id: 'table',
            filter: 'table',
            title: 'Tables',
            description: 'Perfect tables for your event',
            image: '/images/boris/homepageServices/french chairs pics 2.avif',
        },
        {
            id: 'tent',
            filter: 'tent',
            title: 'Tents',
            description: 'Weather protection for outdoor events',
            image: '/images/boris/homepageServices/tent2.jpg',
        },
        {
            id: 'accessories',
            filter: 'accessories',
            title: 'Linens',
            description: 'Complete your table setting',
            image: '/images/boris/homepageServices/4.jpg',
        },
        {
            id: 'lounge',
            filter: null,
            comingSoon: true,
            title: 'Lounge Furniture',
            description: 'Relaxed lounge seating & soft setups',
            image: '/images/boris/iStock-2166246204.jpg',
        },
        {
            id: 'heating-shades',
            filter: 'tent',
            title: 'Heating & Shades',
            description: 'Patio heaters, umbrellas & shade',
            image: '/images/boris/homepageServices/tentCategoryPic.jpg',
        },
    ];

    // Keep the active card in sync when the filter is set externally (e.g. URL query)
    useEffect(() => {
        if (!selectedCategory) {
            setActiveId(null);
            return;
        }
        const current = categories.find((c) => c.id === activeId);
        if (!current || current.filter !== selectedCategory) {
            const match = categories.find((c) => c.filter === selectedCategory);
            if (match) setActiveId(match.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);

    const handleClick = (category) => {
        if (category.comingSoon) {
            setComingSoon(category);
            return;
        }
        setComingSoon(null);
        setActiveId(category.id);
        onCategorySelect(category.filter);
    };

    const clearFilters = () => {
        setActiveId(null);
        setComingSoon(null);
        onCategorySelect(null);
    };

    return (
        <section className={styles.categorySelector}>
            <div className={styles.categoryGrid}>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`${styles.categoryCard} ${activeId === category.id ? styles.active : ''}`}
                        onClick={() => handleClick(category)}
                    >
                        <div className={styles.categoryImageWrapper}>
                            <img src={withBasePath(category.image)} alt={category.title} className={styles.categoryImage} />
                            <div className={styles.categoryOverlay}></div>
                        </div>
                        <div className={styles.categoryContent}>
                            <h3>{category.title}</h3>
                            <p>{category.description}</p>
                        </div>
                        {category.comingSoon && (
                            <span className={styles.comingSoonBadge}>Coming Soon</span>
                        )}
                    </div>
                ))}
            </div>

            {comingSoon && (
                <div className={styles.comingSoonNote}>
                    <h3>{comingSoon.title}</h3>
                    <p>
                        This collection is currently in the works. Email us and we&apos;ll share
                        availability and options for your event directly.
                    </p>
                    <a
                        href={`mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(`${comingSoon.title} Inquiry`)}`}
                        className={styles.comingSoonCta}
                    >
                        Email us about {comingSoon.title.toLowerCase()}
                    </a>
                </div>
            )}

            {(activeId || comingSoon) && (
                <div className={styles.clearFilter}>
                    <button onClick={clearFilters}>
                        Clear Filters
                    </button>
                </div>
            )}
        </section>
    );
};

export default CategorySelector;
