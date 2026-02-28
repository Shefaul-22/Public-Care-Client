import axios from 'axios';
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router';
import UseAuth from './UseAuth';
import { handleBlockedError } from '../utils/handleBlockedError';



const axiosSecure = axios.create({
    // baseURL: 'https://civic-care-server-tau.vercel.app'
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { user, logOutUser } = UseAuth();
    // console.log(user);
    const navigate = useNavigate();

    useEffect(() => {


        const reqInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {

                if (!user) return config;


                const token = await user.getIdToken();
                config.headers.authorization = `Bearer ${token}`;


                return config;
            }
        )

        // interceptor response
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            console.log(error);

            // const statusCode = error.status;
            // if (statusCode === 401 || statusCode === 403) {
            //     logOut()
            //         .then(() => {
            //             navigate('/login')
            //         })
            // }

            const statusCode = error.response?.status;

            if (statusCode === 401 && user) {
                await logOutUser();
                // navigate('/login');

                navigate('/login', { replace: true });


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

    }, [user, logOutUser, navigate])

    return axiosSecure;
};

export default useAxiosSecure;