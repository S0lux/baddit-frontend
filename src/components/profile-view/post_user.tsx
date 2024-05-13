"use client";
import React, { useState, useEffect } from 'react'
import { useAuthStore } from '@/src/store/authStore';
import PostCard from '@/src/components/post/post-card';

export default function Post_user() {
    const { userData } = useAuthStore();
    const [posts, setPosts] = useState([])

    //fetch post by user
    useEffect(() => {
        fetch(`https://api.baddit.life/v1/posts?authorId=${userData?.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPosts(data);
            });
    }, []);

    return (
        <div>
            {posts.map((post) => {
                return (
                    <PostCard post={post} />
                )
            })}
        </div>
    )
}
