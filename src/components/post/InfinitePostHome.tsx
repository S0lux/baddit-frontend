"use client";
import React, { useState, useEffect } from "react";
import PostCard from "@/src/components/post/post-card";
import Image from "next/image";
import axios from "axios";
import Spinner from "@/src/components/spinner/spinner";
import { useSearchParams } from "next/navigation";
import { Divider } from "@/src/layout/components/sidebar";

const fetchPosts = async (cursor = "") => {
  const url = `https://api.baddit.life/v1/posts?&cursor=${cursor}`;
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response.data;
};

export default function InfinitePostHome() {
  const [posts, setPosts] = useState<any[]>([]);
  const [cursor, setCursor] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [bestBad, setBestBad] = useState<SortBadCommunity[]>([]);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const data = await fetchPosts(cursor);
    setPosts((prevPosts) => {
      const newPosts = data.filter(
        (post: any) => !prevPosts.some((prevPost) => prevPost.id === post.id),
      );
      return [...prevPosts, ...newPosts];
    });
    setCursor(data[data.length - 1]?.id);
    setHasMore(data.length === 10);
    setLoading(false);
  };

  const getBestBad = async () => {
    try {
      let res = await axios.get("https://api.baddit.life/v1/communities", {
        withCredentials: true,
      });
      setBestBad(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadMorePosts();
    getBestBad();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMorePosts();
      }
    };

    if (document.documentElement.offsetHeight < window.innerHeight + 10) {
      loadMorePosts();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cursor, loading, hasMore]);

  if (posts.length > 0) {
    return (
      <div className="relative flex w-full flex-row justify-between gap-8 px-20 pt-5">
        <div className="w-full">
          <div className="w-[720px]">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {loading && (
            <>
              <Spinner className="w-4" />
            </>
          )}
          {!hasMore && (
            <div className="py-5 text-center text-lg text-gray-600 dark:text-white">
              <p>No more posts to load!!!!</p>
            </div>
          )}
        </div>
        <div className="sticky top-20 h-fit w-full rounded-lg bg-[#f5f5f5] px-6 py-4 dark:bg-[#04090a]">
          <div className="mb-2 font-semibold">Best of Baddit</div>
          <Divider></Divider>

          <div className="mt-5 flex flex-col space-y-2">
            {bestBad?.map((bestBad: SortBadCommunity) => {
              return (
                <a
                  id={bestBad.id}
                  className="flex flex-row items-center space-x-3 rounded-lg p-1 hover:bg-backgroundSecondary"
                  href={"/r/" + bestBad.name}
                >
                  <div className="flex items-center">
                    <img
                      src={bestBad.logoUrl}
                      className="size-8 rounded-full object-cover"
                    />
                  </div>

                  <div className="text-sm font-light text-textPrimary">
                    r/ {bestBad.name}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center"></div>
  );
}
