"use client";

import { createPortal } from "react-dom";
import LoginModal from "./login/login-modal";
import RegisterModal from "./register/register-modal";
import { useModalStore } from "@/src/store/modalStore";
import ChangePassWordModal from "./change-password/change-password-modal";

export default function ModalManager() {
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
      className="flex items-center justify-center gap-1"
      onClick={handleWrapperClick}
    >
      {modalOpen &&
        createPortal(
          <div
            id="wrapper"
            className="fixed inset-0 flex items-center justify-center bg-black/50"
          >
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
