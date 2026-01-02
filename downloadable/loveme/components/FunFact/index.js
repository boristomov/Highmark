import Image from 'next/image'
import React from 'react'
import ffImg1 from '/public/images/f-shape-1.png'
import ffImg2 from '/public/images/f-shape-2.png'

const funFact = [
  {
      title: '10+',
      subTitle: 'Years of Experience',
  },
  {
      title: '30+',
      subTitle: 'Weddings',
  },
  {
      title: '100+',
      subTitle: 'Unique Choices',
  },
  {
      title: '265+',
      subTitle: 'Locations',
  },


]


const FunFact = (props) => {
    return(
      <section className={`wpo-fun-fact-section ${props.fClass}`}>
          <div className="container">
              <div className="row">
                  <div className="col col-xs-12">
                      <div className="wpo-fun-fact-grids clearfix">
                          {funFact.map((funfact, fitem) => (
                                <div className="grid" key={fitem}>
                                    <div className="info">
                                        <h3>{funfact.title}</h3>
                                        <p>{funfact.subTitle}</p>
                                    </div>
                                </div>
                            ))}
                      </div>
                  </div>
              </div>
              {/* <div className="f-shape-1">
                  <Image src={ffImg1} alt=""/>
              </div>
              <div className="f-shape-2">
                  <Image src={ffImg2} alt=""/>
              </div> */}
          </div>
      </section>
    )
}

export default FunFact;