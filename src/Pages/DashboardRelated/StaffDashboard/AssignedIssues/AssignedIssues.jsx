import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../../hooks/UseAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";
import { useState } from "react";



const AssignedIssues = () => {
    const { user } = UseAuth();
    console.log(user.email);
    const axiosSecure = useAxiosSecure();

    // const statusOptions = ["In-Progress", "Working", "Resolved", "Closed"];

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




    const [openRowId, setOpenRowId] = useState(null)

    const { data: issues = [], refetch, isLoading } = useQuery({
        queryKey: ['assignedIssues', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/staff/issues?email=${user.email}`);
            return res.data;
        },
        // enabled: !!user?.email
    });

    console.log(issues);

    const handleStatusChange = async (issue, nextStatus) => {


        try {

            let message = `Issue Status is updated with ${nextStatus.split('_').join(' ')}`

            const statusInfo = {
                status: nextStatus,
                statusMessage: message
            }

            const res = await axiosSecure.patch(`/staff/issues/${issue._id}/status`, statusInfo

            );

            if (res.data.modifiedCount) {
                refetch();
                Swal.fire("Updated", `Status changed to ${nextStatus}`, "success");
            }

        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Failed to update status", "error");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div>
            <h2 className="text-3xl mb-4">
                Assigned Issues: {issues.length}
            </h2>

            {/* Issues Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue, i) => (
                            <tr key={issue._id}>
                                <th>{i + 1}</th>
                                <td>{issue.title}</td>
                                <td>{issue.status}</td>
                                <td>
                                    <span className={issue.priority === 'high' ? 'badge badge-error' : 'badge badge-ghost'}>
                                        {issue.priority}
                                    </span>
                                </td>
                                <td className="flex gap-2">

                                    {
                                        issue.status !== "closed" ? (


                                            <div className="relative inline-block">
                                                {/* Button to toggle dropdown */}
                                                <button
                                                    className="btn btn-sm btn-primary flex items-center"
                                                    onClick={() => setOpenRowId(openRowId === issue._id ? null : issue._id)}
                                                >
                                                    Change Status
                                                </button>

                                                {/* Dropdown Select */}

                                                {openRowId === issue._id && (
                                                    <select
                                                        className="absolute top-full mt-1 left-0 w-40 select select-sm select-primary z-20"
                                                        value={issue.status}
                                                        onChange={(e) => {
                                                            handleStatusChange(issue, e.target.value);
                                                            setOpenRowId(null);
                                                        }}
                                                    >
                                                        {statusOptions.map((status) => {
                                                            const isCurrent = status.value === issue.status;
                                                            const isAllowedNext =
                                                                allowedTransitions[issue.status]?.includes(status.value);

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

                                                )}

                                            </div>

                                        ) : (
                                            <span className="text-green-600">Completed</span>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedIssues;
