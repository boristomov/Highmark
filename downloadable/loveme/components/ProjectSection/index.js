import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import SectionTitle from '../../components/SectionTitle'
import Projects from '../../api/projects'
import MasonryGallery from '../MasonryGallery'
import { withBasePath } from '../../utils/basePath'

const InspirationLightbox = ({ isOpen, images, activeIndex, onPrev, onNext, onClose }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    useEffect(() => {
        if (!isOpen) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return
        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onPrev()
            if (e.key === 'ArrowRight') onNext()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [isOpen, onClose, onPrev, onNext])

    if (!isOpen || !mounted || !images || images.length === 0) return null

    const current = images[Math.max(0, Math.min(activeIndex, images.length - 1))]

    const lightbox = (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 15, 15, 0.96)',
                backdropFilter: 'blur(8px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
            }}
        >
            {/* Close */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                style={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontSize: 26,
                    lineHeight: 1,
                    cursor: 'pointer',
                }}
            >
                ×
            </button>

            {/* Prev */}
            {images.length > 1 && (
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onPrev() }}
                    aria-label="Previous image"
                    style={{
                        position: 'absolute',
                        left: 18,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 56,
                        height: 56,
                        borderRadius: 999,
                        border: '1px solid rgba(255,255,255,0.18)',
                        background: 'rgba(255,255,255,0.08)',
                        color: 'white',
                        fontSize: 28,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    ‹
                </button>
            )}

            {/* Next */}
            {images.length > 1 && (
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onNext() }}
                    aria-label="Next image"
                    style={{
                        position: 'absolute',
                        right: 18,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 56,
                        height: 56,
                        borderRadius: 999,
                        border: '1px solid rgba(255,255,255,0.18)',
                        background: 'rgba(255,255,255,0.08)',
                        color: 'white',
                        fontSize: 28,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    ›
                </button>
            )}

            {/* Image */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: 1400,
                    maxHeight: '85vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={current.src}
                    alt={current.alt || ''}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '85vh',
                        objectFit: 'contain',
                        borderRadius: 6,
                    }}
                />
            </div>
        </div>
    )

    return createPortal(lightbox, document.body)
}

const ProjectSection = (props) => {
    const [expanded, setExpanded] = useState(false)
    const [seeAllHover, setSeeAllHover] = useState(false)
    const [layoutMeta, setLayoutMeta] = useState({ totalHeight: 0, columnWidth: 0, boxes: [] })
    const allImages = useMemo(() => Projects.map((p) => ({ src: withBasePath(p.pimg1), alt: p.title, meta: p })), [])
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const rowsToShow = 2

    // Detect mobile for single column layout
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 640)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])
    const cutoffHeight = useMemo(() => {
        if (!layoutMeta || !layoutMeta.boxes || layoutMeta.boxes.length === 0) return 0
        const rowHeights = {}
        layoutMeta.boxes.forEach((b) => {
            const rowKey = b.y
            rowHeights[rowKey] = Math.max(rowHeights[rowKey] || 0, b.y + b.height)
        })
        const sortedHeights = Object.values(rowHeights).sort((a, b) => a - b)
        if (sortedHeights.length === 0) return 0
        const index = Math.min(rowsToShow - 1, sortedHeights.length - 1)
        return Math.ceil(sortedHeights[index])
    }, [layoutMeta])

    const openAt = (index) => {
        setActiveIndex(index)
        setLightboxOpen(true)
    }

    const goPrev = () => {
        setActiveIndex((prev) => (allImages.length ? (prev - 1 + allImages.length) % allImages.length : 0))
    }

    const goNext = () => {
        setActiveIndex((prev) => (allImages.length ? (prev + 1) % allImages.length : 0))
    }

    return (
        <section className={`wpo-portfolio-section section-padding ${props.prClass}`}>
            <div className="container-fluid">
                <SectionTitle topTitle={'Portfolio'} MainTitle={'Our Inspiration'} />
                <div className="sortable-gallery">
                    <div className="gallery-filters"></div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div style={{ position: 'relative', overflow: expanded ? 'visible' : 'hidden', maxHeight: expanded ? 'none' : cutoffHeight }}>
                                <InspirationLightbox
                                    isOpen={lightboxOpen}
                                    images={allImages}
                                    activeIndex={activeIndex}
                                    onPrev={goPrev}
                                    onNext={goNext}
                                    onClose={() => setLightboxOpen(false)}
                                />
                                <MasonryGallery
                                    images={allImages}
                                    minColumnWidth={isMobile ? 400 : 220}
                                    gutter={isMobile ? 16 : 10}
                                    maxColumns={isMobile ? 1 : 4}
                                    columns={isMobile ? 1 : 4}
                                    itemClassName="grid"
                                    onLayout={setLayoutMeta}
                                    renderItem={(item, box) => (
                                        <button
                                            type="button"
                                            className="img-holder"
                                            onClick={() => openAt(box.index)}
                                            aria-label="Open image"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                position: 'relative',
                                                padding: 0,
                                                border: 'none',
                                                background: 'transparent',
                                                cursor: 'zoom-in',
                                                display: 'block',
                                            }}
                                        >
                                            <img src={item.src} alt={item.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                        </button>
                                    )}
                                />
                                {!expanded && cutoffHeight > 0 && (
                                    <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 140, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(245,240,232,0) 0%, rgba(245,240,232,0.85) 60%, rgba(245,240,232,1) 100%)' }} />
                                )}
                                {!expanded && cutoffHeight > 0 && (
                                    <div style={{ position: 'absolute', left: 0, bottom: 16, width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <button
                                            className="theme-btn"
                                            onClick={() => setExpanded(true)}
                                            onMouseEnter={() => setSeeAllHover(true)}
                                            onMouseLeave={() => setSeeAllHover(false)}
                                            aria-label="See all projects"
                                            style={{
                                                pointerEvents: 'auto',
                                                padding: '15px 45px',
                                                minWidth: 220,
                                                borderRadius: 4,
                                                border: seeAllHover ? '1px solid #1B1B1B' : '1px solid #E9E1D3',
                                                background: seeAllHover ? '#D4C9B8' : '#E9E1D3',
                                                color: '#1B1B1B',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                transition: 'background-color .45s ease, color .45s ease, border-color .45s ease, transform .45s ease'
                                            }}
                                        >
                                            See all
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectSection;