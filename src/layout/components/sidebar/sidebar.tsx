"use client";
import { Divider } from ".";
import IconButton from "@/src/components/button/iconbutton";
import { DropdownItem, DropdownMenu } from "@/src/components/dropdown";
import { GoHomeFill } from "react-icons/go";
import ButtonCreateCommunity from "./create-community-button";
import axios from "axios";
import Link from "next/link";
import { FaRegCompass } from "react-icons/fa";
import { useAuthStore } from "@/src/store/authStore";
import { useEffect, useState } from "react";

export type communitiyProps = {
  id: string;
  name: string;
  ownerId: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  memberCount: number;
};

export type myCommunityProp = {
  id: string;
  name: string;
  logoUrl: string;
  role: string;
  banned: boolean;
};

export function Sidebar() {
  const { loggedIn } = useAuthStore();
  const [myCommunities, setMyCommunities] = useState<myCommunityProp[]>([]);
  const getMyCommunity = async () => {
    if (loggedIn) {
      try {
        const res = await axios.get("https://api.baddit.life/v1/users/me", {
          withCredentials: true,
        });
        setMyCommunities(res.data.communities);
      } catch (err) {
        console.log(err);
      }
    } else {
      setMyCommunities([]);
    }
  };

  useEffect(() => {
    getMyCommunity();
  }, [loggedIn]);

  return (
    <div className="fixed z-0 h-screen w-[240px] space-y-2 overflow-y-scroll border-b  border-r-[0.2px] border-[#cecece] bg-background pl-4 pr-1 pt-3 dark:border-[#1a1a1a]">
      <a href="/">
        <IconButton Icon={GoHomeFill} content="Home" buttonClass="rounded-md" />
      </a>
      <Divider />

      <Link
        href={"/r"}
        className="flex min-h-10 flex-row items-center justify-between rounded pl-3 pr-2 text-xs tracking-tight text-textSecondary hover:bg-backgroundSecondary"
      >
        EXPLORE
        <FaRegCompass className="size-5"></FaRegCompass>
      </Link>
      <Divider></Divider>
      {/* Create community */}
      <ButtonCreateCommunity />

      <DropdownMenu
        title="YOUR COMMUNITIES"
        classname="text-xs text-textSecondary"
      >
        {myCommunities &&
          myCommunities.map((community: myCommunityProp) => {
            return (
              <DropdownItem
                key={community.id}
                communityAvatar={community.logoUrl}
                communityName={community.name}
              ></DropdownItem>
            );
          })}
      </DropdownMenu>

      <Divider></Divider>
    </div>
  );
}
