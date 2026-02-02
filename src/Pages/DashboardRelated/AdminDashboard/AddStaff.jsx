import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import Swal from "sweetalert2";
import ManageStaffs from "./ManageStaffs";
import { useQueryClient } from "@tanstack/react-query";


const AddStaff = () => {
    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure();

    // const { data: staffs = [], isLoading, refetch } = useQuery({
    //     queryKey: ['staffs'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get('/admin/staffs');
    //         return res.data;
    //     }
    // });

    // another way of refetch

    const queryClient = useQueryClient()


    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleAddStaff = async (data) => {

        try {
            const profileImg = data.photo[0];


            const formData = new FormData();
            formData.append("image", profileImg);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
            const imgRes = await axios.post(image_API_URL, formData);
            const photoURL = imgRes.data.data.url;

            const staffInfo = {
                displayName: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                photoURL,
            };

            // Send data to db
            const res = await axiosSecure.post("/admin/staffs", staffInfo);

            if (res.data.success) {

                Swal.fire(
                    "Success",
                    "Staff added successfully",
                    "success");
                reset();
                setIsOpen(false);

                queryClient.invalidateQueries('staffs')

            } else {
                Swal.fire("Error", res.data.message, "error");
            }

        } catch (error) {

            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-4xl  font-bold">Manage Staffs</h2>
                <button onClick={() => setIsOpen(true)} className="btn btn-primary">
                    Add Staff
                </button>
            </div>

            {/* Staff Table */}
            <ManageStaffs></ManageStaffs>

            {/* Modal */}
            {isOpen && (
                <dialog open className="modal">

                    <div className="modal-box">

                        <h3 className="font-bold text-lg mb-4">Add New Staff</h3>
                        
                        <form onSubmit={handleSubmit(handleAddStaff)} className="space-y-3">

                            <label className="font-semibold">Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                placeholder="Name"
                                className="input input-bordered w-full"
                            />
                            {
                                errors.name &&
                                <p className="text-red-500">{errors.name.message}</p>
                            }

                            <label className="font-semibold">Email</label>

                            <input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                placeholder="Email"
                                defaultValue=""
                                
                                className="input input-bordered w-full"
                            />

                            {
                                errors.email &&
                                <p className="text-red-500">{errors.email.message}</p>
                            }

                            <label className="font-semibold">Password</label>

                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters" }
                                })}

                                defaultValue=""
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full"
                            />
                            {
                                errors.password && <p className="text-red-500">{errors.password.message}</p>
                            }

                            <label className="font-semibold">Phone No</label>

                            <input type="number"
                                {...register("phone")}
                                placeholder="Phone"
                                className="input input-bordered w-full"
                            />


                            <label className="font-semibold">Photo</label>

                            <input
                                {...register("photo", { required: "Photo is required" })}
                                type="file"
                                accept="image/*"
                                className="file-input file-input-bordered w-full"
                            />
                            {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Add</button>
                                <button
                                    type="button"
                                    onClick={() => { reset(); setIsOpen(false); }}
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

export default AddStaff;
