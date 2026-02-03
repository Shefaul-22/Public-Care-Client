import React from 'react';
import Banner from './Banner/Banner';
import HowItWorks from './HowItWorks/HowItWorks';
import Reviews from './Reviews/Reviews';
import Features from './Features/Features';
import LatestResolvedIssues from './LatestResolvedIssue/LatestResolvedIssue';

const HomePage = () => {
    return (
        <div className='space-y-4'>
            <Banner></Banner>
            <LatestResolvedIssues></LatestResolvedIssues>
            <Features></Features>
            <HowItWorks></HowItWorks>
            <Reviews></Reviews>
            
        </div>
    );
};

export default HomePage;