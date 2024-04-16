import { Button } from "../../button/button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import ThemeSwitcher from "../../theme-provider/theme-switcher";
import { Suspense } from "react";

export default function Header() {
  return (
    <div className=" flex justify-between items-center h-[56.8px] border-b-2">
      <h1 className=" text-[26px] font-black pl-[5px]">baddit</h1>

      <div className=" flex outline-none flex-1 rounded-full bg-slate-300/90 items-center max-w-[560px] px-[20px]">
        <FaMagnifyingGlass width={20} height={20}></FaMagnifyingGlass>
        <input
          type="text"
          placeholder="Sample search bar..."
          className=" flex-1 outline-none px-[10px] py-2 text-[15px] bg-transparent"
        ></input>
      </div>
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
