"use client";
import React, { use, useCallback, useEffect } from 'react';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import PostCard from '@/src/components/post/post-card';
import { useParams } from 'next/navigation';

const InfiniteScroll = () => {
    const { userName } = useParams();
    const { posts, isLoading, fetchPosts, hasMore } = useInfiniteScroll(userName.toString());

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && hasMore && !isLoading) {
            fetchPosts();
        }
    }, [fetchPosts, hasMore, isLoading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    console.log(posts);
    return (
        <div>
            <h1>Posts by {userName.toString()}</h1>
            <ul>
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </ul>
            {isLoading && <p>Loading more posts...</p>}
            {!hasMore && <p>No more posts</p>}
        </div>
    );
};

export default InfiniteScroll;
