import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {

    const { userName, review: Testimonial, userPhotoUrl ,userCity } = review ;
    return (
        <div className="flex justify-center items-center  bg-gray-100 p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-sm border border-gray-100 rounded-3xl p-8">
                {/* Quote Icon */}
                <div className="text-teal-100 text-5xl mb-4">
                    <FaQuoteLeft />
                </div>

                {/* Testimonial */}
                <div className="card-body p-0">
                    <p className="text-gray-600 text-lg leading-relaxed font-medium">
                        {Testimonial}
                    </p>


                    <div className="border-t-2 border-dotted border-gray-300 my-8"></div>

                    {/* Profile */}
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="w-16 h-16 rounded-full bg-[#004246]">
                                <img src={userPhotoUrl}></img>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[#004246]">{userName}</h2>
                            <p className="text-gray-500 font-medium">{userCity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;