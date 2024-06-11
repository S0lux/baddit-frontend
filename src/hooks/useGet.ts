import { useState } from "react";
import { AlertType } from "../components/alert/alert-type";
import axios from "axios";

export default function useGet(url: string, options?: {}) {
  const [status, setStatus] = useState<AlertType>();
  const [loading, setLoading] = useState<boolean>();

  const GetData = async (params?: {}) => {
    setLoading(true);

    try {
      const response = await axios.get("https://api.baddit.life/v1" + url, {
        withCredentials: true,
        params: params,
      });
      setStatus("success");
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setStatus("error");
      setLoading(false);
      return err.response?.status;
    }
  };

  return { status, loading, GetData };
}
