import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import UseAuth from '../../hooks/UseAuth';

import { useLoaderData } from 'react-router';


const ReportIssue = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();
    const { user } = UseAuth();
    // const axiosSecure = useAxiosSecure();
    // const navigate = useNavigate();

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

    const handleReportIssue = (data) => {
        console.log(data);
    }


    return (
        <div>
            <h2 className="text-5xl font-bold pt-4 md:pt-6">Report An Issue</h2>
            <form onSubmit={handleSubmit(handleReportIssue)} className='mt-2 md:mt-4 p-2 text-black'>

                {/* report details, name, photo */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Issue Name</label>
                        <input type="text" {...register('issueName', { required: true })} className="input w-full" placeholder="Issue Name" />

                        {errors.issueName?.type === "required" && (
                            <p className='text-red-500'>Issue Name is required</p>
                        )}

                        {/* <label className="label">Upload Issue Photo</label>
                        <input type="file" {...register('reportImage')} className="input w-full" placeholder="Upload issue image" /> */}

                        {/* Photo image field */}
                        <label className="label font-medium text-gray-700 text-[14px]">Upload issue image</label>

                        <input type="file" className="file-input w-full "
                            {...register('image', { required: true })}
                            placeholder="Upload issue image" />


                        {errors.image?.type === "required" && (
                            <p className='text-red-500'>Issue image is required</p>
                        )}
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
                            className="input w-full" placeholder="Sender Name" />

                        {/* sender email */}
                        <label className="label">Sender Email</label>
                        <input type="text" {...register('senderEmail')}
                            defaultValue={user?.email}
                            className="input w-full" placeholder="Sender Email" />

                        {/* sender region */}
                        <fieldset className="fieldset ">
                            <legend className="fieldset-legend">Sender Regions</legend>
                            <select {...register('senderRegion', { required: true })} defaultValue="Pick a region" className="select w-full" >
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>

                            

                        </fieldset>

                        {/* sender districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select {...register('senderDistrict', {
                                required: "Sender district is required"
                            })} defaultValue="Pick a district" className="select w-full">
                                <option  disabled={true}>Pick a district</option>
                                {
                                    districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>

                            

                        </fieldset>


                        {/* sender address */}
                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />


                    </fieldset>

                </div>
                <input type="submit" className='btn btn-primary mt-8 text-white' value="Send Issue" />
            </form>
        </div>
    );
};

export default ReportIssue;