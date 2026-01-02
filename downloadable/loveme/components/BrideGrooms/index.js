import React from "react";
import Link from 'next/link'
import SectionTitleS2 from "../SectionTitleS2";
import CtaSection2 from "../CtaSection2";
import timg1 from '/public/images/team/img-1.jpg'
import timg2 from '/public/images/team/img-2.jpg'
import timg3 from '/public/images/team/img-3.jpg'
import timg4 from '/public/images/team/img-4.jpg'
import timg5 from '/public/images/team/img-5.jpg'
import timg6 from '/public/images/team/img-6.jpg'
import timg7 from '/public/images/team/img-7.jpg'
import timg8 from '/public/images/team/img-8.jpg'
import Image from "next/image";

const Brides = [
  {
    id: '1',
    tImg: timg1,
    name: 'Maria D’Soza',
    title: 'Sister',
  },
  {
    id: '2',
    tImg: timg2,
    name: 'John Abraham',
    title: 'Best Friend',
  },
  {
    id: '3',
    tImg: timg3,
    name: 'Elizabeth Anny',
    title: 'Sister',
  },
  {
    id: '4',
    tImg: timg4,
    name: 'Robert Willy',
    title: 'Brother',
  }
]
const Grooms = [
  {
    id: '1',
    tImg: timg5,
    name: 'Maria D’Soza',
    title: 'Brother',
  },
  {
    id: '2',
    tImg: timg6,
    name: 'John Abraham',
    title: 'Best Friend',
  },
  {
    id: '3',
    tImg: timg7,
    name: 'Elizabeth Anny',
    title: 'Sister',
  },
  {
    id: '4',
    tImg: timg8,
    name: 'Robert Willy',
    title: 'Friend',
  }
]


const BrideGrooms = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }

  return (
    <section className="bride-groom-section">
      <div className="wpo-team-section section-padding">
        <div className="container">
          <SectionTitleS2 MainTitle={'Bridesmaids'} />
          <div className="wpo-team-wrap">
            <div className="row">
              {Brides.slice(0, 6).map((Bride, tm) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={tm}>
                  <div className="wpo-team-item">
                    <div className="wpo-team-img">
                      <Image src={Bride.tImg} alt="" />
                    </div>
                    <div className="wpo-team-text">
                      <h3>{Bride.name}</h3>
                      <span>{Bride.title}</span>
                      <ul>
                        <li><Link onClick={ClickHandler} href="/"><i className="ti-facebook"></i></Link></li>
                        <li><Link onClick={ClickHandler} href="/"><i className="ti-twitter-alt"></i></Link></li>
                        <li><Link onClick={ClickHandler} href="/"><i className="ti-linkedin"></i></Link></li>
                        <li><Link onClick={ClickHandler} href="/"><i className="ti-instagram"></i></Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CtaSection2 />
      <div className="wpo-team-section section-padding">
        <div className="container">
          <SectionTitleS2 MainTitle={'Groomsmen'} />
          <div className="wpo-team-wrap">
            <div className="row">
              {Grooms.slice(0, 6).map((Groom, gm) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={gm}>
                  <div className="wpo-team-item">
                    <div className="wpo-team-img">
                      <Image src={Groom.tImg} alt="" />
                    </div>
                    <div className="wpo-team-text">
                      <h3>{Groom.name}</h3>
                      <span>{Groom.title}</span>
                      <ul>
                        <li><Link onClick={ClickHandler} href="/"><i className="ti-facebook"></i></Link></li>
                        <li><Link onClick={ClickHandler} href="/"><i className="ti-twitter-alt"></i></Link></li>
                        <li><Link onClick={ClickHandler} href="/"><i className="ti-linkedin"></i></Link></li>
                        <li><Link onClick={ClickHandler} href="/"><i className="ti-instagram"></i></Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrideGrooms;