"use client";
import React, { useState, useEffect } from 'react'
import PostCard from '@/src/components/post/post-card';
import Image from 'next/image';
import axios from 'axios';
import Spinner from '@/src/components/spinner/spinner';
import { useSearchParams } from 'next/navigation';

const fetchPosts = async (cursor = '') => {
    const url = `https://api.baddit.life/v1/posts?&cursor=${cursor}`;
    const response = await axios.get(url, {
        withCredentials: true
    });
    return response.data;
};

export default function InfinitePostHome() {
    const [posts, setPosts] = useState<any[]>([]);
    const [cursor, setCursor] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMorePosts = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const data = await fetchPosts(cursor);
        setPosts((prevPosts) => {
            const newPosts = data.filter((post: any) => !prevPosts.some(prevPost => prevPost.id === post.id));
            return [...prevPosts, ...newPosts];
        });
        setCursor(data[data.length - 1]?.id);
        setHasMore(data.length === 10);
        setLoading(false);
    };

    useEffect(() => {
        loadMorePosts();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                loadMorePosts();
            }
        };

        if (document.documentElement.offsetHeight < window.innerHeight + 10) {
            loadMorePosts();
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [cursor, loading, hasMore]);

    if (posts.length > 0) {
        return (
            <div className='pl-40 pr-40 pt-5 w-full'>
                <div className=''>
                    {posts.map((post) => (
                        (<PostCard key={post.id} post={post} />)
                    ))}
                </div>
                {loading && <><Spinner className='w-4' /></>}
                {!hasMore && (
                    <div className="text-center py-5 text-gray-600 text-lg dark:text-white">
                        <p>No more posts to load!!!!</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center justify-center text-center'>

        </div>);

}
