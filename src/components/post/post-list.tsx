'use client'
import Spinner from "../spinner/spinner";
import PostCard from "./post-card";
import useSWR from "swr"

interface PageProps {
    communityId: string
}

const PostList = ({ communityId }: PageProps) => {



    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `https://api.baddit.life/v1/posts?communityId=${communityId}`,
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
        <div className=" max-w-[770px] ">
            {data?.map((item: BadPost) => {
                return (
                    <PostCard post={item} />
                )
            })}
        </div>
    )
}

export default PostList