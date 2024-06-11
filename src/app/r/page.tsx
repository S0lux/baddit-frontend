"use client";
import { GoHomeFill } from "react-icons/go";
import Link from "next/link";
import { Button } from "@/src/components/button/button";
import useSWR from "swr";
import Spinner from "@/src/components/spinner/spinner";
import { useRouter } from "next/navigation";
import InfiniteSubbaddit from "@/src/components/community/infinite-subbaddit";
import CommunityCard from "@/src/components/community/community-card";

const CommunityHome = () => {
  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "https://api.baddit.life/v1/communities",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col justify-center">
        <Spinner className=" mx-auto size-20"></Spinner>
      </div>
    );
  }

  return (
    <div className="container lg:h-[700px]">
      <h1 className="mb-8 mt-4 text-center text-2xl font-bold md:text-3xl">
        Best of Baddit
      </h1>
      <InfiniteSubbaddit />
    </div>
  );
};

export default CommunityHome;
