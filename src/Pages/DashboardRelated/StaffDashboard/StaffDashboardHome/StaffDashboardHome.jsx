import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import StatCard from "../../CitizenDashboard/CitizenDashboardHome/StatCard";

import { BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer,
} from "recharts";

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
        totalAssigned,
        pendingIssues,
        inProgressIssues,
        resolvedIssues,
        closedIssues,
        todayTasks,
        latestIssues = [],
    } = data;

    // chart data
    const chartData = [
        { name: "Pending", value: pendingIssues },
        { name: "In Progress", value: inProgressIssues },
        { name: "Resolved", value: resolvedIssues },
        { name: "Closed", value: closedIssues },
    ];

    return (
        <div className="p-6">

            <h2 className="text-2xl md:text-4xl text-center font-bold mb-6">Staff Dashboard Home</h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
                <StatCard title="Assigned Issues" value={totalAssigned} />
                <StatCard title="Pending" value={pendingIssues} color="badge-warning" />
                <StatCard title="In Progress" value={inProgressIssues} color="badge-info" />
                <StatCard title="Resolved" value={resolvedIssues} color="badge-success" />
                <StatCard title="Closed" value={closedIssues} color="badge-neutral" />
                <StatCard title="Today's Tasks" value={todayTasks} color="badge-primary" />
            </div>

            {/* Chart */}
            <h3 className="text-xl font-semibold mb-3">Issue Status Overview</h3>
            <div className="w-full h-80 bg-white rounded shadow p-4 mb-10">
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4f46e5" /> {/* primary color */}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Latest Issues */}
            <h3 className="text-xl font-semibold mb-3">Latest Assigned Issues</h3>
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {latestIssues.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500">
                                    No issues found
                                </td>
                            </tr>
                        )}

                        {latestIssues.map((issue, idx) => (
                            <tr key={idx}>
                                <td>{issue.title}</td>
                                <td>
                                    <span className="badge badge-outline">{issue.status}</span>
                                </td>
                                <td>
                                    <span
                                        className={`badge ${issue.priority === "high" ? "badge-error" : "badge-secondary"
                                            }`}
                                    >
                                        {issue.priority}
                                    </span>
                                </td>
                                <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffDashboardHome;
