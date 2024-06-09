import DefaultLayout from "@/src/layout/default-layout/layout";
import React from "react";
import PostList from "../components/post/post-list";
import CommunityHome from "./r/page";

export default function Home() {
  return (
    <DefaultLayout>
      <CommunityHome />
      {/* <PostList></PostList> */}
    </DefaultLayout>
  );
}
