"use client";
import { useRef, useState } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";

interface IProps {
  post: BadPost;
}
const PostCard = (props: IProps) => {
  const { post } = props;

  const [votes, SetVotes] = useState<number>(0);

  const router = useRouter()

  const formattedDate = new Date(post?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      id={post.id}
      className="flex flex-col after:mb-[5px] after:w-full after:border-b after:border-[#cecece] dark:after:border-b-neutral-700"
    >
      <div className="mb-1 flex flex-1 flex-col gap-[5px] px-4 py-[4px] hover:rounded-2xl hover:bg-slate-100 dark:hover:bg-[#131f23] ">
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
            {formattedDate}
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
              src={post.mediaUrls[0]}
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
          <Button
            size={"small"}
            variant={"ghost"}
            onClick={() => { router.push(`/r/${post.community.name}/${post.id}`) }}>
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
