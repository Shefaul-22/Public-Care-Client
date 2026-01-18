import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {

    const links = <>

        <NavLink to="/" className={({isActive}) => 
            `mr-5 pb-1 font-semibold ${
                isActive ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }>Home</NavLink>

        <NavLink to="/allIssues" className={({isActive}) => 
            `mr-5 pb-1 font-semibold ${
                isActive ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }>All Issues</NavLink>

        <NavLink to="/services" className={({isActive}) => 
            `mr-5 pb-1 font-semibold ${
                isActive ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }>Services</NavLink>
        
        <NavLink to="/aboutUs" className={({isActive}) => 
            `mr-5 pb-1 font-semibold ${
                isActive ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }>About Us</NavLink>
        

    </>


    return (
        <div>
            <div className="navbar bg-gradient-to-r from-blue-100 to-indigo-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            
                            {links}

                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl"><img className="w-10 h-10 rounded-full" src="https://i.ibb.co.com/7d0qMChV/image.png"  alt="Logo" />CivicCare</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        
                        {links}

                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to="/login" className="btn text-white bg-blue-600 hover:bg-blue-500">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;