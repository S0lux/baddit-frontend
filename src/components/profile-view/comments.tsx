"use client";
import Spinner from '@/src/components/spinner/spinner';
import useGet from '@/src/hooks/useGet';
import { useAuthStore } from '@/src/store/authStore';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'

const fetchComments = async (userName: String | String[], cursor = '') => {
    const response = await axios.get(`https://api.baddit.life/v1/comments?authorName=${userName}&cursor=${cursor}`);
    return response.data;
};

export default function Comments() {
    const [comments, setComments] = useState<any[]>([]);
    const [cursor, setCursor] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { userName } = useParams();

    const loadMoreComments = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const data = await fetchComments(userName, cursor);
        setComments((prevComments) => {
            const newComments = data.filter((comment: any) => !prevComments.some(prevComment => prevComment.id === comment.id));
            return [...prevComments, ...newComments];
        });
        setCursor(data[data.length - 1]?.id);
        setHasMore(data.length === 10);
        setLoading(false);
    }

    useEffect(() => {
        loadMoreComments();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                loadMoreComments();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [cursor, loading, hasMore]);

    if (comments.length > 0) {
        return (
            <div>
                <div>
                    {comments.map((comment) => (
                        !comment?.deleted ? <div key={comment.id} className='flex items-center justify-between  h-32 w-full bg-slate-300 mt-2'>
                            <div className='flex items-center'>
                                <p className='font-bold'>{comment?.authorName}</p>
                                <p>{comment?.content}</p>
                            </div>
                            <p>{comment.createdAt}</p>
                        </div> : <></>
                    ))}
                </div>
                {loading && <><Spinner /></>}
                {!hasMore && (
                    <div className="text-center py-5 text-gray-600 text-lg dark:text-white">
                        <p>No more comments to load!!!!</p>
                    </div>
                )}
            </div>
        )
    }


    return (
        <div className='flex flex-col items-center justify-center text-center'>
            <Image src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png" alt="Empty" width={120} height={189} />
            <p>Looks like you haven't comments anything yet</p>
        </div>
    )
}
