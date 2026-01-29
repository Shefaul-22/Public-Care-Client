import React from "react";

import Loading from "../../../components/Loading/Loading";

import CitizenDashboardHome from "../CitizenDashboard/CitizenDashboardHome/CitizenDashboardHome";
import StaffDashboardHome from "../StaffDashboard/StaffDashboardHome/StaffDashboardHome";
import AdminDashboardHome from "../AdminDashboard/AdminDashboardHome/AdminDashboardHome";
import useRole from "../../../hooks/useRole";



const DashboardHome = () => {

    const { role, roleLoading } = useRole();

    if (roleLoading) {
        return <Loading />;
    }

  
    if (role === "user" || role === "premiumUser") {
        return <CitizenDashboardHome ></CitizenDashboardHome>;
    }

 
    if (role === "staff") {
        return <StaffDashboardHome ></StaffDashboardHome>;
    }

    
    if (role === "admin") {
        return <AdminDashboardHome ></AdminDashboardHome>;
    }

  
    return (
        <div className="p-6 text-center text-red-500">
            Invalid role detected
        </div>
    );
};

export default DashboardHome;
