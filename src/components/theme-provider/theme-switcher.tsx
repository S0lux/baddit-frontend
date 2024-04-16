"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "../../components/button/button";
import { FaMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import Image from "next/image";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      size={"small"}
      variant={"ghost"}
      className=" w-[45px] h-[45px] p-0"
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
