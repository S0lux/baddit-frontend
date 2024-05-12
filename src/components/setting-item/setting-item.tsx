"use client";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const SettingItem = ({
  title,
  subTitle,
  children,
  childSameLine,
}: {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
  childSameLine: boolean;
}) => {
  return (
    <div
      className={twMerge(
        "flex h-auto w-full justify-between space-y-2",
        childSameLine ? "flex-row" : "flex-col",
      )}
    >
      <div className="flex flex-col">
        <div className="text-md font-semibold text-textPrimary">{title}</div>
        <div className="text-xs text-textSecondary">{subTitle}</div>
      </div>

      {children}
    </div>
  );
};
