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

      <div className="flex shrink flex-row text-xs font-light tracking-tight">
        <div>r/ {truncateString(communityName, 16)}</div>
      </div>
    </a>
  );
};

function truncateString(s: string, length: number = 15): string {
  return s.length > 15 ? `${s.substring(0, length)}...` : s;
}
