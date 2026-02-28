import React, { useEffect } from 'react';
import { Outlet, useMatches } from 'react-router';
import UseAuth from '../hooks/UseAuth';
import Loading from '../components/Loading/Loading';

const AuthLayout = () => {

    const {loading} = UseAuth();
    const matches = useMatches();

    useEffect(() => {
        const currentRoute = matches.find((match) => match.handle?.title);
        document.title = currentRoute ? `${currentRoute.handle.title} | Civic Care` : "Civic Care";
    }, [matches]);

    if(loading) return <Loading></Loading>

    return (
       
        <div className='min-h-screen bg-base-200 flex items-center justify-center py-6 md:py-10 px-4 transition-colors duration-300'>

            <div className='w-full max-w-5xl bg-base-100 shadow-[0_20px_50px_rgba(250,11,210,0.15)] rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row border border-base-300/50'>

                
                <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#fa0bd2] via-[#b00794] to-[#80056b] relative items-center justify-center p-12 text-white overflow-hidden'>

                  
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

                
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    <div className='relative z-10 text-center space-y-6'>
                        <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl mb-4">
                            <h1 className='text-5xl font-black tracking-tighter leading-none'>
                                Civic<span className="text-white/80">Care</span>
                            </h1>
                        </div>

                        <div className='h-1.5 w-16 bg-white mx-auto rounded-full shadow-lg'></div>

                        <p className='text-xl font-light italic opacity-90 leading-relaxed max-w-xs mx-auto'>
                            "Empowering communities through digital innovation and collective care."
                        </p>

                        
                        <div className="flex justify-center gap-2 pt-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={`h-2 w-2 rounded-full bg-white/${i * 20}`}></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='w-full lg:w-1/2 p-8 md:p-16 bg-base-100 flex flex-col justify-center relative'>
                   
                    <div className="absolute top-10 right-10 w-32 h-32 bg-[#fa0bd2]/5 blur-3xl rounded-full"></div>

                    <div className="max-w-md mx-auto w-full relative z-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;