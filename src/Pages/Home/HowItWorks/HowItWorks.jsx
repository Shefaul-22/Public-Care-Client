import React from 'react';


const HowItWorks = () => {
    return (
        <div className="p-3 text-slate-800">
            <h2 className="my-6 font-extrabold text-2xl md:text-5xl  text-center text-slate-900">
                How Civic<span className='text-[#fa0bd2]'>Care Works</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Report an issue */}
                <div className="p-5 space-y-4 rounded-2xl bg-white shadow-sm">
                    <img src="https://i.ibb.co.com/FLB2z0Kt/image.png" alt="Report Issue" />
                    <h3 className="font-bold text-xl">Report an Issue</h3>
                    <p className="font-medium text-slate-600">
                        Citizens report public issues like potholes, broken streetlights, or garbage problems with photos and location.
                    </p>
                </div>

                {/* admin review */}
                <div className="p-5 space-y-4 rounded-2xl bg-white shadow-sm">
                    <img src="https://i.ibb.co.com/nqk2yWw5/image.png" alt="Admin Review" />
                    <h3 className="font-bold text-xl">Admin Review & Assign</h3>
                    <p className="font-medium text-slate-600">
                        Admins review submitted issues, verify details, and assign tasks to the appropriate government staff.
                    </p>
                </div>

                {/* Resolved issue */}
                <div className="p-5 space-y-4 rounded-2xl bg-white shadow-sm">
                    <img src="https://i.ibb.co.com/C5s2Br5X/image.png" alt="Staff Action" />
                    <h3 className="font-bold text-xl">Issue Resolution</h3>
                    <p className="font-medium text-slate-600">
                        Assigned staff verify the issue on-site, update progress, and work towards resolving it efficiently.
                    </p>
                </div>

                {/* Track and get updates */}
                <div className="p-5 space-y-4 rounded-2xl bg-white shadow-sm">
                    <img src="https://i.ibb.co.com/pjdWgG2v/image.png" alt="Track Status" />
                    <h3 className="font-bold text-xl">Track & Get Updates</h3>
                    <p className="font-medium text-slate-600">
                        Citizens can track issue status in real time — from pending to resolved — and receive timely updates.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default HowItWorks;
