"use client";

import Image from "next/image";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";
import PostList from "../components/post/post-list";

export default function Home() {
  return (
    <div className=" h-fit ">
      <PostList />
    </div>
  );
}
