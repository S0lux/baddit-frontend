import { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tw-merge";
import clsx from "clsx";

// light: {
//  'text': '#003d42',
//  'background': '#fdfcfd',
//  'primary': '#50d3d7',
//  'secondary': '#00999e',
//  'accent': '#324c4d',
// },
// dark: {
//  'text': '#bdf9ff',
//  'background': '#030203',
//  'primary': '#28aaaf',
//  'secondary': '#61faff',
//  'accent': '#b2cccd',
// }

const sample = () => {
  return (
    <button className=" transitio bg-neutral-300/70 shadow-2xl hover:shadow-2xl">
      khang
    </button>
  );
};

const variants = cva(
  [
    " outline-none rounded-full cursor-pointer shadow whitespace-nowrap transition font-semibold inline-flex justify-center items-center",
    "hover:shadow-lg",
    "disabled:cursor-not-allowed disabled:shadow",
    "ring-offset-2 focus:scale-[0.98]",
    " font-medium",
  ],
  {
    variants: {
      variant: {
        primary: [
          //light
          "bg-[#50d3d7] text-black",
          "hover:bg-[#2dc2c7]",
          "ring-[#2dc2c7]/70 ",
          "focus-visible:ring-2 ",
          "disabled:bg-[#2dc2c7]/70",
          //dark
          "dark:bg-[#28aaaf] dark:text-black",
        ],
        secondary: [
          //light
          "bg-[#28aaaf] text-white",
          "hover:bg-[#00686b]",
          "ring-[#00686b]/70 ring-offset-2",
          "focus-visible:ring-2 focus:scale-[0.98]",
          "disabled:bg-[#00686b]/70",
          //dark
          "dark:bg-[#61faff] dark:text-black ",
        ],
        monochrome: [
          //light
          "bg-black text-white",
          "hover:bg-white hover:text-black",
          "ring-[#2dc2c7]/70",
          "focus-visible:ring-2",
          "disabled:text-[#2dc2c7]/70",
          //dark
          "dark:bg-white dark:text-black ",
          "dark:hover:bg-black dark:hover:text-white",
          "dark:ring-[#ffffff]/70",
        ],
        destructive: [
          //light
          "bg-white text-black shadow-none",
          "ring-[#ff0000]/70",
          "hover:bg-[#ff0000] hover:text-white",
          "focus-visible:ring-2 focus-visible:bg-[#ff0000] focus-visible:text-white",
          "disabled:text-[#000000]/70",
          "transition-none",
        ],
      },
      size: {
        small: ["px-4", "py-2", "text-[14px]"],
        default: ["px-8", "py-4", "text-[25px]"],
        large: ["px-12", "py-6", "text-[35px]"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> & {
    loading?: Boolean;
  };

interface LoadingProps {
  size: any;
}

const Loading: React.FC<LoadingProps> = ({ size = "default" }) => (
  <div className=" absolute inline-flex items-center">
    <div
      className={`${getSizeClass(
        size,
      )} animate-spin rounded-full border-[3px] border-[inherit] border-b-transparent`}
    ></div>
  </div>
);

const getSizeClass = (size: any) => {
  switch (size) {
    case "small":
      return "w-4 h-4";
    case "medium":
      return "w-7 h-7";
    case "large":
      return "w-12 h-12";
    default:
      return "w-7 h-7"; // Kích thước mặc định
  }
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, children, variant, size, loading, ...rest },
  ref,
) {
  return (
    <button
      className={twMerge(variants({ variant, size, className }))}
      {...rest}
    >
      {loading && <Loading size={size} />}
      <span
        className={clsx("transition", {
          "opacity-0": loading,
          "opacity-100": !loading,
        })}
      >
        {children}
      </span>
    </button>
  );
});

export { Button };