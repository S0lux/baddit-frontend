"use client"
import { Button } from "@/src/components/button/button";
import { Inter } from "next/font/google";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

export default function CommunityDetailLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: {
        name: string
    }
}) {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `https://api.baddit.life/v1/communities/${params?.name}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )
    return (
        <>
            <div className="flex flex-col container w-full items-center mb-12">
                {/* banner */}
                <div className="flex fex-row justify-center">
                    <img src="https://preview.redd.it/xw6wqhhjubh31.jpg?width=2400&format=pjpg&auto=webp&s=32690f33b69e599ed11ea3e7c0e6286c0770245e" alt="" />
                </div>
                {/* logo and name */}
                <div className="flex flex-1 items-start flex-row w-full">
                    <div className="flex flex-row justify-start ml-16">
                        <div className="rounded-full -mt-8 border-white border-4">
                            <img src={data?.community.logoUrl}
                                alt=""
                                className="rounded-full w-[100px] h-[100px] xs:w-[80px] xs:h-[80px]" />
                        </div>
                        <div className="flex flex-end flex-row items-end pb-2">
                            <h1 className="font-bold text-3xl md:text-4xl ml-4">
                                r/{data?.community.name}
                            </h1>
                        </div>
                        <div className="flex flex-end flex-row items-end pb-2 ml-6 ">
                            <Button size={"small"} variant={"ghost"}>Joined</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
                {/* Feed */}
                <div className='flex flex-col col-span-2 space-y-6'>{children}</div>
                {/* About */}
                <div className="hidden md:block overflow-hidden h-fit rounded-lg bg-[#f5f5f5] order-first md:order-last">
                    <div className='px-6 py-4'>
                        <p className='font-semibold py-3 text-gray-900'>About r/{data?.community.name}</p>
                        <p className="font-normal py-3 text-gray-600">{data?.community.description}</p>
                    </div>
                    <hr className="border-neutral-border-weak" />
                    <dl className="divide-y divide-neutral px-6 text-sm leading-6 bg-[#f5f5f5]">
                        <div className='flex justify-between gap-x-4 py-3'>
                            <dt className='text-gray-500'>Created At</dt>
                            <dd className='text-gray-700'>
                                {data?.community.createdAt}
                            </dd>
                        </div>
                        <div className='flex justify-between gap-x-4 py-3'>
                            <dt className='text-gray-500'>Members</dt>
                            <dd className='flex items-start gap-x-2'>
                                <div className='text-gray-900'>{data?.community.memberCount}</div>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

        </>
    );
}