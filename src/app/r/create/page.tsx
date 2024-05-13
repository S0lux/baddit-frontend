"use client";

import { useEffect, useState } from "react";
import { Input } from "@/src/components/input/input";
import { Button } from "@/src/components/button/button";
import { useRouter } from "next/navigation";
import { CreateCommunityPayload } from "@/src/schema/communitySchema";
import usePost from "@/src/hooks/usePost";
import AlertBar from "@/src/components/alert/alert-bar";
import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/src/store/authStore";
import { useModalStore } from "@/src/store/modalStore";
import ModalManager from "@/src/components/auth-modal-manager/modal-manager";
import { toast } from "react-toastify";

const CreateCommunity = () => {
  //manage input
  const [nameCommunity, setNameCommunity] = useState<string>("");
  const [descripstionCommunity, setDescriptionCommunity] = useState<string>("");


  const [message, setMessage] = useState<string>();

  //const [alertBarVisible, setAlertBarVisible] = useState<boolean>(false);

  const router = useRouter();

  const { status, loading, PostSent } = usePost("/communities");

  const { loggedIn } = useAuthStore()

  const modalOpen = useModalStore((state) => state.modalOpen);
  const modalType = useModalStore((state) => state.modalType);
  const setShowModal = useModalStore((state) => state.setShowModal);

  //manditory loggin in
  useEffect(() => {
    if (loggedIn === false) {
      useModalStore.setState({ modalOpen: true, modalType: "login" });
    }
  }, [loggedIn]);

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

  //Handle check if loggedIn
  useEffect(() => {
    if (loggedIn === false) {
      useModalStore.setState({ modalOpen: true, modalType: "login" });
    }
  }, [loggedIn]);

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
        }, 3000);
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


  return (
    <div className="flex flex-col w-full justify-center">
      <div className="container h-full max-w-3xl">
        <div className=" h-fit w-full space-y-6 rounded-lg p-4 ">
          <div className="order-last flex flex-col justify-between">
            <h1 className="text-2xl font-bold">Create a community</h1>
            {loggedIn == false ? (
              <span className="text-xs font-bold text-red-500">
                (please login before using this page)
              </span>
            ) : (
              <></>
            )}
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
              onClick={() => router.back()}
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
      {/* <AnimatePresence>
        {alertBarVisible && (
          <AlertBar
            message={message ? message : ""}
            status={status}
            className="fixed bottom-0 mt-4 flex items-center justify-center rounded-none py-2"
            Mkey="alert-bar"
          ></AlertBar>
        )}
      </AnimatePresence> */}
      <ModalManager></ModalManager>
    </div>
  );
};

export default CreateCommunity;
