"use client";

import axios, { Axios } from "axios";
import { Button } from "../../button/button";
import { useAuthStore } from "@/src/store/authStore";

export default function LoggedInHeader() {
  const logoutHandle = async () => {
    try {
      const response = await axios.post(
        "https://api.baddit.life/v1/auth/logout",
        {},
        { withCredentials: true },
      );
      useAuthStore.setState({ loggedIn: false });
    } catch (err: any) {
      if (err.response.status === 401) {
        console.log("a khang");
      }
    }
  };

  return (
    <div className="flex w-[207px] justify-end">
      <Button size={"small"} onClick={logoutHandle}>
        {" "}
        Logout{" "}
      </Button>
    </div>
  );
}
