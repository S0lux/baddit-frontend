"use client";
import useGet from '@/src/hooks/useGet';
import { useAuthStore } from '@/src/store/authStore';
import React, { useState, useEffect } from 'react'

export default function Comments() {
    const { userData } = useAuthStore();
    const { GetData } = useGet(`/comments?authorId=${userData?.id}`);

    const [comments, setcoments] = useState([]);

    useEffect(() => {
        GetData()
            .then(data => {
                setcoments(data)
            });

    }, [])

    console.log(comments)
    return (
        <div>
            {comments.map((comment: any) => {
                return (
                    <div>
                        <p>{comment.content}</p>
                    </div>
                )
            })}
        </div>
    )
}
