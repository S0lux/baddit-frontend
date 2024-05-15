import { any } from "zod";
import { create } from "zustand";

type ModalStore = {
  modalOpen: boolean;
  modalType: string;
  communityName: string;
  setShowModal: (open: boolean) => void;
  setModalType: (type: string) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modalOpen: false,
  modalType: "login",
  communityName: "",
  setShowModal: (open: boolean) => set({ modalOpen: open }),
  setModalType: (type: string) => set({ modalType: type }),
}));
