import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer, Legend, PieChart, Pie, Cell
} from "recharts";
import { MdReportProblem, MdWorkspacePremium } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle, FaClock, FaMoneyBillWave, FaUsers } from "react-icons/fa";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import StatCard from "../../CitizenDashboard/CitizenDashboardHome/StatCard";

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["admin-dashboard-summary"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/dashboard/summary");
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const { stats = {}, charts = {}, latest = {} } = data;
    const { totalIssues, pendingIssues, resolvedIssues, rejectedIssues, totalPaymentReceived } = stats;
    const { issueStatusPie = [], userRolePie = [], paymentChart = [] } = charts;
    const { issues: latestIssues = [], payments: latestPayments = [], users: latestUsers = [] } = latest;

    
    const sharedTooltipStyle = {
        backgroundColor: 'hsl(var(--b5))',
        borderRadius: '8px',
        border: '1px solid #fa0bd2',
        color: 'currentColor',
        padding: '10px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    };

    const statData = [
        { title: "Total Issues", value: totalIssues, icon: <MdReportProblem className="size-6 text-primary" /> },
        { title: "Pending", value: pendingIssues, icon: <FaClock className="size-6 text-warning" />, color: "badge-warning" },
        { title: "Resolved", value: resolvedIssues, icon: <FaCheckCircle className="size-6 text-success" />, color: "badge-success" },
        { title: "Rejected", value: rejectedIssues, icon: <FaTimesCircle className="size-6 text-error" />, color: "badge-error" },
        {
            title: "Total Income",
            value: `BDT ${Number(totalPaymentReceived || 0).toLocaleString('en-IN')}`,
            icon: <FaMoneyBillWave className="size-6 text-info" />
        }
    ];

    return (
        <div className="p-4 md:p-6 space-y-8 bg-transparent text-base-content min-h-screen">
            <h2 className="text-3xl font-bold ">
                Admin <span className='text-[#fa0bd2] underline'>Overview</span>
            </h2>

            {/* --- Stats Section --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {statData.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            {/* --- Main Charts Section --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* 1. Monthly Payments (Bar Chart) */}
                <div className="card bg-base-100 shadow-xl border border-base-300 dark:border-slate-700 p-5">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <FaMoneyBillWave className="text-[#fa0bd2]" /> Monthly Payment Collection
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={paymentChart}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.1} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={sharedTooltipStyle}
                                    cursor={{ fill: 'rgba(250, 11, 210, 0.05)' }}
                                />
                                <Bar dataKey="total" fill="#fa0bd2" radius={[6, 6, 0, 0]} barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Issue Status Distribution (Pie Chart) */}
                <div className="card bg-base-100 shadow-xl border border-base-300 dark:border-slate-700 p-5">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <MdReportProblem className="text-[#fa0bd2]" /> Issues Status Ratio
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={issueStatusPie}
                                    cx="50%" cy="50%"
                                    innerRadius={60} outerRadius={85}
                                    paddingAngle={5} dataKey="value"
                                    stroke="none"
                                >
                                    {issueStatusPie.map((entry, index) => (
                                        <Cell key={`cell-status-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={sharedTooltipStyle} />
                                <Legend verticalAlign="bottom" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            {/* --- Secondary Row: Users & Recent Activities --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 3. User Role Distribution (Pie Chart) */}
                <div className="card bg-base-100 shadow-xl border border-base-300 dark:border-slate-700 p-5">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <FaUsers className="text-[#fa0bd2]" /> User Demographics
                    </h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={userRolePie}
                                    cx="50%" cy="50%"
                                    outerRadius={70}
                                    dataKey="value"
                                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {userRolePie.map((entry, index) => (
                                        <Cell key={`cell-user-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={sharedTooltipStyle} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4. Recent Activities Feed */}
                <div className="lg:col-span-2 card bg-base-100 shadow-xl border border-base-300 dark:border-slate-700 p-6">
                    <h3 className="text-xl font-bold mb-4 text-[#fa0bd2]">Latest System Pulse</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Latest Issues */}
                        <div>
                            <h4 className="text-sm font-bold uppercase opacity-50 mb-3 tracking-widest">Recent Issues</h4>
                            <div className="space-y-4">
                                {latestIssues.map(issue => (
                                    <div key={issue._id} className="flex flex-col border-l-2 border-[#fa0bd2] pl-3 py-1 bg-base-200/30 rounded-r">
                                        <span className="font-semibold text-sm truncate">{issue.title}</span>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-[10px] badge badge-ghost uppercase">{issue.status}</span>
                                            <span className="text-[10px] opacity-60">{new Date(issue.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Payments & Users */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-bold uppercase opacity-50 mb-3 tracking-widest">Money In</h4>
                                {latestPayments.map(p => (
                                    <div key={p._id} className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-medium">{p.boostedBy}</span>
                                        <span className="text-xs font-bold text-success">BDT {p.amount}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase opacity-50 mb-3 tracking-widest">New Members</h4>
                                <div className="flex -space-x-2">
                                    {latestUsers.map((u, i) => (
                                        <div key={u._id} className="avatar placeholder cursor-help" title={u.email}>
                                            <div className="bg-neutral text-neutral-content rounded-full w-8 border-2 border-base-100">
                                                <span>{u.displayName?.charAt(0) || "U"}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pl-4 text-xs self-center opacity-60 italic">+ more</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboardHome;