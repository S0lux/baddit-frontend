"use client";

import { Button } from "../button/button";
import { IoMdClose } from "react-icons/io";
import { Input } from "../input/input";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginFormSchema } from "../../schema/loginFormSchema";
import { z } from "zod";
import axios from "axios";
import { AlertType } from "../alert/alert-type";
import AlertBar from "../alert/alert-bar";
import usePost from "@/src/hooks/usePost";

export default function LoginModal({ onClick }: { onClick: () => void }) {
  const [status, setStatus] = useState<AlertType>(undefined);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  //Hide scroll-bar when mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";

    window.onscroll = () => {
      window.scrollTo(
        window.pageYOffset || document.documentElement.scrollTop,
        0,
      );
    };

    return () => {
      window.onscroll = null;
      document.body.style.overflow = "auto";
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (
    data,
  ) => {
    console.log(data);
    setLoading(true);

    await axios
      .post("https://api.baddit.life/v1/auth/login", data)
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

  return (
    <div className=" flex h-screen w-screen flex-1 flex-col justify-center bg-white dark:bg-backgroundSecondary sm:h-fit sm:max-w-[470px] sm:rounded-2xl">
      <div className="flex w-full items-center justify-end px-[24px] pb-[8px] pt-[24px]">
        <Button
          onClick={onClick}
          variant={"destructive"}
          className="aspect-square w-[32px] p-0"
          disabled={loading}
        >
          <IoMdClose></IoMdClose>
        </Button>
      </div>

      <div className="flex h-full flex-1 flex-col gap-[30px] overflow-auto px-[14px] sm:px-[80px]">
        <h1 className="text-[24px] font-extrabold">Log In</h1>
        <form
          className="flex h-full flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-1 flex-col gap-[10px]">
            <Input
              {...register("username")}
              error={status}
              errorMessage={errors.username?.message}
              placeholder="Username"
              disabled={loading}
            ></Input>

            <Input
              {...register("password", { required: "Password is required" })}
              error={status}
              errorMessage={errors.password?.message}
              placeholder="Password"
              disabled={loading}
            ></Input>
          </div>

          <div className="flex w-full items-center justify-center py-[24px]">
            <Button
              size={"small"}
              className="h-[56px] flex-1 rounded-[10px] py-[24px]"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Log in
            </Button>
          </div>

          {status !== undefined && (
            <AlertBar
              message={message ? message : ""}
              status={status}
              className="fixed bottom-0 mt-4 flex items-center justify-center rounded-none py-2"
            ></AlertBar>
          )}
        </form>{" "}
      </div>
    </div>
  );
}
