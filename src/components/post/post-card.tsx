"use client";
import { useRef, useState } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import { Button } from "../button/button";

interface IProps {
  post: BadPost;
}
const PostCard = (props: IProps) => {
  const { post } = props;
  const dataDisplay = useRef(null);

  const [votes, SetVotes] = useState<number>(0);

  return (
    <div
      id={post.id}
      className="flex flex-col before:mb-[5px] before:w-full before:border-t before:border-[#cecece] dark:before:border-t-neutral-700"
    >
      <div className="mb-1 flex min-w-[660px] flex-1 flex-col gap-[5px] px-[10px] py-[4px] hover:rounded-2xl hover:bg-slate-100 dark:hover:bg-[#131f23] ">
        <div className="flex flex-row text-[13px]">
          <a href="" className="flex w-fit flex-row">
            <img
              src={post.author.avatarUrl}
              alt="author image"
              className="h-[25px] w-[25px] rounded-full"
            />
            <p className="ml-2 mt-[3px] ">u/{post.author.username}</p>
          </a>
          <a
            href=""
            className="ml-2 mt-[3px] w-fit font-light text-[#576f76] before:mr-1 before:content-['•']"
          >
            {post.updatedAt}
          </a>
        </div>
        <a
          className="jtiusfy-items-end"
          href={`/r/${post.community.name}/${post.id}`}
        >
          <h1 className="text-[24px] font-extrabold">{post.title}</h1>
          <div
            className="mb-1"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <div className="flex w-full flex-col items-center justify-between rounded-xl bg-black">
            <img
              src="https://www.vietnamairlines.com/~/media/Files/VNANewPage-Images/Lotusmiles/Earn%20Miles/Page/Tren_Vietnamairlines.jpg"
              alt=""
              className="rounded-xl"
            />
          </div>
        </a>
        <div className="flex flex-row gap-[16px]">
          <div className="inline-flex items-center rounded-full bg-[#eaedef] dark:bg-[#1a282d] ">
            <Button
              size={"small"}
              variant={"ghost"}
              className="h-full"
              onClick={() => SetVotes((prev) => prev + 1)}
            >
              <IoIosArrowUp />
            </Button>
            <span className="text-[14px] font-medium">{votes}</span>
            <Button
              size={"small"}
              variant={"ghost"}
              className="h-full"
              onClick={() => SetVotes((prev) => prev - 1)}
            >
              <IoIosArrowDown />
            </Button>
          </div>
          <Button size={"small"} variant={"ghost"}>
            <div className="inline-flex items-center">
              <IoChatboxOutline className="mr-2 w-[20px]" />
              {post.commentCount}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
