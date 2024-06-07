"use client";
import PostCard from '@/src/components/post/post-card';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import Spinner from '@/src/components/spinner/spinner';
import Image from 'next/image';


const fetchPosts = async (userName: String | String[], cursor = '') => {
    const response = await axios.get(`https://api.baddit.life/v1/posts?authorName=${userName}&cursor=${cursor}`);
    return response.data;
};

const InfinitePost = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [cursor, setCursor] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { userName } = useParams();


    const loadMorePosts = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const data = await fetchPosts(userName, cursor);
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [cursor, loading, hasMore]);


    if (posts.length > 0) {
        return (
            <div>
                <div>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
                {loading && <><Spinner /></>}
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
            <Image src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png" alt="Empty" width={120} height={189} />
            <p>Looks like you haven't post anything yet</p>
        </div>);
};

export default InfinitePost;

