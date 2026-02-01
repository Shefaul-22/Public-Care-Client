import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../../hooks/UseAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router";

import Loading from "../../../../components/Loading/Loading";
import EditIssueModal from "./EditIssueModal";

import Swal from "sweetalert2";

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

    // console.log(issues);

    const handleDelete = async (issueId) => {

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This issue will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/issues/${issueId}`);
                refetch();

                Swal.fire(
                    "Deleted!", 
                    "Issue has been removed.", 
                    "success"
                );
                
            } catch (err) {
                Swal.fire("Error", err.response?.data?.message || "Failed", "error");
            }
        }
    };

    if (isLoading) return <Loading />;

    return (

        <div>

            <h2 className="text-2xl md:text-4xl lg:text-5xl mb-4">My submitted Issues : {issues.length}</h2>

            {/* Filters */}
            <div className="flex gap-4 mb-4">
                <select
                    className="select select-sm select-bordered flex-1"
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
                    className="select select-sm select-bordered flex-1"
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

            {/* Issues Table */}
            <div className="">
                <table className="table table-zebra w-full table-fixed">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {issues.map((issue, i) => (

                            <tr key={issue._id}>

                                <th className="w-1">{i + 1}</th>
                                <td className="break-words max-w-[100px]">{issue.title}</td>
                                <td>{issue.status}</td>
                                <td>{issue.category}</td>
                                <td>
                                    <span
                                        className={
                                            issue.priority === "high"
                                                ? "badge badge-error"
                                                : "badge badge-ghost"
                                        }
                                    >
                                        {issue.priority}
                                    </span>
                                </td>

                                <td className="flex flex-col md:flex-row gap-1 md:gap-3">
                                    {issue.status === "pending" && (
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => setEditModalData(issue)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(issue._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-sm btn-info p-1"
                                        onClick={() => navigate(`/issues/${issue._id}`)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
