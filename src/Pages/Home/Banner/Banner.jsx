import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";




const Banner = () => {
    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={1000}
        >
            <div className='relative'>
                <img src="https://i.ibb.co.com/wNtL4Y61/image.png" />
                <div className="absolute inset-0 flex gap-4 top-[50%] left-2/5 -translate-x-1/2 ">
                    <button className='btn' >Fixing garbase overflow</button>

                </div>

            </div>
            <div className='relative'>
                <img src="https://i.ibb.co.com/SXp99rdB/image.png" />
                <div className="absolute inset-0 flex gap-4 top-[50%] left-2/5 -translate-x-1/2 ">
                    <button className='btn' >Repair patholes</button>

                </div>

            </div>
            <div className='relative'>
                <img src="https://i.ibb.co.com/KpmTQSs8/image.png" />
                <div className="absolute inset-0 flex gap-4 top-[50%] left-2/5 -translate-x-1/2 ">
                    <button className='btn' >Repair streetlightes</button>

                </div>

            </div>
            <div className='relative'>
                <img src="https://i.ibb.co.com/HDtqp0ZW/image.png" />
                <div className="absolute inset-0 flex gap-4 top-[50%] left-2/5 -translate-x-1/2 ">
                    <button className='btn' >Fixing water leakage</button>

                </div>

            </div>
            <div className='relative'>
                <img src="https://i.ibb.co.com/N243grq5/image.png" />
                <div className="absolute inset-0 flex gap-4 top-[50%] left-2/5 -translate-x-1/2 ">
                    <button className='btn' >Repair damaged footpaths</button>

                </div>

            </div>


        </Carousel>

    );
};

export default Banner;