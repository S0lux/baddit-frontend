"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "../../components/button/button";
import { FaMoon, FaRegSun, FaCircle } from "react-icons/fa";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Button
        size={"small"}
        variant={"monochrome"}
        className=" w-[30px] h-[30px] p-0 aspect-square"
      >
        <FaCircle></FaCircle>
      </Button>
    );

  return (
    <Button
      size={"small"}
      variant={"monochrome"}
      className=" w-[30px] h-[30px] p-0 aspect-square"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <FaRegSun width={20} height={20}></FaRegSun>
      ) : (
        <FaMoon width={20} height={20}></FaMoon>
      )}
    </Button>
  );
}
