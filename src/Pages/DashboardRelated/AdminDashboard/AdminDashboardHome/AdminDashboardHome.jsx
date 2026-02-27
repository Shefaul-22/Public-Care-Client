import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import StatCard from "../../CitizenDashboard/CitizenDashboardHome/StatCard";

import { MdReportProblem } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle, FaClock, FaMoneyBillWave } from "react-icons/fa";
// import useRole from "../../../../hooks/useRole";

const AdminDashboardHome = () => {

    const axiosSecure = useAxiosSecure();

    // const {roleLoading} = useRole()

    const { data = {}, isLoading } = useQuery({
        queryKey: ["admin-dashboard-summary"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/dashboard/summary");
            return res.data;
        }
    });

    if (isLoading ) return <Loading />;

    const { stats = {}, charts = {}, latest = {} } = data;
    const { totalIssues, pendingIssues, resolvedIssues, rejectedIssues, totalPaymentReceived } = stats;
    const { issueStatusChart = [], paymentChart = [] } = charts;
    const { issues: latestIssues = [], payments: latestPayments = [], users: latestUsers = [] } = latest;

    // Dynamic stat cards with icons & color
    const statData = [
        { title: "Total Issues", value: totalIssues, icon: <MdReportProblem className="size-6 text-primary" /> },
        { title: "Pending", value: pendingIssues, icon: <FaClock className="size-6 text-yellow-500" /> },
        { title: "Resolved", value: resolvedIssues, icon: <FaCheckCircle className="size-6 text-green-500" /> },
        { title: "Rejected", value: rejectedIssues, icon: <FaTimesCircle className="size-6 text-red-500" /> },
        { title: "Total Payments", value: `BDT ${totalPaymentReceived}`, icon: <FaMoneyBillWave className="size-6 text-blue-500" /> }
    ];

    return (
        <div className="p-6 space-y-10 text-base-content">

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Admin Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {
                    statData.map((stat, idx) => (
                        <StatCard
                            key={idx}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            className="bg-base-100 shadow hover:shadow-lg transition-all duration-200"
                        />
                    ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Issues by Status */}
                <div className="bg-base-100 dark:bg-base-200 rounded-xl shadow p-5">
                    <h3 className="text-xl font-semibold mb-4">Issues by Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={issueStatusChart}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--tw-prose-hr)" />
                            <XAxis dataKey="status" />
                            <YAxis />
                            <Tooltip
                                wrapperClassName="bg-base-100 shadow-md rounded p-2"
                                contentStyle={{ backgroundColor: 'var(--tw-prose-body)', borderRadius: '0.5rem' }}
                            />
                            <Legend />
                            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="count" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Payment Chart */}
                <div className="bg-base-100 dark:bg-base-200 rounded-xl shadow p-5">
                    <h3 className="text-xl font-semibold mb-4">Monthly Payments</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={paymentChart}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--tw-prose-hr)" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip
                                wrapperClassName="bg-base-100 shadow-md rounded p-2"
                                contentStyle={{ backgroundColor: 'var(--tw-prose-body)', borderRadius: '0.5rem' }}
                            />
                            <Legend />
                            <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* Latest Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Latest Issues */}
                <div className="bg-base-100 dark:bg-base-200 rounded-xl shadow p-5">
                    <h3 className="font-semibold text-lg mb-3">Latest Issues</h3>
                    <ul className="space-y-3">
                        {latestIssues.map(issue => (
                            <li key={issue._id} className="border-b border-base-300 pb-2">
                                <p className="font-medium">{issue.title}</p>
                                <p className="text-sm text-gray-500">{issue.status} • {new Date(issue.createdAt).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Latest Payments */}
                <div className="bg-base-100 dark:bg-base-200 rounded-xl shadow p-5">
                    <h3 className="font-semibold text-lg mb-3">Latest Payments</h3>
                    <ul className="space-y-3">
                        {latestPayments.map(p => (
                            <li key={p._id} className="border-b border-base-300 pb-2">
                                <p className="font-medium">BDT {p.amount}</p>
                                <p className="text-sm text-gray-500">{p.boostedBy}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Latest Users */}
                <div className="bg-base-100 dark:bg-base-200 rounded-xl shadow p-5">
                    <h3 className="font-semibold text-lg mb-3">Latest Users</h3>
                    <ul className="space-y-3">
                        {latestUsers.map(u => (
                            <li key={u._id} className="border-b border-base-300 pb-2">
                                <p className="font-medium">{u.name}</p>
                                <p className="text-sm text-gray-500">{u.email} • {u.role}</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    );
};

export default AdminDashboardHome;