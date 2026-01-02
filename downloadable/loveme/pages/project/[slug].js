import React, { Fragment } from 'react';
import { useRouter } from 'next/router'
import Projects from '../../api/projects'
import Link from 'next/link'
import { Gallery, Item } from 'react-photoswipe-gallery'
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';



const ProjectSinglePage = (props) => {
    const router = useRouter()

    const projectDetails = Projects.find(item => item.slug === router.query.slug)


    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }


    return (
        <Fragment>
            <Navbar alwaysWhite withOffsetBand />
            <PageTitle pageTitle={projectDetails?.title} pagesub={projectDetails?.title} />
            <section className="wpo-portfolio-single-section section-padding">
                <div className="container">
                    <div className="portfolio-single-wrap">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-12">
                                <div className="portfolio-single-img">
                                    <img src={projectDetails?.pSimg} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="portfolio-single-text">
                                    <h2>{projectDetails?.title}</h2>
                                    <span>New York – 1075 Firs Avenue</span>
                                    <p>Randomised words which don't look even slightly believable. If you are going to use a
                                        passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden
                                        in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat
                                        predefined chunks as necessary, making this the first true generator on the
                                        Internet.</p>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                        suffered alteration in some form, by injected humour, or randomised words which
                                        don't look even slightly believable. </p>
                                    <div className="wpo-portfolio-single-content-des">
                                        <ul>
                                            <li>Client :<span>Robert William</span></li>
                                            <li>Location :<span>7 Lake Street,London</span></li>
                                            <li>Date :<span>20 Apr 2022</span></li>
                                            <li>Duration : <span>3 Month</span></li>
                                            <li>Tag :<span>Wedding, Planning</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wpo-portfolio-section-s3 section-padding">
                        <h2 className="hidden">some</h2>
                        <div className="sortable-gallery">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="portfolio-grids gallery-container clearfix">
                                        <Gallery >
                                            {Projects.slice(0, 3).map((project, pitem) => (
                                                <div className="grid" key={pitem}>
                                                    <div className="img-holder">
                                                        <Item
                                                            original={project.pimg1}
                                                            thumbnail={project.pimg1}
                                                            width="600"
                                                            height="700"
                                                        >
                                                            {({ ref, open }) => (
                                                                <img ref={ref} onClick={open} src={project.pimg1} />
                                                            )}
                                                        </Item>
                                                    </div>
                                                </div>
                                            ))}
                                        </Gallery>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pagi">
                        <ul>
                            <li><Link onClick={ClickHandler} href='/project/[slug]' as={`/project/Maria-Robin`}><i className="fi flaticon-left-arrow"></i> Previous</Link></li>
                            <li><Link onClick={ClickHandler} href='/project/[slug]' as={`/project/Rose-Harry`}>Next <i className="fi flaticon-right-arrow-1"></i></Link></li>
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    )
};
export default ProjectSinglePage;
