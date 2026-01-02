import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { addToCart } from "../../store/actions/action";
import Product from './product'
import { useRouter } from 'next/router'
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import ProductTabs from './alltab';
import { supabase } from '../../lib/supabaseClient';



const ProductSinglePage = (props) => {
    const router = useRouter()
    const { slug } = router.query;

    const { addToCart } = props;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                console.error('Error fetching product:', error);
            } else {
                // Normalize image to local computed path using category/sku, defaulting to .png
                const safeCategory = (data?.category || '').toString().trim().toLowerCase().replace(/\s+/g, '-');
                const safeSku = (data?.sku || '').toString().trim().toLowerCase().replace(/\s+/g, '-');
                const imgBase = safeCategory && safeSku ? `/images/boris/rental_equipment/${safeCategory}/${safeSku}` : null;
                const derivedUrl = imgBase ? `${imgBase}.png` : (data?.image_url || '/images/placeholder-product.jpg');
                setProduct({
                    ...data,
                    image_url: derivedUrl,
                    imgBase,
                    active: true,
                });
            }
        } catch (err) {
            console.error('Exception fetching product:', err);
        } finally {
            setLoading(false);
        }
    };

    const addToCartProduct = (product, qty = 1) => {
        // Transform Supabase product to cart format
        const cartProduct = {
            id: product.id,
            title: product.name,
            slug: product.slug,
            price: parseFloat(product.price),
            proImg: product.image_url || '/images/placeholder.jpg',
            qty: qty,
        };
        addToCart(cartProduct, qty);
    };


    return (
        <Fragment>
            <Navbar alwaysWhite withOffsetBand />
            <PageTitle pageTitle={product?.name || 'Product'} pagesub={''} />
            <section className="wpo-shop-single-section section-padding">
                <div className="container">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <p>Loading product...</p>
                        </div>
                    ) : product ? (
                        <>
                            <Product
                                item={product}
                                addToCart={addToCartProduct}
                            />
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <h3>Product not found</h3>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        products: state.data.products,
    }
};

export default connect(mapStateToProps, { addToCart })(ProductSinglePage);
