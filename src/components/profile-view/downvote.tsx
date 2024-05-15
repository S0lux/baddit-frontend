import React, { useState, useEffect } from 'react'
import useGet from '@/src/hooks/useGet';
import PostCard from '@/src/components/post/post-card';
import Image from 'next/image';

export default function Downvote() {
    const { GetData } = useGet('/posts');
    const [downvotes, setDownvotes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        GetData()
            .then(data => {
                setDownvotes(data)
                setLoading(false);
            });

    }, [])
    console.log(downvotes.filter((item: any) => item.voteState === "DOWNVOTE"))
    if (loading) {
        return <div>Loading...</div>;
    }
    if (downvotes.filter((item: any) => item.voteState === "DOWNVOTE").length > 0) {
        return (
            <div>
                {downvotes.filter((item: any) => item.voteState === "DOWNVOTE").map((item: any) => (
                    <PostCard key={item.id} post={item} />
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
