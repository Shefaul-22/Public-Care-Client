import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { useQueryClient } from '@tanstack/react-query';


const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    // const logOutUser = () => {
    //     setLoading(true);
    //     return signOut(auth)
    // }

    const queryClient = useQueryClient();

    const logOutUser = async () => {
        setLoading(true);
        try {
            await signOut(auth);

            queryClient.removeQueries({ queryKey: ['user-role'] });
            localStorage.removeItem('userRole');
            setUser(null);

        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const UpdateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }
    // Observe user state
    useEffect(() => {

        const unSubsCribe = onAuthStateChanged(auth, (curentUser) => {


            setUser(curentUser);
            setLoading(false);
        })
        return () => {
            unSubsCribe();
        }

    }, [])


    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signInWithGoogle,
        logOutUser,
        UpdateUserProfile,

    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;