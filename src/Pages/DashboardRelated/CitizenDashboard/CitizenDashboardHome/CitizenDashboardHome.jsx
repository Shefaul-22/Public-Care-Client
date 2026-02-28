import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import UseAuth from "../../../../hooks/UseAuth";
import Loading from "../../../../components/Loading/Loading";
import StatCard from "./StatCard";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";

const CitizenDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["citizen-dashboard", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/citizen/dashboard/summary?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) return <Loading />;

    const {
        totalIssues = 0,
        pendingIssues = 0,
        inProgressIssues = 0,
        resolvedIssues = 0,
        totalPayments = 0,
        chartData = [],
        statusPieData = []
    } = data;

    const hasPieData = statusPieData && statusPieData.length > 0;

    return (
        <div className="p-4 md:p-6 space-y-8 bg-transparent text-base-content min-h-screen">
            <h2 className="text-3xl font-bold">
                Citizen <span className="text-[#fa0bd2]">Overview</span>
            </h2>

            {/* StatCards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard title="Total Issues" value={totalIssues} />
                <StatCard title="Pending" value={pendingIssues} color="badge-warning" />
                <StatCard title="In Progress" value={inProgressIssues} color="badge-info" />
                <StatCard title="Resolved" value={resolvedIssues} color="badge-success" />
                <StatCard title="Total Payments" value={`BDT ${totalPayments.toLocaleString('en-IN')}`} />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* 1. Bar Chart: Monthly Payments */}
                <div className="card bg-base-100 shadow-xl border border-base-300 dark:border-slate-700 p-4">

                    <h3 className="text-lg font-bold mb-6 flex text-center items-center gap-2">
                        <FaMoneyBillWave className="text-[#fa0bd2]" /> Monthly Payment Collection
                    </h3>

                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.1} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} />

                                <Tooltip
                                    wrapperClassName="bg-base-100 shadow-md rounded p-2"
                                    contentStyle={{ backgroundColor: 'var(--tw-prose-body)', borderRadius: '0.5rem' }}
                                    cursor={{ fill: 'rgba(250, 11, 210, 0.1)' }}
                                />

                                <Bar dataKey="total" fill="#fa0bd2" radius={[4, 4, 0, 0]} barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Pie Chart: Issues Status */}
                <div className="card bg-base-100 shadow-xl border border-base-300 dark:border-slate-700 p-4">

                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <MdReportProblem className="text-[#fa0bd2]" /> Issues Status Ratio
                    </h3>

                    <div className="h-72 w-full flex items-center justify-center">
                        {hasPieData ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusPieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {statusPieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>

                                    <Tooltip
                                        wrapperClassName="bg-base-100 shadow-md rounded p-2"
                                        contentStyle={{ backgroundColor: 'var(--tw-prose-body)', borderRadius: '0.5rem' }}
                                        cursor={{ fill: 'rgba(250, 11, 210, 0.1)' }}
                                    />

                                    <Legend verticalAlign="bottom" align="center" iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-col items-center text-slate-400 italic">
                                <p>No status data available yet</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CitizenDashboardHome;