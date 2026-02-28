import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../../hooks/UseAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";
import { useState } from "react";

const AssignedIssues = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const statusOptions = [
        { value: "pending", label: "Pending" },
        { value: "in-progress", label: "In Progress" },
        { value: "working", label: "Working" },
        { value: "resolved", label: "Resolved" },
        { value: "closed", label: "Closed" },
    ];

    const allowedTransitions = {
        pending: ["in-progress"],
        "in-progress": ["working"],
        working: ["resolved"],
        resolved: ["closed"],
    };

    const [openRowId, setOpenRowId] = useState(null);

    const { data: issues = [], refetch, isLoading } = useQuery({
        queryKey: ['assignedIssues', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/staff/issues?email=${user.email}`);
            return res.data;
        },
    });

    const handleStatusChange = async (issue, nextStatus) => {
        try {
            let message = `Issue Status is updated with ${nextStatus.split('-').join(' ')}`;
            const statusInfo = {
                status: nextStatus,
                statusMessage: message
            };

            const res = await axiosSecure.patch(`/staff/issues/${issue._id}/status`, statusInfo);

            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    title: "Updated",
                    text: `Status changed to ${nextStatus}`,
                    icon: "success",
                    background: 'var(--b1)',
                    color: 'var(--bc)'
                });
            }
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Failed to update status", "error");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-2 md:p-6 min-h-screen bg-transparent text-base-content">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Assigned <span className="text-[#fa0bd2]">Issues</span>: {issues.length}
            </h2>

            {/* --- Desktop View: Table (Hidden on Mobile) --- */}
            <div className="hidden md:block overflow-x-auto card bg-base-100 shadow-xl border border-base-300 dark:border-slate-700">
                <table className="table w-full">
                    <thead className="bg-base-200 dark:bg-slate-800">
                        <tr className="text-base-content/70">
                            <th className="w-16">#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue, i) => (
                            <tr key={issue._id} className="hover:bg-base-200/50 transition-colors">
                                <th>{i + 1}</th>
                                <td className="max-w-xs font-medium">{issue.title}</td>
                                <td>
                                    <div className="badge badge-outline badge-sm uppercase font-semibold opacity-80">
                                        {issue.status}
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge badge-sm font-bold uppercase ${issue.priority === 'high' ? 'badge-error' :
                                            issue.priority === 'medium' ? 'badge-warning' : 'badge-ghost'
                                        }`}>
                                        {issue.priority}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {issue.status !== "closed" ? (
                                        <div className="relative inline-block">
                                            <button
                                                className="btn btn-xs md:btn-sm btn-primary"
                                                onClick={() => setOpenRowId(openRowId === issue._id ? null : issue._id)}
                                            >
                                                Change Status
                                            </button>
                                            {openRowId === issue._id && (
                                                <div className="absolute right-0 mt-2 w-48 z-30 shadow-2xl rounded-lg overflow-hidden border border-base-300">
                                                    <select
                                                        className="select select-bordered select-sm w-full bg-base-100 focus:outline-none"
                                                        value={issue.status}
                                                        onChange={(e) => {
                                                            handleStatusChange(issue, e.target.value);
                                                            setOpenRowId(null);
                                                        }}
                                                    >
                                                        {statusOptions.map((status) => {
                                                            const isCurrent = status.value === issue.status;
                                                            const isAllowedNext = allowedTransitions[issue.status]?.includes(status.value);
                                                            return (
                                                                <option
                                                                    key={status.value}
                                                                    value={status.value}
                                                                    disabled={!isCurrent && !isAllowedNext}
                                                                >
                                                                    {status.label}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-success font-bold flex items-center justify-center gap-1">
                                            ✅ Completed
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Mobile View: Cards (Hidden on Desktop) --- */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {issues.map((issue, i) => (
                    <div key={issue._id} className="card bg-base-100 shadow-md border border-base-300 dark:border-slate-700 p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-bold opacity-50">#{i + 1}</span>
                            <span className={`badge badge-xs font-bold uppercase ${issue.priority === 'high' ? 'badge-error' :
                                    issue.priority === 'medium' ? 'badge-warning' : 'badge-ghost'
                                }`}>
                                {issue.priority}
                            </span>
                        </div>

                        <h3 className="font-bold text-lg leading-tight">{issue.title}</h3>

                        <div className="flex items-center gap-2">
                            <span className="text-sm opacity-70">Status:</span>
                            <div className="badge badge-outline badge-sm uppercase font-bold text-[#fa0bd2]">
                                {issue.status}
                            </div>
                        </div>

                        <div className="pt-2 border-t border-base-200 dark:border-slate-800">
                            {issue.status !== "closed" ? (
                                <select
                                    className="select select-bordered select-sm w-full bg-base-100"
                                    value={issue.status}
                                    onChange={(e) => handleStatusChange(issue, e.target.value)}
                                >
                                    {statusOptions.map((status) => {
                                        const isCurrent = status.value === issue.status;
                                        const isAllowedNext = allowedTransitions[issue.status]?.includes(status.value);
                                        return (
                                            <option
                                                key={status.value}
                                                value={status.value}
                                                disabled={!isCurrent && !isAllowedNext}
                                            >
                                                {status.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            ) : (
                                <div className="text-center text-success font-bold py-1">
                                    Issue Closed & Resolved
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {issues.length === 0 && (
                <div className="text-center py-20 opacity-40 italic">
                    No issues assigned to you yet.
                </div>
            )}
        </div>
    );
};

export default AssignedIssues;