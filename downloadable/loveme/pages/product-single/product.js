import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { withBasePath } from '../../utils/basePath';

const Product = ({ item, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart(item, quantity);
  };

  return (
    <div className="row align-items-center gx-5">
      {/* Product Image */}
      <div className="col col-lg-6 col-12">
        <div style={{
          background: 'linear-gradient(145deg, #f8f6f3 0%, #ebe7e0 100%)',
          borderRadius: '4px',
          padding: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '500px'
        }}>
          {item.image_url ? (
            <Zoom>
              <img
                src={withBasePath(item.image_url)}
                alt={item.name}
                data-img-base={item.imgBase ? withBasePath(item.imgBase) : ''}
                data-ext-index="0"
                style={{ 
                  width: '100%', 
                  maxHeight: '450px', 
                  objectFit: 'contain',
                }}
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(27, 27, 27, 0.3)',
            }}>
              <span style={{ fontSize: '80px', marginBottom: '15px' }}>📷</span>
              <p style={{ fontSize: '14px', fontWeight: '400', letterSpacing: '1px', textTransform: 'uppercase' }}>Image Coming Soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="col col-lg-6 col-12">
        <div style={{ padding: '20px 0' }}>
          {/* Title */}
          <h1 style={{
            fontSize: '36px',
            fontWeight: '400',
            color: '#1B1B1B',
            marginBottom: '16px',
            letterSpacing: '-0.5px',
            lineHeight: '1.2'
          }}>
            {item.name}
          </h1>

          {/* Price */}
          <div style={{
            fontSize: '32px',
            fontWeight: '300',
            color: '#1B1B1B',
            marginBottom: '20px',
            letterSpacing: '-0.5px'
          }}>
            ${parseFloat(item.price).toFixed(2)}
            <span style={{ 
              fontSize: '14px', 
              color: 'rgba(27, 27, 27, 0.5)', 
              fontWeight: '400',
              marginLeft: '8px'
            }}>
              per item
            </span>
          </div>

          {/* In Stock Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            background: 'rgba(52, 199, 89, 0.08)',
            border: '1px solid rgba(52, 199, 89, 0.2)',
            borderRadius: '4px',
            marginBottom: '28px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#34c759'
            }}></span>
            <span style={{
              color: '#2f8f4e',
              fontWeight: '500',
              fontSize: '14px',
              letterSpacing: '0.3px'
            }}>
              In Stock
            </span>
          </div>

          {/* Description */}
          {item.description && (
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: 'rgba(27, 27, 27, 0.7)',
              marginBottom: '32px',
              maxWidth: '500px'
            }}>
              {item.description}
            </p>
          )}

          {/* Quantity Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'rgba(27, 27, 27, 0.5)',
              marginBottom: '12px'
            }}>
              Quantity
            </label>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: '1px solid rgba(27, 27, 27, 0.15)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => handleQuantityChange(-1)}
                style={{
                  width: '48px',
                  height: '48px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#1B1B1B',
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                −
              </button>
              <span style={{
                width: '60px',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: '500',
                color: '#1B1B1B'
              }}>
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                style={{
                  width: '48px',
                  height: '48px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#1B1B1B',
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!item.active}
            style={{
              width: '100%',
              maxWidth: '320px',
              padding: '18px 40px',
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              background: item.active ? '#1B1B1B' : 'rgba(27, 27, 27, 0.3)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: item.active ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: item.active ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none'
            }}
            onMouseOver={(e) => {
              if (item.active) {
                e.currentTarget.style.background = '#333';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseOut={(e) => {
              if (item.active) {
                e.currentTarget.style.background = '#1B1B1B';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
              }
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
