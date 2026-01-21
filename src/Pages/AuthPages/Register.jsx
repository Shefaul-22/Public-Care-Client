import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../components/Shared/SocialLogin';
import Logo from '../../components/Shared/Logo';
import UseAuth from '../../hooks/UseAuth';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const Register = () => {

    const [showPassword, setShowPassword] = useState(false)
    const { registerUser, UpdateUserProfile } = UseAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const location = useLocation();
    console.log("In register page ", location);

    const handleRegister = (data) => {

        // console.log("after register", data);
        // console.log("after register", data, data.photo[0]);
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                // store the image and get the photo url
                const formData = new FormData();
                formData.append('image', profileImg)

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`

                axios.post(image_API_URL, formData)
                    .then(res => {

                        const photoURL = res.data.data.url;
                        console.log(photoURL);

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database', res.data);
                                }
                            })


                        // console.log('after image upload', res);
                        // console.log('after image upload', res.data.data.url);
                        // update the user profile
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL,
                        }

                        UpdateUserProfile(userProfile)
                            .then(() => {
                                console.log('userProfile updated done');
                                navigate("/login", {
                                    state: location.state
                                });
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })



            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <div>

            <Logo></Logo>

            <div className='space-y-2 my-5 md:7'>
                <h2 className='font-extrabold text-2xl md:text-4xl'>Create an Account</h2>
                <p>Register with CivicCare</p>
            </div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">

                    {/* Name */}
                    <label className="label font-medium text-gray-700  text-[14px]">Name</label>
                    <input type="text" className="input w-full md:w-2/3"
                        {...register('name', { required: true })}
                        placeholder="Your name" />

                    {errors.name?.type === "required" && (
                        <p className='text-red-500'>Name is required</p>
                    )}

                    {/* Photo image field */}
                    <label className="label font-medium text-gray-700 text-[14px]">Upload an image</label>

                    <input type="file" className="file-input w-full md:w-2/3"
                        {...register('photo')}
                        placeholder="Your Photo" />

                    {errors.name?.type === "required" && (
                        <p className='text-red-500'>Photo is required</p>
                    )}

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

                    <button className="btn bg-primary text-white font-semibold mt-4 w-full md:w-2/3" >Register</button>
                </fieldset>

            </form>



            <div className='w-full md:w-2/3 my-2'>
                <p>Already have an Account. <Link

                    state={location.state}

                    to="/login" className='text-blue-500 text-[18px] underline mb-2'>Login</Link></p>
                <p className='text-center text-xl font-semibold'>OR</p>
            </div>

            <SocialLogin></SocialLogin>

        </div>
    );
};

export default Register;