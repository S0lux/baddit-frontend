"use client";
import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore';
import Top from '@/src/components/profile-view/top';
import RightSidebar from '@/src/components/profile-view/rightSidebar';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function Profile_View(params: { component: React.ReactNode }) {
    const { userName } = useParams<{ userName: string }>();
    const { userData } = useAuthStore();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (userData?.username !== userName) {
            axios.get(`https://jsonplaceholder.typicode.com/users/Bret`)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((error) => {
                    console.error(error);
                });

        } else {
            setUser(userData);
        }
    }, [userName, userData]);

    if (userData?.userName === userName) {
        return (
            <>
                <main className="flex ml-16">
                    <div className="max-w-screen-md w-screen">
                        <Top userName={userName} userData={user} />
                        <div className='flex items-center justify-center'>
                            {params.component}
                        </div>
                    </div>
                    <div className="mr-0 hidden lg:block ">
                        <RightSidebar userName={userName} userData={user} />
                    </div>
                </main>
            </>);
    }
    else {
        return (
            <>
                <main className="flex ml-16">
                    <div className="max-w-screen-md w-screen">
                        <Top userName={userName} userData={user} />
                        <div className='flex items-center justify-center'>
                            {params.component}
                        </div>
                    </div>
                    <div className="mr-0 hidden lg:block ">
                        <RightSidebar userName={userName} userData={user} />
                    </div>
                </main>
            </>);
    }
}
