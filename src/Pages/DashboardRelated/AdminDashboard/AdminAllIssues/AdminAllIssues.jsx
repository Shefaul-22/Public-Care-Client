import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import AssignStaffModal from "./AssignStaffModal";

const AdminAllIssues = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedIssue, setSelectedIssue] = useState(null);

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ["issues"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/issues");
            return res.data;
        }
    });

    const handleReject = async (issueId) => {
        const confirm = await Swal.fire({
            title: "Reject this issue?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33"
        });

        if (confirm.isConfirmed) {
            await axiosSecure.patch(`/admin/issues/${issueId}/reject`);
            queryClient.invalidateQueries({ queryKey: ["issues"] });

            Swal.fire({
                icon: "success",
                title: "Rejected",
                text: "Issue has been rejected."
            });
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 md:p-8 space-y-6 bg-base-100 min-h-screen">

            {/* Header */}
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                    All Issues
                </h2>
                <p className="text-sm text-base-content/70">
                    Manage and monitor all reported issues
                </p>
            </div>

            {/* Empty State */}
            {issues.length === 0 && (
                <div className="bg-base-200 rounded-2xl p-8 text-center shadow">
                    <p className="text-base-content/70">
                        No issues found.
                    </p>
                </div>
            )}

            {/* ================= DESKTOP TABLE ================= */}
            {issues.length > 0 && (
                <div className="hidden lg:block bg-base-200 rounded-2xl shadow-lg p-4 overflow-x-auto">
                    <table className="table table-zebra w-full text-sm">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Assigned</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {issues.map((issue) => (
                                <tr key={issue._id} className="hover">
                                    <td className="font-medium">
                                        {issue.title}
                                    </td>

                                    <td>{issue.category}</td>

                                    <td>
                                        <StatusBadge status={issue.status} />
                                    </td>

                                    <td>
                                        {issue.priority === "high" ? (
                                            <span className="badge badge-error">
                                                High
                                            </span>
                                        ) : (
                                            <span className="badge badge-ghost">
                                                Normal
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        {issue.staffName || (
                                            <span className="text-base-content/60">
                                                Not Assigned
                                            </span>
                                        )}
                                    </td>

                                    <td className="flex gap-2">
                                        {!issue.staffEmail && (
                                            <button
                                                className="btn btn-xs btn-primary rounded-xl"
                                                onClick={() => setSelectedIssue(issue)}
                                            >
                                                Assign
                                            </button>
                                        )}

                                        {issue.status === "pending" && (
                                            <button
                                                className="btn btn-xs btn-error rounded-xl"
                                                onClick={() => handleReject(issue._id)}
                                            >
                                                Reject
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ================= MOBILE CARDS ================= */}
            <div className="lg:hidden space-y-4">
                {issues.map((issue) => (
                    <div
                        key={issue._id}
                        className="bg-base-200 rounded-2xl p-4 shadow-md space-y-3"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-base-content">
                                {issue.title}
                            </h3>
                            <StatusBadge status={issue.status} />
                        </div>

                        <p className="text-sm text-base-content/70">
                            Category: {issue.category}
                        </p>

                        <div className="flex justify-between text-sm">
                            <span>
                                Priority:{" "}
                                {issue.priority === "high" ? (
                                    <span className="text-error font-medium">
                                        High
                                    </span>
                                ) : (
                                    "Normal"
                                )}
                            </span>

                            <span>
                                {issue.staffName || "Not Assigned"}
                            </span>
                        </div>

                        <div className="flex gap-2 pt-2">
                            {!issue.staffEmail && (
                                <button
                                    className="btn btn-sm btn-primary flex-1 rounded-xl"
                                    onClick={() => setSelectedIssue(issue)}
                                >
                                    Assign
                                </button>
                            )}

                            {issue.status === "pending" && (
                                <button
                                    className="btn btn-sm btn-error flex-1 rounded-xl"
                                    onClick={() => handleReject(issue._id)}
                                >
                                    Reject
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {selectedIssue && (
                <AssignStaffModal
                    issue={selectedIssue}
                    close={() => setSelectedIssue(null)}
                />
            )}
        </div>
    );
};

/* ===== Reusable Status Badge Component ===== */
const StatusBadge = ({ status }) => {
    if (status === "pending")
        return <span className="badge badge-warning badge-outline">Pending</span>;

    if (status === "closed")
        return <span className="badge badge-success badge-outline">Closed</span>;

    if (status === "rejected")
        return <span className="badge badge-error badge-outline">Rejected</span>;

    if (status === "in-progress")
        return <span className="badge badge-info badge-outline">In Progress</span>;

    return null;
};

export default AdminAllIssues;