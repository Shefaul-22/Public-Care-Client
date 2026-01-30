import React from "react";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

import {BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer } from "recharts";
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

    const {
        stats = {},
        charts = {},
        latest = {}
    } = data;

    const {
        totalIssues,
        pendingIssues,
        resolvedIssues,
        rejectedIssues,
        totalPaymentReceived
    } = stats;

    const { issueStatusChart = [], paymentChart = [] } = charts;

    const {
        issues: latestIssues = [],
        payments: latestPayments = [],
        users: latestUsers = []
    } = latest;

    return (
        <div className="p-6 space-y-10">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>

            {/* stats card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard title="Total Issues" value={totalIssues} />
                <StatCard title="Pending" value={pendingIssues} color="badge-warning" />
                <StatCard title="Resolved" value={resolvedIssues} color="badge-success" />
                <StatCard title="Rejected" value={rejectedIssues} color="badge-error" />
                <StatCard
                    title="Total Payments"
                    value={`BDT ${totalPaymentReceived}`}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Issue Status Chart */}
                <div className="bg-white rounded shadow p-4">
                    <h3 className="text-lg font-semibold mb-4">
                        Issues by Status
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={issueStatusChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="status" />
                            <YAxis ticks={[0, 5, 10, 15, 20]} />
                            <Tooltip />
                            <Bar dataKey="count" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Payment Chart */}
                <div className="bg-white rounded shadow p-4">
                    <h3 className="text-lg font-semibold mb-4">
                        Monthly Payments
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={paymentChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

          
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Latest Issues */}
                <div className="bg-white rounded shadow p-4">
                    <h3 className="font-semibold mb-3">Latest Issues</h3>
                    <ul className="space-y-2 text-sm">
                        {latestIssues.map(issue => (
                            <li key={issue._id} className="border-b pb-2">
                                <p className="font-medium">{issue.title}</p>
                                <p className="text-xs text-gray-500">
                                    {issue.status} • {new Date(issue.createdAt).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Latest Payments */}


                <div className="bg-white rounded shadow p-4">


                    <h3 className="font-semibold mb-3">Latest Payments</h3>

                    <ul className="space-y-2 text-sm">
                        {latestPayments.map(p => (
                            <li key={p._id} className="border-b pb-2">
                                <p className="font-medium">
                                    BDT {p.amount}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {p.boostedBy}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Latest Users */}

                <div className="bg-white rounded shadow p-4">

                    <h3 className="font-semibold mb-3">Latest Users</h3>
                    <ul className="space-y-2 text-sm">
                        {latestUsers.map(u => (
                            <li key={u._id} className="border-b pb-2">
                                <p className="font-medium">{u.name}</p>
                                <p className="text-xs text-gray-500">
                                    {u.email} • {u.role}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboardHome;
