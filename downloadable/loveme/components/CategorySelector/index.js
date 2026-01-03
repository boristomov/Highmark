import React from 'react';
import styles from './CategorySelector.module.scss';
import { withBasePath } from '../../utils/basePath';

const CategorySelector = ({ selectedCategory, onCategorySelect }) => {
    const categories = [
        {
            id: 'chair',
            title: 'Chairs',
            description: 'Elegant seating for every occasion',
            image: '/images/boris/homepageServices/9.jpg',
            color: '#E9E1D3'
        },
        {
            id: 'table',
            title: 'Tables',
            description: 'Perfect tables for your event',
            image: '/images/boris/homepageServices/french chairs pics 2.avif',
            color: '#E9E1D3'
        },
        {
            id: 'tent',
            title: 'Tents',
            description: 'Weather protection for outdoor events',
            image: '/images/boris/homepageServices/tent2.jpg',
            color: '#E9E1D3'
        },
        {
            id: 'accessories',
            title: 'Linens',
            description: 'Complete your table setting',
            image: '/images/boris/homepageServices/4.jpg',
            color: '#E9E1D3'
        }
    ];

    return (
        <section className={styles.categorySelector}>
            <div className={styles.categoryGrid}>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`${styles.categoryCard} ${selectedCategory === category.id ? styles.active : ''
                            }`}
                        onClick={() => onCategorySelect(category.id)}
                    >
                        <div className={styles.categoryImageWrapper}>
                            <img src={withBasePath(category.image)} alt={category.title} className={styles.categoryImage} />
                            <div className={styles.categoryOverlay}></div>
                        </div>
                        <div className={styles.categoryContent}>
                            <h3>{category.title}</h3>
                            <p>{category.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedCategory && (
                <div className={styles.clearFilter}>
                    <button onClick={() => onCategorySelect(null)}>
                        Clear Filters
                    </button>
                </div>
            )}
        </section>
    );
};

export default CategorySelector;

