import { error } from "console";
import { AlertType } from "./alert-type";
import { FaCheck } from "react-icons/fa";
import { MdErrorOutline, MdOutlineWarningAmber } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { easeIn, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export default function AlertBar({
  message = "",
  status = "info",
  className,
}: {
  message: string;
  status: AlertType;
  className: string;
}) {
  const colors = {
    error: "bg-red-500 dark:bg-red-500/90 border-red-500/25 text-white",
    success: "bg-green-500 dark:bg-green-500/90 border-green-500/25 text-white",
    warning:
      "bg-orange-500 dark:bg-orange-500/90 border-orange-500/25 text-white",
    info: "bg-blue-500 dark:bg-blue-500/90 border-blue-500/25 text-white",
  };

  return (
    <motion.div
      className={twMerge(
        `${colors[status]} flex h-fit w-full items-center justify-start rounded-full`,
        className,
      )}
    >
      <div className="flex aspect-square h-[40px] items-center pl-2">
        {status === "error" && (
          <MdErrorOutline className="aspect-square size-7"></MdErrorOutline>
        )}
        {status === "success" && (
          <FaCheck className="aspect-square size-7"></FaCheck>
        )}
        {status === "warning" && (
          <MdOutlineWarningAmber className="aspect-square size-7"></MdOutlineWarningAmber>
        )}
        {status === "info" && (
          <CiCircleInfo className="aspect-square size-7"></CiCircleInfo>
        )}
      </div>
      {message}
    </motion.div>
  );
}
