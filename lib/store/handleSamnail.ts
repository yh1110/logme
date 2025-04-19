// import { create } from "zustand";
import { createStore } from "zustand/vanilla";
type handleOpenSamnailStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};
export const handleOpenSamnailStore = createStore<handleOpenSamnailStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
