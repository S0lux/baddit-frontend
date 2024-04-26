import { Button } from "../../button/button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import ThemeSwitcher from "../../theme-provider/theme-switcher";
import { Suspense } from "react";
import { SearchBar } from "../../searchbar";
import ShowLoginButton from "../../login/login-button";

export default async function Header() {
  const fetchedCommunities = await fetchCommunities();

  return (
    <div className=" flex justify-between items-center h-[56.8px] border-b border-[#cecece] dark:border-[#1a1a1a] fixed w-full px-[10px]">
      <h1 className=" text-[26px] font-black pl-[5px]">baddit</h1>

      <SearchBar
        communitiesList={fetchedCommunities}
        classname="w-full"
      ></SearchBar>
      <div className=" flex py-1 items-center gap-2">
        <div className=" flex gap-x-[5px]">
          <ShowLoginButton></ShowLoginButton>
          <Button variant={"secondary"} size={"small"}>
            Sign In
          </Button>
        </div>

        <ThemeSwitcher />
      </div>
    </div>
  );
}

async function fetchCommunities() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("failed to fetch data");
  else return res.json();
}
