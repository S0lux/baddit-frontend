"use client";

import { useAuthStore } from "@/src/store/authStore";
import { useEffect } from "react";
import LoggedInHeader from "./nonlogged-in/nonlogged-in-header";
import NonLoggedInHeader from "./logged-in/logged-in-header";

export default function HeaderMenu() {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const getUserAsync = useAuthStore((state) => state.getUserAsync);

  useEffect(() => {
    getUserAsync();
  }, []);

  const username = useAuthStore((state) => {
    if (state.userData != null) {
      return state.userData.username;
    } else {
      return "User";
    }
  });

  return (
    <div>
      {loggedIn == false && <LoggedInHeader></LoggedInHeader>}
      {loggedIn == true && <NonLoggedInHeader></NonLoggedInHeader>}
    </div>
  );
}
