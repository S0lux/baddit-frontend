"use client";

import { createPortal } from "react-dom";
import LoginModal from "./login/login-modal";
import RegisterModal from "./register/register-modal";
import { useModalStore } from "@/src/store/modalStore";
import ChangePassWordModal from "./change-password/change-password-modal";
import CreateCommunityModal from "./community/create-community-modal";
//import ChangeCommunityBanner from "./change-community-banner/change-community-banner-modal";
import ChangeCommunityBanner from "./community/change-community-banner-modal";
import ChangeCommunityLogo from "./community/change-community-logo-modal";

export default function ModalManager() {
  const communityName = useModalStore((state) => state.communityName)
  const modalOpen = useModalStore((state) => state.modalOpen);
  const modalType = useModalStore((state) => state.modalType);
  const setShowModal = useModalStore((state) => state.setShowModal);

  const handleWrapperClick = (e: any) => {
    if (e.target.id === "wrapper") {
      setShowModal(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center gap-1 z-50"
      onClick={handleWrapperClick}
    >
      {modalOpen &&
        createPortal(
          <div
            id="wrapper"
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-30"
          >
            {modalType == "change-community-logo" && <ChangeCommunityLogo communityName={communityName}></ChangeCommunityLogo>}
            {modalType == "change-community-banner" && <ChangeCommunityBanner communityName={communityName}></ChangeCommunityBanner>}
            {modalType == "create-community" && <CreateCommunityModal></CreateCommunityModal>}
            {modalType == "register" && <RegisterModal></RegisterModal>}
            {modalType == "login" && <LoginModal></LoginModal>}
            {modalType == "password-change" && (
              <ChangePassWordModal></ChangePassWordModal>
            )}
          </div>,
          document.getElementById("modal-portal") ?? document.body,
        )}
    </div>
  );
}
