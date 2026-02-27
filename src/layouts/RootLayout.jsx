import React, { useEffect } from 'react';
import { Outlet, useMatches } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const RootLayout = () => {

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
        <div className='bg-gray-100'>
            <div>
                <Navbar></Navbar>
            </div>
            <div className=' pt-16 md:pt-16 bg-gray-100'>
                <Outlet></Outlet>
            </div>

            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default RootLayout;