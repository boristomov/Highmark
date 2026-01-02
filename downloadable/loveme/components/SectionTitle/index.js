import React from 'react'
import Image from 'next/image';

const SectionTitle = (props) => {
    return (
        <div className="row">
            <div className="wpo-section-title">
                <span>{props.topTitle}</span>
                <h2>{props.MainTitle}</h2>
                <div className="section-title-img">
                    <span className="section-title-initials">HM</span>
                </div>
            </div>
        </div>
    )
}

export default SectionTitle;