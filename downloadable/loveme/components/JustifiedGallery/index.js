import React, { useEffect, useMemo, useRef, useState } from 'react'

// A lightweight justified gallery that arranges images into rows that
// collectively fill the container width with minimal whitespace.
// The algorithm greedily builds rows based on image aspect ratios, scaling
// each finalized row to exactly fit the container width (minus gaps).

const useResizeObserver = (targetRef) => {
    const [size, setSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const el = targetRef.current
        if (!el) return

        // Initialize size immediately to avoid an extra paint
        const rect = el.getBoundingClientRect()
        setSize({ width: Math.round(rect.width), height: Math.round(rect.height) })

        if (typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const cr = entry.contentRect
                    setSize({ width: Math.round(cr.width), height: Math.round(cr.height) })
                }
            })
            ro.observe(el)
            return () => ro.disconnect()
        }

        // Fallback to window resize if ResizeObserver is unavailable
        const onResize = () => {
            const r = el.getBoundingClientRect()
            setSize({ width: Math.round(r.width), height: Math.round(r.height) })
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [targetRef])

    return size
}

const loadImageSize = (src) => {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
            const width = img.naturalWidth || img.width
            const height = img.naturalHeight || img.height
            if (width > 0 && height > 0) {
                resolve({ width, height, aspectRatio: width / height })
            } else {
                resolve({ width: 1, height: 1, aspectRatio: 1 })
            }
        }
        img.onerror = () => resolve({ width: 1, height: 1, aspectRatio: 1 })
        img.src = src
    })
}

const computeJustifiedLayout = ({
    items,
    containerWidth,
    targetRowHeight,
    rowSpacing,
    colSpacing,
    justifyLastRow,
}) => {
    const layout = []
    let currentRow = []
    let currentAspectSum = 0
    let yOffset = 0

    const effectiveWidth = Math.max(0, containerWidth)
    if (effectiveWidth <= 0 || items.length === 0) {
        return { boxes: [], totalHeight: 0 }
    }

    const finalizeRow = (row, aspectSum, isLastRow) => {
        if (row.length === 0) return 0
        const gaps = Math.max(0, row.length - 1)
        let rowHeight
        if (isLastRow && !justifyLastRow) {
            // Scale last row to target height; it may not fully fill width
            rowHeight = targetRowHeight
        } else {
            rowHeight = (effectiveWidth - gaps * colSpacing) / aspectSum
        }

        let x = 0
        row.forEach((item, idx) => {
            const width = Math.max(1, Math.round(rowHeight * item.aspectRatio))
            layout.push({
                index: item.index,
                x,
                y: yOffset,
                width,
                height: Math.round(rowHeight),
            })
            x += width + colSpacing
        })
        return Math.round(rowHeight)
    }

    const minRowHeight = targetRowHeight * 0.6
    const maxRowHeight = targetRowHeight * 1.4

    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        currentRow.push(item)
        currentAspectSum += item.aspectRatio

        const gaps = Math.max(0, currentRow.length - 1)
        const rowHeightEstimate = (effectiveWidth - gaps * colSpacing) / currentAspectSum

        if (rowHeightEstimate < maxRowHeight) {
            // Good breakpoint; if it's too small, we may add more items next iteration
            if (rowHeightEstimate <= targetRowHeight || i === items.length - 1) {
                const h = finalizeRow(currentRow, currentAspectSum, i === items.length - 1)
                yOffset += h + rowSpacing
                currentRow = []
                currentAspectSum = 0
            }
        } else if (rowHeightEstimate > maxRowHeight && currentRow.length === 1) {
            // Single very wide item; cap height to keep reasonable
            const h = finalizeRow(currentRow, currentAspectSum, false)
            yOffset += h + rowSpacing
            currentRow = []
            currentAspectSum = 0
        }
    }

    // If anything left in the row, flush as last row
    if (currentRow.length > 0) {
        const h = finalizeRow(currentRow, currentAspectSum, true)
        yOffset += h
    }

    // Remove trailing spacing
    if (layout.length > 0) {
        yOffset -= rowSpacing
    }

    return { boxes: layout, totalHeight: Math.max(0, yOffset) }
}

const JustifiedGallery = ({
    images,
    targetRowHeight = 240,
    rowSpacing = 12,
    colSpacing = 12,
    justifyLastRow = false,
    renderItem,
    itemClassName,
    itemStyle,
}) => {
    const containerRef = useRef(null)
    const { width: containerWidth } = useResizeObserver(containerRef)
    const [measured, setMeasured] = useState([])

    // Measure image intrinsic sizes once the sources are known
    useEffect(() => {
        let cancelled = false
        if (!images || images.length === 0) {
            setMeasured([])
            return
        }
        Promise.all(images.map((img) => loadImageSize(img.src))).then((sizes) => {
            if (cancelled) return
            const withMeta = sizes.map((s, index) => ({ index, aspectRatio: s.aspectRatio }))
            setMeasured(withMeta)
        })
        return () => {
            cancelled = true
        }
    }, [images])

    const layout = useMemo(() => {
        if (!measured || measured.length === 0 || containerWidth <= 0) {
            return { boxes: [], totalHeight: 0 }
        }
        return computeJustifiedLayout({
            items: measured,
            containerWidth,
            targetRowHeight,
            rowSpacing,
            colSpacing,
            justifyLastRow,
        })
    }, [measured, containerWidth, targetRowHeight, rowSpacing, colSpacing, justifyLastRow])

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: layout.totalHeight }}>
            {layout.boxes.map((box) => {
                const item = images[box.index]
                return (
                    <div key={box.index} className={itemClassName} style={{ position: 'absolute', left: box.x, top: box.y, width: box.width, height: box.height, padding: 0, ...(itemStyle || {}) }}>
                        {renderItem ? (
                            renderItem(item, box)
                        ) : (
                            <img src={item.src} alt={item.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default JustifiedGallery


