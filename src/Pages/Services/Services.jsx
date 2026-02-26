import React from 'react';

const Services = () => {

    return (

        <div className='space-y-5 md:space-y-10 max-w-7xl mx-auto'>

            <h2 className="text-3xl md:text-5xl font-bold text-center mt-4 md:mt-8">
                Civic Services We Offer
            </h2>

            <div className="flex flex-col-reverse md:flex-row-reverse  gap-10 p-4  rounded-lg shadow-xl bg-gray-200">

                <div className='flex-1'>
                    {/* Image */}
                    <img
                        src="https://i.ibb.co.com/SXp99rdB/image.png"
                        alt="Repair Potholes"
                        className="w-full  object-cover rounded-md"
                    />
                </div>


                <div className="text-center sm:text-left flex-1">
                    <h4 className="text-3xl md:text-4xl font-semibold mb-2">
                        Repair Potholes
                    </h4>

                    <p className=" text-base md:text-xl">

                        We quickly identify and repair dangerous potholes to ensure safer
                        roads and smoother travel for all citizens. You can report potholes
                        easily and track repair progress in real time. Our dedicated teams
                        prioritize high-risk areas to reduce accidents and vehicle damage.
                        This transparent system helps build trust and keeps the community
                        informed every step of the way.

                    </p>
                </div>

            </div>

            <div className="flex flex-col sm:flex-row-reverse   gap-10 p-4  rounded-lg  shadow-xl bg-gray-200">


                <div className="text-center sm:text-left flex-1">
                    <h4 className="text-3xl font-semibold mb-2">
                        Romove garbase overflow
                    </h4>

                    <p className=" text-base md:text-xl ">

                        We respond promptly to garbage overflow issues to maintain a clean
                        and healthy environment. Residents can report waste problems and
                        track cleanup status easily. Regular monitoring helps prevent
                        unhygienic conditions and unpleasant odors in public areas.

                    </p>
                </div>

                <div className='flex-1'>
                    <img
                        src="https://i.ibb.co.com/wNtL4Y61/image.png"

                        alt="Remove garbase overflow"
                        className="w-full  object-cover rounded-md "
                    />
                </div>

            </div>

            <div className="flex flex-col-reverse md:flex-row-reverse  gap-10 p-4  rounded-lg shadow-xl bg-gray-200">

                <div className='flex-1'>
                    {/* Image */}
                    <img
                        src="https://i.ibb.co.com/99BsYTjd/image.png"
                        alt="Repair streetlights"
                        className="w-full  object-cover rounded-md"
                    />
                </div>


                <div className="text-center sm:text-left flex-1">
                    <h4 className="text-3xl font-semibold mb-2">
                        Repair Streetlights
                    </h4>

                    <p className="text-base md:text-xl  ">

                        Faulty or broken streetlights are repaired quickly to ensure public
                        safety at night. Citizens can report non-functioning lights with
                        exact locations. Timely repairs help reduce crime risks and improve
                        visibility on roads and footpaths.
                    </p>
                </div>

            </div>



            <div className="flex  flex-col md:flex-row-reverse gap-10 p-4  rounded-lg shadow-xl bg-gray-200">


                <div className="text-center sm:text-left flex-1">
                    <h4 className="text-3xl font-semibold mb-2">
                        Fix Water Leakage
                    </h4>

                    <p className=" text-base md:text-xl ">

                        We address water leakage issues efficiently to reduce water waste
                        and infrastructure damage. Users can report leaks in pipelines or
                        public taps and follow repair updates. Quick action helps ensure a
                        reliable water supply for everyone.

                    </p>
                </div>

                <div className='flex-1'>
                    {/* Image */}
                    <img
                        src="https://i.ibb.co.com/HDtqp0ZW/image.png"
                        alt="Fix water leakage"
                        className="w-full  object-cover rounded-md"
                    />

                </div>
            </div>


            <div className="flex flex-col-reverse md:flex-row-reverse  gap-10 p-4  rounded-lg shadow-xl bg-gray-200">

                <div className='flex-1'>
                    {/* Image */}
                    <img
                        src="https://i.ibb.co.com/N243grq5/image.png"
                        alt="Repair damage footpaths"
                        className="w-full  object-cover rounded-md"
                    />
                </div>


                <div className="text-center sm:text-left flex-1">
                    <h4 className="text-3xl font-semibold mb-2">
                        Repaire Damage Footpaths
                    </h4>

                    <p className=" text-base md:text-xl ">

                        Damaged footpaths are repaired to ensure safe and comfortable
                        walking for pedestrians. Citizens can report broken or uneven
                        walkways easily through the system. Improved footpaths enhance
                        accessibility for children, elderly, and disabled people.

                    </p>
                </div>

            </div>


        </div>
    );
};

export default Services;