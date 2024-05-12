import DefaultLayout from "@/src/layout/default-layout/layout";
import PostCard from "../components/post/post-card";
import CommunityHome from "./r/page";
import React from "react";
import PostList from "../components/post/post-list";

export default function Home() {
  return (
    <DefaultLayout>
      <CommunityHome />
      <PostList></PostList>
    </DefaultLayout>
  );
}
