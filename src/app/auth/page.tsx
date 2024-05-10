"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import usePost from "../../hooks/usePost";
import { useAuthStore } from "@/src/store/authStore";
import Image from "next/image";
import verificationBg2 from "@/public/verificationBg.jpg";
import { Button } from "@/src/components/button/button";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function Page() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [topMessage, setTopMessage] = useState("Verifying");
  const [bottomMessage, setBottomMessage] = useState(
    "Your email is being verified. Please wait.",
  );
  const [error, setError] = useState<boolean>(false);

  const { PostSent } = usePost("https://api.baddit.life/v1/auth/verification");

  const payload = {
    token: searchParams.get("emailToken"),
  };

  useEffect(() => {
    const verifyEmail = async () => {
      const statusCode = await PostSent(payload);
      switch (statusCode) {
        case 200:
          setTopMessage("Welcome to Baddit");
          setBottomMessage("Your email has been verified");
          setError(false);
          break;
        case 400:
          setTopMessage("Invalid request body");
          break;
        case 401:
          setTopMessage("Oops! Unauthorized access");
          setBottomMessage("Please login to verify your email");
          setError(true);
          break;
        case 498:
          setTopMessage("Oops! Token expired");
          setBottomMessage("Token was expired or invalid");
          setError(true);
          break;
        case 500:
          setTopMessage("Internal server error");
          setBottomMessage("Please try again later");
          setError(true);
          break;
        default:
          return statusCode;
      }
    };

    console.log(verifyEmail());
  }, []);

  return (
    <div>
      <div className="absolute z-50 flex h-screen w-screen flex-col items-center justify-center bg-[#4dd1d6]/20 dark:bg-black/20 ">
        <div className="j flex flex-col items-center justify-center rounded-none bg-white/80 text-black dark:bg-black/80 sm:h-[473px] sm:w-[510px] sm:rounded-3xl">
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-[20px] dark:text-white">
            <h1
              className={twMerge(
                "text-center text-[33px] font-extrabold",
                clsx(error && "text-red-500", !error && "text-green-500"),
              )}
            >
              {topMessage}
            </h1>
            <h1 className="font-semibold">{bottomMessage}</h1>
          </div>
          <div className="flex w-full">
            <Button
              onClick={router.back}
              className="mx-2 mb-2 flex-1 rounded-3xl font-semibold"
              variant={"secondary"}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
      {/* Background Image */}
      <Image
        src={verificationBg2}
        style={{ width: "100vw", height: "100vh" }}
        alt="verificationBg"
        className="fixed z-0"
      ></Image>
    </div>
  );
}
