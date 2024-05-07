"use client";
import { useState } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import { Button } from "../button/button";

interface IProps {
  post: BadPost;
}
const PostCard = (props: IProps) => {
  const { post } = props;

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
            <p className="ml-2 mt-[3px] ">r/{post.communityName}</p>
          </a>
          <a
            href=""
            className="ml-2 mt-[3px] w-fit font-light text-[#576f76] before:mr-1 before:content-['•']"
          >
            {post.updatedAt}
          </a>
        </div>
        <div className="jtiusfy-items-end">
          <h1 className="text-[24px] font-extrabold">{post.title}</h1>
          <div className="mb-1">{post.content}</div>
          <div className="flex w-full flex-col items-center justify-between rounded-xl bg-black">
            <img
              src="https://www.vietnamairlines.com/~/media/Files/VNANewPage-Images/Lotusmiles/Earn%20Miles/Page/Tren_Vietnamairlines.jpg"
              alt=""
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="flex flex-row gap-[16px]">
          <div className="inline-flex items-center rounded-full bg-[#eaedef] dark:bg-[#1a282d] ">
            <Button
              size={"small"}
              variant={"ghost"}
              className="h-full"
              onClick={() => SetVotes(votes + 1)}
            >
              <IoIosArrowUp />
            </Button>
            <span className="text-[14px] font-medium">{post.score}</span>
            <Button
              size={"small"}
              variant={"ghost"}
              className="h-full"
              onClick={() => SetVotes(votes - 1)}
            >
              <IoIosArrowDown />
            </Button>
          </div>
          <Button size={"small"} variant={"ghost"}>
            <div className="inline-flex items-center">
              <IoChatboxOutline className="mr-2 w-[20px]" />
              268
            </div>
          </Button>
          <Button size={"small"} variant={"ghost"}>
            <div className="inline-flex items-center">
              <FiShare className="mr-2 w-[20px]" />
              Share
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
