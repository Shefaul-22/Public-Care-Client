import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='bg-slate-100'>
            <div className='w-11/12 mx-auto py-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;