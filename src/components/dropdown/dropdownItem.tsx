"use client";
import { twMerge } from "tailwind-merge";

export const DropdownItem = ({
  communityName,
  communityAvatar,
  classname,
  onItemClick,
}: {
  communityName: string;
  communityAvatar: string;
  classname?: string;
  onItemClick?: () => void;
}) => {
  return (
    <a
      className={twMerge(
        "flex flex-row items-center space-x-2 border-backgroundSecondary bg-background px-4 py-1 hover:bg-backgroundSecondary",
        classname,
      )}
      href={`/r/${communityName}`}
      onClick={(e) => {
        onItemClick ? onItemClick() : null;
      }}
    >
      <div className="flex items-center">
        <img
          src={communityAvatar}
          className="aspect-square size-8 rounded-full"
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