import React from 'react'
import Link from 'next/link'
import SectionTitle from '../../components/SectionTitle'
import PrImg2 from '/public/images/pricing/2.png'
import PrImg3 from '/public/images/pricing/3.png'
import Image from 'next/image'


const Pricing = [
    {
        prImg: '/images/boris/rental_equipment/chair/wr16.png',
        pakage: 'Basic',
        price: '250',
        subs: 'Monthly',
        l1: 'Stylish makeup for bride.',
        l2: 'Top label arrengement',
        l3: 'Amazing meal & breakfast',
        l4: 'Manicure & Pedicure',
        l5: 'Full body Polish',
    },
    {
        prImg: PrImg2,
        pakage: 'Standard',
        price: '550',
        subs: 'Monthly',
        l1: 'Stylish makeup for bride.',
        l2: 'Top label arrengement',
        l3: 'Amazing meal & breakfast',
        l4: 'Manicure & Pedicure',
        l5: 'Full body Polish',
    },
    {
        prImg: PrImg3,
        pakage: 'Luxary',
        price: '880',
        subs: 'Yearly',
        l1: 'Stylish makeup for bride.',
        l2: 'Top label arrengement',
        l3: 'Amazing meal & breakfast',
        l4: 'Manicure & Pedicure',
        l5: 'Full body Polish',
    },
]


const PricingSection = (props) => {

    return (
        <section className={`wpo-pricing-section section-padding ${props.ptClass}`}>
            <div className="container">
                <SectionTitle topTitle={'Pricing'} MainTitle={'Wedding Packages'} />
                <div className="wpo-pricing-wrap">
                    <div className="row">
                        {Pricing.map((pricing, pitem) => (
                            <div className="col col-lg-4 col-md-6 col-12" key={pitem}>
                                <div className="wpo-pricing-item">
                                    <div className="wpo-pricing-top">
                                        <div className="wpo-pricing-img">
                                            <Image src={pricing.prImg} alt="" />
                                        </div>
                                        <div className="wpo-pricing-text">
                                            <h4>{pricing.pakage}</h4>
                                            <h2>${pricing.price}<span>/{pricing.subs}</span></h2>
                                        </div>
                                    </div>
                                    <div className="wpo-pricing-bottom">
                                        <div className="wpo-pricing-bottom-text">
                                            <ul>
                                                <li>{pricing.l1}</li>
                                                <li>{pricing.l2}</li>
                                                <li>{pricing.l3}</li>
                                                <li>{pricing.l4}</li>
                                                <li>{pricing.l5}</li>
                                            </ul>
                                            <Link href="/pricing">Choose Package</Link>
                                        </div>
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

export default PricingSection;