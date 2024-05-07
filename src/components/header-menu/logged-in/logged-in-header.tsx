"use client";

import axios, { Axios } from "axios";
import { Button } from "../../button/button";
import { useAuthStore } from "@/src/store/authStore";

export default function NonLoggedInHeader() {
  const logoutHandle = async () => {
    try {
      const response = await axios.post(
        "https://api.baddit.life/v1/auth/logout",
        {},
        { withCredentials: true },
      );
      useAuthStore.setState({ loggedIn: false });
      console.log(response);
    } catch (err: any) {
      if (err.response.status === 401) {
        console.log("a khang");
      }
    }
  };

  return (
    <div>
      <Button size={"small"} onClick={logoutHandle}>
        {" "}
        Logout{" "}
      </Button>
    </div>
  );
}
