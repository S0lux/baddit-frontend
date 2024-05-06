"use client"
import { useState } from "react"
import { HiMiniArrowUpTray } from "react-icons/hi2";
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Button } from "../button/button";

interface IProps {
    post: BadPost
}
const PostCard = (props: IProps) => {
    const { post } = props

    const [votes, SetVotes] = useState<number>(0)

    return (
        <div className="flex flex-col before:border-t before:border-[#cecece] before:w-full before:mb-[5px] dark:before:border-t-neutral-700">
            <div className="flex flex-col flex-1 gap-[5px] mb-1 py-[4px] px-[10px] min-w-[660px] hover:rounded-2xl hover:bg-slate-100 dark:hover:bg-[#131f23] ">
                <div className="flex flex-row text-[13px]">
                    <a href="" className="flex flex-row w-fit">
                        <img src="https://styles.redditmedia.com/t5_2qkcr/styles/communityIcon_tmba7simqwp31.jpg?format=pjpg&s=dad25aea71fb1928d3ac41daa33162cc33b88ba7" alt="author image" className="rounded-full w-[25px]" />
                        <p className="ml-2 mt-[3px] ">{post.userId}</p>
                    </a>
                    <a href="" className="mt-[3px] ml-2 font-light text-[#576f76] before:content-['•'] before:mr-1 w-fit">3 hr.ago</a>
                </div>
                <div className="jtiusfy-items-end">
                    <h1 className="text-[24px] font-extrabold">{post.title}</h1>
                    <div className="mb-1">
                        {post.body}
                    </div>
                    <div className="flex flex-col justify-between rounded-xl w-full items-center bg-black">
                        <img src="https://www.vietnamairlines.com/~/media/Files/VNANewPage-Images/Lotusmiles/Earn%20Miles/Page/Tren_Vietnamairlines.jpg" alt="" className="rounded-xl" />
                    </div>
                </div>
                <div className="flex flex-row gap-[16px]">



                    <div className="inline-flex items-center rounded-full bg-[#eaedef] dark:bg-[#1a282d] ">
                        <Button size={"small"} variant={"ghost"} className="h-full" onClick={() => SetVotes(votes + 1)}>
                            <IoIosArrowUp />
                        </Button>
                        <span className="text-[14px] font-medium">{votes}</span>
                        <Button size={"small"} variant={"ghost"} className="h-full" onClick={() => SetVotes(votes - 1)}>
                            <IoIosArrowDown />
                        </Button>
                    </div>
                    <Button size={"small"} variant={"ghost"}>
                        <div className="inline-flex items-center">
                            <IoChatboxOutline className="w-[20px] mr-2" />
                            268
                        </div>
                    </Button>
                    <Button size={"small"} variant={"ghost"}>
                        <div className="inline-flex items-center">
                            <HiMiniArrowUpTray className="w-[20px] mr-2" />
                            Share
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PostCard