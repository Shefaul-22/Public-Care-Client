import React from 'react';
import { Link } from 'react-router';

const AboutUs = () => {

    return (

        <div className="bg-gray-50 py-10 max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                {/* Image */}
                <div className="flex-1">
                    <img
                        src="https://i.ibb.co/SXp99rdB/image.png"
                        alt="About Us"
                        className="w-full rounded-lg shadow-lg object-cover"
                    />
                </div>

                {/* Text */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">
                        About CivicCare
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        CivicCare is committed to improving city life by offering
                        fast, reliable, and transparent civic services. From repairing
                        roads to fixing streetlights and managing public cleanliness,
                        our goal is to make your community safer and more comfortable.
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Our dedicated team works tirelessly to ensure timely resolutions,
                        real-time tracking, and a seamless reporting experience for all
                        citizens. Join us in building a better city, one service at a time.
                    </p>

                    <Link to="/services" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        Learn More
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
