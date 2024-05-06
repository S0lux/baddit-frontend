'use client'
import PostCard from "./post-card";
import useSWR from "swr"


const PostList = () => {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "https://api.baddit.life/v1/posts",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )
    if (isLoading) {
        return <div>loading...</div>
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