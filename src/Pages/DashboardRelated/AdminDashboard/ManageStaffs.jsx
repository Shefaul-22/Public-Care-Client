import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManageStaffs = () => {
    const axiosSecure = useAxiosSecure();
    const [editStaff, setEditStaff] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: staffs = [], isLoading, refetch } = useQuery({
        queryKey: ['staffs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/staffs');
            return res.data;
        }
    });

    useEffect(() => {
        if (editStaff) {
            reset({
                name: editStaff.displayName,
                phone: editStaff.phone || ""
            });
        }
    }, [editStaff, reset]);

    const handleUpdateSubmit = async (data) => {

        if (data.name === editStaff.displayName && data.phone === (editStaff.phone || "")) {
            setEditStaff(null);
            return Swal.fire("No Changes", "You haven't changed anything!", "info");
        }

        Swal.fire({ title: 'Updating...', didOpen: () => Swal.showLoading() });

        try {
            const res = await axiosSecure.patch(`/admin/staffs/${editStaff._id}`, {
                name: data.name,
                phone: data.phone
            });

            if (res.data.success || res.data.modifiedCount > 0) {
                Swal.fire("Success", "Staff updated!", "success");
                refetch();
                setEditStaff(null);
                reset();
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const handleDelete = (staff) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete ${staff.displayName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/admin/staffs/${staff._id}`);
                Swal.fire('Deleted!', 'Staff removed.', 'success');
                refetch();
            }
        });
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Manage <span className='text-[#fa0bd2]'>Staffs</span> ({staffs.length})</h2>

            {/* --- Desktop Table View (Visible on md and up) --- */}
            <div className="hidden md:block overflow-x-auto bg-base-100 shadow-xl rounded-2xl">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th>Staff</th>
                            <th>Contact Info</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs.map(staff => (
                            <tr key={staff._id} className="hover">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={staff.photoURL} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{staff.displayName}</div>
                                            <div className="text-sm opacity-50 text-blue-500">{staff.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="font-medium text-xs block">{staff.email}</span>
                                    <span className="text-sm">{staff.phone || "No Phone"}</span>
                                </td>
                                <td className="text-center space-x-2">
                                    <button onClick={() => setEditStaff(staff)} className="btn btn-ghost btn-xs bg-blue-100 text-blue-600">Update</button>
                                    <button onClick={() => handleDelete(staff)} className="btn btn-ghost btn-xs bg-red-100 text-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Mobile Card View (Visible on small screens) --- */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {staffs.map(staff => (
                    <div key={staff._id} className="card bg-base-100 shadow-md border border-base-200 p-4">
                        <div className="flex items-center gap-4">
                            <img className="w-16 h-16 rounded-full object-cover border-2 border-primary" src={staff.photoURL} alt="" />
                            <div className="flex-1">
                                <h3 className="font-bold">{staff.displayName}</h3>
                                <p className="text-xs opacity-60 break-all">{staff.email}</p>
                                <p className="text-sm font-semibold mt-1">{staff.phone || "No Phone"}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => setEditStaff(staff)} className="  btn btn-primary flex-1">Update</button>
                            <button onClick={() => handleDelete(staff)} className="  btn btn-error flex-1">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Edit Modal --- */}
            {editStaff && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4 text-center">Update Staff Info</h3>
                        <form onSubmit={handleSubmit(handleUpdateSubmit)} className="space-y-4">
                            <div>
                                <label className="label-text font-semibold">Display Name</label>
                                <input
                                    {...register("name", { required: "Name is required" })}
                                    defaultValue={editStaff.displayName}
                                    className="input input-bordered w-full"
                                />
                                {errors.name && <span className="text-error text-xs">{errors.name.message}</span>}
                            </div>
                            <div>
                                <label className="label-text font-semibold">Phone Number</label>
                                <input
                                    {...register("phone", {
                                        required: "Phone is required",
                                        minLength: { value: 11, message: "Exactly 11 digits required" },
                                        maxLength: { value: 11, message: "Exactly 11 digits required" },
                                        pattern: { value: /^[0-9]*$/, message: "Numbers only" }
                                    })}
                                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11)}
                                    defaultValue={editStaff.phone || ""}
                                    className="input input-bordered w-full"
                                />
                                {errors.phone && <span className="text-error text-xs">{errors.phone.message}</span>}
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <button type="button" onClick={() => { setEditStaff(null); reset(); }} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageStaffs;