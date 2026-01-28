import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import UseAuth from '../../hooks/UseAuth';

import { useLoaderData, useNavigate } from 'react-router';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { handleBlockedError } from '../../utils/handleBlockedError';


const ReportIssue = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();
    const { user } = UseAuth();

    const email = user.email;

    const [issueCount, setIssueCount] = useState(0);
    const [role, setRole] = useState('');

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/${user.email}/issues/count`)
                .then(res => {
                    setIssueCount(res.data.count);
                    setRole(res.data.role);
                })
                .catch(err => console.error(err));
        }
    }, [email]);

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);

    const regions = [...new Set(regionsDuplicate)];
    // explore useMemo useCallback
    const senderRegion = useWatch({ control, name: 'senderRegion' });


    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    // const handleReportIssue = async (data) => {
    //     // console.log(data);


    //     try {

    //         const issueImg = data.image[0];

    //         const formData = new FormData();
    //         formData.append('image', issueImg)

    //         const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`

    //         await axios.post(image_API_URL, formData)
    //             .then(res => {

    //                 const photoURL = res.data.data.url;
    //                 console.log(photoURL);

    //                 const issueInfo = {
    //                     issueName: data.issueName,
    //                     category: data.category,
    //                     issueDescription: data.issueDescription,
    //                     photoURL: photoURL,
    //                     senderName: data.senderName,
    //                     senderEmail: data.senderEmail,
    //                     senderRegion: data.senderRegion,
    //                     senderDistrict: data.senderDistrict,
    //                     senderAddress: data.senderAddress,
    //                 }

    //                 const res = await axiosSecure.post('/issues', issueInfo)

    //                 console.log('after saving parcel', res.data);
    //                 if (res.data.insertedId) {
    //                     navigate('/dashboard/my-issues')
    //                     Swal.fire({
    //                         position: "top-end",
    //                         icon: "success",
    //                         title: "Issue has created. Please Pay to Boost",
    //                         showConfirmButton: true,
    //                         timer: 2000
    //                     });
    //                 }

    //             })
    //     }
    //     catch (error) {
    //         console.error(error);
    //         Swal.fire("Error", "Something went wrong", "error");
    //     }

    // };


    const handleReportIssue = async (data) => {
        try {
            const issueImg = data.image[0];

            const formData = new FormData();
            formData.append('image', issueImg);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;

            // Upload image on imagebb
            const imgRes = await axios.post(image_API_URL, formData);
            const photoURL = imgRes.data.data.url;


            const issueInfo = {
                title: data.issueName,
                category: data.category,
                issueDescription: data.issueDescription,
                photoURL,
                senderName: data.senderName,
                senderEmail: data.senderEmail,
                senderRegion: data.senderRegion,
                senderDistrict: data.senderDistrict,
                senderAddress: data.senderAddress,
            };

            // Save issue to DB
            const res = await axiosSecure.post('/issues', issueInfo);

            if (res.data.insertedId) {
                navigate('/dashboard/my-issues');
                Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Issue has been created successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
            }

        } catch (error) {
            console.error(error);

            if (!handleBlockedError(error)) {
                
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response?.data?.message || "Something went wrong",
                });
            }

        }
    };

    return (
        <div>
            <h2 className="text-5xl font-bold pt-4 md:pt-6">Report An Issue</h2>
            <form onSubmit={handleSubmit(handleReportIssue)} className='mt-2 md:mt-4 p-2 text-black'>

                {/* report details, name, photo */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>

                    <fieldset className="fieldset">
                        <label className="label">Issue Name</label>
                        <input type="text" {...register('issueName', { required: true })} className="input w-full file-input-primary" placeholder="Issue Name" />

                        {errors.issueName?.type === "required" && (
                            <p className='text-red-500'>Issue Name is required</p>
                        )}

                        {/* select a category */}
                        <fieldset className="fieldset">
                            <legend className=" label">Issue Category</legend>

                            <select {...register('category', { required: "Category is required" })}

                                defaultValue="" className="select w-full file-input-primary">

                                <option value="" disabled>Pick a Category</option>
                                <option value="Broken streetlights">Broken streetlights</option>
                                <option value="Potholes">Potholes</option>
                                <option value="Water leakage">Water leakage</option>
                                <option value="Garbage overflow">Garbage overflow</option>
                                <option value="Damage footpaths">Damage footpaths</option>

                            </select>

                            {errors.category && (
                                <p className="text-red-500">{errors.category.message}</p>
                            )}


                        </fieldset>

                        {/* Issue description */}
                        <fieldset className='fieldset'>
                            <legend className="label">Issue Details</legend>
                            <textarea {...register('issueDescription')} placeholder="Write issue description here..." className="textarea textarea-primary w-full"></textarea>




                            {/* <label className="label">Upload Issue Photo</label>
                        <input type="file" {...register('reportImage')} className="input w-full" placeholder="Upload issue image" /> */}

                            {/* Photo image field */}
                            <label className="label font-medium text-gray-700 text-[14px]">Upload issue image</label>

                            <input type="file" className="file-input file-input-primary w-full "
                                {...register('image', { required: true })}
                                placeholder="Upload issue image" />


                            {errors.image?.type === "required" && (
                                <p className='text-red-500'>Issue image is required</p>
                            )}

                        </fieldset>
                    </fieldset>

                </div>


                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* sender Details */}

                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">Sender Details</h4>
                        {/* sender name */}
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName')}
                            defaultValue={user?.displayName}
                            className="input w-full file-input-primary" placeholder="Sender Name" />

                        {/* sender email */}
                        <label className="label">Sender Email</label>
                        <input type="text" {...register('senderEmail')}
                            defaultValue={user?.email}
                            className="input w-full file-input-primary" placeholder="Sender Email" />

                        {/* sender region */}
                        <fieldset className="fieldset " >
                            <legend className="fieldset-legend">Sender Regions</legend>
                            <select {...register('senderRegion', { required: true })} defaultValue="Pick a region" className="select w-full file-input-primary">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option >)
                                }
                            </select>



                        </fieldset>

                        {/* sender districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select {...register('senderDistrict', {
                                required: "Sender district is required"
                            })} defaultValue="Pick a district" className="select w-full file-input-primary" required>

                                <option disabled={true}>Pick a district</option>

                                {
                                    districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }

                            </select>



                        </fieldset>


                        {/* sender address */}
                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full file-input-primary" placeholder="Sender Address" />


                    </fieldset>

                </div>

                {/* <input type="submit" className='btn btn-primary mt-8 text-white' value="Send Issue" /> */}

                <div className="relative inline-block group">
                    <input
                        type="submit"
                        className='btn btn-primary mt-8 text-white disabled:cursor-not-allowed'
                        value="Send Issue"
                        disabled={role !== 'premiumUser' && issueCount >= 3}
                    />

                    {role !== 'premiumUser' && issueCount >= 3 && (
                        <span className="absolute left-54 -translate-x-1/2 -top-1 w-max bg-gray-800 text-white  px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-md">
                            Free users can submit up to 3 issues. Upgrade to Premium.
                        </span>
                    )}
                </div>

                {role !== 'premiumUser' && issueCount >= 3 && (
                    <button
                        type="button"
                        className="btn btn-warning ml-5 mt-8"
                        onClick={() => navigate('/profile')}
                    >
                        Upgrade to Premium
                    </button>
                )}



            </form>
        </div>
    );
};

export default ReportIssue;