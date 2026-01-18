import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {

    const handleGoogleLogin = () =>{
        console.log("Handle google login clicked");
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