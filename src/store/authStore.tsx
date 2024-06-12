import { create } from "zustand";
import axios from "axios";

type AuthStore = {
  loggedIn: boolean;
  userData: any;
  getUserAsync: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  loggedIn: false,
  userData: null,
  getUserAsync: async () => {
    try {
      const response = await axios.get("https://api.baddit.life/v1/users/me", {
        withCredentials: true,
      });

      set(() => ({ loggedIn: true, userData: response.data }));
    } catch (err: any) {
      console.log(err);
      set(() => ({ loggedIn: false, userData: null }));
    }
  },
}));
