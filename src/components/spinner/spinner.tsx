import { twMerge } from "tailwind-merge";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        className,
        "aspect-square animate-spin rounded-full border-[3px] border-[inherit] border-black border-b-transparent",
      )}
    ></div>
  );
}
