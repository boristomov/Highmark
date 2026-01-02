// images
import blogImg1 from "/public/images/blog/img-1.jpg";
import blogImg2 from "/public/images/blog/img-2.jpg";
import blogImg3 from "/public/images/blog/img-3.jpg";

import blogSingleImg1 from "/public/images/blog/img-4.jpg";
import blogSingleImg2 from "/public/images/blog/img-5.jpg";
import blogSingleImg3 from "/public/images/blog/img-6.jpg";


const blogs = [
    {
        id: '1',
        title: 'Best wedding gift you may like & choose.',
        slug:'Best-wedding-gift',
        screens: blogImg1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.',
        author: 'Loura Sweety',
        create_at: '25 Sep 2021',
        blogSingleImg:blogSingleImg1, 
        comment:'35',
        blClass:'format-standard-image',
    },
    {
        id: '2',
        title: 'Photography is the important part of wedding.',
        slug:'Photography',
        screens: blogImg2,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.',
        author: 'David Luis',
        create_at: '23 Sep 2021',
        blogSingleImg:blogSingleImg2, 
        comment:'80',
        blClass:'format-standard-image',
    },
    {
        id: '3',
        title: 'Top 10 wedding fresh flower decoration idea.',
        slug:'Top-10-wedding',
        screens: blogImg3,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.',
        author: 'Jenefer Willy',
        create_at: '21 Sep 2023',
        blogSingleImg:blogSingleImg3,
        comment:'95',
        blClass:'format-video',
    },
];

export default blogs;
