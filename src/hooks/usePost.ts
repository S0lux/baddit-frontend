import { useEffect, useState } from "react";
import { AlertType } from "../components/alert/alert-type";
import axios from "axios";

export default function usePost(url: string, data: any) {
  const [status, setStatus] = useState<AlertType>(undefined);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async () => {
      setLoading(true);

      await axios
        .post(url, data)
        .then((res) => {
          setStatus("success");
          setMessage("Login successful!");
          console.log(res.data);
        })
        .catch((err) => {
          setStatus("error");
          setMessage(
            err.response?.data.error.message || "Invalid username or password",
          );
          console.log(err);
        });

      setLoading(false);
    };
  }, []);

  return { status, message, loading };
}
