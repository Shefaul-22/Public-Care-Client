import React from 'react';
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/json/404-animation.json'; 
console.log(errorAnimation);


const ErrorPage = () => {

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-6">
            {/* Lottie animation */}
            <div className=" w-2/3 md:w-1/2  mb-6">
                <Lottie animationData={errorAnimation} loop={true} />
            </div>

            
            <h2 className="text-5xl font-bold mb-2 text-center">Oops! Page not found.</h2>
            <p className="text-gray-600 mb-6 text-center text-lg md:text-2xl">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            {/* Back button */}
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;
