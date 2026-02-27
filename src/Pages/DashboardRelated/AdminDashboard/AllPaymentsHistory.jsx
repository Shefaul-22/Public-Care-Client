import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { PDFDownloadLink } from "@react-pdf/renderer";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading/Loading";
import InvoicePDF from "../../../components/PaymentInvoice/InvoicePDF";

const AllPaymentsHistory = () => {
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();

    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data = {}, isLoading } = useQuery({
        queryKey: ["payments", selectedMonth, page],
        queryFn: async () => {
            const url = selectedMonth
                ? `/admin/payments/by-month?month=${selectedMonth}&page=${page}&limit=${limit}`
                : `/admin/payments?page=${page}&limit=${limit}`;
            const res = await axiosSecure.get(url);
            return res.data;
        },
        keepPreviousData: true,
    });

    const { payments = [], totalPages = 1, currentPage = 1 } = data;

    // chartData for Bar only
    const chartData = useMemo(() => {
        const map = {};
        payments.forEach((p) => {
            const month = new Date(p.paidAt).toISOString().slice(0, 7);
            map[month] = (map[month] || 0) + p.amount;
        });
        return Object.keys(map).map((month) => ({ month, total: map[month] }));
    }, [payments]);

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-6 lg:p-8 w-full max-w-full space-y-6 bg-base-100 min-h-screen">

            {/* Header */}
            <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content">
                    All Payments
                </h2>
                <p className="text-sm text-base-content/70">
                    View and download payment history
                </p>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <label className="font-semibold">Filter by month:</label>
                <input
                    type="month"
                    className="input input-bordered"
                    value={selectedMonth}
                    onChange={(e) => {
                        setSelectedMonth(e.target.value);
                        setPage(1);
                    }}
                />
            </div>

            {/* Empty state */}
            {payments.length === 0 && (
                <div className="bg-base-200 rounded-2xl p-8 text-center shadow">
                    <p className="text-base-content/70">No payments found.</p>
                </div>
            )}

            {/* Desktop Table */}
            {payments.length > 0 && (
                <div className="hidden lg:block bg-base-200 rounded-2xl shadow-lg p-4 overflow-x-auto">
                    <table className="table table-zebra w-full text-sm md:text-base">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Issue</th>
                                {role === "admin" && <th>User</th>}
                                <th>Amount</th>
                                {(role === "user" || role === "premiumUser") && <th>Status</th>}
                                <th>Paid At</th>
                                <th>Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p, i) => (
                                <tr key={p._id} className="hover">
                                    <td>{(currentPage - 1) * limit + i + 1}</td>
                                    <td className="whitespace-normal max-w-[150px]">{p.title || p.type}</td>
                                    {role === "admin" && <td className="break-words">{p?.boostedBy || p?.email}</td>}
                                    <td>{p.amount} {p.currency}</td>
                                    {(role === "user" || role === "premiumUser") && (
                                        <td>
                                            <span className="badge badge-success">{p.paymentStatus}</span>
                                        </td>
                                    )}
                                    <td>{new Date(p.paidAt).toLocaleString()}</td>
                                    <td>
                                        <PDFDownloadLink
                                            document={<InvoicePDF payment={p} />}
                                            fileName={`invoice-${p._id}.pdf`}
                                            className="btn btn-xs btn-outline"
                                        >
                                            {({ loading }) => (loading ? "Generating..." : "Download")}
                                        </PDFDownloadLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
                {payments.map((p) => (
                    <div key={p._id} className="bg-base-200 rounded-2xl p-4 shadow-md space-y-2">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-medium">{p.title || p.type}</p>
                                <p className="text-xs text-base-content/60">{p.amount} {p.currency}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs">{new Date(p.paidAt).toLocaleDateString()}</p>
                                {(role === "user" || role === "premiumUser") && (
                                    <span className="badge badge-success">{p.paymentStatus}</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <PDFDownloadLink
                                document={<InvoicePDF payment={p} />}
                                fileName={`invoice-${p._id}.pdf`}
                                className="btn btn-xs btn-outline w-full"
                            >
                                {({ loading }) => (loading ? "Generating..." : "Download")}
                            </PDFDownloadLink>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
                <button className="btn btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
                <span className="px-3 py-1 font-semibold">
                    Page {currentPage} of {totalPages}
                </span>
                <button className="btn btn-sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>

            {/* Bar Chart */}
            {chartData.length > 0 && (
                <div className="bg-base-100 dark:bg-base-200 rounded-xl shadow p-5">
                    <h3 className="text-xl font-semibold mb-4">Monthly Payments</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            {/* Grid */}
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--tw-prose-hr)" />

                            {/* X-Axis */}
                            <XAxis dataKey="month" />

                            {/* Y-Axis */}
                            <YAxis />

                            {/* Tooltip */}
                            <Tooltip
                                wrapperClassName="bg-base-100 shadow-md rounded p-2"
                                contentStyle={{
                                    backgroundColor: 'var(--tw-prose-body)',
                                    borderRadius: '0.5rem',
                                    border: 'none'
                                }}
                            />

                            {/* Legend */}
                            <Legend />

                            {/* Bar */}
                            <Bar
                                dataKey="total"
                                fill="#10b981"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

        </div>
    );
};

export default AllPaymentsHistory;