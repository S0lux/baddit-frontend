"use client";

import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

import { Button } from "../../button/button";
import { useAuthStore } from "@/src/store/authStore";
import AvatarMenu from "./avatar-menu/avatar-menu";

export default function LoggedInHeader() {
  const userData = useAuthStore((state) => state.userData);

  return (
    <div className="flex items-center justify-end">
      <Tippy
        trigger="click"
        render={(attrs) => <AvatarMenu className="" {...attrs} />}
        interactive={true}
      >
        <div className=" flex items-center justify-center">
          <Button
            size={"small"}
            className="relative flex aspect-square h-[37px] w-[37px] items-center justify-center bg-none ring-slate-500  focus:scale-[1.1] "
          >
            {userData != null && (
              <img
                width={37}
                height={37}
                src={userData.avatarUrl}
                alt="userAvatar"
                className="absolute inset-0 aspect-square rounded-full object-cover"
              ></img>
            )}
            {userData == null && <RxAvatar></RxAvatar>}
          </Button>
        </div>
      </Tippy>
    </div>
  );
}
