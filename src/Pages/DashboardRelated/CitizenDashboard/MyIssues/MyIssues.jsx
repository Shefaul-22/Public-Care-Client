import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../../hooks/UseAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../../../../components/Loading/Loading";
import EditIssueModal from "./EditIssueModal";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye, FaFilter } from "react-icons/fa";

const MyIssues = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({ status: "", category: "" });
    const [editModalData, setEditModalData] = useState(null);

    const { data: issues = [], refetch, isLoading } = useQuery({
        queryKey: ["myIssues", user?.email, filters],
        queryFn: async () => {
            const res = await axiosSecure.get(`/citizen-issues?email=${user.email}`, {
                params: filters
            });
            return res.data;
        },
    });

    const handleDelete = async (issueId) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This issue will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#fa0bd2",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/issues/${issueId}`);
                refetch();
                Swal.fire("Deleted!", "Issue has been removed.", "success");
            } catch (err) {
                Swal.fire("Error", err.response?.data?.message || "Failed", "error");
            }
        }
    };

    const getStatusBadge = (status) => {
        const colors = {
            pending: "badge-warning",
            "in-progress": "badge-info",
            working: "badge-primary",
            resolved: "badge-success",
            closed: "badge-neutral"
        };
        return `badge ${colors[status] || "badge-ghost"} badge-sm capitalize font-medium`;
    };

    if (isLoading) return <Loading />;

    return (
        <div className="space-y-6 animate-fadeIn p-2 md:p-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-bold">
                    My Submitted <span className="text-[#fa0bd2]">Issues</span> ({issues.length})
                </h2>
            </div>

            {/* Filters Section */}
            <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2 text-sm font-semibold opacity-70">
                    <FaFilter /> <span>Filters:</span>
                </div>
                <select
                    className="select select-bordered select-sm w-full md:w-48 bg-base-200"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="working">Working</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>

                <select
                    className="select select-bordered select-sm w-full md:w-48 bg-base-200"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                    <option value="">All Categories</option>
                    <option value="Broken streetlights">Broken streetlights</option>
                    <option value="Potholes">Potholes</option>
                    <option value="Water leakage">Water leakage</option>
                    <option value="Garbage overflow">Garbage overflow</option>
                    <option value="Damaged footpaths">Damaged footpaths</option>
                </select>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto bg-base-100 rounded-xl border border-base-300 shadow-xl">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200 text-base-content">
                        <tr>
                            <th className="w-16">SL</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue, i) => (
                            <tr key={issue._id} className="hover:bg-base-200/50 transition-colors">
                                <th>{i + 1}</th>
                                <td className="font-semibold">{issue.title}</td>
                                <td>
                                    <span className={getStatusBadge(issue.status)}>{issue.status}</span>
                                </td>
                                <td>{issue.category}</td>
                                <td>
                                    <span className={`badge badge-outline badge-sm ${issue.priority === 'high' ? 'border-error text-error' : ''}`}>
                                        {issue.priority}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => navigate(`/issues/${issue._id}`)}
                                            className="btn btn-square btn-ghost btn-sm text-info" title="View Details"
                                        >
                                            <FaEye size={18} />
                                        </button>
                                        {issue.status === "pending" && (
                                            <button
                                                onClick={() => setEditModalData(issue)}
                                                className="btn btn-square btn-ghost btn-sm text-warning" title="Edit Issue"
                                            >
                                                <FaEdit size={18} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(issue._id)}
                                            className="btn btn-square btn-ghost btn-sm text-error" title="Delete Issue"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden grid grid-cols-1 gap-4">
                {issues.map((issue) => (
                    <div key={issue._id} className="card bg-base-100 border border-base-300 shadow-md">
                        <div className="card-body p-5">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg leading-tight w-3/4">{issue.title}</h3>
                                <span className={getStatusBadge(issue.status)}>{issue.status}</span>
                            </div>
                            <div className="mt-2 space-y-1 text-sm opacity-80">
                                <p><span className="font-semibold">Category:</span> {issue.category}</p>
                                <p>
                                    <span className="font-semibold">Priority:</span>
                                    <span className={`ml-2 uppercase text-[10px] px-2 py-0.5 rounded-full border ${issue.priority === 'high' ? 'border-error text-error' : 'border-base-content/30'}`}>
                                        {issue.priority}
                                    </span>
                                </p>
                            </div>
                            <div className="card-actions justify-end mt-4 pt-4 border-t border-base-300 gap-2">
                                <button
                                    onClick={() => navigate(`/issues/${issue._id}`)}
                                    className="btn btn-info btn-sm btn-outline flex-1"
                                >
                                    <FaEye /> Details
                                </button>
                                {issue.status === "pending" && (
                                    <button
                                        onClick={() => setEditModalData(issue)}
                                        className="btn btn-warning btn-sm btn-outline flex-1"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(issue._id)}
                                    className="btn btn-error btn-sm btn-outline flex-1"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {!isLoading && issues.length === 0 && (
                <div className="text-center py-20 bg-base-100 rounded-xl border border-dashed border-base-300">
                    <p className="text-xl opacity-50">No issues found matching your filters.</p>
                </div>
            )}

            {/* Edit Modal */}
            {editModalData && (
                <EditIssueModal
                    issue={editModalData}
                    onClose={() => setEditModalData(null)}
                    onUpdated={() => {
                        setEditModalData(null);
                        refetch();
                    }}
                />
            )}
        </div>
    );
};

export default MyIssues;