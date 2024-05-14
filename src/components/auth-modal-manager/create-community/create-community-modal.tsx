"use client";

import { useEffect, useState } from "react";
import { Input } from "@/src/components/input/input";
import { Button } from "@/src/components/button/button";
import { useRouter } from "next/navigation";
import { CreateCommunityPayload } from "@/src/schema/communitySchema";
import usePost from "@/src/hooks/usePost";
import { useModalStore } from "@/src/store/modalStore";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";

const CreateCommunityModal = () => {
    //manage input
    const [nameCommunity, setNameCommunity] = useState<string>("");
    const [descripstionCommunity, setDescriptionCommunity] = useState<string>("");


    const [message, setMessage] = useState<string>();

    //const [alertBarVisible, setAlertBarVisible] = useState<boolean>(false);

    const router = useRouter();

    const { status, loading, PostSent } = usePost("/communities");

    const modalOpen = useModalStore((state) => state.modalOpen);
    const modalType = useModalStore((state) => state.modalType);
    const setShowModal = useModalStore((state) => state.setShowModal);

    //Handle toast type
    useEffect(() => {
        const endModal = () => {
            setShowModal(false);
            setMessage(undefined);
        };

        if (status == "error" && message !== undefined) {
            toast.error(message);
        }
        if (status == "success" && message !== undefined) {
            toast.success(message);
            return endModal();
        }

        return setMessage(undefined);
    }, [message]);

    //Handle Create Button
    const handleCreateBtn = async () => {
        const payload: CreateCommunityPayload = {
            name: nameCommunity,
            description: descripstionCommunity,
        };

        const statusCode = await PostSent(payload);

        switch (statusCode) {
            case 201:
                setMessage("Community created!");
                setTimeout(() => {
                    router.push(`/r/${nameCommunity}`);
                }, 1000);
                break;
            case 400:
                setMessage("Please choose a different community name");
                break;
            case 401:
                setMessage("You are not logged in!");
                break;
            case 409:
                setMessage("Community name already taken");
                break;
            case 500:
                setMessage("Internal server error");
                break;
            default:
                setMessage("Something went wrong");
        }
    };

    //Handle cancel button
    const handleCancelBtn = () => {
        setShowModal(false)
        setMessage(undefined)
    }

    return (
        <div className="flex flex-col w-full">
            <div className="container h-full max-w-3xl ">
                <div className=" h-fit w-full space-y-6 rounded-lg p-6 bg-white dark:bg-backgroundSecondary">
                    <div className="order-last flex flex-row justify-between">
                        <h1 className="text-2xl font-bold">Create a community</h1>
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

                    <div>
                        <p className="text-xl font-medium">Name</p>
                        <p className="pb-2 text-sm">
                            Choose wisely. Once you pick a name, it can't be changed.
                        </p>
                    </div>

                    <div className="relative">
                        <p className="absolute inset-y-0 left-0 grid w-8 place-items-center text-sm text-gray-400">
                            r/
                        </p>
                        <Input
                            value={nameCommunity}
                            onChange={(e) => {
                                setNameCommunity(e.target.value);
                            }}
                            className="pl-6"
                        ></Input>
                    </div>

                    <div>
                        <p className="text-xl font-medium">Description</p>
                        <p className="pb-2 text-sm">Describe about your community.</p>
                    </div>

                    <div className="relative">
                        <Input
                            value={descripstionCommunity}
                            onChange={(e) => {
                                setDescriptionCommunity(e.target.value);
                            }}
                        ></Input>
                    </div>

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
                            disabled={nameCommunity.length === 0}
                            onClick={handleCreateBtn}
                            loading={loading}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCommunityModal;
