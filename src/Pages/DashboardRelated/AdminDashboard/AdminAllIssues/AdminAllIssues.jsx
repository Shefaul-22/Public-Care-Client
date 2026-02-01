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

    const { data: issues = [], isLoading,
        // refetch
    } = useQuery({
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
            showCancelButton: true
        });

        if (confirm.isConfirmed) {
            await axiosSecure.patch(`/admin/issues/${issueId}/reject`);

            // refetch();
            queryClient.invalidateQueries(["issues"]);
            Swal.fire("Rejected", "Issue rejected", "success");
        }
    };

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="p-6">

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">All Issues</h2>

            <table className="table table-zebra w-full table-fixed text-sm md:text-base">

                {/* <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th className="wrap-break-word ">Assigned Staff</th>
                        <th>Actions</th>
                    </tr>
                </thead> */}

                <thead>
                    <tr >
                        <th className="whitespace-normal ">
                            Title
                        </th>

                        <th className="whitespace-normal ">
                            Category
                        </th>

                        <th className="whitespace-normal  ">
                            Status
                        </th>

                        <th className="whitespace-normal  hidden md:block">
                            Priority
                        </th>

                        <th className="whitespace-normal  max-w-[100px] ">
                            Assigned Staff
                        </th>

                        <th className="whitespace-normal  ">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {
                        issues.map(issue => (

                            <tr key={issue._id}>

                                <td className="whitespace-normal max-w-[120px]">{issue.title}</td>
                                <td>{issue.category}</td>

                                <td>{issue.status}</td>

                                <td className="hidden md:block"> 
                                    {
                                        issue.priority === "high"
                                            ? <span className="badge badge-error">High</span>
                                            : "Normal"
                                    }
                                </td>

                                <td>
                                    {issue.staffEmail
                                        ? issue.staffName
                                        : "Not Assigned"
                                    }
                                </td>

                                <td className="space-x-2 space-y-2">
                                    {!issue.staffEmail && (
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => setSelectedIssue(issue)}
                                        >
                                            Assign Staff
                                        </button>
                                    )}

                                    {
                                        issue.status === "pending" ? (

                                            <button
                                                className="btn btn-sm btn-error"
                                                onClick={() => handleReject(issue._id)}
                                            >
                                                Reject
                                            </button>
                                        ) : issue.status === "closed" ?
                                            <span>Issue Resolved & Closed</span>

                                            : issue.status === "rejected" ?

                                                <span>Issue Rejected</span>
                                                :
                                                <span>Issue on Progress</span>

                                    }
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {selectedIssue && (
                <AssignStaffModal
                    issue={selectedIssue}
                    close={() => setSelectedIssue(null)}
                />
            )}
        </div>
    );
};

export default AdminAllIssues;
