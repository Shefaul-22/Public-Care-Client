import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../../components/Shared/SocialLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import Logo from '../../components/Shared/Logo';
import UseAuth from '../../hooks/UseAuth';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate()

    const { signInUser } = UseAuth();

    const location = useLocation();
    console.log('in the login', location)

   

    const handleLogin = (data) => {
        // console.log("data after login ", data);

        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/');
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <div >

            <Logo></Logo>

            <div className='space-y-2 my-5 md:7'>
                <h2 className='font-extrabold text-2xl md:text-4xl'>Welcome Back</h2>
                <p>Login with CivicCare</p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">

                    {/* email */}
                    <label className="label font-medium text-gray-700 text-[14px]">Email</label>
                    <input type="email" className="input w-full md:w-2/3"
                        {...register('email', { required: true })}
                        placeholder="example@email.com" />

                    {errors.email?.type === "required" && (
                        <p className='text-red-500'>Email is required</p>
                    )}


                    {/* password */}
                    <label className="label font-medium text-gray-700 text-[14px]">Password</label>
                    <div className="relative w-full md:w-2/3">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input w-full pr-10"
                            placeholder="Password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                            })}
                        />

                        <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </span>
                    </div>


                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is Required</p>
                    }


                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be six characters or Longer</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>Password must include uppercase, lowercase, number & special character</p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn bg-primary text-white font-semibold mt-4 w-full md:w-2/3">Login</button>
                </fieldset>
            </form>

            <div className='w-full md:w-2/3 my-2'>
                <p>New to CivicCare? <Link state={location.state}

                    to="/register"
                    className='text-blue-500 text-[18px] underline mb-2'>Register</Link></p>
                <p className='text-center text-xl font-semibold'>OR</p>
            </div>

            <SocialLogin></SocialLogin>

        </div>
    );
};

export default Login;