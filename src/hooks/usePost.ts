import { useState } from "react";
import { AlertType } from "../components/alert/alert-type";
import axios from "axios";

export default function usePost(url: string) {
  const [status, setStatus] = useState<AlertType>();
  const [loading, setLoading] = useState<boolean>();

  const PostSent = async (data: any) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.baddit.life/v1" + url,
        data,
        { withCredentials: true },
      );
      setStatus("success");
      setLoading(false);
      return response.status;
    } catch (err: any) {
      setStatus("error");
      setLoading(false);
      return err.response?.status;
    }
  };

  return { status, loading, PostSent };
}
