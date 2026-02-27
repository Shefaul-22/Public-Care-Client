import React, { useEffect } from 'react';
import { NavLink, Outlet, useMatches } from 'react-router';

import { FaRegCreditCard, FaUser } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { LuUserCog } from "react-icons/lu";
import { HiUserAdd } from "react-icons/hi";
import { FiSettings, FiLogOut } from "react-icons/fi";

import useRole from '../hooks/useRole';
import UseAuth from '../hooks/UseAuth';
import useTheme from '../hooks/useTheme';
import Loading from '../components/Loading/Loading';

const DashboardLayout = () => {

    const { role ,roleLoading} = useRole();
    // console.log(role);
    const { logOutUser } = UseAuth();
    const { theme, toggleTheme } = useTheme();

    const closeDrawer = () => {
        document.getElementById("my-drawer-4").checked = false;
    };

    const matches = useMatches();

    useEffect(() => {
        const currentRoute = matches.find(
            (match) => match.handle?.title
        );

        document.title = currentRoute
            ? `${currentRoute.handle.title} | Civic Care`
            : "Civic Care";

    }, [matches]);

    const handleLogout = async () => {
        try {
            await logOutUser();
            closeDrawer();
        } catch (error) {
            console.error(error);
        }
    };

    // DaisyUI 
    const navItemStyle = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200
        ${isActive
            ? "bg-primary text-primary-content font-medium"
            : "text-base-content hover:bg-base-200"
        }`;

        if(roleLoading) return <Loading></Loading>

    return (

        <div className="drawer lg:drawer-open min-h-screen w-full bg-base-200">

            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* ================= CONTENT ================= */}
            <div className="drawer-content flex flex-col w-full">

                {/* ===== NAVBAR ===== */}
                <nav className="navbar bg-base-100 border-b border-base-300 px-6 shadow-sm">

                    <label
                        htmlFor="my-drawer-4"
                        className="btn btn-square btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>

                    <div className="text-xl font-semibold capitalize text-base-content">
                         Dashboard
                    </div>

                </nav>

                {/* ===== PAGE CONTENT ===== */}
                <div className="flex-1 px-6 py-6 text-base-content">
                    <Outlet />
                </div>

            </div>

            {/* ================= SIDEBAR ================= */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <div className="flex min-h-full w-64 flex-col bg-base-100 border-r border-base-300 shadow-sm">

                    {/* ===== SIDEBAR HEADER ===== */}
                    <div className="flex items-center justify-between px-4 py-4 border-b border-base-300">

                        <h2 className="text-lg font-bold text-primary">
                            CivicCare
                        </h2>

                        {/* DaisyUI Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="btn btn-sm btn-ghost"
                        >
                            {theme === "light" ? "🌙" : "☀️"}
                        </button>

                    </div>

                    <ul className="menu p-4 space-y-2 text-base-content">

                        {/* Dashboard Home */}
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={navItemStyle}
                                onClick={closeDrawer}
                                end
                            >
                                <MdReportProblem className="size-5" />
                                Dashboard Home
                            </NavLink>
                        </li>

                        {/* USER */}
                        {(role === "user" || role === "premiumUser") && (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/my-issues"
                                        className={navItemStyle}
                                        onClick={closeDrawer}
                                    >
                                        <MdReportProblem className="size-5" />
                                        My Issues
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/allPayments-history"
                                        className={navItemStyle}
                                        onClick={closeDrawer}
                                    >
                                        <FaRegCreditCard className="size-5" />
                                        Payment History
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* STAFF */}
                        {role === "staff" && (
                            <li>
                                <NavLink
                                    to="/dashboard/staff-assigned-issues"
                                    className={navItemStyle}
                                    onClick={closeDrawer}
                                >
                                    <MdReportProblem className="size-5" />
                                    Assigned Issues
                                </NavLink>
                            </li>
                        )}

                        {/* ADMIN */}
                        {role === "admin" && (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/admin-all-issues"
                                        className={navItemStyle}
                                        onClick={closeDrawer}
                                    >
                                        <MdReportProblem className="size-5" />
                                        All Issues
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/addStaff"
                                        className={navItemStyle}
                                        onClick={closeDrawer}
                                    >
                                        <HiUserAdd className="size-5" />
                                        Add & Manage Staff
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/manage-users"
                                        className={navItemStyle}
                                        onClick={closeDrawer}
                                    >
                                        <LuUserCog className="size-5" />
                                        Manage Users
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/allPayments-history"
                                        className={navItemStyle}
                                        onClick={closeDrawer}
                                    >
                                        <FaRegCreditCard className="size-5" />
                                        Payment History
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* PROFILE */}
                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                className={navItemStyle}
                                onClick={closeDrawer}
                            >
                                <FaUser className="size-5" />
                                Profile
                            </NavLink>
                        </li>

                        {/* Divider */}
                        <div className="border-t border-base-300 pt-4 space-y-2">

                            <li>
                                <NavLink
                                    to="/dashboard/settings"
                                    className={navItemStyle}
                                    onClick={closeDrawer}
                                >
                                    <FiSettings className="size-5" />
                                    Settings
                                </NavLink>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-error hover:bg-error/10 transition-all duration-200 w-full"
                                >
                                    <FiLogOut className="size-5" />
                                    Logout
                                </button>
                            </li>

                        </div>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;