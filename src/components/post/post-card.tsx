"use client";
import { useEffect } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";
import VotePostToggle from "../button/votePostToggle";
import { mutate } from "swr";

interface IProps {
  post: BadPost;
}
const PostCard = (props: IProps) => {
  const { post } = props;

  const router = useRouter();

  const formattedDate = new Date(post?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    mutate(`https://api.baddit.life/v1/posts?postId=${post.id}`);
  }, []);
  return (
    <div
      id={post.id}
      className="flex flex-col after:mb-[5px] after:w-full after:border-b after:border-[#cecece] dark:after:border-b-neutral-700"
    >
      <div className="mb-1 flex flex-1 flex-col gap-[5px] px-4 py-[4px] hover:rounded-2xl hover:bg-slate-100 dark:hover:bg-[#131f23] ">
        <div className="flex flex-row text-[13px]">
          <a
            href={`/user/${post.author.username}`}
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
        <a
          className="jtiusfy-items-end"
          href={
            post.community.name !== null
              ? `/r/${post.community.name}/${post.id}`
              : `/user/${post.author.username}/post/${post.id}`
          }
        >
          <h1 className="text-[24px] font-extrabold">{post.title}</h1>
          {/* dangerouslySetInnerHTML={{ __html: post.content }} */}
          <div
            className="mb-1 md:max-h-24 overflow-hidden w-full"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <div className="my-2 flex w-full flex-row  gap-x-4 overflow-x-auto">
            {post.mediaUrls?.map((image: any) => {
              return (
                <div className="flex flex-col items-center   justify-center rounded-xl bg-black md:min-h-80 md:min-w-[60%]">
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full rounded-xl object-contain"
                  />
                </div>
              );
            })}
          </div>
        </a>
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
