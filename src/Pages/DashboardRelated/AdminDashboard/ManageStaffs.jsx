import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";

const ManageStaffs = () => {
    const axiosSecure = useAxiosSecure();

    const [editStaff, setEditStaff] = useState(null);

    // Fetch all staff
    const { data: staffs = [], isLoading, refetch } = useQuery({
        queryKey: ['staffs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/staffs');
            return res.data;
        }
    });


    // Delete staff
    const handleDelete = (staff) => {
        Swal.fire({
            title: `Delete ${staff.name}?`,
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/admin/staffs/${staff._id}`);
                    Swal.fire(
                        "Deleted!",
                        "Staff has been deleted.",
                        "success"
                    );

                    refetch();

                } catch (error) {
                    Swal.fire("Error", error.message, "error");
                }
            }
        });
    };

    //Open update modal
    const handleUpdate = (staff) => {
        setEditStaff(staff);
    };

    // Submit update 
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedStaff = {
            name: form.name.value,
            phone: form.phone.value,
        };

        try {
            await axiosSecure.patch(`/admin/staffs/${editStaff._id}`, updatedStaff);
            Swal.fire("Updated", "Staff info updated", "success");

            refetch();
            setEditStaff(null);
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    if (isLoading) return <Loading></Loading>

    return (
        <div className=" mt-6">
            <table className="table table-zebra w-full table-fixed">
                <thead>
                    <tr>
                        <th className="hidden md:table-cell">Photo</th>
                        <th>Name</th>
                        <th className="hidden md:table-cell">Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        staffs.map((staff) => (

                            <tr key={staff._id}>

                                <td className="w-14 h-14 hidden md:table-cell">
                                    <img src={staff.photoURL} alt={staff.name} className="w-12 h-12 rounded-full" />
                                </td>

                                <td className="whitespace-normal break-all">{staff.displayName || "N/A"}</td>

                                <td className="hidden md:table-cell max-w-44">{staff.email}</td>
                                <td>{staff.phone || "N/A"}</td>

                                <td className="flex flex-col gap-2 md:flex-row">
                                    <button onClick={() => handleUpdate(staff)} className="btn btn-sm btn-info mr-2">
                                        Update
                                    </button>
                                    <button onClick={() => handleDelete(staff)} className="btn btn-sm btn-error mr-2">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Update Modal */}
            {editStaff && (

                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Update Staff</h3>
                        <form onSubmit={handleUpdateSubmit} className="space-y-3">

                            <label className="font-semibold">Name</label>
                            <input
                                defaultValue={editStaff.name}
                                name="name"
                                className="input input-bordered w-full"
                                required
                            />

                            <label className="font-semibold">Phone</label>

                            <input type="number"
                                defaultValue={editStaff.phone || ""}
                                name="phone"
                                className="input input-bordered w-full"
                            />

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button
                                    type="button"
                                    onClick={() => setEditStaff(null)}
                                    className="btn"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageStaffs;
