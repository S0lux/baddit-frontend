import DefaultLayout from "@/src/layout/default-layout/layout";
import React from "react";
import PostList from "../components/post/post-list";
import CommunityHome from "./r/page";
import InfinitePostHome from "@/src/components/post/InfinitePostHome";

export default function Home() {
  return (
    <DefaultLayout>
      <InfinitePostHome />
    </DefaultLayout>
  );
}
