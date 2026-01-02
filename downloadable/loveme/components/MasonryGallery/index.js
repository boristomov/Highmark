import React, { useEffect, useMemo, useRef, useState } from 'react'

const useResizeObserver = (targetRef) => {
    const [size, setSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const el = targetRef.current
        if (!el) return

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

const MasonryGallery = ({
    images,
    minColumnWidth = 200,
    gutter = 12,
    maxColumns = 6,
    columns,
    renderItem,
    itemClassName,
    itemStyle,
    onLayout,
}) => {
    const containerRef = useRef(null)
    const { width: containerWidth } = useResizeObserver(containerRef)
    const [measured, setMeasured] = useState([])

    useEffect(() => {
        let cancelled = false
        if (!images || images.length === 0) {
            setMeasured([])
            return
        }
        Promise.all(images.map((img) => loadImageSize(img.src))).then((sizes) => {
            if (cancelled) return
            const meta = sizes.map((s, index) => ({ index, aspectRatio: s.aspectRatio }))
            setMeasured(meta)
        })
        return () => {
            cancelled = true
        }
    }, [images])

    const layout = useMemo(() => {
        const width = Math.max(0, containerWidth)
        if (!measured || measured.length === 0 || width <= 0) {
            return { boxes: [], totalHeight: 0, columnWidth: 0 }
        }
        const autoCount = Math.max(1, Math.min(maxColumns, Math.floor((width + gutter) / (minColumnWidth + gutter))))
        const columnCount = Math.max(1, Math.min(maxColumns, columns || autoCount))
        const columnWidth = Math.floor((width - gutter * (columnCount - 1)) / columnCount)
        const columnsHeights = new Array(columnCount).fill(0)
        const boxes = []

        measured.forEach((item) => {
            let targetCol = 0
            let minHeight = columnsHeights[0]
            for (let c = 1; c < columnCount; c++) {
                if (columnsHeights[c] < minHeight) {
                    minHeight = columnsHeights[c]
                    targetCol = c
                }
            }
            const height = Math.max(1, Math.round(columnWidth / item.aspectRatio))
            const x = targetCol * (columnWidth + gutter)
            const y = columnsHeights[targetCol]
            boxes.push({ index: item.index, x, y, width: columnWidth, height })
            columnsHeights[targetCol] += height + gutter
        })

        const totalHeight = columnsHeights.length ? Math.max(...columnsHeights) - gutter : 0
        return { boxes, totalHeight: Math.max(0, totalHeight), columnWidth }
    }, [measured, containerWidth, minColumnWidth, gutter, maxColumns])

    useEffect(() => {
        if (onLayout) onLayout(layout)
    }, [layout, onLayout])

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

export default MasonryGallery


