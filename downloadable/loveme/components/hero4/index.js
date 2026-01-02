import React from 'react'
import Link from 'next/link'
import hImg1 from '/public/images/slider/shape5.png'
import hImg2 from '/public/images/slider/couple.png'
import hImg3 from '/public/images/slider/shape6.png'
import hImg4 from '/public/images/slider/flower1.png'
import hImg5 from '/public/images/slider/flower2.png'
import Image from 'next/image'


const Hero4 = (props) => {
    return (
        <section className="static-hero-s2">
            <div className="hero-container">
                <div className="hero-inner">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="text-grid bride">
                                <div className="couple-img">
                                    <Image src={hImg1} alt="" />
                                </div>
                                <h3>Daniel Oliver</h3>
                                <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
                                    lacus vel facilisis. </p>
                                <div className="social">
                                    <ul>
                                        <li><Link href="/"><i className="ti-facebook"></i></Link></li>
                                        <li><Link href="/"><i className="ti-twitter-alt"></i></Link></li>
                                        <li><Link href="/"><i className="ti-instagram"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="middle-couple-pic">
                                <Image src={hImg2} alt="" />
                            </div>
                            <div className="text-grid groom">
                                <div className="couple-img">
                                    <Image src={hImg3} alt="" />
                                </div>
                                <h3>Sarah Margrate</h3>
                                <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
                                    lacus vel facilisis. </p>
                                <div className="social">
                                    <ul>
                                        <li><Link href="/"><i className="ti-facebook"></i></Link></li>
                                        <li><Link href="/"><i className="ti-twitter-alt"></i></Link></li>
                                        <li><Link href="/"><i className="ti-instagram"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flower-shape-1"><Image src={hImg4} alt="" /></div>
            <div className="flower-shape-2"><Image src={hImg5} alt="" /></div>
        </section>
    )
}

export default Hero4;