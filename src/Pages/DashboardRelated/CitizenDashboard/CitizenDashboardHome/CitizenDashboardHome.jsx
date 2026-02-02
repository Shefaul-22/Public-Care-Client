import React from "react";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import UseAuth from "../../../../hooks/UseAuth";
import Loading from "../../../../components/Loading/Loading";

import {BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer } from "recharts";
import StatCard from "./StatCard";

const CitizenDashboardHome = () => {

    
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["citizen-dashboard", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/citizen/dashboard/summary?email=${user.email}`
            );
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) return <Loading />;

    const {
        totalIssues,
        pendingIssues,
        inProgressIssues,
        resolvedIssues,
        totalPayments,
        chartData = []
    } = data;

    return (

        <div className="p-6">
            <h2 className="text-2xl md:text-4xl text-center font-bold mb-6">Citizen Dashboard Home</h2>

            {/* StatCards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                <StatCard title="Total Issues" value={totalIssues} />
                <StatCard title="Pending" value={pendingIssues} color="badge-warning" />
                <StatCard title="In Progress" value={inProgressIssues} color="badge-info" />
                <StatCard title="Resolved" value={resolvedIssues} color="badge-success" />
                <StatCard title="Total Payments" value={`BDT ${totalPayments}`} />
            </div>

            <h3 className="text-xl font-semibold mb-3">Monthly Payments</h3>

            <div className="w-full h-80 bg-white rounded shadow p-4">
                <ResponsiveContainer>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CitizenDashboardHome;
