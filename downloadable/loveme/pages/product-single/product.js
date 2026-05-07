import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { withBasePath } from '../../utils/basePath';

// Parse details string into array of {label, value} objects
const parseDetails = (detailsString) => {
  if (!detailsString || detailsString === 'n/a') return [];
  
  // Split by semicolon and parse each "Key: Value" pair
  return detailsString
    .split(';')
    .map(part => part.trim())
    .filter(part => part.includes(':'))
    .map(part => {
      const colonIndex = part.indexOf(':');
      const label = part.substring(0, colonIndex).trim();
      const value = part.substring(colonIndex + 1).trim();
      return { label, value };
    })
    .filter(item => item.label && item.value);
};

const SECONDARY_IMAGE_PREFIX = 'secondary_image:';

const getProductImages = (item) => {
  if (!item) return [];

  const tags = Array.isArray(item.tags) ? item.tags : [];
  const secondaryImages = tags
    .filter((tag) => typeof tag === 'string' && tag.startsWith(SECONDARY_IMAGE_PREFIX))
    .map((tag) => tag.slice(SECONDARY_IMAGE_PREFIX.length).trim())
    .filter(Boolean);

  return [item.image_url, ...secondaryImages]
    .filter(Boolean)
    .filter((image, index, images) => images.indexOf(image) === index);
};

// Custom fullscreen image viewer with specs overlay
const ImageLightbox = ({ isOpen, onClose, imageUrl, imgBase, item, specifications }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const lightboxContent = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 15, 15, 0.97)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'zoom-out',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          width: '48px',
          height: '48px',
          border: 'none',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease',
          zIndex: 10001
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
      >
        <span style={{ color: 'white', fontSize: '24px', lineHeight: 1 }}>×</span>
      </button>

      {/* Main content container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '60px',
          maxWidth: '1400px',
          width: '90%',
          height: '85vh',
          cursor: 'default'
        }}
      >
        {/* Image */}
        <div style={{
          flex: '1 1 60%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}>
          <img
            src={withBasePath(imageUrl)}
            alt={item.name}
            data-img-base={imgBase ? withBasePath(imgBase) : ''}
            data-ext-index="0"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '4px'
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
        </div>

        {/* Info panel */}
        <div style={{
          flex: '0 0 320px',
          maxHeight: '85vh',
          overflowY: 'auto',
          animation: 'slideIn 0.35s ease-out'
        }}>
          {/* Title */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '400',
            color: 'white',
            marginBottom: '12px',
            letterSpacing: '-0.3px',
            lineHeight: '1.2'
          }}>
            {item.name}
          </h2>

          {/* Price */}
          <div style={{
            fontSize: '24px',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '32px'
          }}>
            ${parseFloat(item.price).toFixed(2)}
            <span style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginLeft: '8px'
            }}>
              per item
            </span>
          </div>

          {/* Specifications */}
          {specifications.length > 0 && (
            <div style={{
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <h4 style={{
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                Specifications
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {specifications.map((spec, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '16px'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      color: 'rgba(255, 255, 255, 0.45)'
                    }}>
                      {spec.label}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'white',
                      textAlign: 'right'
                    }}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hint */}
          <p style={{
            marginTop: '24px',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.3)',
            textAlign: 'center'
          }}>
            Click anywhere or press ESC to close
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(lightboxContent, document.body);
};

const Product = ({ item, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [quantityText, setQuantityText] = useState('1');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Parse product details/specifications (stored in short_description field)
  const specifications = useMemo(() => parseDetails(item.short_description), [item.short_description]);
  const productImages = useMemo(() => getProductImages(item), [item]);
  const selectedImage = productImages[selectedImageIndex] || item.image_url;

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [item.id]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const next = Math.max(1, prev + delta);
      setQuantityText(String(next));
      return next;
    });
  };

  const handleQuantityInputChange = (e) => {
    const value = e.target.value;
    setQuantityText(value);
    if (value === '') return;
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setQuantity(parsed);
    }
  };

  const handleQuantityInputBlur = () => {
    const parsed = parseInt(quantityText, 10);
    if (isNaN(parsed) || parsed < 1) {
      setQuantity(1);
      setQuantityText('1');
      return;
    }
    setQuantity(parsed);
    setQuantityText(String(parsed));
  };

  const handleAddToCart = () => {
    addToCart(item, quantity);
  };

  const showPreviousImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((index) => (index === 0 ? productImages.length - 1 : index - 1));
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((index) => (index + 1) % productImages.length);
  };

  return (
    <>
      {/* Custom Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={selectedImage}
        imgBase={item.imgBase}
        item={item}
        specifications={specifications}
      />

      <div className="row align-items-center gx-5">
        {/* Product Image */}
        <div className="col col-lg-6 col-12">
          <div 
            onClick={() => selectedImage && setLightboxOpen(true)}
            style={{
              background: 'linear-gradient(145deg, #f8f6f3 0%, #ebe7e0 100%)',
              borderRadius: '4px',
              padding: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '500px',
              cursor: selectedImage ? 'zoom-in' : 'default',
              position: 'relative',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => selectedImage && (e.currentTarget.style.transform = 'scale(1.01)')}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {selectedImage ? (
              <>
                <img
                  src={withBasePath(selectedImage)}
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
                {productImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous product image"
                      onClick={showPreviousImage}
                      style={{
                        position: 'absolute',
                        left: '18px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        border: '1px solid rgba(47, 47, 47, 0.12)',
                        background: 'rgba(245, 240, 232, 0.92)',
                        color: '#2F2F2F',
                        fontSize: '24px',
                        lineHeight: 1,
                        cursor: 'pointer',
                        zIndex: 2,
                        boxShadow: '0 8px 22px rgba(47, 47, 47, 0.14)'
                      }}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Next product image"
                      onClick={showNextImage}
                      style={{
                        position: 'absolute',
                        right: '18px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        border: '1px solid rgba(47, 47, 47, 0.12)',
                        background: 'rgba(245, 240, 232, 0.92)',
                        color: '#2F2F2F',
                        fontSize: '24px',
                        lineHeight: 1,
                        cursor: 'pointer',
                        zIndex: 2,
                        boxShadow: '0 8px 22px rgba(47, 47, 47, 0.14)'
                      }}
                    >
                      ›
                    </button>
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '18px',
                      transform: 'translateX(-50%)',
                      padding: '6px 12px',
                      background: 'rgba(245, 240, 232, 0.9)',
                      color: 'rgba(47, 47, 47, 0.72)',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: '600',
                      letterSpacing: '0.4px',
                      zIndex: 2
                    }}>
                      {selectedImageIndex + 1} / {productImages.length}
                    </div>
                  </>
                )}
                {/* Zoom hint */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  padding: '8px 12px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  opacity: 0.7,
                  transition: 'opacity 0.2s ease'
                }}>
                  <span style={{ fontSize: '14px' }}>🔍</span>
                  <span style={{ fontSize: '11px', color: 'white', fontWeight: '500', letterSpacing: '0.5px' }}>
                    Click to expand
                  </span>
                </div>
              </>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(27, 27, 27, 0.3)',
              }}>
                <span style={{ fontSize: '80px', marginBottom: '15px', color: '#D4C9B8' }}>📷</span>
                <p style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#B8AA96' }}>Image Coming Soon</p>
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

          {/* Description */}
          {item.description && item.description.toLowerCase() !== 'n/a' && item.description.trim() !== '' && (
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: 'rgba(27, 27, 27, 0.7)',
              marginBottom: '24px',
              maxWidth: '500px'
            }}>
              {item.description}
            </p>
          )}

          {/* Product Specifications */}
          {specifications.length > 0 && (
            <div style={{
              marginBottom: '32px',
              padding: '20px 24px',
              background: 'linear-gradient(145deg, #f8f6f3 0%, #f3f0eb 100%)',
              borderRadius: '8px',
              border: '1px solid rgba(180, 170, 155, 0.15)',
              maxWidth: '500px'
            }}>
              <h4 style={{
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: 'rgba(27, 27, 27, 0.5)',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(180, 170, 155, 0.2)'
              }}>
                Specifications
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px 24px'
              }}>
                {specifications.map((spec, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      color: 'rgba(27, 27, 27, 0.45)'
                    }}>
                      {spec.label}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1B1B1B'
                    }}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
              <input
                value={quantityText}
                type="number"
                inputMode="numeric"
                min="1"
                onChange={handleQuantityInputChange}
                onBlur={handleQuantityInputBlur}
                aria-label="Quantity"
                style={{
                  width: '70px',
                  height: '48px',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#1B1B1B',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                }}
              />
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
    </>
  );
};

export default Product;
