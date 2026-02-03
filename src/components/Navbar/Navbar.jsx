import React from 'react';
import { Link, NavLink } from 'react-router';
import UseAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { BiStar } from 'react-icons/bi';
import useRole from '../../hooks/useRole';

const Navbar = () => {

    const { user, logOutUser } = UseAuth();
    // console.log(user);

    const { role } = useRole();

    const axiosSecure = useAxiosSecure();

    const { data: userData = [],
        // refetch

    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        }
    })

    const handleSignOut = () => {
        logOutUser()
            .then(() => {
                Swal.fire({
                    title: "Signed Out!",
                    text: "You have signed out successfully.",
                    icon: "success",
                    confirmButtonColor: "#6366F3",
                });
            })
            .catch(error => {
                console.log(error);

                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#EF4444",
                });
            })
    }

    const links = <>

        <NavLink to="/" className={({ isActive }) =>
            `mr-5 pb-1 font-semibold ${isActive ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }>Home</NavLink>

        <NavLink to="/allIssues" className={({ isActive }) =>
            `mr-5 pb-1 font-semibold ${isActive ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }>All Issues</NavLink>

        <NavLink to="/services" className={({ isActive }) =>
            `mr-5 pb-1 font-semibold ${isActive ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }>Services</NavLink>


        <NavLink to="/aboutUs" className={({ isActive }) =>
            `mr-5 pb-1 font-semibold ${isActive ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }>About Us</NavLink>

        <NavLink to="/service-centers" className={({ isActive }) =>
            `mr-5 pb-1 font-semibold ${isActive ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }>Service Centers</NavLink>

        {
            (role === "user" || role === "premiumUser") && <NavLink to="/post-issue" className={({ isActive }) =>
                `mr-5 pb-1 font-semibold ${isActive ? "text-blue-700 border-b-2 border-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`

            }>Report An Issue</NavLink>
        }



    </>


    return (
        <div>
            <div className="navbar bg-gradient-to-r from-blue-200 to-indigo-100 shadow-sm">
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
                    <Link to="/" className="btn btn-ghost text-xl"><img className="w-10 h-10 rounded-full" src="https://i.ibb.co.com/7d0qMChV/image.png" alt="Logo" />CivicCare</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                        {links}

                    </ul>
                </div>
                <div className="navbar-end">

                    {/* <Link to="/login" className="btn text-white bg-blue-600 hover:bg-blue-500">Login</Link> */}
                    {user ? (
                        <div className="dropdown dropdown-end">


                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        alt="User"
                                        src={user.photoURL ? user.photoURL : "https://i.ibb.co.com/JWv2ftcD/usericon.jpg"}
                                    />
                                </div>
                            </label>

                            {/* photo click -> open dropdown here */}
                            <ul
                                tabIndex={0}
                                className="mt-3 z-50 p-4 shadow-xl menu menu-sm dropdown-content bg-base-200 rounded-xl w-60"
                            >

                                <li className="flex flex-col items-start pb-3 border-b mb-3">

                                    <span className="text-lg font-semibold flex items-center">
                                        {user.displayName || "User"}
                                        {userData.role === "premiumUser" && (
                                            <span className='bg-yellow-400 flex items-center px-2 py-1 rounded-sm'> <BiStar></BiStar> User</span>
                                        )}
                                    </span>

                                    <span className="text-sm text-gray-500">
                                        {user.email}
                                    </span>
                                </li>

                                {/* <Link to="/profile" className="btn btn-error btn-sm w-full text-white mb-3">
                                    Profile
                                </Link> */}

                                <Link to="/dashboard" className="btn btn-error btn-sm w-full text-white mb-3">
                                    Dashboard
                                </Link>


                                <li>
                                    <button
                                        onClick={handleSignOut}
                                        className="btn btn-error btn-sm w-full text-white"
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary">
                            Login
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;