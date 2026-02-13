import React, { useEffect } from 'react';
import { Outlet, useMatches } from 'react-router';

const AuthLayout = () => {


    const matches = useMatches();

    useEffect(() => {
        const currentRoute = matches.find(
            (match) => match.handle?.title
        );

        if (currentRoute) {
            document.title = `${currentRoute.handle.title} | Civic Care`;
        } else {
            document.title = "Civic Care";
        }

    }, [matches]);


    return (
        <div className='bg-slate-200'>
            <div className='w-11/12 mx-auto py-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;