import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import UseAuth from '../../hooks/UseAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router';

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

        // console.log("Handle google login clicked");

        signInWithGoogle()
            .then(result => {
                // console.log(result.user);


                // create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data)

                    })

                navigate(location.state || '/');

            })
            .catch(error => {
                console.log(error)
            })
    }


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