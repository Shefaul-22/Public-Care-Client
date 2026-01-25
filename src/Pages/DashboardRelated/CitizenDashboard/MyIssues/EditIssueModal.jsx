import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const EditIssueModal = ({ issue, onClose, onUpdated }) => {
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: issue.title,
            category: issue.category,
            issueDescription: issue.issueDescription,
            senderName: issue.senderName,
            senderEmail: issue.senderEmail,
            senderRegion: issue.senderRegion,
            senderDistrict: issue.senderDistrict,
            senderAddress: issue.senderAddress,
        },
    });

    useEffect(() => {
        setValue("title", issue.title);
        setValue("category", issue.category);
        setValue("issueDescription", issue.issueDescription);
        setValue("senderName", issue.senderName);
        setValue("senderEmail", issue.senderEmail);
        setValue("senderRegion", issue.senderRegion);
        setValue("senderDistrict", issue.senderDistrict);
        setValue("senderAddress", issue.senderAddress);
    }, [issue]);

    const handleEditIssue = async (data) => {
        try {

            const issueImg = data.image[0];

            const formData = new FormData();
            formData.append('image', issueImg);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;

            // Upload image on imagebb
            const imgRes = await axios.post(image_API_URL, formData);
            const photoURL = imgRes.data.data.url;

            const updatedIssue = {
                title: data.title,
                category: data.category,
                issueDescription: data.issueDescription,
                photoURL: photoURL
            };

            const res = await axiosSecure.patch(`/issues/${issue._id}`, updatedIssue);

            if (res.data.modifiedCount) {

                Swal.fire(
                    "Updated", 
                    "Issue updated successfully", 
                    "success"
                );
                onUpdated();
            }
        } catch (error) {
            console.error(error);
            
            Swal.fire("Error", "Failed to update issue", "error");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-bold mb-4">Edit Issue</h2>

                <form onSubmit={handleSubmit(handleEditIssue)} className="space-y-4">

                    {/* Editable Fields */}
                    <fieldset className="fieldset">
                        <label className="label">Issue Title</label>
                        <input
                            type="text"
                            {...register("title", { required: "Issue title is required" })}
                            className="input w-full"
                        />

                        {
                            errors.title &&
                            <p className="text-red-500">{errors.title.message}</p>
                        }

                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Category</label>
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="select w-full"
                        >
                            <option value="Broken streetlights">Broken streetlights</option>
                            <option value="Potholes">Potholes</option>
                            <option value="Water leakage">Water leakage</option>
                            <option value="Garbage overflow">Garbage overflow</option>
                            <option value="Damage footpaths">Damage footpaths</option>
                        </select>
                        {
                            errors.category &&
                            <p className="text-red-500">{errors.category.message}</p>
                        }
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Issue Details</label>
                        <textarea
                            {...register("issueDescription")}
                            className="textarea w-full" required
                        ></textarea>
                    </fieldset>


                    {/* Photo image field */}
                    <label className="label font-medium ">Upload issue image</label>

                    <input type="file" className="file-input file-input-primary w-full "
                        {...register('image', { required: true })}
                        placeholder="Upload issue image" />


                    {errors.image?.type === "required" && (
                        <p className='text-red-500'>Issue image is required</p>
                    )}



                    {/* Non-editable Fields */}
                    <fieldset className="fieldset">
                        <label className="label">Sender Name</label>
                        <input
                            type="text"
                            {...register("senderName")}
                            className="input w-full"
                            disabled
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Sender Email</label>
                        <input
                            type="text"
                            {...register("senderEmail")}
                            className="input w-full"
                            disabled
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Sender Region</label>
                        <input
                            type="text"
                            {...register("senderRegion")}
                            className="input w-full"
                            disabled
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Sender District</label>
                        <input
                            type="text"
                            {...register("senderDistrict")}
                            className="input w-full"
                            disabled
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Sender Address</label>
                        <input
                            type="text"
                            {...register("senderAddress")}
                            className="input w-full"
                            disabled
                        />
                    </fieldset>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Update Issue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditIssueModal;
