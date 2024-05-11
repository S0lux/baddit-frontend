"use client";

import { useAuthStore } from "@/src/store/authStore";
import { useEffect } from "react";
import NonLoggedInHeader from "./nonlogged-in/nonlogged-in-header";
import LoggedInHeader from "./logged-in/logged-in-header";
import Loading from "@/public/loading.svg";
import Spinner from "../spinner/spinner";

export default function HeaderMenu() {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const getUserAsync = useAuthStore((state) => state.getUserAsync);

  useEffect(() => {
    getUserAsync();
  }, []);

  return (
    <div className="">
      {loggedIn == undefined && (
        <div className="w-[207px]">
          <Spinner className="mx-auto size-7"></Spinner>
        </div>
      )}
      {loggedIn == true && <LoggedInHeader></LoggedInHeader>}
      {loggedIn == false && <NonLoggedInHeader></NonLoggedInHeader>}
    </div>
  );
}
