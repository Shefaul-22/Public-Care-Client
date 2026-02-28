import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import UseAuth from '../../hooks/UseAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { signInWithGoogle } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(async (result) => {
                const user = result.user;
                const userInfo = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    provider: user.providerData[0]?.providerId || 'google',
                };

                try {
                    const res = await axiosSecure.post('/users', userInfo);

                    Swal.fire({
                        icon: res.data?.message === 'user exists' ? 'info' : 'success',
                        title: res.data?.message === 'user exists' ? 'Welcome back!' : 'Login Successful',
                        text: res.data?.message === 'user exists' ? 'Logged in successfully.' : 'Account created successfully.',
                        timer: 1800,
                        showConfirmButton: false,
                        background: 'var(--b1)',
                        color: 'var(--bc)'
                    });

                    navigate(location.state || '/', { replace: true });

                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong on our server.',
                        background: 'var(--b1)',
                        color: 'var(--bc)'
                    });
                    console.error(error)
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                    background: 'var(--b1)',
                    color: 'var(--bc)'
                });
            });
    };

    return (
        <div className='w-full flex justify-center'>
            <button
                onClick={handleGoogleLogin}
                className="group relative flex items-center justify-center gap-3 w-full max-w-sm h-12 
                           bg-base-200/50 hover:bg-base-300/80 
                           border border-base-300 hover:border-primary/30 
                           rounded-xl transition-all duration-300 
                           active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
            >
                {/* Google Icon Wrapper */}
                <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <FcGoogle size={20} />
                </div>

                {/* Button Text */}
                <span className="font-bold text-base-content/80 group-hover:text-base-content">
                    Continue with Google
                </span>

                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </button>
        </div>
    );
};

export default SocialLogin;