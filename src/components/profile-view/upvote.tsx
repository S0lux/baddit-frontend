import React, { useState, useEffect } from 'react'
import useGet from '@/src/hooks/useGet';
import PostCard from '@/src/components/post/post-card';

export default function Upvote() {
    const { GetData } = useGet('/posts');
    const [upvotes, setUpvotes] = useState([]);
    useEffect(() => {
        GetData()
            .then(data => {
                setUpvotes(data)
            });

    }, [])
    console.log(upvotes.filter((item: any) => item.voteState === "UPVOTE"))
    return (
        <div>
            {upvotes.filter((item: any) => item.voteState === "UPVOTE").map((post) => {
                return (
                    <PostCard post={post} />
                )
            })}
        </div>
    )
}
