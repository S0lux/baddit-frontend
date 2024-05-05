"use client"
import { useState } from "react"
import { HiMiniArrowUpTray } from "react-icons/hi2";
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const PostCard = () => {

    const [votes, SetVotes] = useState<number>(0)

    return (
        <div className="flex flex-col before:border-t before:border-[#cecece] before:w-full before:mb-[5px] dark:before:border-t-neutral-700">
            <div className="flex flex-col flex-1 gap-[5px] mb-1 py-[4px] px-[10px] min-w-[660px] hover:rounded-2xl hover:bg-slate-100 dark:hover:bg-[#131f23] ">
                <div className="flex flex-row text-[13px]">
                    <a href="" className="flex flex-row w-fit">
                        <img src="https://styles.redditmedia.com/t5_2qkcr/styles/communityIcon_tmba7simqwp31.jpg?format=pjpg&s=dad25aea71fb1928d3ac41daa33162cc33b88ba7" alt="author image" className="rounded-full w-[25px]" />
                        <p className="ml-2 mt-[3px] ">r/Vietnam</p>
                    </a>
                    <a href="" className="mt-[3px] ml-2 font-light text-[#576f76] before:content-['•'] before:mr-1 w-fit">3 hr.ago</a>
                </div>
                <div className="jtiusfy-items-end">
                    <h1 className="text-[24px] font-extrabold">How feasible is this plan?</h1>

                    <div className="mb-1">
                        We are 3 people planning to visit Viet Nam from 10th May to 17th may. Our return flight is on 18th May at 2:00AM
                    </div>
                    <div className="flex flex-col justify-between rounded-xl w-full items-center bg-black">
                        <img src="https://www.vietnamairlines.com/~/media/Files/VNANewPage-Images/Lotusmiles/Earn%20Miles/Page/Tren_Vietnamairlines.jpg" alt="" className="rounded-xl" />
                    </div>
                </div>
                <div className="flex flex-row gap-[16px]">
                    {/* Vote button */}
                    <div className="inline-flex items-center rounded-full bg-[#eaedef]">
                        <button className="hover:bg-[#e2e7e9] hover:rounded-full px-[10px] py-[15px]" onClick={() => SetVotes(votes + 1)}>
                            <IoIosArrowUp className="w-[20px]" />
                        </button>
                        <span className="text-sm font-medium">{votes}</span>
                        <button className="hover:bg-[#e2e7e9] hover:rounded-full px-[10px] py-[15px]" onClick={() => SetVotes(votes - 1)}>
                            <IoIosArrowDown className="w-[20px]" />
                        </button>
                    </div>
                    {/* Comment button */}
                    <button className="inline-flex items-center py-[8px] px-[15px] rounded-full bg-[#eaedef] hover:bg-[#e2e7e9]">
                        <IoChatboxOutline className="w-[20px]" />
                        <span className="ml-2 text-sm font-medium">116</span>
                    </button>
                    {/* Share button */}
                    <button className="inline-flex items-center py-[8px] px-[15px] rounded-full bg-[#eaedef] hover:bg-[#e2e7e9]">
                        <HiMiniArrowUpTray className="w-[20px]" />
                        <span className="ml-2 text-sm font-medium">Share</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostCard