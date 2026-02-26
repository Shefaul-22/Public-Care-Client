import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [

    {
        img: "https://i.ibb.co.com/5W3mYsJn/image.png",
        title: "Your Voice. Your City.",
        desc: "Report civic issues instantly and help improve your community.",
        btn: "Get Started"
    },
    {
        img: "https://i.ibb.co.com/wNtL4Y61/image.png",
        title: "Report Garbage Overflow",
        desc: "Help keep your city clean and healthy.",
        btn: "Report Now"
    },
    {
        img: "https://i.ibb.co.com/SXp99rdB/image.png",
        title: "Fix Road Potholes",
        desc: "Ensure safer roads for everyone.",
        btn: "Submit Complaint"
    },
    {
        img: "https://i.ibb.co.com/99BsYTjd/image.png",
        title: "Repair Streetlights",
        desc: "Improve visibility and public safety.",
        btn: "Request Service"
    },
    {
        img: "https://i.ibb.co.com/HDtqp0ZW/image.png",
        title: "Water Leakage Issues",
        desc: "Prevent water wastage in your area.",
        btn: "Report Issue"
    },
    {
        img: "https://i.ibb.co.com/N243grq5/image.png",
        title: "Damaged Footpaths",
        desc: "Make walking safe and accessible.",
        btn: "Take Action"
    }
];

const Banner = () => {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            interval={2000}
            showThumbs={false}
            showStatus={false}

             
        >
            {slides.map((slide, index) => (
                <div key={index} className="relative w-full h-[60vh]">
                    <img
                        src={slide.img}
                        alt={slide.title}
                        className="h-[60vh] w-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center md:justify-normal px-4 md:px-16">
                        <div className=" text-white">
                            <h1 className="text-2xl md:text-6xl font-bold mb-4">
                                {slide.title}
                            </h1>

                            <p className="mb-6 text-lg md:text-xl">
                                {slide.desc}
                            </p>

                            <button className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-full text-lg font-semibold">
                                {slide.btn}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;