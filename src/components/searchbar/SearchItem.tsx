import { twMerge } from "tailwind-merge";

export const SearchItem = ({
  communityName,
  communityAvatar,
  memberCount,
  className,
}: {
  communityName?: string;
  communityAvatar?: string;
  memberCount?: string;
  className?: string;
}) => {
  const alteredMemberCount = formatMember(memberCount);

  function formatMember(membercount?: string): string {
    if (!memberCount) return "0 members";
    let arr = ["", "K", "M", "B"];
    let count = Number(memberCount);
    let sufix = 0;
    while (count > 1000) {
      count = count / 1000;
      sufix++;
    }
    return `${count}${arr[sufix]} members`;
  }

  return (
    <a
      className={twMerge(
        "flex flex-row space-x-5 border-t-[2px] border-backgroundSecondary bg-background pb-2 pl-4 pt-2 shadow-md hover:bg-backgroundSecondary",
        className,
      )}
      href="https://google.com"
      target="_blank"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center">
        <img
          src={communityAvatar}
          className="size-8 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <div className="text-sm text-textPrimary">{communityName}</div>
        <div className="text-xs text-textSecondary">{alteredMemberCount}</div>
      </div>
    </a>
  );
};
