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
    communityName: any
}


const ChangeCommunityBanner = (props: Props) => {
    //get name community to change
    const { communityName } = props

    //upload image handling
    const inputFile = useRef(null);
    const [image, setImage] = useState(null);
    const [displayImage, setDisplayImage] = useState("");
    const [loading, setLoading] = useState(false);


    //const [message, setMessage] = useState<string>();

    const setShowModal = useModalStore((state) => state.setShowModal);

    //Handle cancel button
    const handleCancelBtn = () => {
        setShowModal(false)
    }

    //Handle Image change
    const handleImageChange = () => {
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
        setDisplayImage(
            event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : "",
        );
        console.log(communityName)
    }

    //Handle change banner
    const handleSaveBtn = async () => {
        console.log("submitted");
        let formdata = new FormData();
        if (image != null) {
            console.log(image);
            formdata.append("banner", image);
        }
        setLoading(true);
        try {
            let res = await axios.post(
                `https://api.baddit.life/v1/communities/${communityName}/banner`,
                formdata,
                { withCredentials: true },
            );
            console.log("close banner modal");
            setShowModal(false)
            toast.success(res.data.message);
            mutate(`https://api.baddit.life/v1/communities/${communityName}`)
        } catch (err: any) {
            console.log(err);
            toast.error(err.data.message);
        }
        setLoading(false);
    }

    return (
        <div className="flex flex-col w-full">
            <div className="container h-full max-w-2xl ">
                <div className=" h-fit w-full space-y-4 rounded-lg p-6 bg-white dark:bg-backgroundSecondary">
                    <div className="order-last flex flex-row justify-between">
                        <h1 className="text-2xl font-bold">Change community banner</h1>
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

                    <div className="flex flex-col min-h-52 justify-center items-center bg-slate-200 rounded-2xl">
                        {displayImage ? (
                            <>
                                <div className="flex flex-col relative w-full max-h-52 ">
                                    <div className="flex fex-col justify-center h-full overflow-hidden bg-slate-200 dark:bg-gray-600 relative rounded-2xl">
                                        <img
                                            src={displayImage}
                                            className={twMerge(
                                                "object-contain",
                                                loading && "opacity-50",
                                            )}
                                        ></img>
                                    </div>

                                    <button
                                        className="absolute right-3 bottom-3 rounded-full bg-slate-600 hover:bg-slate-800 p-2"
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
                                    inputFile.current.click();
                                }}
                                className="rounded-2xl flex-1 dark:bg-gray-600"
                            >
                                <BsCloudArrowUp className="w-full h-8 mb-2" />
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
                        <Button
                            variant={"ghost"}
                            size={"small"}
                            onClick={handleCancelBtn}
                        >
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

export default ChangeCommunityBanner;
