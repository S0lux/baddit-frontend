"use client";
import React, { useEffect, useState } from 'react';
import { FaThumbsDown, FaThumbsUp, FaComment } from 'react-icons/fa';
import { IconType } from 'react-icons';
import useGet from '@/src/hooks/useGet';
import { useAuthStore } from '@/src/store/authStore';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Spinner from '@/src/components/spinner/spinner';

interface StatCardProps {
    value: string | number;
    label: string;
    Icon: IconType;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, Icon }) => (
    <div className="rounded-sm border mr-20 text-center p-4 mt-4">
        <div className="font-bold ">{value}</div>
        <span className="inline-flex items-center">
            {Icon && <Icon className="mr-2" />}
            {label}
        </span>
    </div>
);

const LifetimePerformance: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<any[]>([])
    const [comments, setComments] = useState<any[]>([]);
    const { userData } = useAuthStore();
    const { userName } = useParams()
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);


    const fetchPosts = async () => {
        let cursor = "";
        let endReached = false;
        let allPosts = [...posts];
        while (!endReached) {
            const data = await axios.get(`https://api.baddit.life/v1/posts?cursor=${cursor}`, {
                withCredentials: true,
            }).then(res => res.data);
            if (data.length > 0) {
                const newPosts = data.filter((post: any) => !allPosts.some((p: any) => p.id === post.id));
                allPosts = [...allPosts, ...newPosts];
                cursor = data[data.length - 1].id;
            } else {
                endReached = true;
            }
        }
        setLoadingPosts(false);
        setPosts(allPosts);
    }

    const fetchComments = async () => {
        let cursor = "";
        let endReached = false;
        let allComments = [...comments];
        while (!endReached) {
            const data = await axios.get(`https://api.baddit.life/v1/comments?authorName=${userData?.username}&cursor=${cursor}`, {
                withCredentials: true,
            }).then(res => res.data);
            if (data.length > 0) {
                const newComments = data.filter((comment: any) => !allComments.some((c: any) => c.id === comment.id));
                allComments = [...allComments, ...newComments];
                cursor = data[data.length - 1].id;
            } else {
                endReached = true;
            }
        }
        setLoadingComments(false);
        setComments(allComments);

    }

    useEffect(() => {
        fetchPosts();
        fetchComments()
        setLoading(false);
    }, []);

    const countUpvotes = posts?.filter((post: any) => post?.voteState === "UPVOTE").length;
    const countDownvotes = posts?.filter((post: any) => post?.voteState === "DOWNVOTE").length;
    const countComments = comments?.filter((comment: any) => comment?.authorId === userData?.id).length;

    if (loadingPosts || loadingComments) return <div className='justify-center items-center p-4 w-full'><Spinner className='w-4'></Spinner></div>;

    if (userName !== userData?.username) {
        return <div></div>
    }

    return (
        <>
            <div className="mb-4 pl-4">
                <h3 className="text-12 font-semibold text-neutral-content-strong">Lifetime Performance</h3>
                <div className=" flex justify-between">
                    <StatCard value={countUpvotes} label="Upvote Rate" Icon={FaThumbsUp} />
                    <StatCard value={countDownvotes} label="Downvote Rate" Icon={FaThumbsDown} />
                    <StatCard value={countComments} label="Comments" Icon={FaComment} />
                </div>
            </div>
            <hr className="m-2 border-t border-gray-400" />
        </>);

};

export default LifetimePerformance;
