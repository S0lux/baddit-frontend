'use client'
import { Button } from "@/src/components/button/button";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";
import useSWR, { mutate } from "swr";
import Spinner from "@/src/components/spinner/spinner";
import Link from "next/link";
import { useEffect } from "react";
import ModerateToggle from "@/src/components/button/moderateToggle";

export default function Home() {
    const { name } = useParams()

    console.log(name)

    const router = useRouter()

    //Get community info
    const fetcher = (url: string) => fetch(url, {
        credentials: 'include'  // Or 'same-origin' if your API is on the same domain
    }).then((res) => res.json()).catch((err) => err.json())

    const { data, error, isLoading } = useSWR(
        `https://api.baddit.life/v1/communities/${name}/members`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )

    //get community info
    //const fetcher = (url: string) => axios.get(url);

    const getInfo = (fetcher: any, url: string) => {
        let { data, error, isLoading } = useSWR(url, fetcher, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        });
        console.log("check community", data)
        return { data, error, isLoading };
    };

    const community = getInfo(
        fetcher,
        `https://api.baddit.life/v1/communities/${name}`,
    );

    const user = getInfo(
        fetcher,
        "https://api.baddit.life/v1/users/me"
    )

    useEffect(() => {
        mutate(`https://api.baddit.life/v1/users/me`)
    })

    const communityCreatedDay = new Date(community.data?.community.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (community.isLoading) {
        return <Spinner className="relative top-[40%] size-16"></Spinner>;
    }

    return (
        <div className="container flex h-full w-full grid-cols-2 gap-4 lg:px-4 xl:px-16">
            <div className="flex flex-1 h-fit w-auto flex-row">
                {/* back button */}
                <Button
                    variant={"ghost"}
                    className="mt-2 h-fit rounded-full p-1"
                    size={"large"}
                    onClick={() => {
                        router.back();
                    }}
                >
                    <IoIosArrowRoundBack />
                </Button>
                <div className="px-6 flex flex-col w-full text-center mt-6 gap-y-8  ">
                    {data?.map((member: any) => {
                        return (
                            <div
                                id={member?.userId}
                                className="flex flex-col "
                            >
                                <div className="flex flex-col gap-x-2 items-start overflow-hidden w-full">
                                    <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                                        <Link href={`/user/${member?.username}`}>
                                            <div className="flex w-fit">
                                                <div className="flex justify-center w-20 h-12 rounded-full mx-4">
                                                    <img
                                                        src={member?.avatarUrl}
                                                        alt="avt"
                                                        className="w-full h-full rounded-full" />
                                                </div>
                                                {community.data?.community.ownerId == user.data?.id ?
                                                    (
                                                        <div className="flex flex-row items-center w-full">
                                                            <p className="truncate text-lg">u/{member?.username}</p>
                                                        </div>

                                                    ) : (
                                                        <div className="flex flex-col items-start w-full h-full">
                                                            <p className="truncate text-lg">u/{member?.username}</p>
                                                            <p className="truncate text-base text-slate-500">{member?.communityRole} </p>
                                                        </div>
                                                    )}


                                            </div>
                                        </Link>

                                        {community.data?.community.ownerId == user.data?.id ?
                                            (
                                                <ModerateToggle communityName={community.data?.community.name} memberName={member?.username} initRole={member?.communityRole} />
                                            ) : (<></>)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* About */}
            <div className=" mt-2 h-fit max-w-80 lg:min-w-96 rounded-md bg-[#f5f5f5] dark:bg-[#04090a]">
                <div className=" relavtive container px-6 py-4">
                    <p className="py-3 font-semibold text-gray-900 dark:text-[#b8c5c9]">
                        About r/{community.data?.community.name}
                    </p>
                    <p className="py-3 font-normal text-gray-600 dark:text-[#76898e]">
                        {community.data?.community.description}
                    </p>
                </div>
                <hr className="border-neutral-border-weak" />
                <dl className="divide-neutral divide-y px-6 text-sm leading-6 ">
                    <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500">Created At:</dt>
                        <dd className="text-gray-700">
                            {communityCreatedDay}
                        </dd>
                    </div>
                    <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500">Members:</dt>
                        <dd className="flex items-start gap-x-2">
                            <div className="text-gray-900">
                                {community.data?.community.memberCount}
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
