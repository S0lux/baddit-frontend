"use client";
import { useState } from "react";

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
              className="px-[15px] py-[15px] hover:rounded-full hover:bg-[#e2e7e9]"
              onClick={() => SetVotes(votes + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-[20px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            <span className="text-sm font-medium">{votes}</span>
            <button
              className="px-[15px] py-[15px] hover:rounded-full hover:bg-[#e2e7e9] hover:text-blue-500"
              onClick={() => SetVotes(votes - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-[20px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
          {/* Comment button */}
          <button className="inline-flex items-center rounded-full bg-[#eaedef] px-[15px] py-[8px] hover:bg-[#e2e7e9]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-[20px]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">116</span>
          </button>
          {/* Share button */}
          <button className="inline-flex items-center rounded-full bg-[#eaedef] px-[15px] py-[8px] hover:bg-[#e2e7e9]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-[20px]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
