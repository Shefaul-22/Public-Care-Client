import React from 'react';
import axios from 'axios';



const axiosInstance = axios.create({
    baseURL: 'https://civic-care-server-qg96gbqqq-md-shefaul-karim.vercel.app'
})

const UseAxios = () => {

    return axiosInstance;
};

export default UseAxios;