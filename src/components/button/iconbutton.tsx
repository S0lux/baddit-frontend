import { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";

interface props {
  buttonClass?: string;
  Icon?: React.ElementType;
  iconClass?: string;
  iconsize?: Number;
  contentClass?: string;
  content?: string;
}

const IconButton: FunctionComponent<props> = ({
  buttonClass,
  Icon,
  iconClass,
  iconsize = 20,
  contentClass,
  content,
}) => {
  return (
    <button
      className={twMerge(
        "f-fit flex w-full flex-row items-center space-x-2 bg-background pb-1 pl-4 pr-4 pt-1 hover:bg-backgroundSecondary",
        buttonClass,
      )}
    >
      {Icon && (
        <Icon
          className={twMerge("h-full w-fit py-[6px]", iconClass)}
          size={iconsize}
        ></Icon>
      )}
      <div
        className={twMerge("flex h-full items-center text-sm", contentClass)}
      >
        {content}
      </div>
    </button>
  );
};
export default IconButton;
