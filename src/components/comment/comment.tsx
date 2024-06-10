"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../button/button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import usePost from "@/src/hooks/usePost";
import { useModalStore } from "@/src/store/modalStore";
import { useAuthStore } from "@/src/store/authStore";
import { FaRegCommentAlt } from "react-icons/fa";
import getTimeAgo from "@/src/utils/getTimeAgo";
import Tippy from "@tippyjs/react/headless";
import { FaEllipsisH } from "react-icons/fa";
import CommentMenuDialog from "./comment-menu-dialog";

import "tippy.js/dist/tippy.css";
import {
  TbArrowBigDown,
  TbArrowBigDownFilled,
  TbArrowBigUp,
  TbArrowBigUpFilled,
} from "react-icons/tb";

export default function Comment({
  comment,
  nestLevel,
  onUpdate,
  val,
}: {
  comment: CommentProps;
  nestLevel: number;
  onUpdate: () => void;
  val: number;
}) {
  const [vote, setVote] = useState<number>(comment.score);
  const [voteState, setVoteState] = useState<number>(
    comment.deleted === true
      ? 0
      : comment.voteState === "UPVOTE"
        ? 1
        : comment.voteState === "DOWNVOTE"
          ? -1
          : 0,
  );
  const [showReplyTextBox, setShowReplyTextBox] = useState<boolean>(false);
  const [showEditTextBox, setShowEditTextBox] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const [deleted, setDeleted] = useState<boolean>(comment.deleted);
  const [count, setCount] = useState(val);

  // const loggedIn = useAuthStore((state) => state.loggedIn);
  // const userData = useAuthStore((state) => state.userData);
  const { loggedIn, userData } = useAuthStore();
  const modalStore = useModalStore();

  const formattedDate = getTimeAgo(comment.createdAt);

  const CommentSent = usePost("/comments").PostSent;

  const PostSent = usePost("/comments/votes").PostSent;

  //Recursive function to handle nested comments
  const HandlerCommentChild = (comment: CommentProps) => {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        nestLevel={nestLevel + 1}
        onUpdate={handleUpdate}
        val={count}
      ></Comment>
    );
  };

  const HandlerVoteButton = async (state: string) => {
    const data = {
      commentId: comment.id,
      state: state,
    };

    if (loggedIn === false) {
      modalStore.setModalType("login");
      modalStore.setShowModal(true);
    } else {
      switch (voteState) {
        case 1: {
          if (state === "UPVOTE") {
            setVoteState(0);
            setVote(vote - 1);
          } else {
            setVoteState(-1);
            setVote(vote - 2);
          }
          break;
        }
        case 0: {
          if (state === "UPVOTE") {
            setVoteState(1);
            setVote(vote + 1);
          } else {
            setVoteState(-1);
            setVote(vote - 1);
          }
          break;
        }
        case -1: {
          if (state === "UPVOTE") {
            setVoteState(1);
            setVote(vote + 2);
          } else {
            setVoteState(0);
            setVote(vote + 1);
          }
          break;
        }
      }
      const statusCode = await PostSent(data);
    }
  };

  const handlerSubmitButton = async () => {
    const data = {
      content: replyContent,
      parentId: comment.id,
      postId: comment.postId,
    };

    if (replyContent.length === 0) {
      return;
    } else {
      const statusCode = await CommentSent(data);
      onUpdate();
      handleUpdate();
    }

    setShowReplyTextBox(false);
  };

  const handerReplyButton = () => {
    setReplyContent("");
    if (loggedIn === false) {
      modalStore.setModalType("login");
      modalStore.setShowModal(true);
    } else {
      setShowReplyTextBox(!showReplyTextBox);
    }
  };

  const handleUpdate = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    onUpdate();
  }, [count]);

  const componentsArray = Array.from({ length: nestLevel }, (_, index) => (
    <div className="flex h-full w-[32px] min-w-[32px] justify-center">
      <div
        className="border-l-[3px] border-black/40 dark:border-white/40"
        style={{ height: `calc(100% + 8px)` }}
      ></div>
    </div>
  ));

  useEffect(() => {
    setVoteState(0);
  }, [deleted]);

  return (
    <>
      <div
        className={`flex h-fit`}
        // style={{ paddingLeft: `${nestLevel * 32}px` }}
      >
        {componentsArray}

        <div className="flex w-full items-center justify-start gap-2">
          <div className="flex h-full w-[32px] flex-col items-center">
            <Image
              alt="User Avatar"
              className="z-10 aspect-square min-w-[32px] rounded-full"
              width={32}
              height={32}
              src={
                !deleted
                  ? comment.author.avatarUrl
                  : "https://res.cloudinary.com/drzvajzd4/image/upload/f_auto,q_auto/v1/defaults/default_avatar_anonymous.png"
              }
            />
            {comment.children.length != 0 && (
              <div className="flex h-full w-[32px] items-center justify-center">
                <div
                  className="border-l-[3px] border-black/40 dark:border-white/40"
                  style={{ height: `calc(100% + 16px)` }}
                ></div>
              </div>
            )}
          </div>
          <div className="flex w-full flex-col rounded-md bg-[#F0F2F5] p-2 dark:bg-[#3A3B3C]/20">
            <div className="flex items-center justify-start gap-1">
              <div className="text-[13px] font-bold">
                {!deleted ? comment.author?.username : "[deleted]"}
              </div>
              <div> {!deleted && "•"}</div>
              <div className="text-[12px]"> {!deleted && formattedDate}</div>
              <div className="flex-1"></div>
              {!deleted && comment.author.username == userData?.username && (
                <Tippy
                  trigger="click"
                  render={(attrs) => (
                    <CommentMenuDialog
                      comment={comment}
                      setDeleted={setDeleted}
                      {...attrs}
                    />
                  )}
                  interactive={true}
                  placement="bottom"
                >
                  <div className="flex size-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-[#c9caca] hover:dark:bg-[#2A3236]">
                    <FaEllipsisH className="size-4"></FaEllipsisH>
                  </div>
                </Tippy>
              )}
            </div>

            <div className="mb-2">
              {!deleted ? comment.content : "[deleted]"}
            </div>

            <div className="flex flex-nowrap items-center justify-start gap-2">
              <div
                className={twMerge(
                  " flex h-[32px] w-fit items-center rounded-full bg-[#eaedef] dark:bg-[#1a282d]",
                  clsx(
                    voteState === 1 && "bg-red-500 dark:bg-red-500",
                    voteState === -1 && "bg-blue-500 dark:bg-blue-500",
                    deleted == true && "pointer-events-none",
                  ),
                )}
              >
                <VoteButton
                  voteState={voteState}
                  score={!deleted ? vote : 0}
                  HandlerVoteButton={HandlerVoteButton}
                ></VoteButton>
              </div>
            </div>
            {showReplyTextBox && (
              <div className=" mt-2 flex min-h-20 w-full max-w-[675px] flex-col rounded-lg border-[0.2px] border-black/20 dark:border-white/20">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder={`Reply to ${comment.author.username}`}
                  className="min-h-20 w-full resize-y border-none bg-transparent px-[12px] py-[16px] outline-none focus:border-none"
                ></textarea>
                <div className="my-1 flex items-center justify-end gap-1 px-2">
                  <Button
                    size={"small"}
                    variant={"outlined"}
                    className="font-medium"
                    onClick={() => {
                      setShowReplyTextBox(false);
                      setReplyContent("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button size={"small"} onClick={handlerSubmitButton}>
                    Submit
                  </Button>
                </div>
              </div>
            )}
            {showEditTextBox && (
              <div className=" mt-2 flex min-h-20 w-full max-w-[675px] flex-col rounded-lg border-[0.2px] border-black/20 dark:border-white/20">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder={`Reply to ${comment.author.username}`}
                  className="min-h-20 w-full resize-y border-none bg-transparent px-[12px] py-[16px] outline-none focus:border-none"
                ></textarea>
                <div className="my-1 flex items-center justify-end gap-1 px-2">
                  <Button
                    size={"small"}
                    variant={"outlined"}
                    className="font-medium"
                    onClick={() => {
                      setShowReplyTextBox(false);
                      setReplyContent("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button size={"small"} onClick={handlerSubmitButton}>
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {comment.children.map(HandlerCommentChild)}
    </>
  );
}

function VoteButton({
  voteState,
  HandlerVoteButton,
  score,
}: {
  voteState: number;
  HandlerVoteButton: (state: string) => void;
  score: number;
}) {
  return (
    <>
      {!voteState && (
        <div className="inline-flex items-center rounded-full bg-[#eaedef] dark:bg-[#1a282d]">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="h-full py-0 shadow-none hover:text-red-500"
            onClick={() => {
              HandlerVoteButton("UPVOTE");
            }}
          >
            <TbArrowBigUp className="mx-3 my-2 text-lg" />
          </Button>
          <span className="text-[14px] font-medium">{score}</span>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="h-full shadow-none hover:text-indigo-700"
            onClick={() => {
              HandlerVoteButton("DOWNVOTE");
            }}
          >
            <TbArrowBigDown className="mx-3 my-2 text-lg" />
          </Button>
        </div>
      )}

      {voteState == 1 && (
        <div className="inline-flex items-center rounded-full bg-[#d93900]">
          <Button
            size={"icon"}
            variant={"upvote"}
            className="h-full shadow-none"
            onClick={() => {
              HandlerVoteButton("UPVOTE");
            }}
          >
            <TbArrowBigUpFilled className="mx-3 my-2 text-lg" />
          </Button>
          <span className="text-[14px] font-medium text-white">{score}</span>
          <Button
            size={"icon"}
            variant={"upvote"}
            className="h-full shadow-none"
            onClick={() => {
              HandlerVoteButton("DOWNVOTE");
            }}
          >
            <TbArrowBigDown className="mx-3 my-2 text-lg" />
          </Button>
        </div>
      )}
      {voteState == -1 && (
        <div className="inline-flex items-center rounded-full bg-[#6a5cff]  ">
          <Button
            size={"icon"}
            variant={"downvote"}
            className="h-full shadow-none"
            onClick={() => {
              HandlerVoteButton("UPVOTE");
            }}
          >
            <TbArrowBigUp className="mx-3 my-2 text-lg" />
          </Button>
          <span className="text-[14px] font-medium text-white shadow-none">
            {score}
          </span>
          <Button
            size={"icon"}
            variant={"downvote"}
            className="h-full shadow-none"
            onClick={() => {
              HandlerVoteButton("DOWNVOTE");
            }}
          >
            <TbArrowBigDownFilled className="mx-3 my-2 text-lg" />
          </Button>
        </div>
      )}
    </>
  );
}
