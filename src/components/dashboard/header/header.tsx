import { Button } from "../../button/button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import ThemeSwitcher from "../../theme-provider/theme-switcher";
import { Suspense } from "react";

export default function Header() {
  return (
    <div className=" flex justify-between items-center h-[56.8px] border-b border-[#cecece] dark:border-[#1a1a1a] fixed w-full px-[10px]">
      <h1 className=" text-[26px] font-black pl-[5px]">baddit</h1>

      <div className=" bg-slate-400/50 flex outline-none flex-1 rounded-full bg-red items-center max-w-[560px] px-[20px]">
        <FaMagnifyingGlass width={20} height={20}></FaMagnifyingGlass>
        <input
          type="text"
          placeholder="Sample search bar..."
          className=" flex-1 outline-none px-[10px] py-2 text-[15px] bg-transparent"
        ></input>
      </div>

      <div className=" flex py-3 gap-x-2 items-center ">
        <div className=" flex gap-x-[5px]">
          <Button variant={"primary"} size={"small"}>
            Log In
          </Button>
          <Button variant={"secondary"} size={"small"}>
            Sign In
          </Button>
        </div>

        <ThemeSwitcher />
      </div>
    </div>
  );
}
