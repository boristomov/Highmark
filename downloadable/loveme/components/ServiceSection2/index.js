import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { Services } from '../../api/service'
import Link from 'next/link'


const ServiceSection2 = (props) => {
    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }

    return(
        <section className={`wpo-service-section-s2 section-padding ${props.sSClass}`}>
        <div className="container">
            <SectionTitle topTitle={'Our Services'} MainTitle={'What We Can Do'}/>
            <div className="wpo-service-wrap">
                <div className="row">
                {Services.map((service, sitem) => (
                    <div className="col-lg-4 col-md-6 col-12" key={sitem}>
                        <div className="wpo-service-item">
                            <div className="wpo-service-text">
                                <div className="s-icon">
                                    <i className={`fi  ${service.fIcon1}`}></i>
                                </div>
                                <Link onClick={ClickHandler} href='/service/[slug]' as={`/service/${service.slug}`}>{service.title}</Link>
                                <p>{service.description}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
    )
}

export default ServiceSection2;