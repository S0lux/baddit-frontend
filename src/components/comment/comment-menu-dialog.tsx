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
import { Dispatch, SetStateAction, useState } from "react";

export default function CommentMenuDialog({
  comment,
  setDeleted,
  setOpenEdit,
  setOpenReply,
}: {
  comment: CommentProps;
  setDeleted: Dispatch<SetStateAction<boolean>>;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  setOpenReply: Dispatch<SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const fetcher = (url: string) => axios.delete(url, { withCredentials: true });

  const handleDelete = async () => {
    await fetcher(`https://api.baddit.life/v1/comments/${comment.id}`);
    setDeleted(true);
  };

  return (
    <div className="z-0 rounded-md bg-white shadow-md dark:bg-black">
      <EditMenuItem
        onClick={() => {
          setOpenEdit(true);
          setOpenReply(false);
        }}
        Icon={FaEdit}
        text="Edit"
      ></EditMenuItem>
      <EditMenuItem
        Icon={FaRegTrashAlt}
        text="Delete Comment"
        onClick={() => setIsOpen(true)}
      ></EditMenuItem>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              comment and cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
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
