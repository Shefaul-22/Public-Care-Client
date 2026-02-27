import React from 'react';
import Banner from './Banner/Banner';
import HowItWorks from './HowItWorks/HowItWorks';
import Reviews from './Reviews/Reviews';
import Features from './Features/Features';
import LatestResolvedIssues from './LatestResolvedIssue/LatestResolvedIssue';
import Statistics from './Statistics/Statistics';
import Categories from './Categories/Categories';
import CallToAction from './CallToAction/CallToAction';
import PricingCards from './PricingCards/PricingCards';
import FAQ from './FAQ/FAQ';

const HomePage = () => {
    return (
        <div >
            <Banner></Banner>
            <div className='space-y-4 md:space-y-10 max-w-7xl mx-auto'>
                <LatestResolvedIssues></LatestResolvedIssues>
                <Statistics></Statistics>
                <Categories></Categories>
                <Features></Features>
                <HowItWorks></HowItWorks>
                
                <Reviews></Reviews>

                <FAQ></FAQ>
                <PricingCards></PricingCards>


                <CallToAction></CallToAction>

            </div>
        </div>
    );
};

export default HomePage;