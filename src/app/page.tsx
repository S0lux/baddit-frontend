import DefaultLayout from "@/src/layout/default-layout/layout";
import CommunityHome from "./r/page";
import React from "react";
import PostList from "../components/post/post-list";

export default function Home() {
  return (
    <DefaultLayout>
      <CommunityHome />
      <PostList communityId="13c5cbdd-fb4b-4318-8abb-af8288c1db5d"></PostList>
    </DefaultLayout>
  );
}
