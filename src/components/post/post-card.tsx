"use client";
import { useState } from "react";
import { HiMiniArrowUpTray } from "react-icons/hi2";
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const PostCard = () => {
  const [votes, SetVotes] = useState<number>(0);

  return (
    <div className="flex flex-col before:mb-[5px] before:w-full before:border-t before:border-[#cecece] dark:before:border-t-neutral-700">
      <div className="mb-1 flex min-w-[660px] flex-1 flex-col gap-[5px] px-[10px] py-[4px] hover:rounded-2xl hover:bg-slate-100 dark:hover:bg-[#131f23] ">
        <div className="flex flex-row text-[13px]">
          <a href="" className="flex w-fit flex-row">
            <img
              src="https://styles.redditmedia.com/t5_2qkcr/styles/communityIcon_tmba7simqwp31.jpg?format=pjpg&s=dad25aea71fb1928d3ac41daa33162cc33b88ba7"
              alt="author image"
              className="w-[25px] rounded-full"
            />
            <p className="ml-2 mt-[3px] ">r/Vietnam</p>
          </a>
          <a
            href=""
            className="ml-2 mt-[3px] w-fit font-light text-[#576f76] before:mr-1 before:content-['•']"
          >
            3 hr.ago
          </a>
        </div>
        <div className="jtiusfy-items-end">
          <h1 className="text-[24px] font-extrabold">
            How feasible is this plan?
          </h1>

          <div className="mb-1">
            We are 3 people planning to visit Viet Nam from 10th May to 17th
            may. Our return flight is on 18th May at 2:00AM
          </div>
          <div className="flex w-full flex-col items-center justify-between rounded-xl bg-black">
            <img
              src="https://www.vietnamairlines.com/~/media/Files/VNANewPage-Images/Lotusmiles/Earn%20Miles/Page/Tren_Vietnamairlines.jpg"
              alt=""
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="flex flex-row gap-[16px]">
          {/* Vote button */}
          <div className="inline-flex items-center rounded-full bg-[#eaedef]">
            <button
              className="px-[10px] py-[15px] hover:rounded-full hover:bg-[#e2e7e9]"
              onClick={() => SetVotes(votes + 1)}
            >
              <IoIosArrowUp className="w-[20px]" />
            </button>
            <span className="text-sm font-medium">{votes}</span>
            <button
              className="px-[10px] py-[15px] hover:rounded-full hover:bg-[#e2e7e9]"
              onClick={() => SetVotes(votes - 1)}
            >
              <IoIosArrowDown className="w-[20px]" />
            </button>
          </div>
          {/* Comment button */}
          <button className="inline-flex items-center rounded-full bg-[#eaedef] px-[15px] py-[8px] hover:bg-[#e2e7e9]">
            <IoChatboxOutline className="w-[20px]" />
            <span className="ml-2 text-sm font-medium">116</span>
          </button>
          {/* Share button */}
          <button className="inline-flex items-center rounded-full bg-[#eaedef] px-[15px] py-[8px] hover:bg-[#e2e7e9]">
            <HiMiniArrowUpTray className="w-[20px]" />
            <span className="ml-2 text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
