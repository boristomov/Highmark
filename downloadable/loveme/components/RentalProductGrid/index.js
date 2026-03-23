import React from "react";
import Link from 'next/link';
import styles from './RentalProductGrid.module.scss';
import { withBasePath } from '../../utils/basePath';

const BRIDAL_LINENS_URL = 'https://bridallinens.com/';

const RentalProductGrid = ({ products, addToCartProduct, loading, searchQuery, selectedCategory }) => {
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
        const showLinensPartner =
            selectedCategory === 'accessories' && !searchQuery;

        if (showLinensPartner) {
            return (
                <section className={styles.productSection}>
                    <div className="container">
                        <div className={styles.linensPartner}>
                            <h3>Linens &amp; fabric swatches</h3>
                            <p className={styles.linensLead}>
                                We partner with{' '}
                                <a
                                    href={BRIDAL_LINENS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.linensLink}
                                >
                                    Bridal Linens
                                </a>
                                —browse their full range of fabrics, colors, and patterns to choose what fits your event.
                            </p>
                            <p className={styles.linensNote}>
                                When you submit a quote request from your cart, please list your fabric names, colors, and any style preferences in the{' '}
                                <strong>additional notes</strong> field. Our team will confirm availability and follow up with tailored pricing.
                            </p>
                            <a
                                href={BRIDAL_LINENS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.linensCta}
                            >
                                Browse Bridal Linens
                            </a>
                        </div>
                    </div>
                </section>
            );
        }

        return (
            <section className={styles.productSection}>
                <div className="container">
                    <div className={styles.noProducts}>
                        <h3>
                            {searchQuery
                                ? `No products match "${searchQuery}"`
                                : "No products found in this category"}
                        </h3>
                        <p>
                            {searchQuery
                                ? "Try a different search term or clear the search to browse all items."
                                : "Please check back later or select a different category."}
                        </p>
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
                            <Link href={`/product-single/${product.slug}`} className={styles.productLink}>
                                <div className={styles.productImage}>
                                    {product.image_url ? (
                                        <>
                                            <img
                                                src={withBasePath(product.image_url)}
                                                alt={product.name}
                                                data-img-base={product.imgBase ? withBasePath(product.imgBase) : ""}
                                                data-ext-index="0"
                                                onError={(e) => {
                                                    const exts = ["png", "jpg", "jpeg", "webp", "avif"];
                                                    const img = e.currentTarget;
                                                    const base = img.getAttribute("data-img-base");
                                                    const placeholderUrl = withBasePath("/images/placeholder-product.jpg");
                                                    // If no base, fallback to placeholder once
                                                    if (!base) {
                                                        if (img.src.indexOf("placeholder-product.jpg") === -1) {
                                                            img.src = placeholderUrl;
                                                        }
                                                        return;
                                                    }
                                                    const currentIdx = parseInt(img.getAttribute("data-ext-index") || "0", 10);
                                                    const nextIdx = currentIdx + 1;
                                                    if (nextIdx < exts.length) {
                                                        img.setAttribute("data-ext-index", String(nextIdx));
                                                        img.src = `${base}.${exts[nextIdx]}`;
                                                    } else {
                                                        img.src = placeholderUrl;
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
                                    <h3>{product.name}</h3>
                                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                                </div>
                            </Link>
                            <div className={styles.productFooter}>
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RentalProductGrid;

