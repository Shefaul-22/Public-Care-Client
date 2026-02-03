import React, { useEffect, useState } from 'react';
import UseAuth from '../../hooks/UseAuth';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProfilePDF from './ProfilePDF';

const ProfilePage = () => {

    const { user } = UseAuth();


    const axiosSecure = useAxiosSecure();


    const [isOpen, setIsOpen] = useState(false);

    const { register, handleSubmit,
        reset,
        formState: { errors }
    } = useForm();


    const { data: userData = [], isLoading,
        refetch

    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        }
    })

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const sessionId = params.get('session_id');

        if (sessionId) {
            axiosSecure.patch(`/premium-payment-success?session_id=${sessionId}`)
                .then(res => {

                    if (res.data.success) {
                        Swal.fire(
                            'Premium Activated',
                            'You are now a premium user!',
                            'success'
                        );
                        refetch();
                    }
                });
        }

        if (params.get('payment') === 'cancelled') {
            Swal.fire('Cancelled', 'Payment was cancelled', 'info');
        }
    }, [user?.email, axiosSecure, refetch]);



    // profile update

    const handleUpdateProfileModal = () => {
        setIsOpen(true);
    };

    const handleProfileUpdate = async (data) => {
        try {
            let photoURL = user.photoURL;

            // image selected হলে upload
            if (data.photo?.length > 0) {
                const imageFile = data.photo[0];
                const formData = new FormData();
                formData.append("image", imageFile);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
                const imgRes = await axios.post(image_API_URL, formData);

                photoURL = imgRes.data.data.url;
            }

            const updateInfo = {
                email: user.email,
                displayName: data.name,
                phone: data.phone,
                photoURL
            };

            const res = await axiosSecure.patch("/users/profile", updateInfo);

            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated!", "Profile updated successfully", "success");
                refetch();
                reset();
                setIsOpen(false);
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };



    const handlePurchasePremium = async () => {

        // console.log('data after click', userData);
        try {
            const res = await axiosSecure.post('/create-premium-checkout-session', {
                email: user.email,
                name: user.displayName
            });

            window.location.href = res.data.url;
        } catch (err) {
            console.error(err);
        }
    };


    if (isLoading) return <Loading></Loading>

    return (
        <div className='bg-slate-50 py-6'>
            <div className="max-w-5xl mx-auto bg-gray-300 shadow-lg rounded-2xl  p-12">

                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-6 ">
                    <img
                        src={user.photoURL ? user.photoURL : "https://ibb.co.com/G4qVmKJz"}
                        alt="User"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-md"
                    />

                    <div className="text-center sm:text-left">

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                            {user.displayName || "No Name"}
                            {userData?.role === 'premiumUser' && (
                                <span className="ml-2 px-2 py-2 text-xs bg-yellow-400 rounded">
                                    ⭐ Premium user
                                </span>
                            )}

                            {userData?.role === 'admin' && (
                                <span className="ml-2 px-2 py-2 text-xs bg-amber-100 rounded">
                                    Admin
                                </span>
                            )}

                            {userData?.role === 'staff' && (
                                <span className="ml-2 px-2 py-2 text-xs bg-amber-100 rounded">
                                    Staff
                                </span>
                            )}

                            {userData?.userStatus === "blocked" && (
                                <span className="relative group">
                                    <FaExclamationTriangle size={24} className="text-red-500 text-lg cursor-pointer ml-3" />

                                    {/* Tooltip */}
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-8
        w-64 bg-gray-900 text-white text-xs rounded-md px-3 py-2
        opacity-0 group-hover:opacity-100 transition
        pointer-events-none text-center shadow-lg">
                                        Your account has been blocked by the admin.
                                        Please contact the authorities.
                                    </span>
                                </span>
                            )}



                        </h2>






                        <p className="text-gray-700">{user.email}</p>

                        <p className="text-sm text-gray-600 mt-1">
                            {user.emailVerified ? "Email Verified" : "Email Not Verified"}
                        </p>

                        {/* Update Button */}
                        <button
                            onClick={handleUpdateProfileModal}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 mr-4 rounded hover:bg-blue-600 transition cursor-pointer"
                        >Update Profile
                        </button>

                        {
                            userData?.role === "user" &&

                            <button
                                onClick={handlePurchasePremium}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                            >Purchase Premium
                            </button>
                        }
                    </div>
                </div>

                {/* User details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-500">UID</h3>
                        <p className="mt-1 text-gray-900 text-sm">{user.uid}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-500">Phone</h3>
                        <p className="mt-1 text-gray-900 text-sm">{userData.phone || "N/A"}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-500">UID Provider</h3>
                        <p className="mt-1 text-gray-900 text-sm">{user.providerId}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-500">Last Sign-In</h3>
                        <p className="mt-1 text-gray-900 text-sm">{user.metadata?.lastSignInTime}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-500">Created At</h3>
                        <p className="mt-1 text-gray-900 text-sm">{user.metadata?.creationTime}</p>
                    </div>
                </div>

                {
                    (userData.role === "user" || userData.role === "premiumUser") && (
                        <div className="mt-6">

                            <PDFDownloadLink
                                document={
                                    <ProfilePDF user={user} userData={userData} />
                                }
                                fileName={`profile-${user.uid}.pdf`}
                            >
                                {({ loading }) => (
                                    <button
                                        className="btn btn-outline btn-sm"
                                        disabled={loading}
                                    >
                                        {loading ? "Generating..." : "Download Profile PDF"}
                                    </button>
                                )}
                            </PDFDownloadLink>
                        </div>
                    )
                }

            </div >

            {/* modal */}

            {
                isOpen && (
                    <dialog open className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg mb-4">Update Profile</h3>

                            <form
                                onSubmit={handleSubmit(handleProfileUpdate)}
                                className="space-y-3"
                            >
                                {/* Name */}
                                <label className="font-semibold">Name</label>
                                <input
                                    defaultValue={user.displayName}
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Full Name"
                                    className="input input-bordered w-full"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}

                                {/* Phone */}

                                <label className="font-semibold">Phone</label>
                                <input
                                    defaultValue={userData?.phone}
                                    {...register("phone")}
                                    placeholder="Phone Number"
                                    className="input input-bordered w-full"
                                />

                                {/* Photo */}
                                <label className="font-semibold">Photo</label>
                                <input
                                    {...register("photo")}
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                />

                                {/* Actions */}
                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>

                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => {
                                            reset();
                                            setIsOpen(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                )}

        </div >
    );
};

export default ProfilePage;