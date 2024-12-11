import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Loader } from 'lucide-react';

export const PrivateRouter = () => {
    const { authUser, CheckAuth, isCheckingAuth } = useAuthStore();
    useEffect(() => {
        CheckAuth()
    }, [])

    // console.log({ authUser });
    if(isCheckingAuth) {
        return <Loader className='max-h-screen w-full h-full flex justify-center items-center size-4'/>
    }
    return (
        <>
            
            {authUser ? (<Outlet />) : (<Navigate to={"/login"} />)}
        </>
    )
}
