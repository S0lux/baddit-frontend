"use client";
import React, { useState, useEffect } from 'react'
import Comment from '@/src/components/comment/comment';
import Spinner from '@/src/components/spinner/spinner';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';

const fetchComments = async (userName: String | String[], cursor = '', sort?: String | null) => {
    const url = sort === 'top'
        ? `https://api.baddit.life/v1/comments?authorName=${userName}&cursor=${cursor}&orderByScore=1`
        : `https://api.baddit.life/v1/comments?authorName=${userName}&cursor=${cursor}`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
};

export default function Comments() {
    const [comments, setComments] = useState<any[]>([]);
    const [cursor, setCursor] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { userName } = useParams();
    const searchParams = useSearchParams()
    const [sort, setSort] = useState(searchParams.get('sort') || null);

    const loadMoreComments = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        setSort(searchParams.get('sort') || null);
        const data = await fetchComments(userName, cursor, sort);
        setComments((prevComments) => {
            const newComments = data.filter((comment: any) => !prevComments.some(prevComment => prevComment.id === comment.id));
            return [...prevComments, ...newComments];
        });
        setCursor(data[data.length - 1]?.id);
        setHasMore(data.length === 10);
        setLoading(false);
    }

    useEffect(() => {
        const newSort = searchParams.get('sort') || null;
        setSort(newSort);
        setComments([]);
        setCursor('');
        setHasMore(true);
    }, [searchParams]);

    useEffect(() => {
        loadMoreComments();
    }, [sort]);

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
            <div className='w-full'>
                <div className='w-full'>
                    {comments.map((comment) => (
                        !comment?.deleted ?
                            <div className='p-2 w-full' key={comment.id}>
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                    nestLevel={0}
                                    onUpdate={() => { }}
                                    val={comment.children.length}
                                />
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
