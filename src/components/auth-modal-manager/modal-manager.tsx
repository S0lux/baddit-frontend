"use client";

import { createPortal } from "react-dom";
import { Button } from "../button/button";
import { useState } from "react";
import LoginModal from "./login/login-modal";
import RegisterModal from "./register/register-modal";

export default function ModalManager() {
  const [showModal, setShowModal] = useState(false);

  const [modal, setModal] = useState("login");

  const loginHandle = () => {
    setShowModal(true);
    setModal("login");
  };

  const registerHandle = () => {
    setShowModal(true);
    setModal("register");
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
      <Button variant={"primary"} size={"small"} onClick={loginHandle}>
        Log In
      </Button>
      <Button
        className="hidden sm:block"
        variant={"secondary"}
        size={"small"}
        onClick={registerHandle}
      >
        Sign Up
      </Button>

      {showModal &&
        createPortal(
          <div
            id="wrapper"
            className="fixed inset-0 flex items-center justify-center bg-black/50"
          >
            {modal == "register" && (
              <RegisterModal
                onClick={closeModal}
                setModal={setModal}
                setShowModal={setShowModal}
              ></RegisterModal>
            )}
            {modal == "login" && (
              <LoginModal
                onClick={closeModal}
                setModal={setModal}
                setShowModal={setShowModal}
              ></LoginModal>
            )}
          </div>,
          document.getElementById("modal-portal") ?? document.body,
        )}
    </div>
  );
}
