"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/button/button";
import Moon from "@/assets/moon-solid.svg";
import Sun from "@/assets/sun-solid.svg";
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
        <Image src={Sun} width={20} height={20} alt="Sun Icon"></Image>
      ) : (
        <Image src={Moon} width={20} height={20} alt="Moon Icon"></Image>
      )}
    </Button>
  );
}
