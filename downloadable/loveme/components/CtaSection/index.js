import React from 'react'
import Link from 'next/link'
import ctaImg from '/public/images/cta/1.png'
import Image from 'next/image'

const CtaSection = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
      }
    return(
        <div className={`wpo-cta-section ${props.ctClass}`}>
            <div className="conatiner-fluid">
                <div className="wpo-cta-item">
                    <span><Image src={ctaImg} alt=""/></span>
                    <h2>Lets Celebrate Your Love</h2>
                    <Link onClick={ClickHandler} href="/contact" className="theme-btn-s2">Contact Us</Link>
                </div>
            </div>
        </div>

    )
}

export default CtaSection;