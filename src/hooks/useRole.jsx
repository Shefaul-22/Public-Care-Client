import { useQuery, useQueryClient } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const {
        isLoading: roleLoading,
        data: role = 'user',
    } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !!user?.email,

        
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,

        initialData: () => {
            if (!user?.email) return undefined;
            return localStorage.getItem('userRole') || undefined;
        },

        queryFn: async () => {
            if (!user?.email) return 'user';

            try {
                const encodedEmail = encodeURIComponent(user.email);
                const res = await axiosSecure.get(`/users/role?email=${encodedEmail}`);

                const fetchedRole = res.data?.role || 'user';

                localStorage.setItem('userRole', fetchedRole);
                return fetchedRole;

            } catch (err) {
                console.error('Failed to fetch role:', err);
                return 'user';
            }
        }
    });

    const clearRole = () => {
        localStorage.removeItem('userRole');
        queryClient.removeQueries({ queryKey: ['user-role'] });
    };

    return { role, roleLoading, clearRole };
};

export default useRole;