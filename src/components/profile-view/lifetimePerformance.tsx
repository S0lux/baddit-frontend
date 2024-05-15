"use client";
import React, { useEffect, useState } from 'react';
import { FaThumbsDown, FaThumbsUp, FaComment } from 'react-icons/fa';
import { IconType } from 'react-icons';
import useGet from '@/src/hooks/useGet';
import { useAuthStore } from '@/src/store/authStore';


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

    const { GetData } = useGet('/posts');
    const [posts, setPosts] = useState([]);
    const [comments, setcoments] = useState([]);
    const { userData } = useAuthStore();

    const { GetData: GetComments } = useGet(`/comments?authorId=${userData?.id}`);

    useEffect(() => {
        GetData()
            .then(data => {
                setPosts(data);
            });

        GetComments()
            .then(data => {
                setcoments(data)
            });

    }, []);

    const countUpvotes = posts.filter((post: any) => post.voteState === "UPVOTE").length;
    const countDownvotes = posts.filter((post: any) => post.voteState === "DOWNVOTE").length;
    const countComments = comments.length;


    return (
        <div className="mt-4">
            <h3 className="text-12 font-semibold text-neutral-content-strong">Lifetime Performance</h3>
            <div className=" flex justify-between">
                <StatCard value={countUpvotes} label="Upvote Rate" Icon={FaThumbsUp} />
                <StatCard value={countDownvotes} label="Downvote Rate" Icon={FaThumbsDown} />
                <StatCard value={countComments} label="Comments" Icon={FaComment} />
            </div>
        </div>);

};

export default LifetimePerformance;
