"use client";
import { useEffect, useState } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";
import VotePostToggle from "../button/votePostToggle";
import { mutate } from "swr";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Tippy from "@tippyjs/react";
import PostMenuDialog from "./PostMenuDialog";
import { FaEllipsisH } from "react-icons/fa";
import { useAuthStore } from "@/src/store/authStore";

interface IProps {
  post: BadPost;
}
const PostCard = (props: IProps) => {
  const { post } = props;

  const router = useRouter();
  const [showEditTextBox, setShowEditTextBox] = useState<boolean>(false);
  const { loggedIn, userData } = useAuthStore();

  const formattedDate = new Date(post?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const navigatePost = () => {
    router.push(
      post.community.name !== null
        ? `/r/${post.community.name}/${post.id}`
        : `/user/${post.author.username}/post/${post.id}`,
    );
  };

  useEffect(() => {
    mutate(`https://api.baddit.life/v1/posts?postId=${post.id}`);
  }, []);
  return (
    <div
      id={post.id}
      className="mb-4 flex flex-col after:mb-[5px] after:mt-4 after:w-full after:border-b after:border-[#cecece] dark:after:border-b-neutral-700"
    >
      <div className="mb-1 flex flex-1 flex-col gap-[5px] px-4 py-[8px] hover:rounded-2xl hover:bg-slate-100 dark:hover:bg-[#131f23] ">
        <div className="flex flex-row text-[13px]">
          <a
            href={
              `/user/${post.author.username}`
            }
            className="flex w-fit flex-row"
          >
            <img
              src={
                post.community.name === null
                  ? post.author.avatarUrl
                  : post.community.logoUrl
              }
              alt="author image"
              className="h-[25px] w-[25px] rounded-full"
            />
            <p className="ml-2 mt-[3px] ">
              {post.community.name === null
                ? `u/${post.author.username}`
                : `r/${post.community.name}`}
            </p>
          </a>
          <div className="ml-2 mt-[3px] w-fit font-light text-[#576f76] before:mr-1 before:content-['•']">
            {formattedDate}
          </div>
        </div>
        <div className="jtiusfy-items-end cursor-pointer">
          <h1 className="text-[24px] font-extrabold" onClick={navigatePost}>
            {post.title}
          </h1>
          {/* dangerouslySetInnerHTML={{ __html: post.content }} */}
          <div
            className="mb-1 w-full overflow-hidden md:max-h-24"
            onClick={navigatePost}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <div className="my-2 w-full gap-x-4">
            <Carousel
              className="z-[100]"
              showThumbs={false}
              onClickItem={navigatePost}
            >
              {post.mediaUrls?.map((image: any) => (
                <img
                  src={image}
                  alt=""
                  className="h-full w-full rounded-xl object-contain"
                />
              ))}
            </Carousel>
          </div>
        </div>
        <div className="flex flex-row gap-[16px]">
          <VotePostToggle
            postId={post.id}
            initScore={post.score}
            initVoteState={post.voteState}
          />
          <Button
            size={"small"}
            variant={"ghost"}
            onClick={() => {
              if (post.community.name !== null) {
                router.push(`/r/${post.community.name}/${post.id}`);
              } else {
                router.push(`/user/${post.author.username}/post/${post.id}`);
              }
            }}
          >
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
