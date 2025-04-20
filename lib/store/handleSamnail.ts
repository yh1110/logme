import { create } from "zustand";
type handleOpenSamnailStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};
export const handleOpenSamnailStore = create<handleOpenSamnailStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
