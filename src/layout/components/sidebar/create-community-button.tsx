"use client";
import { useAuthStore } from "@/src/store/authStore";
import { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { Divider } from "./divider";
import { useModalStore } from "@/src/store/modalStore";
import ModalManager from "@/src/components/auth-modal-manager/modal-manager";

const ButtonCreateCommunity = () => {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const getUserAsync = useAuthStore((state) => state.getUserAsync);

  const setModalOpen = useModalStore((state) => state.setShowModal);
  const setModalType = useModalStore((state) => state.setModalType);

  useEffect(() => {
    getUserAsync();
  }, []);

  const HandleCreateCommunityBtn = () => {
    setModalType("create-community");
    setModalOpen(true);
  };

  return (
    <>
      {loggedIn == true && (
        <div className="cursor-pointer">
          <a
            className="mb-2 flex flex-row items-center justify-between space-x-2 rounded border-backgroundSecondary bg-background pl-3 pr-1.5 hover:bg-backgroundSecondary"
            onClick={HandleCreateCommunityBtn}
          >
            <div className="flex min-h-10 w-full flex-row items-center justify-between gap-2 rounded py-0.5 text-xs text-textSecondary hover:bg-backgroundSecondary">
              CREATE COMMUNITY
              <GoPlus className="h-6 w-6 justify-self-end" />
            </div>
          </a>
          <Divider />
        </div>
      )}
      <ModalManager></ModalManager>
    </>
  );
};

export default ButtonCreateCommunity;
