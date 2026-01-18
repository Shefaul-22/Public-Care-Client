import React, { useEffect, useState } from 'react';


import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


import ReviewCard from './ReviewCard';



const Reviews = () => {

    const [reviews, setRiviews] = useState([])

    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                setRiviews(result)
            })
    }, [])

    return (

        <div className='pt-8'>

            <div className='text-center my-7 space-y-4'>
                <h2 className='font-bold text-xl md:text-3xl'>What our customers are sayings </h2>
                <p className='px-6 md:px-16 lg:px-32 text-optional '>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>

            {reviews.length > 0 && (
                <Swiper
                    loop={true}

                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1.2}

                    breakpoints={{
                        //  screen width >= 640px (Tablet)
                        640: {
                            slidesPerView: 2,
                        },
                        // screen width >= 1024px (Desktop)
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    coverflowEffect={{
                        rotate: 10,
                        stretch: "50%",
                        scale: 0.75,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}

                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {
                        reviews.map(review => <SwiperSlide key={review.id}>
                            <ReviewCard review={review}></ReviewCard>
                        </SwiperSlide>)
                    }


                </Swiper>
            )}

        </div>

    );
};

export default Reviews;