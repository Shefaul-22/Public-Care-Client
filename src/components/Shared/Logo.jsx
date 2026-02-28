import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link
            to="/"
            className="group flex items-center gap-0 hover:gap-3 px-2 py-2 bg-base-200/50 hover:bg-[#fa0bd2]/10 rounded-full transition-all duration-500 ease-in-out border border-transparent hover:border-[#fa0bd2]/20 shadow-sm hover:shadow-md w-fit"
        >
            {/* Logo Image with Rotation Effect */}
            <div className="relative w-14 h-14 md:w-16 md:h-16 transform group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out">
                <img
                    src="https://i.ibb.co.com/7d0qMChV/image.png"
                    className='w-full h-full rounded-full object-cover ring-2 ring-primary/10 group-hover:ring-[#fa0bd2]/30 transition-all'
                    alt="CivicCare Logo"
                />
            </div>

            {/* Sliding "Home" Text */}
            <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-500 ease-in-out">
                <span className="pr-4 font-black uppercase tracking-widest text-[#fa0bd2] text-sm md:text-base antialiased">
                    Home
                </span>
            </span>

            {/* Decorative Dot that glows on hover */}
            <div className="absolute -right-1 -top-1 w-0 h-0 group-hover:w-3 group-hover:h-3 bg-[#fa0bd2] rounded-full blur-[2px] transition-all duration-500 opacity-0 group-hover:opacity-70"></div>
        </Link>
    );
};

export default Logo;