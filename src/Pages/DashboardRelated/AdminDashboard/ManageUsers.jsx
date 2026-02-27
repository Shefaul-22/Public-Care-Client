import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["admin-users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/users");
            return res.data;
        },
    });

    const handleBlock = async (user) => {
        const confirm = await Swal.fire({
            title: `Block ${user.displayName || user.email}?`,
            text: "User will not be able to access the system",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Block",
            confirmButtonColor: "#d33"
        });

        if (confirm.isConfirmed) {
            await axiosSecure.patch(`/admin/users/block/${user._id}`);
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });

            Swal.fire("Blocked!", "User has been blocked.", "success");
        }
    };

    const handleUnblock = async (user) => {
        const confirm = await Swal.fire({
            title: `Unblock ${user.displayName || user.email}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Unblock",
        });

        if (confirm.isConfirmed) {
            await axiosSecure.patch(`/admin/users/unblock/${user._id}`);
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });

            Swal.fire("Unblocked!", "User has been unblocked.", "success");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 md:p-8 space-y-6 bg-base-100 min-h-screen">

            {/* Header */}
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                    Manage Users
                </h2>
                <p className="text-sm text-base-content/70">
                    View, block and manage system users
                </p>
            </div>

            {/* Empty State */}
            {users.length === 0 && (
                <div className="bg-base-200 rounded-2xl p-8 text-center shadow">
                    <p className="text-base-content/70">
                        No users found.
                    </p>
                </div>
            )}

            {/* ================= DESKTOP TABLE ================= */}
            {users.length > 0 && (
                <div className="hidden lg:block bg-base-200 rounded-2xl shadow-lg p-4 overflow-x-auto">
                    <table className="table table-zebra w-full text-sm">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subscription</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="hover">
                                    <td>
                                        <img
                                            src={user.photoURL}
                                            alt="user"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>

                                    <td className="font-medium">
                                        {user.displayName || "N/A"}
                                    </td>

                                    <td className="break-all">
                                        {user.email}
                                    </td>

                                    <td>
                                        <SubscriptionBadge isPremium={user.isPremium} />
                                    </td>

                                    <td>
                                        <StatusBadge status={user.userStatus} />
                                    </td>

                                    <td>
                                        <ActionButton
                                            user={user}
                                            handleBlock={handleBlock}
                                            handleUnblock={handleUnblock}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ================= MOBILE CARDS ================= */}
            <div className="lg:hidden space-y-4">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="bg-base-200 rounded-2xl p-4 shadow-md space-y-3"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={user.photoURL}
                                alt="user"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-base-content">
                                    {user.displayName || "N/A"}
                                </h3>
                                <p className="text-xs text-base-content/60 break-all">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between text-sm">
                            <SubscriptionBadge isPremium={user.isPremium} />
                            <StatusBadge status={user.userStatus} />
                        </div>

                        <div>
                            <ActionButton
                                user={user}
                                handleBlock={handleBlock}
                                handleUnblock={handleUnblock}
                                fullWidth
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ===== Reusable Components ===== */

const SubscriptionBadge = ({ isPremium }) => {
    return isPremium ? (
        <span className="badge badge-success badge-outline">
            Premium
        </span>
    ) : (
        <span className="badge badge-ghost">
            Free
        </span>
    );
};

const StatusBadge = ({ status }) => {
    return status === "blocked" ? (
        <span className="badge badge-error badge-outline">
            Blocked
        </span>
    ) : (
        <span className="badge badge-success badge-outline">
            Active
        </span>
    );
};

const ActionButton = ({ user, handleBlock, handleUnblock, fullWidth }) => {
    if (user.userStatus === "blocked") {
        return (
            <button
                onClick={() => handleUnblock(user)}
                className={`btn btn-sm btn-success rounded-xl ${fullWidth ? "w-full" : ""}`}
            >
                Unblock
            </button>
        );
    }

    return (
        <button
            onClick={() => handleBlock(user)}
            className={`btn btn-sm btn-error rounded-xl ${fullWidth ? "w-full" : ""}`}
        >
            Block
        </button>
    );
};

export default ManageUsers;