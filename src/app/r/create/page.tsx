"use client";

import { useEffect, useState } from "react";
import { Input } from "@/src/components/input/input";
import { Button } from "@/src/components/button/button";
import { useRouter } from "next/navigation";
import { CreateCommunityPayload } from "@/src/schema/communitySchema";
import usePost from "@/src/hooks/usePost";
import AlertBar from "@/src/components/alert/alert-bar";
import { AnimatePresence } from "framer-motion";
import DefaultLayout from "@/src/layout/default-layout/layout";

const CreateCommunity = () => {
  const [nameCommunity, setNameCommunity] = useState<string>("");
  const [descripstionCommunity, setDescriptionCommunity] = useState<string>("");
  const [message, setMessage] = useState<string>();
  const [alertBarVisible, setAlertBarVisible] = useState<boolean>(false);

  const router = useRouter();

  const { status, statusCode, loading, PostSent } = usePost("/communities");

  //Handle StatusCode
  useEffect(() => {
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
  }, [statusCode]);

  //Handle alert bar visibility
  useEffect(() => {}, [alertBarVisible]);

  //Handle Create Button
  const handleCreateBtn = async () => {
    const payload: CreateCommunityPayload = {
      name: nameCommunity,
      description: descripstionCommunity,
    };

    await PostSent(payload);

    setAlertBarVisible(true);

    setTimeout(() => {
      setAlertBarVisible(false);
      console.log("timeout");
    }, 2000);
  };

  return (
    <>
      <div className="container mx-auto flex h-full max-w-3xl items-center ">
        <div className="relative h-fit w-full space-y-4 rounded-lg p-4 shadow-2xl dark:bg-[#181c1f] ">
          <div className="order-last flex justify-between">
            <h1 className="text-2xl font-bold">Create a community </h1>
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
      <AnimatePresence>
        {alertBarVisible && (
          <AlertBar
            message={message ? message : ""}
            status={status}
            className="fixed bottom-0 mt-4 flex items-center justify-center rounded-none py-2"
            Mkey="alert-bar"
          ></AlertBar>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateCommunity;
