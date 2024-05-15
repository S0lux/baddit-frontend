"use client";
import React, { useState, useEffect } from 'react'
import { useAuthStore } from '@/src/store/authStore';
import PostCard from '@/src/components/post/post-card';
import useGet from '@/src/hooks/useGet';
import Image from 'next/image';

export default function Post_user() {
    const { userData } = useAuthStore();
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);


    //fetch post by user
    useEffect(() => {
        fetch(`https://api.baddit.life/v1/posts?authorId=${userData?.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPosts(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (posts.length > 0) {
        return (
            <div>
                {posts.map((post: any) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center justify-center text-center'>
            <Image src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png" alt="Empty" width={120} height={189} />
            <p>Looks like you haven't downvoted anything yet</p>
        </div>);
}
