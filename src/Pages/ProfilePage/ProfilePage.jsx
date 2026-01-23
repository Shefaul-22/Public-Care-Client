import React from 'react';
import UseAuth from '../../hooks/UseAuth';
import { useNavigate } from 'react-router';

const ProfilePage = () => {

    const {user} = UseAuth();

    const navigate = useNavigate();

    const handleUpdateProfile = () => {
        navigate('/updateProfile')
    }
    return (
        <div className='bg-[#bdd7e7] py-6'>
            <div className="max-w-4xl mx-auto bg-gray-300 shadow-lg rounded-2xl  p-12">

                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-6 ">
                    <img
                        src={user.photoURL ? user.photoURL : "https://ibb.co.com/G4qVmKJz"}
                        alt="User"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-md"
                    />

                    <div className="text-center sm:text-left">

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {user.displayName || "No Name"}
                        </h2>

                        <p className="text-gray-700">{user.email}</p>
                        <p className="text-sm text-gray-600 mt-1">
                            {user.emailVerified ? "Email Verified" : "Email Not Verified"}
                        </p>

                        {/* Update Button */}
                        <button
                            onClick={handleUpdateProfile}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                        >Update Profile
                        </button>
                    </div>
                </div>

                {/* User details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-500">UID</h3>
                        <p className="mt-1 text-gray-900 text-sm">{user.uid}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-500">Phone</h3>
                        <p className="mt-1 text-gray-900 text-sm">{user.phoneNumber || "N/A"}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-500">Provider</h3>
                        <p className="mt-1 text-gray-900 text-sm">{user.providerId}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-500">Last Sign-In</h3>
                        <p className="mt-1 text-gray-900 text-sm">{user.metadata?.lastSignInTime}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-500">Created At</h3>
                        <p className="mt-1 text-gray-900 text-sm">{user.metadata?.creationTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;