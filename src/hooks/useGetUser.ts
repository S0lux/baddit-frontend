import { useState } from "react";
import axios from "axios";

export default function useGetUser() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  const GetUser = async () => {
    try {
      const response = await axios.get("https://api.baddit.life/v1/users/me", {
        withCredentials: true,
      });
      setLoggedIn(true);
      setUserData(response.data);
    } catch (err: any) {
      setLoggedIn(false);
    }
  };

  return { loggedIn, userData, GetUser };
}
