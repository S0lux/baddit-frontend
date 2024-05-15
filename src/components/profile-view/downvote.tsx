import React, { useState, useEffect } from 'react'
import useGet from '@/src/hooks/useGet';
import PostCard from '@/src/components/post/post-card';

export default function Downvote() {
    const { GetData } = useGet('/posts');
    const [downvotes, setUpvotes] = useState([]);
    useEffect(() => {
        GetData()
            .then(data => {
                setUpvotes(data)
            });

    }, [])
    console.log(downvotes.filter((item: any) => item.voteState === "DOWNVOTE"))
    if (downvotes.length === 0) {
        return (
            <div>
                Không có gì cả
            </div>)
    }
    else {
        return (
            <div>
                {downvotes.filter((item: any) => item.voteState === "DOWNVOTE").map((post) => {
                    return (
                        <PostCard post={post} />
                    )
                })}
            </div>
        )
    }
}
