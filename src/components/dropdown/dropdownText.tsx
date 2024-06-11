"use client";
import { twMerge } from "tailwind-merge";

export const DropdownText = ({
  textItemOption,
  classname,
  onTextClick,
}: {
  textItemOption: string;
  classname?: string;
  onTextClick?: (data: string) => Promise<void>;
}) => {
  return (
    <div
      className={twMerge(
        "flex w-full items-center space-x-2 border-backgroundSecondary bg-background px-4 py-1 hover:bg-backgroundSecondary",
        classname,
      )}
      onClick={() => {
        onTextClick ? onTextClick("") : null;
      }}
    >
      {textItemOption}
    </div>
  );
};
