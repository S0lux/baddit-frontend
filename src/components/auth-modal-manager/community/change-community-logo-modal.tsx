"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/src/components/button/button";
import { useModalStore } from "@/src/store/modalStore";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { BsCloudArrowUp } from "react-icons/bs";
import { SlTrash } from "react-icons/sl";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { Router } from "next/router";
import { mutate } from "swr";

interface Props {
  communityName: any;
}

const ChangeCommunityLogo = (props: Props) => {
  //get name community to change
  const { communityName } = props;

  //upload image handling
  const inputFile = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState("");
  const [loading, setLoading] = useState(false);

  const setShowModal = useModalStore((state) => state.setShowModal);

  //Handle cancel button
  const handleCancelBtn = () => {
    setShowModal(false);
  };

  //Handle Image change
  const handleImageChange = (event: any) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
    setDisplayImage(
      event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : "",
    );
    event.target.files = null;
    console.log(communityName);
  };

  //Handle change banner
  const handleSaveBtn = async () => {
    console.log("submitted");
    let formdata = new FormData();
    if (image != null) {
      console.log(image);
      formdata.append("logo", image);
    }
    setLoading(true);
    try {
      let res = await axios.post(
        `https://api.baddit.life/v1/communities/${communityName}/logo`,
        formdata,
        { withCredentials: true },
      );
      setShowModal(false);
      toast.success(res.data.message);
      mutate(`https://api.baddit.life/v1/communities/${communityName}`);
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="container h-full max-w-2xl ">
        <div className=" h-fit w-full space-y-4 rounded-lg bg-white p-6 dark:bg-backgroundSecondary">
          <div className="order-last flex flex-row justify-between">
            <h1 className="text-2xl font-bold">Change community logo</h1>
            <Button
              onClick={() => setShowModal(false)}
              variant={"destructive"}
              className="aspect-square w-[32px] p-0"
              disabled={loading}
            >
              <IoMdClose></IoMdClose>
            </Button>
          </div>

          <hr className="h-px bg-gray-300" />

          <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl bg-slate-200">
            {displayImage ? (
              <>
                <div className="relative flex max-h-52 w-full flex-col ">
                  <div className="fex-col relative flex h-full justify-center overflow-hidden rounded-2xl bg-slate-200 dark:bg-gray-600">
                    <img
                      src={displayImage}
                      className={twMerge(
                        "object-contain",
                        loading && "opacity-50",
                      )}
                    ></img>
                  </div>

                  <button
                    className="absolute bottom-3 right-3 rounded-full bg-slate-600 p-2 hover:bg-slate-800"
                    onClick={() => {
                      setDisplayImage("");
                      setImage(null);
                    }}
                  >
                    <SlTrash className="text-white"></SlTrash>
                  </button>
                </div>
              </>
            ) : (
              <Button
                variant={"contained"}
                size={"small"}
                onClick={() => {
                  inputFile.current?.click();
                }}
                className="flex-1 rounded-2xl dark:bg-gray-600"
              >
                <BsCloudArrowUp className="mb-2 h-8 w-full" />
                <p className="text-xl">Browse your device</p>
              </Button>
            )}

            <input
              id="file"
              type="file"
              accept=".png"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          <hr className="h-px bg-gray-300" />

          <div className="flex justify-end gap-4">
            <Button variant={"ghost"} size={"small"} onClick={handleCancelBtn}>
              Cancel
            </Button>

            <Button
              variant={"primary"}
              size={"small"}
              disabled={displayImage == ""}
              onClick={handleSaveBtn}
              loading={loading}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeCommunityLogo;
