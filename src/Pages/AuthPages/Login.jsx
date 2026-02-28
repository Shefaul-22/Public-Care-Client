import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../components/Shared/SocialLogin';
import Logo from '../../components/Shared/Logo';
import UseAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { signInUser } = UseAuth();
    const location = useLocation();

    const handleLogin = (data) => {
        Swal.fire({
            title: "Authenticating...",
            color: 'var(--bc)',
            background: 'var(--b1)',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        signInUser(data.email, data.password)
            .then(result => {
                if (result.user) {
                    Swal.fire({
                        icon: "success",
                        title: "Welcome Back!",
                        text: "Login Successful",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    navigate(location?.state || '/');
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Access Denied",
                    text: "Invalid email or password. Please try again.",
                    confirmButtonColor: '#fa0bd2'
                });
                console.error(error);
                ;
            });
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Logo & Header */}
            <div className="flex flex-col items-center mb-10">
                <div className="hover:scale-110 transition-transform duration-300">
                    <Logo />
                </div>
                <h2 className='font-black text-3xl text-base-content mt-4 tracking-tight'>Welcome Back</h2>
                <p className='text-base-content/60 font-medium'>Please enter your details to login</p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">

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
                            placeholder="your@email.com"
                            className={`input input-bordered w-full pl-12 bg-base-200/50 border-base-300 focus:border-[#fa0bd2] focus:ring-2 focus:ring-[#fa0bd2]/20 transition-all ${errors.email ? 'border-error' : ''}`}
                            {...register('email', { required: "Email is required" })}
                        />
                    </div>
                    {errors.email && <span className="text-error text-xs mt-1 ml-1">{errors.email.message}</span>}
                </div>

                {/* Password Field */}
                <div className="form-control">
                    <div className="flex justify-between items-center mb-1">
                        <label className="label py-0">
                            <span className="label-text font-bold text-base-content/70 uppercase text-[10px] tracking-widest">Password</span>
                        </label>
                        <Link className="text-[11px] font-bold text-[#fa0bd2] hover:underline opacity-80">Forgot Password?</Link>
                    </div>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-[#fa0bd2] transition-colors">
                            <FaLock />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className={`input input-bordered w-full pl-12 pr-12 bg-base-200/50 border-base-300 focus:border-[#fa0bd2] focus:ring-2 focus:ring-[#fa0bd2]/20 transition-all ${errors.password ? 'border-error' : ''}`}
                            {...register('password', { required: "Password is required" })}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-[#fa0bd2] transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                    </div>
                    {errors.password && <span className="text-error text-xs mt-1 ml-1">{errors.password.message}</span>}
                </div>

                {/* Login Button */}
                <button className="btn w-full bg-gradient-to-r from-[#fa0bd2] to-[#b00794] hover:from-[#d109ae] hover:to-[#8a0674] text-white border-none font-bold text-lg shadow-xl shadow-[#fa0bd2]/20 mt-4 h-14 rounded-xl normal-case transition-all active:scale-95">
                    Sign In
                </button>
            </form>

            {/* Footer Links */}
            <div className='mt-10 text-center space-y-6'>
                <p className='text-base-content/60 font-medium'>
                    New to CivicCare?
                    <Link
                        state={location.state}
                        to="/register"
                        className='text-[#fa0bd2] font-black ml-2 hover:underline underline-offset-4 decoration-2'
                    >
                        Create Account
                    </Link>
                </p>

                <div className="divider text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">Or connect with</div>

                <div className="pt-2">
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;