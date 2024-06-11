"use client";

import { Button } from "@/src/components/button/button";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowRoundBack,
  IoIosArrowUp,
} from "react-icons/io";
import Spinner from "@/src/components/spinner/spinner";
import { IoChatboxOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Comment from "@/src/components/comment/comment";
import useGet from "@/src/hooks/useGet";
import usePost from "@/src/hooks/usePost";
import VotePostToggle from "@/src/components/button/votePostToggle";
import { useAuthStore } from "@/src/store/authStore";
import Link from "next/link";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface communityModeratorProps {
  userId: string;
  username: string;
  avatarUrl: string;
  communityRole: string;
  joined: boolean;
  banned: boolean;
}

const PostDetail = ({
  params,
}: {
  params: { name: string; postId: string };
}) => {
  const [commentContent, setCommentContent] = useState<string>("");

  const [post, setPost] = useState<BadPost>();
  const [community, setCommnunity] = useState<BadCommunity>();
  const [communityModerators, setCommunityModerators] =
    useState<communityModeratorProps[]>();

  const { loggedIn } = useAuthStore();

  useEffect(() => {
    const getPost = async () => {
      try {
        let res = await axios.get("https://api.baddit.life/v1/posts", {
          params: { postId: params.postId },
          withCredentials: true,
        });
        setPost(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    const getCommunity = async () => {
      try {
        let res = await axios.get(
          `https://api.baddit.life/v1/communities/${params.name}`,
          { withCredentials: true },
        );
        setCommnunity(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getCommunityModerators = async () => {
      try {
        let res = await axios.get(
          `https://api.baddit.life/v1/communities/${params.name}/moderators`,
          { withCredentials: true },
        );
        setCommunityModerators(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPost();
    getCommunity();
    getCommunityModerators();
  }, []);

  const router = useRouter();

  const { PostSent } = usePost("/comments");

  const [commentResult, setCommentResult] = useState([]);
  const [count, setCount] = useState(0);

  const { status, loading, GetData } = useGet(`/comments`);

  useEffect(() => {
    const fun = async () => {
      const commentData = await GetData(params);

      setCommentResult(commentData);
    };

    fun();
  }, [count]);

  const handleUpdate = () => {
    setCount(count + 1);
  };

  const HandlerCommentResult = (comment: CommentProps) => {
    return (
      <div key={comment.id} className="flex flex-col gap-2">
        <Comment
          key={comment.id}
          comment={comment}
          nestLevel={0}
          onUpdate={handleUpdate}
          val={count}
        />
      </div>
    );
  };

  const handlerSubmitButton = async () => {
    const data = {
      content: commentContent,
      parentId: null,
      postId: params?.postId,
    };

    if (commentContent.length === 0) {
      return;
    } else {
      const statusCode = await PostSent(data);
    }

    const commentData = await GetData(params);
    setCommentContent("");
    setCommentResult(commentData);
  };

  return (
    <div className="mt-8 flex h-full w-full flex-row justify-between gap-4 lg:px-4 xl:px-16">
      {/* Feed */}
      <div className="flex h-fit w-fit flex-row">
        {/* back button */}
        {post && (
          <Button
            variant={"ghost"}
            className="mt-2 h-fit rounded-full p-1"
            onClick={() => {
              router.back();
            }}
          >
            <IoIosArrowRoundBack />
          </Button>
        )}

        {/* post */}
        {post && (
          <div
            id={post?.id}
            className="flex flex-col before:mb-[5px] before:w-full"
          >
            <div className="mb-1 flex w-[700px] flex-1 flex-col gap-[5px] px-[10px] py-[4px] ">
              <div className="flex flex-row text-[13px]">
                <a
                  href={`/user/${post?.author.username}`}
                  className="flex w-fit flex-row"
                >
                  <img
                    src={post?.author.avatarUrl}
                    alt="author image"
                    className="h-[25px] w-[25px] rounded-full"
                  />
                  <p className="ml-2 mt-[3px] ">u/{post?.author.username}</p>
                </a>
                <div className="ml-2 mt-[3px] w-fit font-light text-[#576f76] before:mr-1 before:content-['•']">
                  {new Date(post.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="justify-items-end">
                <h1 className="text-[24px] font-extrabold">{post?.title}</h1>
                <div
                  className="mb-1"
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                ></div>
                <div className="flex w-auto flex-row items-center justify-between overflow-x-auto rounded-xl bg-black">
                  <Carousel showThumbs={false}>
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
              <div className="my-1 flex flex-row gap-[16px]">
                <VotePostToggle
                  postId={post.id}
                  initScore={post.score}
                  initVoteState={post.voteState}
                />
                <Button size={"small"} variant={"ghost"}>
                  <div className="inline-flex items-center">
                    <IoChatboxOutline className="mr-2 w-[20px]" />
                    {post?.commentCount}
                  </div>
                </Button>
              </div>

              {/* comment */}
              <hr className="h-[1.5px] w-full bg-black/20 "></hr>
              <div className="flex w-full flex-col">
                <div className=" mb-[20px] flex min-h-20 w-full flex-col rounded-lg border-[0.2px] border-black/20 dark:border-white/20">
                  <textarea
                    rows={1}
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder={`Add a comment`}
                    className="min-h-20 w-full resize-y border-none bg-transparent px-[12px] py-[16px] text-[14px] outline-none focus:border-none"
                  ></textarea>
                  <div className="my-1 flex items-center justify-end gap-1 px-2">
                    <Button
                      className=" disabled:bg-slate-400/50  disabled:text-white disabled:dark:bg-slate-400/80 "
                      disabled={!loggedIn}
                      size={"small"}
                      onClick={handlerSubmitButton}
                    >
                      Submit
                    </Button>
                  </div>
                </div>

                <div className="mb-3 flex w-full flex-col gap-3">
                  {commentResult.map(HandlerCommentResult)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* About */}

      {community && (
        <div className="sticky top-20 order-last h-fit w-full max-w-80 overflow-hidden rounded-lg bg-[#f5f5f5] dark:bg-[#04090a] md:order-last ">
          <div className="px-6 py-4">
            <Link href={`/r/${community?.community?.name}`}>
              <p className="py-3 font-semibold text-gray-900 dark:text-[#b8c5c9]">
                About r/{community?.community?.name}
              </p>
            </Link>
            <p className="py-3 font-normal text-gray-600 dark:text-[#76898e]">
              {community.community.description}
            </p>
          </div>
          <hr className="border-neutral-border-weak" />
          <dl className="divide-neutral divide-y bg-[#f5f5f5] px-6 text-sm leading-6 dark:bg-[#04090a]">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Created At</dt>
              <dd className="text-gray-700 dark:text-[#f2f2f2]">
                {new Date(community.community.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Members</dt>
              <dd className="flex items-start gap-x-2">
                <div className="text-gray-900 dark:text-[#f2f2f2]">
                  {community.community.memberCount}
                </div>
              </dd>
            </div>
          </dl>
          <hr className="border-neutral-border-weak" />
          <div className="px-6 py-4">
            <div className="flex flex-row justify-between">
              <p className="py-3 font-semibold text-gray-900 dark:text-[#b8c5c9]">
                Moderators
              </p>
              <Link href={`/r/${community.community.name}/members`}>
                <div className="flex h-full w-full flex-row items-center hover:underline hover:underline-offset-1">
                  <p className="truncate text-base text-gray-500">
                    All members
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-y-6">
              {communityModerators?.map((moderator: any) => {
                return (
                  <div className="flex flex-col ">
                    <div className="flex w-full flex-col items-start gap-x-2 overflow-hidden">
                      <div className="flex w-full flex-row items-center justify-between gap-x-4">
                        <div>
                          <div className="flex w-fit">
                            <div className="mr-4 flex h-10 w-10 justify-center rounded-full">
                              <img
                                src={moderator?.avatarUrl}
                                alt="avt"
                                className="h-full w-full rounded-full"
                              />
                            </div>
                            <Link href={`/user/${moderator?.username}`}>
                              <div className="flex h-full w-full flex-row items-center hover:underline hover:underline-offset-1">
                                <p className="truncate text-base text-gray-500">
                                  u/{moderator?.username}
                                </p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PostDetail;
