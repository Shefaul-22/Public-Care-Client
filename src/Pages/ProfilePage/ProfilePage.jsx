import React, { useEffect, useState } from 'react';
import UseAuth from '../../hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { FaExclamationTriangle, FaUserEdit, FaCrown, FaPhone, FaIdCard, FaHistory, FaCalendarAlt, FaDownload, FaShieldAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProfilePDF from './ProfilePDF';

const ProfilePage = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: userData = {}, isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');

        if (sessionId) {
            axiosSecure.patch(`/premium-payment-success?session_id=${sessionId}`)
                .then(res => {
                    if (res.data.success) {
                        Swal.fire({
                            title: 'Premium Activated',
                            text: 'You are now a premium user!',
                            icon: 'success',
                            confirmButtonColor: '#fa0bd2'
                        });
                        refetch();
                    }
                });
        }

        if (params.get('payment') === 'cancelled') {
            Swal.fire('Cancelled', 'Payment was cancelled', 'info');
        }
    }, [user?.email, axiosSecure, refetch]);

    const handleProfileUpdate = async (data) => {
        Swal.fire({
            title: 'Updating Profile...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        try {
            let photoURL = user.photoURL;
            if (data.photo && data.photo.length > 0) {
                const imageFile = data.photo[0];
                const formData = new FormData();
                formData.append("image", imageFile);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
                const imgRes = await axios.post(image_API_URL, formData);
                if (imgRes.data.success) photoURL = imgRes.data.data.url;
            }

            const updateInfo = {
                displayName: data.name || user.displayName,
                phone: data.phone || userData.phone,
                photoURL: photoURL
            };

            const res = await axiosSecure.patch("/users/profile", updateInfo);
            if (res.data.success) {
                Swal.fire({ icon: 'success', title: 'Updated!', confirmButtonColor: '#fa0bd2' });
                refetch();
                reset();
                setIsOpen(false);
            }
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: err.message });
        }
    };

    const handlePurchasePremium = async () => {
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

    if (isLoading) return <Loading />

    return (
        <div className='py-6 min-h-screen transition-colors duration-300'>
            <div className="bg-base-100 shadow-xl rounded-3xl border border-base-300 p-6 md:p-12 overflow-hidden">

                {/* Header Section */}
                <h2 className='text-3xl md:text-5xl font-extrabold mb-10 text-base-content'>
                    Your <span className='text-[#fa0bd2] underline decoration-2 underline-offset-8'>Profile</span>
                </h2>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 mb-12">
                    {/* Avatar with Status Ring */}
                    <div className="relative group">
                        <div className={`p-1 rounded-full bg-gradient-to-tr ${userData?.role === 'premiumUser' ? 'from-yellow-400 to-orange-500' : 'from-[#fa0bd2] to-purple-600'}`}>
                            <img
                                src={user.photoURL || "https://i.ibb.co/G4qVmKJz/user.png"}
                                alt="User"
                                className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-base-100"
                            />
                        </div>
                        {userData?.role === 'premiumUser' && (
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                <FaCrown /> PREMIUM
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 text-center lg:text-left space-y-3">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                            <h2 className="text-3xl md:text-4xl font-black text-base-content">
                                {user.displayName || "Citizen User"}
                            </h2>
                            {userData?.role === 'admin' && <span className="badge badge-error badge-lg font-bold text-white">Admin</span>}
                            {userData?.role === 'staff' && <span className="badge badge-primary badge-lg font-bold">Staff</span>}

                            {userData?.userStatus === "blocked" && (
                                <div className="tooltip tooltip-bottom tooltip-error" data-tip="Account Blocked! Contact Admin.">
                                    <FaExclamationTriangle size={24} className="text-red-500 animate-pulse" />
                                </div>
                            )}
                        </div>

                        <p className="text-lg opacity-70 font-medium">{user.email}</p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                            <span className={`badge ${user.emailVerified ? 'badge-success text-white' : 'badge-ghost'} badge-outline p-3`}>
                                {user.emailVerified ? "Verified Account" : "Unverified Account"}
                            </span>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="btn bg-[#fa0bd2] hover:bg-[#d109ae] text-white border-none rounded-xl"
                            >
                                <FaUserEdit /> Update Profile
                            </button>

                            {userData?.role === "user" && (
                                <button
                                    onClick={handlePurchasePremium}
                                    className="btn btn-outline border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-xl"
                                >
                                    <FaCrown /> Get Premium
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Details Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <DetailCard icon={<FaIdCard className="text-[#fa0bd2]" />} title="User UID" value={user.uid} />
                    <DetailCard icon={<FaPhone className="text-[#fa0bd2]" />} title="Phone Number" value={userData.phone || "Not Set"} />
                    <DetailCard icon={<FaShieldAlt className="text-[#fa0bd2]" />} title="Provider" value={user.providerId} />
                    <DetailCard icon={<FaHistory className="text-[#fa0bd2]" />} title="Last Active" value={new Date(user.metadata?.lastSignInTime).toLocaleString()} />
                    <DetailCard icon={<FaCalendarAlt className="text-[#fa0bd2]" />} title="Joined On" value={new Date(user.metadata?.creationTime).toLocaleDateString()} />

                    {/* PDF Action */}
                    {(userData.role === "user" || userData.role === "premiumUser") && (
                        <PDFDownloadLink
                            document={<ProfilePDF user={user} userData={userData} />}
                            fileName={`profile-${user.uid}.pdf`}
                            className="w-full"
                        >
                            {({ loading }) => (
                                <div className="p-5 bg-base-200 hover:bg-base-300 border-2 border-dashed border-base-content/20 rounded-2xl h-full flex flex-col items-center justify-center transition-all cursor-pointer group">
                                    <FaDownload className={`text-2xl mb-2 group-hover:scale-110 transition-transform ${loading ? 'animate-bounce' : 'text-[#fa0bd2]'}`} />
                                    <span className="font-bold text-sm uppercase tracking-wider">
                                        {loading ? "Preparing PDF..." : "Export Profile PDF"}
                                    </span>
                                </div>
                            )}
                        </PDFDownloadLink>
                    )}
                </div>
            </div>

            {/* Update Modal */}
            {isOpen && (
                <dialog open className="modal modal-bottom sm:modal-middle backdrop-blur-sm transition-all duration-300">
                    <div className="modal-box bg-base-100 border border-base-300 shadow-2xl p-0 overflow-hidden max-w-lg">
                        {/* Header with Gradient */}
                        <div className="bg-gradient-to-r from-[#fa0bd2] to-[#b00794] p-6">
                            <h3 className="font-bold text-2xl text-white flex items-center gap-2">
                                <FaUserEdit /> Update Profile
                            </h3>
                            <p className="text-white/80 text-sm mt-1">Make changes to your personal information</p>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit(handleProfileUpdate)} className="p-6 space-y-5">

                            {/* Full Name Input */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-base-content/80">Full Name</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue={user.displayName}
                                        {...register("name", { required: "Name is required" })}
                                        placeholder="Ex: John Doe"
                                        className={`input input-bordered w-full pl-4 focus:outline-none focus:ring-2 focus:ring-[#fa0bd2]/50 focus:border-[#fa0bd2] transition-all ${errors.name ? 'input-error' : ''}`}
                                    />
                                </div>
                                {errors.name && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.name.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Phone Number Input */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-base-content/80">Phone Number</span>
                                </label>
                                <div className="join w-full border border-base-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#fa0bd2]/50 transition-all">
                                    <span className="join-item bg-base-200 px-4 flex items-center border-r border-base-300 text-sm font-semibold">+88</span>
                                    <input
                                        type="tel"
                                        defaultValue={userData?.phone}
                                        {...register("phone", {
                                            required: "Phone is required",
                                            pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" },
                                            minLength: { value: 11, message: "Exactly 11 digits required" },
                                            maxLength: { value: 11, message: "Exactly 11 digits required" }
                                        })}
                                        placeholder="017XXXXXXXX"
                                        className={`input join-item w-full border-none focus:outline-none pl-3 ${errors.phone ? 'text-error' : ''}`}
                                    />
                                </div>
                                {errors.phone && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.phone.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Profile Photo Input */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-base-content/80">Profile Photo</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("photo")}
                                    className="file-input file-input-bordered file-input-md w-full focus:outline-none focus:border-[#fa0bd2] file:bg-base-200 file:text-base-content file:border-none"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-base-content/50 italic text-[11px]">Accepted: JPG, PNG, WEBP (Max 2MB)</span>
                                </label>
                            </div>

                            {/* Divider */}
                            <div className="divider opacity-50"></div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 mt-2">
                                <button
                                    type="button"
                                    onClick={() => { reset(); setIsOpen(false) }}
                                    className="btn btn-ghost hover:bg-base-200 rounded-xl px-6 capitalize"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-[#fa0bd2] hover:bg-[#d109ae] text-white border-none rounded-xl px-8 shadow-lg shadow-[#fa0bd2]/20 capitalize transition-all active:scale-95"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
            
        </div>
    );
};

// Reusable Detail Card
const DetailCard = ({ icon, title, value }) => (
    <div className="p-5 bg-base-200 rounded-2xl border border-base-300 hover:shadow-md transition-shadow group">
        <div className="flex items-center gap-3 mb-2 text-base-content">
            {icon}
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">{title}</h3>
        </div>
        <p className="font-bold text-base-content break-all truncate" title={value}>{value || "N/A"}</p>
    </div>
);

export default ProfilePage;