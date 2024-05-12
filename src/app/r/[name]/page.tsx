'use client'
import PostList from "@/src/components/post/post-list";
import Image from "next/image";
import useSWR from "swr";
import { Button } from "@/src/components/button/button";

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
    return (
        <div>
            <PostList communityId={data.community.id} />
        </div>
    )
}

export default CommunityDetail