import React from "react";
import styles from './RentalProductGrid.module.scss';

const RentalProductGrid = ({ products, addToCartProduct, loading }) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    if (loading) {
        return (
            <section className={styles.productSection}>
                <div className="container">
                    <div className={styles.loading}>
                        <p>Loading products...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (!products || products.length === 0) {
        return (
            <section className={styles.productSection}>
                <div className="container">
                    <div className={styles.noProducts}>
                        <h3>No products found in this category</h3>
                        <p>Please check back later or select a different category.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.productSection}>
            <div className="container">
                <div className={styles.productGrid}>
                    {products.map((product) => (
                        <div className={styles.productCard} key={product.id}>
                            <div className={styles.productImage}>
                                {product.image_url ? (
                                    <>
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            data-img-base={product.imgBase || ""}
                                            data-ext-index="0"
                                            onError={(e) => {
                                                const exts = ["png", "jpg", "jpeg", "webp", "avif"];
                                                const img = e.currentTarget;
                                                const base = img.getAttribute("data-img-base");
                                                // If no base, fallback to placeholder once
                                                if (!base) {
                                                    if (img.src.indexOf("/images/placeholder-product.jpg") === -1) {
                                                        img.src = "/images/placeholder-product.jpg";
                                                    }
                                                    return;
                                                }
                                                const currentIdx = parseInt(img.getAttribute("data-ext-index") || "0", 10);
                                                const nextIdx = currentIdx + 1;
                                                if (nextIdx < exts.length) {
                                                    img.setAttribute("data-ext-index", String(nextIdx));
                                                    img.src = `${base}.${exts[nextIdx]}`;
                                                } else {
                                                    img.src = "/images/placeholder-product.jpg";
                                                }
                                            }}
                                        />
                                        <div className={styles.imageOverlay}></div>
                                    </>
                                ) : (
                                    <div className={styles.placeholderImage}>
                                        <span>📷</span>
                                        <p>Image Coming Soon</p>
                                    </div>
                                )}
                            </div>
                            {!product.active && (
                                <div className={styles.unavailableBadge}>
                                    Unavailable
                                </div>
                            )}
                            <div className={styles.productContent}>
                                <h3 onClick={ClickHandler}>{product.name}</h3>
                                {product.short_description && (
                                    <p className={styles.shortDesc}>{product.short_description}</p>
                                )}
                                <div className={styles.productFooter}>
                                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                                    {product.active && (
                                        <button
                                            className={styles.addToCart}
                                            onClick={() => addToCartProduct(product)}
                                            disabled={!product.active}
                                        >
                                            Add To Cart
                                        </button>
                                    )}
                                </div>
                                {product.quantity_available !== undefined && (
                                    <div className={styles.availability}>
                                        {product.quantity_available > 0 ? (
                                            <span className={styles.inStock}>
                                                {product.quantity_available} available
                                            </span>
                                        ) : (
                                            <span className={styles.outOfStock}>Out of stock</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RentalProductGrid;

