"use client";
import useSWR, { mutate } from "swr";
import { Button } from "@/src/components/button/button";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { useEffect, useRef, useState } from "react";
import { GoPencil } from "react-icons/go";
import { toast } from "react-toastify";
import { useModalStore } from "@/src/store/modalStore";
import Spinner from "@/src/components/spinner/spinner";
import JoinLeaveToggle from "@/src/components/button/joinleaveToggle";
import axios from "axios";
import InfiniteScrolling from "@/src/components/community/infinite-scrolling";
import Link from "next/link";

interface PageProps {
  params: {
    name: string;
  };
}

const CommunityDetail = ({ params }: PageProps) => {
  const { name } = params;

  const router = useRouter();

  //get auth session
  const userData = useAuthStore((state) => state.userData);
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const getUserAsync = useAuthStore((state) => state.getUserAsync);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserAsync();
    mutate(`https://api.baddit.life/v1/communities/${params?.name}`);
  }, []);

  //Get community info
  const fetcher = (url: string) =>
    fetch(url, {
      credentials: "include", // Or 'same-origin' if your API is on the same domain
    })
      .then((res) => res.json())
      .catch((err) => err.json());

  const { data, error, isLoading } = useSWR(
    `https://api.baddit.life/v1/communities/${params?.name}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  console.log("Check userData", userData);

  const role =
    loggedIn == true
      ? userData.communities.filter(
          (community: any) => community.id == data?.community.id,
        )
      : null;
  console.log("Check role", role);

  const communityCreatedDay = new Date(
    data?.community?.createdAt,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Handle delete community
  const handleDeleteCommunity = async () => {
    setLoading(true);
    try {
      let res = await axios.delete(
        `https://api.baddit.life/v1/communities/${data?.community?.name}`,
        {
          withCredentials: true,
        },
      );
      toast.success(res.data.message);
      mutate(`https://api.baddit.life/v1/communities/${data?.community?.name}`);
      router.back();
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoading(false);
  };

  if (data?.error) {
    return (
      <div className="flex h-screen w-full flex-col justify-center text-center text-3xl">
        This community does not exist
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col justify-center">
        <Spinner className=" mx-auto -mt-28 size-20"></Spinner>
      </div>
    );
  }

  const handleChangeBanner = () => {
    useModalStore.setState({
      modalOpen: true,
      modalType: "change-community-banner",
      communityName: name,
    });
  };
  const handleChangeLogo = () => {
    useModalStore.setState({
      modalOpen: true,
      modalType: "change-community-logo",
      communityName: name,
    });
  };
  return (
    <>
      <div className="container mb-4 flex min-h-36 w-full flex-col items-center px-6 pt-2 after:border-b">
        {/* banner */}
        <div className="relative z-0 max-h-48 w-full overflow-hidden rounded-lg">
          <div className="fex-col relative flex h-full justify-center overflow-hidden bg-neutral-200 dark:bg-neutral-600 ">
            <img
              src={data?.community?.bannerUrl}
              alt="banner"
              className="h-full"
            />
          </div>
          {/* change banner if owner or moderator */}
          {role &&
          (role[0]?.role == "ADMIN" || role[0]?.role == "MODERATOR") ? (
            <div className="absolute right-8 top-24 h-14 w-14 -translate-y-1/2 rounded-full">
              <button
                className="flex h-full w-full items-center justify-center rounded-full hover:bg-neutral-300"
                onClick={handleChangeBanner}
              >
                <GoPencil className="h-6 w-6 rounded-full" />
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* logo and name */}
        <div className="flex w-full flex-1 flex-row items-start justify-between">
          <div className="ml-16 flex flex-row justify-start">
            <div className="relative z-0 -mt-8 rounded-full border-4 border-white dark:border-black">
              <img
                src={data?.community?.logoUrl}
                alt=""
                className="xs:w-[80px] xs:h-[80px] h-[100px] w-[100px] rounded-full bg-slate-100 dark:bg-slate-200"
              />
              {/* change logo button if owner or moderator*/}
              {role &&
              (role[0]?.role == "ADMIN" || role[0]?.role == "MODERATOR") ? (
                <div className="absolute bottom-0 right-0 top-24 h-6 w-6 -translate-y-1/2 rounded-full border border-white">
                  <button
                    className="flex h-full w-full items-center justify-center rounded-full bg-backgroundSecondary hover:bg-neutral-300"
                    onClick={handleChangeLogo}
                  >
                    <GoPencil className="h-4 w-4 rounded-full" />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="flex-end flex flex-row items-end pb-2">
              <h1 className="ml-4 text-3xl font-bold md:text-4xl">
                r/{data?.community?.name}
              </h1>
            </div>
          </div>
          {loggedIn ? (
            <div className="flex flex-row justify-end gap-x-4">
              {loggedIn == true && data?.joinStatus == "Joined" ? (
                <div className="flex-end mt-8 flex flex-row pb-2">
                  <Button
                    size={"medium"}
                    variant={"outlined"}
                    onClick={() => {
                      router.push(`/r/${data.community?.name}/submit`);
                    }}
                  >
                    <div className="inline-flex items-center">
                      <AiOutlinePlus className="mr-2" />
                      Create a post
                    </div>
                  </Button>
                </div>
              ) : (
                <></>
              )}
              {data?.community?.ownerId == userData.id ? (
                <div className="flex-end mt-8 flex flex-row pb-2">
                  <Button
                    size={"medium"}
                    variant={"primary"}
                    onClick={handleDeleteCommunity}
                  >
                    <div className="inline-flex items-center text-white">
                      Delete Community
                    </div>
                  </Button>
                </div>
              ) : (
                <div className="flex-end mt-8 flex flex-row pb-2">
                  <JoinLeaveToggle
                    communityName={data?.community?.name}
                    joinStatus={data?.joinStatus}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex-end mt-8 flex flex-row pb-2">
              <Button
                size={"medium"}
                variant={"primary"}
                onClick={() => {
                  toast.info("Please log in to join!");
                  useModalStore.setState({
                    modalOpen: true,
                    modalType: "login",
                  });
                }}
                className="text-white"
              >
                Join
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-4 grid w-full grid-cols-1 gap-y-4 px-6 py-6 md:grid-cols-3 md:gap-x-4">
        {/* Feed */}
        <div className="col-span-2 flex flex-col space-y-6 ">
          <InfiniteScrolling />
        </div>
        {/* About */}
        <div className="sticky top-20 order-last h-fit overflow-hidden rounded-lg bg-[#f5f5f5] dark:bg-[#04090a] md:order-last md:block">
          <div className="px-6 py-4">
            <p className="py-3 font-semibold text-gray-900 dark:text-[#b8c5c9]">
              About r/{data?.community?.name}
            </p>
            <p className="py-3 font-normal text-gray-600 dark:text-[#76898e]">
              {data?.community?.description}
            </p>
          </div>
          <hr className="border-neutral-border-weak" />
          <dl className="divide-neutral divide-y bg-[#f5f5f5] px-6 text-sm leading-6 dark:bg-[#04090a]">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Created At</dt>
              <dd className="text-gray-700 dark:text-[#f2f2f2]">
                {communityCreatedDay}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">
                <Link href={`/r/${name}/members`} className="hover:text-black ">
                  Members
                </Link>
              </dt>
              <dd className="flex items-start gap-x-2">
                <div className="text-gray-900 dark:text-[#f2f2f2]">
                  {data?.community?.memberCount}
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default CommunityDetail;
