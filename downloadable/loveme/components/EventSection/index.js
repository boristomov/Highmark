import React from 'react'
import SectionTitleS2 from '../SectionTitleS2'
import LocationMap from '../Modal'
import sImg1 from '/public/images/event-shape-1.png'
import sImg2 from '/public/images/event-shape-2.png'
import Image from 'next/image'

const Events = [
    {
        Simg1: sImg1,
        Simg2: sImg2,
        title:'The Reception',
        li1:'Monday, 25 Sep, 2021 1:00 PM – 4:30 PM',
        li2:'Estern Comunity Centure, 525 Road 123, USA',
        li3:'+12345678910',
    },
    {
        Simg1: sImg1,
        Simg2: sImg2,
        title:'THE CEREMONY',
        li1:'Monday, 25 Sep, 2021 1:00 PM – 4:30 PM',
        li2:'Estern Comunity Centure, 525 Road 123, USA',
        li3:'+12345678910',
    },
    {
        Simg1: sImg1,
        Simg2: sImg2,
        title:'Wedding Party',
        li1:'Monday, 25 Sep, 2021 1:00 PM – 4:30 PM',
        li2:'Estern Comunity Centure, 525 Road 123, USA',
        li3:'+12345678910',
    },

]

const EventSection = (props) => {
    return (
        <section className={`wpo-event-section section-padding ${props.eClass}`} id="events">
            <div className="container">
                <SectionTitleS2 MainTitle={'TIME AND PLACE'} />
                <div className="wpo-event-wrap">
                    <div className="row">
                        {Events.map((event, eitem) => (
                            <div className="col col-lg-4 col-md-6 col-12" key={eitem}>
                                <div className="wpo-event-item">
                                    <div className="wpo-event-text">
                                        <h2>{event.title}</h2>
                                        <ul>
                                            <li>{event.li1}</li>
                                            <li>{event.li2}</li>
                                            <li>Phone : {event.li3}</li>
                                            <li><LocationMap/></li>
                                        </ul>
                                    </div>
                                    <div className="event-shape-1">
                                        <Image src={event.Simg1} alt="" />
                                    </div>
                                    <div className="event-shape-2">
                                        <Image src={event.Simg2} alt="" />
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

export default EventSection;