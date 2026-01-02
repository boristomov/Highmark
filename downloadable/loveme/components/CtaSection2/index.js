import React from 'react'
import Link from 'next/link'

const CtaSection2 = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
      }
    return(
        <div className="wpo-cta-section-s3">
            <div className="conatiner-fluid">
                <div className="wpo-cta-item">
                    <h2>Adventure Begins</h2>
                    <p>Nov 22,2022, Wedding Unity Center, road 525 USA</p>
                    <Link onClick={ClickHandler} href="/contact" className="theme-btn-s2">View Details</Link>
                </div>
            </div>
        </div>

    )
}

export default CtaSection2;