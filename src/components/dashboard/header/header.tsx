import { Button } from "../../button/button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import ThemeSwitcher from "../../theme-provider/theme-switcher";
import { Suspense } from "react";
import { SearchBar } from "../../searchbar";

export default async function Header() {
  const fetchedCommunities = await fetchCommunities();
  return (
    <div className=" flex justify-between items-center h-[56.8px] border-b-2">
      <h1 className=" text-[26px] font-black pl-[5px]">baddit</h1>

      <SearchBar
        communitiesList={fetchedCommunities}
        classname="w-full"
      ></SearchBar>
      <div className=" flex py-1">
        <div className=" flex gap-x-[5px]">
          <Button size={"small"}>Log In</Button>
          <Button variant={"secondary"} size={"small"}>
            Sign In
          </Button>
        </div>
        <div className=" ml-1">
          <Suspense
            fallback={<div className="bg-black h-16 aspect-square">AAA</div>}
          >
            <ThemeSwitcher />
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
