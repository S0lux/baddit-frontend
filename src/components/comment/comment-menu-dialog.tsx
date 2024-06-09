"use client";

import { twMerge } from "tailwind-merge";

import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert_dialog.tsx/alert_dialog";
import { useRouter } from "next/navigation";

export default function CommentMenuDialog({
  comment,
  onUpdate,
}: {
  comment: CommentProps;
  onUpdate: () => void;
}) {
  const router = useRouter();
  const fetcher = (url: string) => axios.delete(url, { withCredentials: true });

  const handleDelete = () => {
    fetcher(`https://api.baddit.life/v1/comments/${comment.id}`);
    onUpdate();
    router.refresh();
  };

  return (
    <div className="rounded-md bg-white dark:bg-black">
      <EditMenuItem Icon={FaEdit} text="Edit"></EditMenuItem>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <EditMenuItem
            Icon={FaRegTrashAlt}
            text="Delete Comment"
          ></EditMenuItem>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              comment and cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-lg bg-red-400 p-2 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function EditMenuItem({
  text,
  onClick,
  Icon,
  className,
}: {
  text?: string;
  onClick?: () => void;
  Icon?: React.ElementType;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        className,
        "flex h-fit w-[150px] cursor-pointer items-center justify-start gap-2 rounded-lg p-[10px] hover:bg-slate-300/20 hover:shadow-sm",
      )}
    >
      {Icon && <Icon className="h-[17px] w-[17px]"></Icon>}
      <h1 className="text-[12px] ">{text ? text : "MenuItem"}</h1>
    </div>
  );
}
