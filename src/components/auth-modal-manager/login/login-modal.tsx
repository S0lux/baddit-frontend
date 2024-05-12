"use client";

//import components
import { Button } from "../../button/button";
import { Input } from "../../input/input";

//import hooks
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useModalStore } from "@/src/store/modalStore";
import usePost from "@/src/hooks/usePost";
import { useAuthStore } from "@/src/store/authStore";

//import icons
import { IoMdClose } from "react-icons/io";

//import schema
import { loginFormSchema } from "../../../schema/loginFormSchema";

//other imports
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";

export default function LoginModal() {
  const [message, setMessage] = useState<string>();

  const { status, loading, PostSent } = usePost("/auth/login");

  const setModalType = useModalStore((state) => state.setModalType);
  const setShowModal = useModalStore((state) => state.setShowModal);

  const getUserAsync = useAuthStore((state) => state.getUserAsync);

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

  useEffect(() => {
    const endModal = () => {
      setShowModal(false);
      setMessage(undefined);
    };

    if (status == "error" && message !== undefined) {
      toast.error(message);
    }
    if (status == "success" && message !== undefined) {
      toast.success(message);
      return endModal();
    }

    return setMessage(undefined);
  }, [message]);

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
    const statusCode = await PostSent(data);

    switch (statusCode) {
      case 200:
        setMessage("Successfully logged in!");
        await getUserAsync();
        break;
      case 401:
        setMessage("Invalid username or password!");
        break;
      case 500:
        setMessage("Internal server error");
        break;
      default:
        setMessage(undefined);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-1 flex-col justify-center bg-white dark:bg-backgroundSecondary sm:h-fit sm:max-w-[470px] sm:rounded-2xl">
      <div className="flex w-full items-center justify-end px-[24px] pb-[8px] pt-[24px]">
        <Button
          onClick={() => setShowModal(false)}
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
              type="password"
            ></Input>

            <div className="mt-2 text-[14px]">
              New to Baddit?
              <span>
                <Link
                  href={""}
                  className="ml-1 font-bold text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-500"
                  onClick={() => setModalType("register")}
                >
                  Sign Up
                </Link>
              </span>
            </div>
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
        </form>{" "}
      </div>
    </div>
  );
}
