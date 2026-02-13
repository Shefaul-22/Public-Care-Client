import React, { useEffect } from 'react';
import { NavLink, Outlet, useMatches } from 'react-router';

import { FaRegCreditCard, FaUser } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { LuUserCog } from "react-icons/lu";
import { HiUserAdd } from "react-icons/hi";

import useRole from '../hooks/useRole';




const DashboardLayout = () => {

    const { role } = useRole();

    //    console.log(role);

    const closeDrawer = () => {
        document.getElementById("my-drawer-4").checked = false;
    };

    const matches = useMatches();

    useEffect(() => {
        const currentRoute = matches.find(
            (match) => match.handle?.title
        );

        if (currentRoute) {
            document.title = `${currentRoute.handle.title} | Civic Care`;
        } else {
            document.title = "Civic Care";
        }

    }, [matches]);



    return (

        <div className="drawer lg:drawer-open p-2 md:p-4 lg:p-6 w-full bg-slate-100">

            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content w-full">
                {/* Navbar */}
                <nav className="navbar  bg-base-300">

                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost  lg:hidden">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-8"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>

                    <div className="px-4 text-xl md:text-2xl">CivicCare Dashboard</div>

                </nav>

                {/* Page content here */}

                <div className='w-full  px-2 md:px-4 py-3 flex flex-col items-stretch bg-slate-100'>
                    <Outlet></Outlet>
                </div>


            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">

                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

                <div className="flex min-h-full flex-col items-center bg-base-200 is-drawer-close:w-14 is-drawer-open:w-56 md:is-drawer-open:w-64">

                    {/* Sidebar content here */}
                    <ul className="menu w-full grow pt-14 mr-3">
                        {/* List item */}
                        <li >
                            <NavLink to="/" className={({ isActive }) =>
                                ` is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-error text-white border-b border-blue-600"
                                    : ""
                                }`}

                                onClick={closeDrawer}

                                data-tip="CivicCare Home" end><img src="https://i.ibb.co.com/7d0qMChV/image.png" className='w-12 h-10 md:h-8 ' alt="CivicCare Home" /><span className='inline md:hidden'>CivicCare Home</span></NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) =>
                                ` is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-error text-white border-b border-blue-600"
                                    : ""
                                }`}

                                onClick={closeDrawer}

                                data-tip="Dashboard Home" end>
                                {/* Home icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-8"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Dashboard Home</span>
                            </NavLink>
                        </li>

                        {/* User related links */}

                        {
                            (role === "user" || role === "premiumUser") && <>

                                <li >
                                    <NavLink to="/dashboard/my-issues" className={({ isActive }) =>
                                        ` is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-error text-white border-b border-blue-600"
                                            : ""
                                        }`}

                                        onClick={closeDrawer}

                                        data-tip="My Issues" end>
                                        <MdReportProblem className='w-8 h-8' />
                                        <span className="is-drawer-close:hidden">My Issues</span>
                                    </NavLink>
                                </li>


                                <li>

                                    <NavLink to="/dashboard/allPayments-history" className={({ isActive }) =>
                                        ` is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-error text-white border-b border-blue-600"
                                            : ""
                                        }`}

                                        onClick={closeDrawer}

                                        data-tip="Payment History" end>
                                        <FaRegCreditCard className='w-8 h-8' />
                                        <span className="is-drawer-close:hidden">Payment History</span>
                                    </NavLink>
                                </li>



                            </>
                        }

                        {/* Staff related dashboard links */}

                        {
                            (role === "staff") && <>

                                <li >
                                    <NavLink to="/dashboard/staff-assigned-issues" className={({ isActive }) =>
                                        ` is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-error text-white border-b border-blue-600"
                                            : ""
                                        }`}

                                        onClick={closeDrawer}

                                        data-tip="Assigned Issues" end>
                                        <MdReportProblem className='w-8 h-8' />
                                        <span className="is-drawer-close:hidden">Assigned Issues</span>
                                    </NavLink>
                                </li>

                            </>
                        }



                        {/* Admin related dashboard links */}

                        {
                            (role === "admin") && <>

                                <li >
                                    <NavLink to="/dashboard/admin-all-issues" className={({ isActive }) =>
                                        ` is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-error text-white border-b border-blue-600"
                                            : ""
                                        }`}

                                        onClick={closeDrawer}

                                        data-tip="All Issues" end>
                                        <MdReportProblem className='w-8 h-8' />
                                        <span className="is-drawer-close:hidden">All Issues</span>
                                    </NavLink>
                                </li>

                                <li >
                                    <NavLink to="/dashboard/addStaff" className={({ isActive }) =>
                                        ` is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-error text-white border-b border-blue-600"
                                            : ""
                                        }`}

                                        onClick={closeDrawer}

                                        data-tip="Add & Manage Staff" end>
                                        <HiUserAdd className='w-8 h-8' />
                                        <span className="is-drawer-close:hidden">Add &Manage Staff</span>

                                    </NavLink>
                                </li>

                                <li >
                                    <NavLink to="/dashboard/manage-users" className={({ isActive }) =>
                                        ` is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-error text-white border-b border-blue-600"
                                            : ""
                                        }`}

                                        onClick={closeDrawer}

                                        data-tip="Manage users" end>

                                        <LuUserCog className='w-8 h-8' />
                                        <span className="is-drawer-close:hidden">Manage Users</span>

                                    </NavLink>
                                </li>



                                <li>

                                    <NavLink to="/dashboard/allPayments-history" className={({ isActive }) =>
                                        ` is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-error text-white border-b border-blue-600"
                                            : ""
                                        }`}

                                        onClick={closeDrawer}

                                        data-tip="Payment History" end>
                                        <FaRegCreditCard className='w-8 h-8' />
                                        <span className="is-drawer-close:hidden">Payment History</span>
                                    </NavLink>
                                </li>




                            </>
                        }


                        {/* Profile */}
                        <li>

                            <NavLink to="/dashboard/profile" className={({ isActive }) =>
                                ` is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-error text-white border-b border-blue-600"
                                    : ""
                                }`}

                                onClick={closeDrawer}

                                data-tip="Your profile" end>
                                <FaUser className='w-8 h-8' />
                                <span className="is-drawer-close:hidden">Profile</span>
                            </NavLink>

                        </li>





                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-8"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </div >
    );
};

export default DashboardLayout;