import { SearchBar } from "@/src/components/searchbar/SearchBar";
import HeaderMenu from "@/src/components/header-menu/header-menu";
import { SearchItem } from "@/src/components/searchbar";
import axios from "axios";
import { cookies } from "next/headers";

export default async function Header() {
  const cookie = cookies();
  const authCookie = cookie.get("connect.sid")?.value;
  const res = await axios.get("https://api.baddit.life/v1/communities", {
    headers: { Cookie: `connect.sid=${authCookie}` },
    withCredentials: true,
  });
  const fetchedCommunities = res.data;

  return (
    <div className="fixed z-20 flex h-[56.8px] w-full items-center justify-between border-b border-[#cecece] bg-background/90 px-[10px] backdrop-blur-sm dark:border-[#1a1a1a]">
      <a href="/" className=" pl-[5px] text-[26px] font-black">
        baddit
      </a>

      <SearchBar>
        {fetchedCommunities.map((item: any, index: any) => {
          return (
            <SearchItem
              id={item.id}
              key={item.id}
              communityAvatar={item.logoUrl}
              communityName={item.name}
              memberCount={item.memberCount}
            ></SearchItem>
          );
        })}
      </SearchBar>
      <div className=" flex items-center gap-2 py-1">
        <div className=" flex gap-x-[5px]">
          <HeaderMenu></HeaderMenu>
        </div>
      </div>
    </div>
  );
}
