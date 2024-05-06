import { Divider } from ".";
import IconButton from "../../button/iconbutton";
import { DropdownMenu } from "../../dropdown";
import { GoHomeFill } from "react-icons/go";

export async function Sidebar() {
  const fetchedCommunities = await fetchCommunities();
  return (
    <div className="fixed z-0 h-full w-[240px] space-y-2 border-b border-r-[0.2px] border-[#cecece] bg-background px-4 pt-3 dark:border-[#1a1a1a]">
      <IconButton Icon={GoHomeFill} content="Home" buttonClass="rounded-md" />
      <Divider />

      <DropdownMenu itemType="communityList" title="RECENT" />
      <Divider></Divider>
      <DropdownMenu
        itemType="communityList"
        title="COMMUNITIES"
        dropdownCommunityList={fetchedCommunities}
      />
    </div>
  );
}

async function fetchCommunities() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("failed to fetch data");
  else return res.json();
}
