"use client";
import { FC, useEffect } from "react";
import { Button } from "./button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import {
    TbArrowBigUpFilled,
    TbArrowBigUp,
    TbArrowBigDown,
    TbArrowBigDownFilled,
} from "react-icons/tb";

interface VotePostToggle {
    postId: string;
    initScore: number;
    initVoteState: string | null;
}

const VotePostToggle = (params: VotePostToggle) => {
    const { postId, initScore, initVoteState } = params;
    const [loading, setLoading] = useState(false);
    const [voteState, setVoteState] = useState<string | null>(initVoteState);
    const [score, setScore] = useState<number>(initScore);

    const getPost = async () => {
        const response = await axios.get(
            `https://api.baddit.life/v1/posts?postId=${postId}`,
            { withCredentials: true },
        );
        return response.data;
    };

    const handleVote = async (state: string) => {
        setLoading(true);
        try {
            let res = await axios.post(
                `https://api.baddit.life/v1/posts/${postId}/votes`,
                { state: state },
                { withCredentials: true },
            );
            const post = await getPost();
            setVoteState(post[0].voteState);
            setScore(post[0].score);
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
        setLoading(false);
    };

    return (
        <>
            {!voteState && (
                <div className="inline-flex items-center rounded-full bg-[#eaedef] dark:bg-[#1a282d]">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-full py-0 hover:text-red-500"
                        onClick={() => {
                            handleVote("UPVOTE");
                        }}
                    >
                        <TbArrowBigUp className="mx-3 my-2 text-lg" />
                    </Button>
                    <span className="text-[14px] font-medium">{score}</span>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="h-full hover:text-indigo-700"
                        onClick={() => {
                            handleVote("DOWNVOTE");
                        }}
                    >
                        <TbArrowBigDown className="mx-3 my-2 text-lg" />
                    </Button>
                </div>
            )}

            {voteState == "UPVOTE" && (
                <div className="inline-flex items-center rounded-full bg-[#d93900]">
                    <Button
                        size={"icon"}
                        variant={"upvote"}
                        className="h-full"
                        onClick={() => {
                            handleVote("UPVOTE");
                        }}
                    >
                        <TbArrowBigUpFilled className="mx-3 my-2 text-lg" />
                    </Button>
                    <span className="text-[14px] font-medium text-white">{score}</span>
                    <Button
                        size={"icon"}
                        variant={"upvote"}
                        className="h-full"
                        onClick={() => {
                            handleVote("DOWNVOTE");
                        }}
                    >
                        <TbArrowBigDown className="mx-3 my-2 text-lg" />
                    </Button>
                </div>
            )}
            {voteState == "DOWNVOTE" && (
                <div className="inline-flex items-center rounded-full bg-[#6a5cff]">
                    <Button
                        size={"icon"}
                        variant={"downvote"}
                        className="h-full"
                        onClick={() => {
                            handleVote("UPVOTE");
                        }}
                    >
                        <TbArrowBigUp className="mx-3 my-2 text-lg" />
                    </Button>
                    <span className="text-[14px] font-medium text-white">{score}</span>
                    <Button
                        size={"icon"}
                        variant={"downvote"}
                        className="h-full"
                        onClick={() => {
                            handleVote("DOWNVOTE");
                        }}
                    >
                        <TbArrowBigDownFilled className="mx-3 my-2 text-lg" />
                    </Button>
                </div>
            )}
        </>
    );
};

export default VotePostToggle;
