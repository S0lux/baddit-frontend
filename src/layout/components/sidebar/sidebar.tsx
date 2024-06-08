import { Divider } from ".";
import IconButton from "@/src/components/button/iconbutton";
import { DropdownItem, DropdownMenu } from "@/src/components/dropdown";
import { GoHomeFill } from "react-icons/go";
import ButtonCreateCommunity from "./create-community-button";
import axios from "axios";

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

export async function Sidebar() {
  const res = await axios.get("https://api.baddit.life/v1/communities", {
    withCredentials: true,
  });
  const fetchedCommunities = res.data;
  //console.log(fetchedCommunities);

  return (
    <div className="fixed z-0 h-full w-[240px] space-y-2 border-b border-r-[0.2px] border-[#cecece] bg-background px-4 pt-3 dark:border-[#1a1a1a]">
      <a href="/">
        <IconButton Icon={GoHomeFill} content="Home" buttonClass="rounded-md" />
      </a>
      <Divider />

      <DropdownMenu title="RECENT" classname="text-xs text-textSecondary" />
      <Divider></Divider>
      {/* Create community */}
      <ButtonCreateCommunity />

      <DropdownMenu title="COMMUNITIES" classname="text-xs text-textSecondary">
        {fetchedCommunities &&
          fetchedCommunities.map((community: communitiyProps) => {
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
