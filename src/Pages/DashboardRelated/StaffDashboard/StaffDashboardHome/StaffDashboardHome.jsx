import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import StatCard from "../../CitizenDashboard/CitizenDashboardHome/StatCard";
import { MdReportProblem } from "react-icons/md";

const StaffDashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["staff-dashboard-summary"],
        queryFn: async () => {
            const res = await axiosSecure.get("/staff/dashboard/summary");
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const {
        totalAssigned = 0,
        pendingIssues = 0,
        inProgressIssues = 0,
        resolvedIssues = 0,
        closedIssues = 0,
        todayTasks = 0,
        statusPieData = [],
        latestIssues = [],
    } = data;


    const sharedTooltipProps = {
        wrapperClassName: "bg-base-100 shadow-md rounded p-2",
        contentStyle: {
            backgroundColor: 'hsl(var(--b2))',
            borderRadius: '0.5rem',
            border: '1px solid #fa0bd2',
            color: 'currentColor'
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-8 bg-transparent text-base-content min-h-screen">
            <h2 className="text-3xl font-bold">
                Staff <span className="text-[#fa0bd2]">Overview</span>
            </h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                <StatCard title="Assigned" value={totalAssigned} />
                <StatCard title="Pending" value={pendingIssues} color="badge-warning" />
                <StatCard title="In Progress" value={inProgressIssues} color="badge-info" />
                <StatCard title="Resolved" value={resolvedIssues} color="badge-success" />
                <StatCard title="Closed" value={closedIssues} color="badge-neutral" />
                <StatCard title="Today's Tasks" value={todayTasks} color="badge-primary" />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Bar Chart */}
                <div className="card bg-base-100 shadow-xl border border-base-300 dark:border-slate-700 p-4">

                    

                    <h3 className="card-title justify-center flex items-center mb-4 text-xl font-semibold"><MdReportProblem className="text-[#fa0bd2]" /> Issues Status Ratio</h3>

                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusPieData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.1} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} allowDecimals={false} />

                                <Tooltip
                                    {...sharedTooltipProps}
                                    cursor={{ fill: 'rgba(250, 11, 210, 0.1)' }}
                                    itemStyle={{ color: 'currentColor' }}
                                />

                                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                                    {statusPieData.map((entry, index) => (
                                        <Cell key={`cell-bar-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Pie Chart */}
                <div className="card bg-base-100 shadow-xl border border-base-300 dark:border-slate-700 p-4">
                    <h3 className="card-title justify-center mb-4 text-xl font-semibold">Workload Ratio</h3>
                    <div className="h-72 w-full text-center">
                        {statusPieData.length > 0 ? (
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
                                        nameKey="name"
                                        stroke="none"
                                    >
                                        {statusPieData.map((entry, index) => (
                                            <Cell key={`cell-pie-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>

                                    <Tooltip {...sharedTooltipProps} />

                                    <Legend verticalAlign="bottom" align="center" iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center italic opacity-50">No data available</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Latest Issues Section */}
            <div className="space-y-4">
                <h3 className="text-2xl font-bold px-2">Latest <span className="text-[#fa0bd2]">Assigned Issues</span></h3>

                <div className="hidden md:block card bg-base-100 shadow-xl border border-base-300 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead className="bg-base-200 dark:bg-slate-800">
                                <tr className="text-base-content opacity-70">
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestIssues.map((issue, idx) => (
                                    <tr key={idx} className="hover:bg-base-200/50 transition-colors">
                                        <td className="font-semibold">{issue.title}</td>
                                        <td><div className="badge badge-outline badge-sm uppercase">{issue.status}</div></td>
                                        <td>
                                            <div className={`badge badge-sm font-bold uppercase ${issue.priority === "high" ? "badge-error" :
                                                issue.priority === "medium" ? "badge-warning" : "badge-secondary"
                                                }`}>{issue.priority}</div>
                                        </td>
                                        <td className="opacity-70">{new Date(issue.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {latestIssues.map((issue, idx) => (
                        <div key={idx} className="card bg-base-100 border border-base-300 dark:border-slate-700 shadow-md p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-lg leading-tight flex-1">{issue.title}</h4>
                                <span className={`badge badge-xs font-bold uppercase ${issue.priority === "high" ? "badge-error" :
                                    issue.priority === "medium" ? "badge-warning" : "badge-secondary"
                                    }`}>{issue.priority}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm opacity-80">
                                <div className="badge badge-outline badge-sm uppercase">{issue.status}</div>
                                <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {latestIssues.length === 0 && (
                    <div className="text-center py-10 opacity-50 italic bg-base-100 rounded-xl">No issues assigned yet.</div>
                )}
            </div>
        </div>
    );
};

export default StaffDashboardHome;