import React, { useState, useEffect } from 'react'
import useGet from '@/src/hooks/useGet';
import PostCard from '@/src/components/post/post-card';

export default function Downvote() {
    const { GetData } = useGet('/posts');
    const [upvotes, setUpvotes] = useState([]);
    useEffect(() => {
        GetData()
            .then(data => {
                setUpvotes(data)
            });

    }, [])
    console.log(upvotes.filter((item: any) => item.voteState === "DOWNVOTE"))
    return (
        <div>
            {upvotes.filter((item: any) => item.voteState === "DOWNVOTE").map((post) => {
                return (
                    <PostCard post={post} />
                )
            })}
        </div>
    )
}
