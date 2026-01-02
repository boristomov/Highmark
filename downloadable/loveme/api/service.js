import simg1 from '/public/images/boris/homepageServices/chiavari chairs pics - brown 2.avif'
import simg2 from '/public/images/boris/homepageServices/chiavari chairs pics - white.avif'
import simg3 from '/public/images/boris/homepageServices/crossback chair pics - natural 2.avif'
import simg4 from '/public/images/boris/homepageServices/crossback chair pics - natural.avif'
import simg5 from '/public/images/boris/homepageServices/french chairs pics 2.avif'
import simg6 from '/public/images/service/img-6.jpg'

import sinnermg1 from '/public/images/service-single/2.jpg'
import sinnermg2 from '/public/images/service-single/3.jpg'

import singleImg1 from '/public/images/service-single/1.jpg'
import singleImg2 from '/public/images/service-single/4.jpg'
import singleImg3 from '/public/images/service-single/5.jpg'
import singleImg4 from '/public/images/service-single/6.jpg'
import singleImg5 from '/public/images/service-single/7.jpg'
import singleImg6 from '/public/images/service-single/8.jpg'

export const Services = [

    {
        id: '1',
        fIcon1: 'flaticon-gallery',
        title: 'Chairs & Seating',
        slug: 'chairs-seating',
        description: 'Chiavari, crossback, ghost, and specialty seating for any event.',
        simg1: simg1,
        ssImg: singleImg1,
        sinnerImg1: sinnermg1,
        sinnerImg2: sinnermg2,
    },
    {
        id: '2',
        fIcon1: 'flaticon-serving-dish',
        title: 'Tables & Linens',
        slug: 'tables-linens',
        description: 'Banquet, cocktail, and specialty tables with coordinated linens.',
        simg1: simg2,
        ssImg: singleImg2,
        sinnerImg1: sinnermg1,
        sinnerImg2: sinnermg2,
    },
    {
        id: '3',
        fIcon1: 'flaticon-edit',
        title: 'Tents & Canopies',
        slug: 'tents-canopies',
        description: 'Shade and shelter solutions sized and styled for your venue.',
        simg1: simg3,
        ssImg: singleImg3,
        sinnerImg1: sinnermg1,
        sinnerImg2: sinnermg2,
    },
    {
        id: '4',
        fIcon1: 'flaticon-wedding',
        title: 'Lighting & Power',
        slug: 'lighting-power',
        description: 'Ambient lighting, uplights, and power distribution for smooth events.',
        simg1: simg4,
        ssImg: singleImg4,
        sinnerImg1: sinnermg1,
        sinnerImg2: sinnermg2,
    },
    {
        id: '5',
        fIcon1: 'flaticon-cake',
        title: 'Staging & Dance Floors',
        slug: 'staging-dance-floors',
        description: 'Modular stages and dance floors to elevate your experience.',
        simg1: simg5,
        ssImg: singleImg5,
        sinnerImg1: sinnermg1,
        sinnerImg2: sinnermg2,
    },
    {
        id: '6',
        fIcon1: 'flaticon-wedding-rings',
        title: 'Delivery & Setup',
        description: 'Professional delivery, setup, and breakdown services you can trust.',
        // reuse an existing valid image to ensure carousel visibility
        simg1: simg2,
        ssImg: singleImg6,
        sinnerImg1: sinnermg1,
        sinnerImg2: sinnermg2,
    }
]
