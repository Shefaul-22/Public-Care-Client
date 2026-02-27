import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
import useRole from "../../../hooks/useRole";

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();

    const {roleLoading} = useRole();

    // Fetch all citizen users
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["admin-users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/users");
            return res.data;
        },
    });

    
    const handleBlock = (user) => {
        Swal.fire({
            title: `Block ${user.displayName || user.email}?`,
            text: "User will not be able to access the system",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Block",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/admin/users/block/${user._id}`);

                    Swal.fire(
                        "Blocked!", 
                        "User has been blocked.", 
                        "success"
                    );

                    refetch();

                } catch (err) {
                    Swal.fire("Error", err.message, "error");
                }
            }
        });
    };


    const handleUnblock = (user) => {
        Swal.fire({
            title: `Unblock ${user.displayName || user.email}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Unblock",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/admin/users/unblock/${user._id}`);

                    Swal.fire("Unblocked!", "User has been unblocked.", "success");
                    refetch();
                } catch (err) {
                    Swal.fire("Error", err.message, "error");
                }
            }
        });
    };

    if (isLoading || roleLoading) return <Loading ></Loading>;

    return (
        <div className="overflow-x-auto mt-6">

            <h2 className="text-2xl md:text-4xl font-bold mb-4">Manage Users</h2>

            <table className="table table-zebra w-full table-fixed">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className="hidden md:table-cell">Subscription</th>
                        <th className="hidden md:table-cell">Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="w-12 h-12">
                                <img
                                    src={user.photoURL}
                                    alt="user"
                                    className="w-10 h-10 rounded-full"
                                />
                            </td>

                            <td>{user.displayName || "N/A"}</td>

                            <td className="whitespace-normal break-all">{user.email}</td>

                            {/* Subscription info */}
                            <td className="hidden md:table-cell">
                                {user.isPremium ? (
                                    <span className="badge badge-success">Premium</span>
                                ) : (
                                    <span className="badge badge-ghost">Free</span>
                                )}
                            </td>

                            {/* User status */}
                            <td className="hidden md:table-cell">
                                {user.userStatus === "blocked" ? (
                                    <span className="badge badge-error">Blocked</span>
                                ) : (
                                    <span className="badge badge-success">Active</span>
                                )}
                            </td>

                            {/* Actions */}
                            <td>
                                {user.userStatus === "blocked" ? (
                                    <button
                                        onClick={() => handleUnblock(user)}
                                        className="btn btn-xs btn-success"
                                    >
                                        Unblock
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleBlock(user)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Block
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
