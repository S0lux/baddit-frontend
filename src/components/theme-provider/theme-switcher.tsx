"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "../../components/button/button";
import { FaMoon, FaRegSun, FaCircle } from "react-icons/fa";

export default function ThemeSwitcher({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Button
        size={"small"}
        variant={"monochrome"}
        className=" aspect-square h-[30px] w-[30px] p-0"
      >
        <FaCircle></FaCircle>
      </Button>
    );

  return (
    <Button
      size={"small"}
      variant={"monochrome"}
      className={twMerge(className)}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div className="flex items-center justify-center">
        {theme === "dark" ? (
          <FaRegSun width={20} height={20}></FaRegSun>
        ) : (
          <>
            <FaMoon width={20} height={20}></FaMoon>
          </>
        )}
      </div>
    </Button>
  );
}
