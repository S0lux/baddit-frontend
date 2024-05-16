'use client'
import { GoHomeFill } from "react-icons/go";
import Link from "next/link";
import { Button } from "@/src/components/button/button";
import useSWR from "swr";
import Spinner from "@/src/components/spinner/spinner";
import { useRouter } from "next/navigation";

const CommunityHome = () => {

    const router = useRouter()

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "https://api.baddit.life/v1/communities",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )

    if (isLoading) {
        return <div className="h-full w-full flex flex-col justify-center">
            <Spinner className=" mx-auto size-20"></Spinner>
        </div>
    }

    return (
        <>
            <h1 className="font-bold text-2xl md:text-3xl mt-4 mb-8">Best of Baddit</h1>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-full gap-x-6 gap-y-6 px-8 ">
                    {data?.map((community: any) => {
                        return (
                            <Button
                                variant={"contained"}
                                size={"medium"}
                                className="rounded-md hover:bg-slate-300 dark:bg- text-3xl justify-start overflow-hidden w-full"
                                onClick={() => { router.push(`/r/${community.name}`) }}>
                                <div className="flex flex-col gap-x-2 items-start overflow-hidden w-full">
                                    <div className="flex flex-row items-center gap-x-4 w-full">
                                        <img
                                            src={community.logoUrl}
                                            alt="avt"
                                            className="w-12 h-12 rounded-full" />
                                        <div className="flex flex-col items-start w-full">
                                            <p className="truncate">r/{community.name}</p>
                                            <p className="truncate text-sm text-slate-500">{community.memberCount} members</p>
                                        </div>
                                    </div>
                                </div>
                            </Button>
                        )
                    })}
                </div >
            </div >

        </>
    )
}

export default CommunityHome