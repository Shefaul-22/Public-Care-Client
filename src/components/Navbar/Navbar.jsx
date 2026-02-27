import React from 'react';
import { Link, NavLink } from 'react-router';
import UseAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { BiSolidHomeCircle, BiStar } from 'react-icons/bi';
import useRole from '../../hooks/useRole';
import { MdContactPhone, MdOutlineLogin, MdReportProblem, MdSyncProblem } from 'react-icons/md';
import { FcServices } from 'react-icons/fc';
import { HiInformationCircle } from 'react-icons/hi';

const Navbar = () => {

    const { user, logOutUser } = UseAuth();
    // console.log(user);

    const { role } = useRole();

    const axiosSecure = useAxiosSecure();

    const { data: userData = {},
        // refetch

    } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,

        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${encodeURIComponent(user.email)}`);
            return res.data;
        }
    })

    // console.log(userData.role);


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
                // console.log(error);

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
            `mr-5  font-semibold flex  ${isActive ? "text-blue-700 border-b-2 border-blue-600 "
                : "text-gray-800 hover:text-blue-600"
            }`

        }><BiSolidHomeCircle size={20} /><span className='pl-1'>Home</span></NavLink>

        <NavLink to="/allIssues" className={({ isActive }) =>
            `mr-5 pb-1 font-semibold flex ${isActive ? "text-blue-800 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }><MdSyncProblem size={20} /><span className='pl-1'>All Issues</span></NavLink>

        <NavLink to="/services" className={({ isActive }) =>
            `mr-5 pb-1 font-semibold flex ${isActive ? "text-blue-800 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }><FcServices size={20} /><span className='pl-1'>Services</span></NavLink>


        <NavLink to="/aboutUs" className={({ isActive }) =>
            `mr-5 pb-1 font-semibold flex ${isActive ? "text-blue-800 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }><HiInformationCircle size={20} /><span className='pl-1'>About Us</span></NavLink>

        <NavLink to="/service-centers" className={({ isActive }) =>
            `mr-5 pb-1 font-semibold flex ${isActive ? "text-blue-800 border-b-2 border-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`

        }><MdContactPhone size={20}/><span className='pl-1'>Contact</span></NavLink>

        {
            (role === "user" || role === "premiumUser") && <NavLink to="/post-issue" className={({ isActive }) =>
                `mr-5 pb-1 font-semibold flex ${isActive ? "text-blue-800 border-b-2 border-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`

            }><MdReportProblem size={20} /><span className='pl-1'>Report An Issue</span></NavLink>
        }



    </>


    return (
        <div>
            <div className="navbar fixed top-0 z-50 bg-gradient-to-r from-purple-300 to-indigo-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow flex gap-2">

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
                        <Link to="/login" className="btn text-white bg-primary flex items-center">
                            <MdOutlineLogin size={20}/><span>Login</span>
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;