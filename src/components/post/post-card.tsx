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

  const router = useRouter()

  const formattedDate = new Date(post?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    mutate(`https://api.baddit.life/v1/posts?postId=${post.id}`)
  }, []);
  console.log("Check hinh", post)
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
          {/* dangerouslySetInnerHTML={{ __html: post.content }} */}
          <div
            className="mb-1 md:max-h-20 truncate w-full"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <div className="flex flex-row overflow-x-auto gap-x-4  w-full my-2">
            {post.mediaUrls?.map((image: any) => {
              return (
                <div className="flex md:min-w-[60%] md:min-h-80   flex-col items-center justify-center rounded-xl bg-black">
                  <img
                    src={image}
                    alt=""
                    className="rounded-xl w-full h-full object-contain"
                  />

                </div>
              )
            })}
          </div>

        </a>
        <div className="flex flex-row gap-[16px]">
          <VotePostToggle postId={post.id} initScore={post.score} initVoteState={post.voteState} />
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
