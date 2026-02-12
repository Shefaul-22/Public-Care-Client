import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center py-8 md:py-12'>
            <span className="loading loading-spinner text-neutral loading-lg"></span>
        </div>
    );
};

export default Loading;