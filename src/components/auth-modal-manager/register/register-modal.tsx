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
import { registerFormSchema } from "../../../schema/registerFormSchema";

//other imports
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { toast } from "react-toastify";

export default function RegisterModal() {
  const [message, setMessage] = useState<string>();
  const [alertBarVisible, setAlertBarVisible] = useState<boolean>(false);

  const setModalType = useModalStore((state) => state.setModalType);
  const setShowModal = useModalStore((state) => state.setShowModal);

  const getUserAsync = useAuthStore((state) => state.getUserAsync);

  const { status, loading, PostSent } = usePost(
    "https://api.baddit.life/v1/auth/signup",
  );

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

  //Handle status code
  // useEffect(() => {
  //   switch (statusCode) {
  //     case 201:
  //       setMessage(
  //         "Successfully sign up! Please check your email to verify your account.",
  //       );
  //       setShowModal(false);
  //       break;
  //     case 400:
  //       setMessage("Invalid username or password!");
  //       break;
  //     case 409:
  //       setMessage("Username or email already taken");
  //       break;
  //     case 500:
  //       setMessage("Internal server error");
  //       break;
  //     default:
  //       setMessage("Something went wrong");
  //   }
  // }, [statusCode]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof registerFormSchema>> = async (
    data,
  ) => {
    await PostSent(data);

    if (status == "error") {
      toast.error(message);
    } else {
      toast.success(message);
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
        <h1 className="text-[24px] font-extrabold">Sign Up</h1>
        <form
          className="flex h-full flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-1 flex-col gap-[10px]">
            <Input
              {...register("email", { required: "Email is required" })}
              error={status}
              errorMessage={errors.email?.message}
              placeholder="Email"
              disabled={loading}
            ></Input>

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
              Already have an account?
              <span>
                <Link
                  href={""}
                  className="ml-1 font-bold text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-500"
                  onClick={() => setModalType("login")}
                >
                  Log In
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
              Submit
            </Button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
}
