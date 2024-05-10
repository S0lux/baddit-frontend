import PostList from "../components/post/post-list";
import { GoHomeFill } from "react-icons/go";
import Link from "next/link";
import { Button } from "../components/button/button";
import DashboardLayout from "../components/dashboard/dashboard-layout/layout";
import CommunityHome from "./r/page";

export default function Home() {
  return (
    <DashboardLayout>
      <CommunityHome />
    </DashboardLayout>
  );
}
