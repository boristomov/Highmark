import React from 'react'
import Link from 'next/link'
import catimg from '/public/images/category/1.jpg'
import catimg2 from '/public/images/category/2.jpg'
import catimg3 from '/public/images/category/3.jpg'
import Image from 'next/image'



const Category = (props) => {
    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }
    return(
        <section className="wpo-category-section">
            <div className="container-fluid">
                <div className="wpo-category-wrap">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-category-item">
                                <div className="wpo-category-img">
                                    <Image src={catimg} alt=""/>
                                </div>
                                <div className="wpo-category-text">
                                    <Link onClick={ClickHandler} href="/shop">Wedding Shoes</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-category-item">
                                <div className="wpo-category-img">
                                    <Image src={catimg2} alt=""/>
                                </div>
                                <div className="wpo-category-text">
                                    <Link onClick={ClickHandler} href="/shop">Wedding Cake</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-category-item">
                                <div className="wpo-category-img">
                                    <Image src={catimg3} alt=""/>
                                </div>
                                <div className="wpo-category-text">
                                    <Link onClick={ClickHandler} href="/shop">Wedding bouquet</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Category;