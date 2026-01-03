import React, { useMemo, useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import Projects from '../../api/projects'
import MasonryGallery from '../MasonryGallery'
import { withBasePath } from '../../utils/basePath'

const ProjectSection = (props) => {
    const [expanded, setExpanded] = useState(false)
    const [seeAllHover, setSeeAllHover] = useState(false)
    const [layoutMeta, setLayoutMeta] = useState({ totalHeight: 0, columnWidth: 0, boxes: [] })
    const allImages = useMemo(() => Projects.map((p) => ({ src: withBasePath(p.pimg1), alt: p.title, meta: p })), [])
    const rowsToShow = 2
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
    return (
        <section className={`wpo-portfolio-section section-padding ${props.prClass}`}>
            <div className="container-fluid">
                <SectionTitle topTitle={'Portfolio'} MainTitle={'Our Inspiration'} />
                <div className="sortable-gallery">
                    <div className="gallery-filters"></div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div style={{ position: 'relative', overflow: expanded ? 'visible' : 'hidden', maxHeight: expanded ? 'none' : cutoffHeight }}>
                                <MasonryGallery
                                    images={allImages}
                                    minColumnWidth={220}
                                    gutter={10}
                                    maxColumns={4}
                                    columns={4}
                                    itemClassName="grid"
                                    onLayout={setLayoutMeta}
                                    renderItem={(item) => (
                                        <div className="img-holder" style={{ width: '100%', height: '100%', position: 'relative' }}>
                                            <img src={item.src} alt={item.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                            <div className="hover-content">
                                                <h4>{item.meta.title}</h4>
                                                {item.meta.blurb && (
                                                    <p className="inspiration-blurb"><em>{item.meta.blurb}</em></p>
                                                )}
                                                {Array.isArray(item.meta.items) && item.meta.items.length > 0 && (
                                                    <ul className="inspiration-items">
                                                        {item.meta.items.map((it, idx) => (
                                                            <li key={idx}>{it}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
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