import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
            <img src="https://i.ibb.co.com/7d0qMChV/image.png" className='w-16 h-16 rounded-full' alt="image" />
        </Link>
    );
};

export default Logo;