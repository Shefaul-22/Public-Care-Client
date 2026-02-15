import React from 'react';
import { useQuery } from '@tanstack/react-query';

import UseAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            if (!user?.email) return 'user'; 

            const encodedEmail = encodeURIComponent(user.email);

            try {

                // updated API endpoint using query param
                const res = await axiosSecure.get(`/users/role?email=${encodedEmail}`);
                return res.data?.role || 'user';
            } catch (err) {
                console.error('Failed to fetch role:', err);
                return 'user'; 
            }
        }
    });

    return { role, roleLoading };
};

export default useRole;
