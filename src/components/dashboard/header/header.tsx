import { SearchBar } from "../../searchbar";
import ModalManager from "../../auth-modal-manager/modal-manager";
import HeaderMenu from "../../header-menu/header-menu";
import { Suspense } from "react";

export default async function Header() {
  const fetchedCommunities = await fetchCommunities();

  return (
    <div className=" fixed flex h-[56.8px] w-full items-center justify-between border-b border-[#cecece] bg-background/90 px-[10px] backdrop-blur-sm dark:border-[#1a1a1a]">
      <h1 className=" pl-[5px] text-[26px] font-black">baddit</h1>

      <SearchBar
        communitiesList={fetchedCommunities}
        classname="w-full"
      ></SearchBar>
      <div className=" flex items-center gap-2 py-1">
        <div className=" flex gap-x-[5px]">
          <Suspense fallback={<div>Loading</div>}>
            <HeaderMenu></HeaderMenu>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function fetchCommunities() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("failed to fetch data");
  else return res.json();
}
