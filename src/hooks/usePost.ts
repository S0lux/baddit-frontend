import { useState } from "react";
import { AlertType } from "../components/alert/alert-type";
import axios from "axios";

export default function usePost(url: string) {
  const [status, setStatus] = useState<AlertType>();
  const [statusCode, setStatusCode] = useState<Number>();
  const [loading, setLoading] = useState<boolean>();

  const PostSent = async (data: any) => {
    setLoading(true);

    axios
      .post(url, data)
      .then((res) => {
        setStatusCode(res.status);
        setStatus("success");
      })
      .catch((err) => {
        setStatusCode(err.response?.status);
        setStatus("error");
      });

    setLoading(false);
  };

  return { status, statusCode, loading, PostSent };
}
