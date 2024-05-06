import { AnimatePresence, delay, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { DropDownItemType } from "./drowdownMenu";

export const DropdownText = ({
  textItemOption,
  classname,
  onItemClick,
}: {
  textItemOption: string;
  classname?: string;
  onItemClick: () => void;
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center space-x-2 rounded border-backgroundSecondary bg-background px-4 py-1 hover:bg-backgroundSecondary",
        classname,
      )}
      onClick={(e) => {
        onItemClick();
      }}
    >
      {textItemOption}
    </div>
  );
};
