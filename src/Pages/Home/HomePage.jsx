import React from 'react';
import Banner from './Banner/Banner';
import HowItWorks from './HowItWorks/HowItWorks';
import Reviews from './Reviews/Reviews';

const HomePage = () => {
    return (
        <div className='space-y-4'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Reviews></Reviews>
            
        </div>
    );
};

export default HomePage;