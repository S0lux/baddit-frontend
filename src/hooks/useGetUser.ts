import { useState } from "react";
import axios from "axios";

export default function useGetUser() {
  const [logged, setLogged] = useState<string>();
  const [userData, setUserData] = useState<any>(null);

  const GetUser = async () => {
    try {
      const response = await axios.get("https://api.baddit.life/v1/users/me", {
        withCredentials: true,
      });
      setLogged("logged in");
      setUserData(response.data);
    } catch (err: any) {
      setLogged("non-logged in");
    }
  };

  return { logged, userData, GetUser };
}
