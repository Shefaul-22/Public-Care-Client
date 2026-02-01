import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import useRole from "../../../hooks/useRole";

const AllPaymentsHistory = () => {

    const { role } = useRole();

    const axiosSecure = useAxiosSecure();

    // const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

    const [page, setPage] = useState(1);
    const limit = 10;

    // fetch from db
    const { data = {}, isLoading } = useQuery({
        queryKey: ["payments", selectedMonth, page],
        queryFn: async () => {
            const url = selectedMonth
                ? `/admin/payments/by-month?month=${selectedMonth}&page=${page}&limit=${limit}`
                : `/admin/payments?page=${page}&limit=${limit}`;

            const res = await axiosSecure.get(url);
            return res.data;
        },
        keepPreviousData: true
    });

    const { payments = [], totalPages = 1, currentPage = 1 } = data;

    // charts
    const chartData = useMemo(() => {
        const map = {};

        payments.forEach(p => {
            const month = new Date(p.paidAt).toISOString().slice(0, 7);
            map[month] = (map[month] || 0) + p.amount;
        });

        return Object.keys(map).map(month => ({
            month,
            total: map[month]
        }));
    }, [payments]);

    if (isLoading) return <Loading></Loading>;

    return (

        <div className="p-2 md:p-4 lg:p-6 w-full max-w-full">

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">All Payments </h2>

            {/* filter */}
            <div className="mb-4">
                <label className="mr-2 font-semibold">Filter by month:</label>
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


            <div className=" mb-6">
                <table className="table table-zebra w-full table-fixed">
                    <thead>
                        <tr>
                            <th className="w-1">#</th>
                            <th>Issue</th>

                            {
                                (role === "admin") && <th>User</th>
                            }

                            <th>Amount</th>

                            {
                                (role === "user" || role === "premiumUser") && <th className="w-18">Status</th>
                            }


                            <th>Paid At</th>


                        </tr>
                    </thead>
                    <tbody>

                        {
                            payments.map((p, i) => (

                                <tr key={p._id}>

                                    <td className="w-1">{(currentPage - 1) * limit + i + 1}</td>

                                    <td className="break-words max-w-[100px]">{p.title}</td>



                                    {
                                        (role === "admin") && <td className="break-words max-w-[140px]">{p.boostedBy}</td>
                                    }

                                    <td>{p.amount} {p.currency}</td>

                                    {
                                        (role === "user" || role === "premiumUser") &&

                                        <td>
                                            <span className="badge badge-success">
                                                {p.paymentStatus}
                                            </span>
                                        </td>
                                    }

                                    <td>{new Date(p.paidAt).toLocaleString()}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {payments.length === 0 && (
                    <p className="text-center mt-4 text-gray-500">
                        No payments found
                    </p>
                )}
            </div>

            {/* pagination */}
            <div className="flex justify-center gap-2 mb-10">
                <button
                    className="btn btn-sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </button>

                <span className="px-3 py-1 font-semibold">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="btn btn-sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>

            {/* charts */}
            <h3 className="text-xl md:text-3xl lg:text-4xl font-semibold mb-3">Monthly Payments</h3>

            <div className="w-full h-80">
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AllPaymentsHistory;
