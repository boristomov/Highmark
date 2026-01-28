import React from 'react'
import Image from 'next/image';
import { withBasePath } from '../../utils/basePath';

const SectionTitle = (props) => {
    return (
        <div className="row">
            <div className="wpo-section-title">
                <span>{props.topTitle}</span>
                <h2>{props.MainTitle}</h2>
                <div className="section-title-img">
                    <img src={withBasePath('/images/boris/highmark-h-logo.png')} alt="Highmark" className="section-title-h-logo" />
                </div>
            </div>
        </div>
    )
}

export default SectionTitle;