"use client";
import { useRef, useState } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";

interface IProps {
    community: SortBadCommunity;
}
const CommunityCard = (props: IProps) => {
    const { community } = props;

    const router = useRouter()

    return (
        <div
            id={community?.id}
            className="flex flex-col"
        >
            <Button
                variant={"contained"}
                size={"medium"}
                className="rounded-md hover:bg-slate-300 dark:bg- text-3xl justify-start overflow-hidden w-full"
                onClick={() => { router.push(`/r/${community?.name}`) }}>
                <div className="flex flex-col gap-x-2 items-start overflow-hidden w-full">
                    <div className="flex flex-row items-center gap-x-4 w-full">
                        <img
                            src={community?.logoUrl}
                            alt="avt"
                            className="w-12 h-12 rounded-full" />
                        <div className="flex flex-col items-start w-full">
                            <p className="truncate">r/{community?.name}</p>
                            <p className="truncate text-sm text-slate-500">{community?.memberCount} members</p>
                        </div>
                    </div>
                </div>
            </Button>
        </div>
    );
};

export default CommunityCard;
