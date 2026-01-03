import React from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { withBasePath } from '../../utils/basePath';

const Product = ({ item, addToCart }) => {

  return (

    <div className="row align-items-center gx-2">
      <div className="col col-lg-5 col-12">
        <div className="shop-single-slider">
          <div className="slider-nav">
            <div>
              {item.image_url ? (
                <Zoom>
                  <img
                    src={withBasePath(item.image_url)}
                    alt={item.name}
                    data-img-base={item.imgBase ? withBasePath(item.imgBase) : ''}
                    data-ext-index="0"
                    style={{ width: '100%', height: '450px', objectFit: 'contain', background: 'transparent' }}
                    onError={(e) => {
                      const exts = ["png", "jpg", "jpeg", "webp", "avif"];
                      const img = e.currentTarget;
                      const base = img.getAttribute("data-img-base");
                      const placeholderUrl = withBasePath("/images/placeholder-product.jpg");
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
                </Zoom>
              ) : (
                <div style={{
                  width: '100%',
                  height: '450px',
                  background: 'rgba(245, 240, 232, 0.7)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(27, 27, 27, 0.4)',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '80px', marginBottom: '15px' }}>📷</span>
                  <p style={{ fontSize: '16px', fontWeight: '300' }}>Image Coming Soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col col-lg-7 col-12">
        <div className="product-details">
          <h2>{item.name}</h2>
          {item.short_description && (
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '20px',
              fontStyle: 'italic'
            }}>
              {item.short_description}
            </p>
          )}
          <div className="price">
            <span className="current">${parseFloat(item.price).toFixed(2)}</span>
          </div>
          {item.description && (
            <p style={{ marginTop: '20px', lineHeight: '1.8' }}>{item.description}</p>
          )}

          <div style={{
            marginTop: '10px',
            padding: '8px 14px',
            background: 'rgba(52, 199, 89, 0.08)',
            border: '1px solid rgba(52, 199, 89, 0.25)',
            borderRadius: '4px',
            display: 'inline-block',
            color: '#2f8f4e',
            fontWeight: 600,
            letterSpacing: '0.2px'
          }}>
            In stock
          </div>

          <div className="product-option">
            <div className="product-row">
              <button
                className="theme-btn"
                onClick={() => addToCart(item)}
                disabled={!item.active || item.quantity_available === 0}
                style={{
                  opacity: (!item.active || item.quantity_available === 0) ? 0.5 : 1,
                  cursor: (!item.active || item.quantity_available === 0) ? 'not-allowed' : 'pointer'
                }}
              >
                {item.active && item.quantity_available > 0 ? 'Add to cart' : 'Unavailable'}
              </button>
            </div>
          </div>
          <div className="tg-btm">
            <p><span>Category:</span> {item.category}</p>
            {item.sku && <p><span>SKU:</span> {item.sku}</p>}
            {item.tags && item.tags.length > 0 && (
              <p><span>Tags:</span> {item.tags.join(', ')}</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Product;
