import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import UseAuth from '../../hooks/UseAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const SocialLogin = () => {

    // const handleGoogleLogin = () =>{
    //     console.log("Handle google login clicked");
    // }
    const { signInWithGoogle } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const location = useLocation();
    // console.log('location in social', location);

    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(async (result) => {

                const user = result.user;
                // console.log(user);

                const userInfo = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    provider: user.providerData[0]?.providerId || 'google',
                };

                try {

                    const res = await axiosSecure.post('/users', userInfo);

                    if (res.data?.message === 'user exists') {
                        Swal.fire({
                            icon: 'info',
                            title: 'Welcome back!',
                            text: 'You already have an account. Logged in successfully.',
                            timer: 1800,
                            showConfirmButton: false
                        });


                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Login Successful',
                            text: 'Account created successfully.',
                            timer: 1800,
                            showConfirmButton: false
                        });
                    }

                    navigate(location.state || '/', { replace: true });

                } catch (error) {
                    console.error(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: 'Please try again later.',
                    });
                }

            })
            .catch(error => {
                console.error('Google sign-in failed:', error);

                Swal.fire({
                    icon: 'error',
                    title: 'Google Login Failed',
                    text: error.message,
                });
            });
    };



    return (
        <div className='w-full md:w-2/3'>

            <button onClick={handleGoogleLogin} className="btn w-full bg-[#d4d7dd] text-black border-[#e5e5e5]">
                <FcGoogle size={22}></FcGoogle>
                Sign In with Google
            </button>

        </div>
    );
};

export default SocialLogin;