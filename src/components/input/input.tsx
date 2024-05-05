import clsx from "clsx";
import { filterProps } from "framer-motion";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, placeholder, errorMessage, ...props }, ref) => {
    return (
      <div className="flex h-fit w-full flex-col">
        <input
          placeholder={placeholder}
          type="text"
          className={twMerge(
            " min-h-[56px] flex-1 rounded-2xl bg-[#eaedef] px-4 py-3 text-[16px] text-black outline-none sm:max-h-[56px]",
            className,
            clsx(error === "error" && "border-2 border-red-500"),
          )}
          {...props}
          ref={ref}
        ></input>
        <div className="px-6 pt-1 font-bold text-red-500">{errorMessage}</div>
      </div>
    );
  },
);
