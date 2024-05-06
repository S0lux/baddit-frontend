import { AnimatePresence, delay, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { DropDownItemType } from "./drowdownMenu";

export const DropdownItem = ({
  communityName,
  communityAvatar,
  classname,
  onItemClick,
}: {
  communityName?: string;
  communityAvatar?: string;
  classname?: string;
  onItemClick: () => void;
}) => {
  return (
    <a
      className={twMerge(
        "flex flex-row items-center space-x-2 rounded border-backgroundSecondary bg-background px-4 py-1 hover:bg-backgroundSecondary",
        classname,
      )}
      href="https://google.com"
      target="_blank"
      onClick={(e) => {
        onItemClick();
      }}
    >
      <div className="flex items-center">
        <img
          src={communityAvatar}
          className="size-8 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <div className="text-wrap text-xs text-textPrimary">
          r/ {communityName}
        </div>
      </div>
    </a>
  );
};
