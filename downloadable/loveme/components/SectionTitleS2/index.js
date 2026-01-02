import React from 'react'
import Image from 'next/image';
import Simg from '/public/images/section-title2.png'

const SectionTitleS2 = (props) => {
    return(
        <div className="row">
            <div className="wpo-section-title-s2">
                <div className="section-title-simg">
                    <Image src={Simg} alt=""/>
                </div>
                <h2>{props.MainTitle}</h2>
                <div className="section-title-img">
                    <div className="round-ball"></div>
                </div>
            </div>
        </div>
    )
}

export default SectionTitleS2;