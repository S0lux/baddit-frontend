"use client";
import PostList from "@/src/components/post/post-list";
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
import useGet from "@/src/hooks/useGet";
import axios from "axios";


interface PageProps {
  params: {
    name: string;
  };
}

const CommunityDetail = ({ params }: PageProps) => {

  const { name } = params

  const router = useRouter()


  //get auth session
  const userData = useAuthStore((state) => state.userData);
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const getUserAsync = useAuthStore((state) => state.getUserAsync);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUserAsync();
    mutate(`https://api.baddit.life/v1/communities/${params?.name}`)
  }, []);


  //Get community info
  const fetcher = (url: string) => fetch(url, {
    credentials: 'include'  // Or 'same-origin' if your API is on the same domain
  }).then((res) => res.json()).catch((err) => err.json())

  const { data, error, isLoading } = useSWR(
    `https://api.baddit.life/v1/communities/${params?.name}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  const communityCreatedDay = new Date(data?.community?.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  //Handle delete community
  const handleDeleteCommunity = async () => {
    setLoading(true);
    try {
      let res = await axios.delete(
        `https://api.baddit.life/v1/communities/${data?.community?.name}`,
        {
          withCredentials: true
        }

      );
      toast.success(res.data.message);
      mutate(`https://api.baddit.life/v1/communities/${data?.community?.name}`)
      router.back()
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoading(false);
  }

  if (data?.error) {
    return (
      <div className="h-screen w-full flex flex-col justify-center text-3xl text-center">
        This community does not exist
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center">
        <Spinner className=" mx-auto -mt-28 size-20"></Spinner>
      </div>
    )
  }

  const handleChangeBanner = () => {
    useModalStore.setState({ modalOpen: true, modalType: "change-community-banner", communityName: name })
  }
  const handleChangeLogo = () => {
    useModalStore.setState({ modalOpen: true, modalType: "change-community-logo", communityName: name })
  }

  return (
    <>
      <div className="flex flex-col container w-full items-center mb-4 px-6 pt-2 after:border-b min-h-36">
        {/* banner */}
        <div className="relative z-0 w-full overflow-hidden rounded-lg max-h-48">
          <div className="flex fex-col justify-center h-full overflow-hidden bg-neutral-200 dark:bg-neutral-600 relative ">
            <img
              src={data?.community?.bannerUrl}
              alt="banner"
              className="h-full" />

          </div>
          {loggedIn == true && userData != null && userData.id == data?.community?.ownerId ? (
            <div className="absolute rounded-full top-24 right-8 -translate-y-1/2 w-14 h-14">
              <button
                className="flex items-center justify-center hover:bg-neutral-300 rounded-full w-full h-full"
                onClick={handleChangeBanner}>
                <GoPencil className="h-6 w-6 rounded-full" />
              </button>
            </div>
          ) : (
            <></>
          )}

        </div>

        {/* logo and name */}
        <div className="flex flex-1 items-start justify-between flex-row w-full">
          <div className="flex flex-row justify-start ml-16">
            <div className="relative z-0 rounded-full -mt-8 border-white border-4 dark:border-black">
              <img src={data?.community?.logoUrl}
                alt=""
                className="rounded-full w-[100px] h-[100px] xs:w-[80px] xs:h-[80px] bg-slate-100 dark:bg-slate-200" />
              {/* change logo button if owner */}
              {loggedIn == true && userData != null && userData.id == data?.community?.ownerId ? (
                <div className="absolute rounded-full top-24 bottom-0 right-0 -translate-y-1/2 w-6 h-6 border border-white">
                  <button
                    className="flex items-center justify-center bg-backgroundSecondary hover:bg-neutral-300 rounded-full w-full h-full"
                    onClick={handleChangeLogo}>
                    <GoPencil className="h-4 w-4 rounded-full" />
                  </button>
                </div>
              ) : (
                <></>
              )}

            </div>

            <div className="flex flex-end flex-row items-end pb-2">
              <h1 className="font-bold text-3xl md:text-4xl ml-4">
                r/{data?.community?.name}
              </h1>
            </div>
          </div>
          {loggedIn ? (
            <div className="flex flex-row justify-end gap-x-4">
              {loggedIn == true && data?.joinStatus == "Joined" ? (
                <div className="flex flex-end flex-row pb-2 mt-8">
                  <Button
                    size={"medium"}
                    variant={"outlined"}
                    onClick={() => { router.push(`/r/${data.community?.name}/submit`) }}>
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
                <div className="flex flex-end flex-row pb-2 mt-8">
                  <Button
                    size={"medium"}
                    variant={"primary"}
                    onClick={handleDeleteCommunity}>
                    <div className="inline-flex items-center text-white">
                      Delete Community
                    </div>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-end flex-row pb-2 mt-8">
                  <JoinLeaveToggle
                    communityName={data?.community?.name}
                    joinStatus={data?.joinStatus} />
                </div>
              )}

            </div>
          ) : (
            <div className="flex flex-end flex-row pb-2 mt-8">
              <Button
                size={"medium"}
                variant={"primary"}
                onClick={() => {
                  toast.info("Please log in to join!")
                  useModalStore.setState({ modalOpen: true, modalType: "login" })
                }}
                className="text-white"
              >Join</Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 container gap-y-4 md:gap-x-4 py-6 mx-4 w-full px-6">
        {/* Feed */}
        <div className='flex flex-col col-span-2 space-y-6'>
          <PostList communityName={data?.community?.name} />
        </div>
        {/* About */}
        <div className="sticky top-20 md:block overflow-hidden h-fit rounded-lg bg-[#f5f5f5] dark:bg-[#04090a] order-last md:order-last">
          <div className='px-6 py-4'>
            <p className='font-semibold py-3 text-gray-900 dark:text-[#b8c5c9]'>About r/{data?.community?.name}</p>
            <p className="font-normal py-3 text-gray-600 dark:text-[#76898e]">{data?.community?.description}</p>
          </div>
          <hr className="border-neutral-border-weak" />
          <dl className="divide-y divide-neutral px-6 text-sm leading-6 bg-[#f5f5f5] dark:bg-[#04090a]">
            <div className='flex justify-between gap-x-4 py-3'>
              <dt className='text-gray-500'>Created At</dt>
              <dd className='text-gray-700 dark:text-[#f2f2f2]'>
                {communityCreatedDay}
              </dd>
            </div>
            <div className='flex justify-between gap-x-4 py-3'>
              <dt className='text-gray-500'>Members</dt>
              <dd className='flex items-start gap-x-2'>
                <div className='text-gray-900 dark:text-[#f2f2f2]'>{data?.community?.memberCount}</div>
              </dd>
            </div>
          </dl>
        </div>
      </div>

    </>
  )
}

export default CommunityDetail