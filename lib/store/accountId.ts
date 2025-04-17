import { create } from "zustand";
type AccountIdStore = {
  accountId: string;
  setAccountId: (accountId: string) => void;
};
export const accountIdStore = create<AccountIdStore>((set) => ({
  accountId: "" as string,
  setAccountId: (accountId: string) => set({ accountId }),
}));
