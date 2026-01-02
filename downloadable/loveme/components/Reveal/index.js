import React, { useEffect, useRef, useState } from 'react'

const Reveal = ({ children, as: Tag = 'div', className = '', variant = 'fade-up', threshold = 0.2, delay = 0 }) => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        let obs
        if ('IntersectionObserver' in window) {
            obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => setVisible(true), delay)
                            obs && obs.disconnect()
                        }
                    })
                },
                { root: null, rootMargin: '0px', threshold }
            )
            obs.observe(el)
            return () => obs && obs.disconnect()
        } else {
            setVisible(true)
        }
    }, [threshold, delay])

    const classes = `${className} reveal ${variant} ${visible ? 'is-visible' : ''}`.trim()
    return (
        <Tag ref={ref} className={classes}>
            {children}
        </Tag>
    )
}

export default Reveal


