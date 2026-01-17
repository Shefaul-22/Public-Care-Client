import React from 'react';
import axios from 'axios';



const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

const UseAxios = () => {
    
    return axiosInstance;
};

export default UseAxios;