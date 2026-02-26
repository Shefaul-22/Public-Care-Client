import React from 'react';
import Banner from './Banner/Banner';
import HowItWorks from './HowItWorks/HowItWorks';
import Reviews from './Reviews/Reviews';
import Features from './Features/Features';
import LatestResolvedIssues from './LatestResolvedIssue/LatestResolvedIssue';

const HomePage = () => {
    return (
        <div >
            <Banner></Banner>
            <div className='space-y-4'>
                <LatestResolvedIssues></LatestResolvedIssues>
                <Features></Features>
                <HowItWorks></HowItWorks>
                <Reviews></Reviews>

            </div>
        </div>
    );
};

export default HomePage;