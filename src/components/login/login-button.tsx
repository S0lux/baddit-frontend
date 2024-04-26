"use client";

import { Button } from "../button/button";
import { useState, useEffect } from "react";
import LoginModal from "./login-modal";

export default function ShowLoginButton() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      setShowModal(false);
    }
  };

  return (
    <div>
      <Button variant={"primary"} size={"small"} onClick={handleShowModal}>
        Log In
      </Button>

      {showModal && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
          id="wrapper"
        >
          <LoginModal onClick={handleCloseModal}></LoginModal>
        </div>
      )}
    </div>
  );
}
