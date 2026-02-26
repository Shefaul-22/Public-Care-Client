import React from 'react';


const features = [
    {
        id: 1,
        title: "Easy Issue Reporting",
        description: "Citizens can quickly report streetlights, potholes, water leaks, and other public issues with photos and location.",
        icon: "https://i.ibb.co.com/Jw0smFTT/image.png"
    },
    {
        id: 2,
        title: "Real-time Tracking",
        description: "Track the status of reported issues from Pending → In-Progress → Resolved → Closed, anytime from your dashboard.",
        icon: "https://i.ibb.co.com/jP8cNHNh/image.png"
    },
    {
        id: 3,
        title: "Data & Analytics",
        description: "CivicCare helps authorities collect and analyze infrastructure data to improve city services efficiently.",
        icon: "https://i.ibb.co.com/5m35w7m/image.png"
    },
    {
        id: 4,
        title: "Priority Citizen Support",
        description: "Premium citizens get priority assistance and updates on reported issues for faster resolutions.",
        icon: "https://i.ibb.co.com/NnLXGR8C/image.png"
    }
];

const Features = () => {

    return (
        <div className="">
            <div className="text-center mb-12 ">
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Feat<span className='text-[#fa0bd2]'>ures</span></h2>
                <p className="mt-2 text-gray-800  ">
                    Explore the key features of CivicCare that make reporting and resolving public issues easier and faster.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                {features.map(feature => (
                    <div key={feature.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300">
                        <img src={feature.icon} alt={feature.title} className="w-12 h-12 mb-4" />
                        <h3 className="font-bold text-xl mb-2 text-slate-900">{feature.title}</h3>
                        <p className="text-gray-700 text-sm">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
