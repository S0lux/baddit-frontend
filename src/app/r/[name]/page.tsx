'use client'
import PostList from "@/src/components/post/post-list";
import Image from "next/image";
import useSWR from "swr";
import { Button } from "@/src/components/button/button";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface PageProps {
    params: {
        name: string
    }
}

const CommunityDetail = ({ params }: PageProps) => {

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

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    const router = useRouter()

    const formattedDate = new Date(data?.community?.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <>
            <div className="flex flex-col container w-full items-center mb-4 px-6 after:border-b">
                {/* banner */}
                <div className="flex fex-row justify-center">
                    <img
                        src={data?.community?.bannerUrl}
                        alt="banner"
                        className="w-full" />
                </div>
                {/* logo and name */}
                <div className="flex flex-1 items-start justify-between flex-row w-full">
                    <div className="flex flex-row justify-start ml-16">
                        <div className="rounded-full -mt-8 border-white border-4 dark:border-black">
                            <img src={data?.community?.logoUrl}
                                alt=""
                                className="rounded-full w-[100px] h-[100px] xs:w-[80px] xs:h-[80px]" />
                        </div>
                        <div className="flex flex-end flex-row items-end pb-2">
                            <h1 className="font-bold text-3xl md:text-4xl ml-4">
                                r/{data?.community?.name}
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end gap-x-4">
                        <div className="flex flex-end flex-row pb-2 mt-8">
                            <Button

                                size={"medium"}
                                variant={"outlined"}
                                onClick={() => { router.push(`/r/${data?.community.name}/submit`) }}>
                                <div className="inline-flex items-center">
                                    <AiOutlinePlus className="mr-2" />
                                    Create a post
                                </div>
                            </Button>
                        </div>
                        <div className="flex flex-end flex-row pb-2 mt-8">
                            <Button size={"medium"} variant={"outlined"}>Joined</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6 mx-4 w-full px-6">
                {/* Feed */}
                <div className='flex flex-col col-span-2 space-y-6'>
                    <PostList communityId={data.community?.id} />
                </div>
                {/* About */}
                <div className="hidden md:block overflow-hidden h-fit rounded-lg bg-[#f5f5f5] dark:bg-[#04090a] order-last md:order-last">
                    <div className='px-6 py-4'>
                        <p className='font-semibold py-3 text-gray-900 dark:text-[#b8c5c9]'>About r/{data?.community?.name}</p>
                        <p className="font-normal py-3 text-gray-600 dark:text-[#76898e]">{data?.community?.description}</p>
                    </div>
                    <hr className="border-neutral-border-weak" />
                    <dl className="divide-y divide-neutral px-6 text-sm leading-6 bg-[#f5f5f5] dark:bg-[#04090a]">
                        <div className='flex justify-between gap-x-4 py-3'>
                            <dt className='text-gray-500'>Created At</dt>
                            <dd className='text-gray-700 dark:text-[#f2f2f2]'>
                                {formattedDate}
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