import { create } from "zustand";

type ModalStore = {
  modalOpen: boolean;
  modalType: string;
  setShowModal: (open: boolean) => void;
  setModalType: (type: string) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modalOpen: false,
  modalType: "login",
  setShowModal: (open: boolean) => set({ modalOpen: open }),
  setModalType: (type: string) => set({ modalType: type }),
}));
