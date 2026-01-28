import axios from 'axios';
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router';
import UseAuth from './UseAuth';
import { handleBlockedError } from '../utils/handleBlockedError';



const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { user, logOut } = UseAuth();
    // console.log(user);
    const navigate = useNavigate();

    useEffect(() => {
        // intercept request
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })

        // interceptor response
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log(error);

            // const statusCode = error.status;
            // if (statusCode === 401 || statusCode === 403) {
            //     logOut()
            //         .then(() => {
            //             navigate('/login')
            //         })
            // }

            const statusCode = error.response?.status;

            if (statusCode === 401) {
                logOut().then(() => navigate('/login'));

            }

            else if (statusCode === 403) {

                // console.log("Blocked user error:", error.response?.data);
                if (handleBlockedError(error)) {

                    return Promise.reject(error);
                }
            }


            return Promise.reject(error);
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }

    }, [user, logOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;