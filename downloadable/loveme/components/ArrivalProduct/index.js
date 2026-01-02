import React from "react";
import  Link  from "next/link";
import SectionTitle from '../../components/SectionTitle'


const ArrivalProduct = ({ products, addToCartProduct }) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section className="wpo-product-section-s3 section-padding">
      <div className="container">
          <SectionTitle MainTitle={'New Arrivals PRODUCT'}/>
          <div className="wpo-product-wrap">
              <div className="row">
              {products.length > 0 &&
                products.slice(0,8).map((product, pitem) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={pitem}>
                        <div className="wpo-product-item">
                            <div className="wpo-product-img">
                                <img src={product.proImg} alt="" />
                                <button
                                  data-bs-toggle="tooltip"
                                  data-bs-html="true"
                                  title="Add to Cart"
                                  onClick={() => addToCartProduct(product)}
                                >
                                  Add To Cart
                                </button>
                            </div>
                            <div className="wpo-product-text">
                                <h3><Link onClick={ClickHandler} href='/product-single/[slug]' as={`/product-single/${product.slug}`}>{product.title}</Link></h3>
                                <span>${product.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
          </div>
      </div>
  </section>
  );
};

export default ArrivalProduct;
