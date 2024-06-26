"use client";

import { useAuthStore } from "@/src/store/authStore";
import { useEffect } from "react";
import NonLoggedInHeader from "./nonlogged-in/nonlogged-in-header";
import LoggedInHeader from "./logged-in/logged-in-header";
import Spinner from "../spinner/spinner";

export default function HeaderMenu() {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const getUserAsync = useAuthStore((state) => state.getUserAsync);

  useEffect(() => {
    getUserAsync();
  }, []);

  return (
    <div className="relative z-50">
      {loggedIn == undefined && (
        <div>
          <Spinner className="mx-auto size-7"></Spinner>
        </div>
      )}
      {loggedIn == true && <LoggedInHeader></LoggedInHeader>}
      {loggedIn == false && <NonLoggedInHeader></NonLoggedInHeader>}
    </div>
  );
}
