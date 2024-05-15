"use client";

import { Button } from "@/src/components/button/button";
import axios from "axios";
import { useEffect, useRef } from "react";
import useSWR from "swr";
import {
  IoIosArrowDown,
  IoIosArrowRoundBack,
  IoIosArrowUp,
} from "react-icons/io";
import Spinner from "@/src/components/spinner/spinner";
import { IoChatboxOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const PostDetail = ({
  params,
}: {
  params: { postId: string; name: string };
}) => {
  const fetcher = (url: string) => axios.get(url);

  const router = useRouter();

  const getInfo = (fetcher: any, url: string) => {
    let { data, error, isLoading } = useSWR(url, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });
    return { data, error, isLoading };
  };

  const community = getInfo(
    fetcher,
    `https://api.baddit.life/v1/communities/${params?.name}`,
  );

  const post = getInfo(
    fetcher,
    `https://api.baddit.life/v1/posts/?postId=${params?.postId}`,
  );

  useEffect(() => {}, [post, community]);

  if (post.isLoading || community.isLoading) {
    return <Spinner className="relative top-[40%] size-16"></Spinner>;
  }

  return (
    <div className="flex h-full w-full grid-cols-2 gap-4 lg:px-4 xl:px-16">
      {/* Feed */}
      <div className="flex h-fit w-auto flex-row">
        {/* back button */}
        <Button
          variant={"ghost"}
          className="mt-2 h-fit rounded-full p-1"
          onClick={() => {
            router.back();
          }}
        >
          <IoIosArrowRoundBack />
        </Button>

        {/* post */}
        <div
          id={post.data?.data[0].id}
          className="flex flex-col before:mb-[5px] before:w-full before:border-t before:border-[#cecece] dark:before:border-t-neutral-700"
        >
          <div className="mb-1 flex min-w-[660px] flex-1 flex-col gap-[5px] px-[10px] py-[4px] ">
            <div className="flex flex-row text-[13px]">
              <a href="" className="flex w-fit flex-row">
                <img
                  src={post.data?.data[0].author.avatarUrl}
                  alt="author image"
                  className="h-[25px] w-[25px] rounded-full"
                />
                <p className="ml-2 mt-[3px] ">
                  u/{post.data?.data[0].author.username}
                </p>
              </a>
              <a
                href=""
                className="ml-2 mt-[3px] w-fit font-light text-[#576f76] before:mr-1 before:content-['•']"
              >
                {post.data?.data[0].updatedAt}
              </a>
            </div>
            <div className="justify-items-end">
              <h1 className="text-[24px] font-extrabold">
                {post.data?.data[0].title}
              </h1>
              <div
                className="mb-1"
                dangerouslySetInnerHTML={{ __html: post.data?.data[0].content }}
              ></div>
              <div className="flex w-full flex-col items-center justify-between rounded-xl bg-black">
                <img
                  src="https://th.bing.com/th/id/OIP.1hs94SPSl8p5GsBkGjuomAHaHa?rs=1&pid=ImgDetMain"
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
                  onClick={() => {}}
                >
                  <IoIosArrowUp />
                </Button>
                <span className="text-[14px] font-medium">0</span>
                <Button
                  size={"small"}
                  variant={"ghost"}
                  className="h-full"
                  onClick={() => {}}
                >
                  <IoIosArrowDown />
                </Button>
              </div>
              <Button size={"small"} variant={"ghost"}>
                <div className="inline-flex items-center">
                  <IoChatboxOutline className="mr-2 w-[20px]" />
                  {post.data?.data[0].commentCount}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* About */}
      <div className="mt-2 h-fit max-w-80 rounded-md bg-[#f5f5f5] dark:bg-[#04090a]">
        <div className="relavtive container px-6 py-4">
          {/* <Spinner className="size-10"></Spinner> */}
          <p className="py-3 font-semibold text-gray-900 dark:text-[#b8c5c9]">
            About r/{community.data?.data.community.name}
          </p>
          <p className="py-3 font-normal text-gray-600 dark:text-[#76898e]">
            {community.data?.data.community.description}
          </p>
        </div>
        <hr className="border-neutral-border-weak" />
        <dl className="divide-neutral divide-y px-6 text-sm leading-6 ">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Created At:</dt>
            <dd className="text-gray-700">
              {community.data?.data.community.createdAt}
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Members:</dt>
            <dd className="flex items-start gap-x-2">
              <div className="text-gray-900">
                {community.data?.data.community.memberCount}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
export default PostDetail;
