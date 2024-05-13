import { twMerge } from "tailwind-merge";

export const Divider = ({
  title,
  classname,
}: {
  title?: string;
  classname?: string;
}) => {
  return (
    <div
      className={twMerge(
        "h-fit w-full border-b-2 border-b-backgroundSecondary text-textSecondary",
        classname,
      )}
    >
      {title}
    </div>
  );
};
