"use client";
import PostList from "@/src/components/post/post-list";
import useSWR from "swr";
import { Button } from "@/src/components/button/button";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    name: string;
  };
}

const CommunityDetail = ({ params }: PageProps) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `https://api.baddit.life/v1/communities/${params?.name}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const router = useRouter();
  return (
    <>
      <div className="container mb-12 flex w-full flex-col items-center">
        {/* banner */}
        <div className="fex-row flex justify-center">
          <img
            src="https://preview.redd.it/xw6wqhhjubh31.jpg?width=2400&format=pjpg&auto=webp&s=32690f33b69e599ed11ea3e7c0e6286c0770245e"
            alt=""
          />
        </div>
        {/* logo and name */}
        <div className="flex w-full flex-1 flex-row items-start justify-between">
          <div className="ml-16 flex flex-row justify-start">
            <div className="-mt-8 rounded-full border-4 border-white dark:border-black">
              <img
                src={data?.community.logoUrl}
                alt=""
                className="xs:w-[80px] xs:h-[80px] h-[100px] w-[100px] rounded-full"
              />
            </div>
            <div className="flex-end flex flex-row items-end pb-2">
              <h1 className="ml-4 text-3xl font-bold md:text-4xl">
                r/{data?.community.name}
              </h1>
            </div>
          </div>
          <div className="mr-2 flex flex-row justify-end gap-x-4">
            <div className="flex-end mt-8 flex flex-row pb-2">
              <Button
                size={"medium"}
                variant={"outlined"}
                onClick={() => {
                  router.push(`/r/${data?.community.name}/submit`);
                }}
              >
                <div className="inline-flex items-center">
                  <AiOutlinePlus className="mr-2" />
                  Create a post
                </div>
              </Button>
            </div>
            <div className="flex-end mt-8 flex flex-row pb-2">
              <Button size={"medium"} variant={"outlined"}>
                Joined
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4">
        {/* Feed */}
        <div className="col-span-2 flex flex-col space-y-6">
          <PostList communityId={data.community.id} />
        </div>
        {/* About */}
        <div className="order-first hidden h-fit overflow-hidden rounded-lg bg-[#f5f5f5] dark:bg-[#04090a] md:order-last md:block">
          <div className="px-6 py-4">
            <p className="py-3 font-semibold text-gray-900 dark:text-[#b8c5c9]">
              About r/{data?.community.name}
            </p>
            <p className="py-3 font-normal text-gray-600 dark:text-[#76898e]">
              {data?.community.description}
            </p>
          </div>
          <hr className="border-neutral-border-weak" />
          <dl className="divide-neutral divide-y bg-[#f5f5f5] px-6 text-sm leading-6 dark:bg-[#04090a]">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Created At</dt>
              <dd className="text-gray-700">{data?.community.createdAt}</dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Members</dt>
              <dd className="flex items-start gap-x-2">
                <div className="text-gray-900">
                  {data?.community.memberCount}
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
