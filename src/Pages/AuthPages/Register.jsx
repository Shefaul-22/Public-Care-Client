import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaCamera } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../components/Shared/SocialLogin';
import Logo from '../../components/Shared/Logo';
import UseAuth from '../../hooks/UseAuth';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { registerUser, UpdateUserProfile } = UseAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();

    const handleRegister = async (data) => {
        Swal.fire({
            title: "Creating Account...",
            color: 'var(--bc)',
            background: 'var(--b1)',
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        try {
            const profileImg = data.photo[0];
            const result = await registerUser(data.email, data.password);

            const formData = new FormData();
            formData.append('image', profileImg);
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
            const imgRes = await axios.post(image_API_URL, formData);
            const photoURL = imgRes.data.data.url;

            const userInfo = {
                uid: result.user.uid,
                email: data.email,
                displayName: data.name,
                photoURL: photoURL
            };
            await axiosSecure.post('/users', userInfo);
            await UpdateUserProfile({ displayName: data.name, photoURL: photoURL });

            Swal.fire({
                icon: "success",
                title: "Welcome!",
                text: "Registration Successful.",
                timer: 2000,
                showConfirmButton: false
            });

            setTimeout(() => {
                navigate("/login", { state: location.state });
            }, 2000);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Something went wrong!"
            });
        }
    };

    return (
        <div className="w-full animate-in fade-in duration-700">
            {/* Logo & Header */}
            <div className="flex flex-col items-center mb-8">
                <div className="transform hover:scale-110 transition-transform duration-300">
                    <Logo />
                </div>
                <h2 className='font-black text-3xl text-base-content mt-4 tracking-tight'>Create Account</h2>
                <p className='text-base-content/60 font-medium'>Join the CivicCare community</p>
            </div>

            <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">

                {/* Name Field */}
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-bold text-base-content/70 uppercase text-[10px] tracking-widest">Full Name</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-[#fa0bd2] transition-colors">
                            <FaUser />
                        </div>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className={`input input-bordered w-full pl-12 bg-base-200/50 border-base-300 focus:border-[#fa0bd2] focus:ring-2 focus:ring-[#fa0bd2]/20 transition-all ${errors.name ? 'border-error' : ''}`}
                            {...register('name', { required: "Name is required" })}
                        />
                    </div>
                    {errors.name && <span className="text-error text-xs mt-1 ml-1">{errors.name.message}</span>}
                </div>

                {/* Photo Upload Field */}
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-bold text-base-content/70 uppercase text-[10px] tracking-widest">Profile Photo</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-[#fa0bd2] transition-colors z-10">
                            <FaCamera />
                        </div>
                        <input
                            type="file"
                            accept='image/*'
                            className="file-input file-input-bordered w-full pl-12 bg-base-200/50 border-base-300 focus:border-[#fa0bd2] file:bg-[#fa0bd2] file:text-white file:border-none file:mr-4"
                            {...register('photo', { required: "Photo is required" })}
                        />
                    </div>
                    {errors.photo && <span className="text-error text-xs mt-1 ml-1">{errors.photo.message}</span>}
                </div>

                {/* Email Field */}
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-bold text-base-content/70 uppercase text-[10px] tracking-widest">Email Address</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-[#fa0bd2] transition-colors">
                            <FaEnvelope />
                        </div>
                        <input
                            type="email"
                            placeholder="hello@example.com"
                            className={`input input-bordered w-full pl-12 bg-base-200/50 border-base-300 focus:border-[#fa0bd2] focus:ring-2 focus:ring-[#fa0bd2]/20 transition-all ${errors.email ? 'border-error' : ''}`}
                            {...register('email', { required: "Email is required" })}
                        />
                    </div>
                    {errors.email && <span className="text-error text-xs mt-1 ml-1">{errors.email.message}</span>}
                </div>

                {/* Password Field */}
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-bold text-base-content/70 uppercase text-[10px] tracking-widest">Secure Password</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-[#fa0bd2] transition-colors">
                            <FaLock />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className={`input input-bordered w-full pl-12 pr-12 bg-base-200/50 border-base-300 focus:border-[#fa0bd2] focus:ring-2 focus:ring-[#fa0bd2]/20 transition-all ${errors.password ? 'border-error' : ''}`}
                            {...register('password', {
                                required: "Password is required",
                                minLength: { value: 6, message: "At least 6 characters" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                                    message: "Must include Upper, Lower, Number & Special"
                                }
                            })}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-[#fa0bd2] transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                    </div>
                    {errors.password && <span className="text-error text-xs mt-1 ml-1 leading-tight block">{errors.password.message}</span>}
                </div>

                {/* Register Button */}
                <button className="btn w-full bg-gradient-to-r from-[#fa0bd2] to-[#b00794] hover:from-[#d109ae] hover:to-[#8a0674] text-white border-none font-bold text-lg shadow-xl shadow-[#fa0bd2]/20 mt-4 h-14 rounded-xl normal-case transition-all active:scale-95">
                    Create My Account
                </button>
            </form>

            {/* Footer Links */}
            <div className='mt-10 text-center space-y-6'>
                <p className='text-base-content/60 font-medium'>
                    Already a member?
                    <Link
                        state={location.state}
                        to="/login"
                        className='text-[#fa0bd2] font-black ml-2 hover:underline underline-offset-4 decoration-2'
                    >
                        Sign In
                    </Link>
                </p>

                <div className="divider text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">Or continue with</div>

                <div className="pt-2">
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;