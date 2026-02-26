import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TypeWriter from './TypeWriter';
import { Link } from 'react-router';




const slides = [

    {
        img: "https://i.ibb.co.com/5W3mYsJn/image.png",
        title: "Your Voice. Your City.",
        desc: "Report civic issues instantly and help improve your community.",
        btn: "Get Started",
        link: "/allIssues"
    },

    {
        img: "https://i.ibb.co.com/wNtL4Y61/image.png",
        title: "Report Garbage Overflow",
        desc: "Help keep your city clean and healthy.",
        btn: "Report Now",
        link: "/post-issue"
    },

    {
        img: "https://i.ibb.co.com/SXp99rdB/image.png",
        title: "Fix Road Potholes",
        desc: "Ensure safer roads for everyone.",
        btn: "Submit Complaint",
        link: "/post-issue"

    },

    {
        img: "https://i.ibb.co.com/99BsYTjd/image.png",
        title: "Repair Streetlights",
        desc: "Improve visibility and public safety.",
        btn: "Request Service",
        link: "/service-centers"
    },

    {
        img: "https://i.ibb.co.com/HDtqp0ZW/image.png",
        title: "Water Leakage Issues",
        desc: "Prevent water wastage in your area.",
        btn: "Report Issue",
        link: "/post-issue"
    },

    {
        img: "https://i.ibb.co.com/N243grq5/image.png",
        title: "Damaged Footpaths",
        desc: "Make walking safe and accessible.",
        btn: "Take Action",
        link: "/post-issue"
    }

];

const Banner = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [startDesc, setStartDesc] = useState(false);

    return (

        <Carousel
            autoPlay
            infiniteLoop
            interval={6000}
            showThumbs={false}
            showStatus={false}

            onChange={(index) => {

                setActiveIndex(index);
                setStartDesc(false);

            }}
        >

            {
                slides.map((slide, index) => (

                    <div key={index} className="relative w-full h-[60vh] ">

                        <img
                            src={slide.img}
                            alt={slide.title}
                            className="h-[60vh]  w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/50   px-4 md:px-16">

                            <div className="text-white pt-18 md:pt-12">

                                <h1 className="text-2xl md:text-6xl font-bold mb-4">

                                    <TypeWriter
                                        key={"title" + activeIndex}
                                        text={slide.title}
                                        speed={100}
                                        start={activeIndex === index}
                                        onComplete={() => setStartDesc(true)}
                                        lastColor={true}
                                    />

                                </h1>

                                <p className="mb-6 text-lg md:text-xl">

                                    <TypeWriter
                                        key={"desc" + activeIndex}
                                        text={slide.desc}
                                        speed={50}
                                        start={startDesc && activeIndex === index}
                                    />

                                </p>


                                <Link to={slide.link} className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-full text-lg font-semibold">
                                    {slide.btn}
                                </Link>
                            </div>


                        </div>

                    </div>

                ))}

        </Carousel>

    );
};

export default Banner;