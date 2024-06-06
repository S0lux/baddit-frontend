"use client";
import useGet from '@/src/hooks/useGet';
import { useAuthStore } from '@/src/store/authStore';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'

export default function Comments() {
    const { userName } = useParams();
    const { GetData } = useGet(`/users/${userName}/comments`);

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetData()
            .then(data => {
                setComments(data)
                setLoading(false);
            });

    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }
    if (comments.length > 0) {
        return (
            <div>
                {comments.map((item: any) => (
                    <div key={item.id} className='bg-white dark:bg-gray-800 shadow-md rounded-md p-4 mt-4'>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
        );
    }
    return (
        <div className='flex flex-col items-center justify-center text-center'>
            <Image src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png" alt="Empty" width={120} height={189} />
            <p>Looks like you haven't downvoted anything yet</p>
        </div>
    )
}
