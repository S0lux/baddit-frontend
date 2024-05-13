import { Divider } from ".";
import IconButton from "@/src/components/button/iconbutton";
import { DropdownItem, DropdownMenu } from "@/src/components/dropdown";
import { GoHomeFill } from "react-icons/go";

interface communitiyProps {
  name: string;
  description: string;
  ownerId: string;
  logoUrl: string;
  bannerUrl: string;
  status: string;
  createdAt: string;
}

export async function Sidebar() {
  const fetchedCommunities = await fetchCommunities();
  return (
    <div className="fixed z-0 h-full w-[240px] space-y-2 border-b border-r-[0.2px] border-[#cecece] bg-background px-4 pt-3 dark:border-[#1a1a1a]">
      <IconButton Icon={GoHomeFill} content="Home" buttonClass="rounded-md" />
      <Divider />

      <DropdownMenu title="RECENT" classname="text-xs text-textSecondary" />
      <Divider></Divider>
      <DropdownMenu title="COMMUNITIES" classname="text-xs text-textSecondary">
        {fetchedCommunities &&
          fetchedCommunities.map((community: communitiyProps) => {
            return (
              <DropdownItem
                key={community.name}
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

async function fetchCommunities() {
  const res = await fetch("https://api.baddit.life/v1/communities");
  if (!res.ok) throw new Error("failed to fetch data");
  else return res.json();
}
