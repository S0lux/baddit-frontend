"use client";

import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import axios from "axios";
import { FaMoon, FaRegSun, FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

import { useAuthStore } from "@/src/store/authStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function AvatarMenu({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { loggedIn, userData, getUserAsync } = useAuthStore();
  const username: string = userData.username;
  const getUserData = useAuthStore((state) => state.getUserAsync);

  const router = useRouter();

  const themeHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        "https://api.baddit.life/v1/auth/logout",
        {},
        { withCredentials: true },
      );

      toast.success("Logged out successfully");

      useAuthStore.setState({ loggedIn: false });
      await getUserData();
    } catch (err: any) {
      if (err.response.status === 401) {
        toast.success("Sonmething is wrong. Please try again later.");
      }
    }
    window.location.href = window.location.href;
  };

  return (
    <div
      className={twMerge(
        className,
        "h-fit min-w-56 cursor-pointer rounded-lg bg-white p-5 shadow-2xl dark:bg-black ",
      )}
    >
      <MenuItem
        text="Profile"
        Icon={FaRegUser}
        href={"/user/" + username}
      ></MenuItem>
      <MenuItem
        text={theme === "dark" ? "Dark Mode" : "Light Mode"}
        onClick={themeHandler}
        Icon={theme === "dark" ? FaMoon : FaRegSun}
      ></MenuItem>
      <MenuItem Icon={FaGear} text="Setting" href="/setting"></MenuItem>
      <MenuItem
        text="Logout"
        Icon={FaSignOutAlt}
        onClick={logoutHandler}
      ></MenuItem>
    </div>
  );
}

function MenuItem({
  text,
  href,
  onClick,
  Icon,
  className,
}: {
  text?: string;
  href?: string;
  onClick?: () => void;
  Icon?: React.ElementType;
  className?: string;
}) {
  return (
    <a href={href}>
      <div
        onClick={onClick}
        className={twMerge(
          "flex h-fit w-full gap-2 rounded-lg px-[16px] py-[16px] hover:bg-slate-300/20 hover:shadow-sm",
          className,
        )}
      >
        {Icon && <Icon className="h-[22px] w-[22px]"></Icon>}
        <h1 className="flex w-fit text-[14px]">{text ? text : "MenuItem"}</h1>
      </div>
    </a>
  );
}
