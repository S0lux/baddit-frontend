import { GoHomeFill } from "react-icons/go";
import Link from "next/link";
import { Button } from "@/src/components/button/button";

const CommunityHome = () => {

    return (
        <>
            <h1 className="font-bold text-3xl md:text-4xl">Feed</h1>
            <div className="h-fit">
                {/* <PostList /> */}
            </div>
            <div className=" h-fit grid grid-cols-1 md:grid-col-3 gap-y-3 md:gap-y-4 py">
                {/* feed */}

                {/* communities info */}
                <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
                    <div className="bg-emerald-100 px-6 py-4 dark:bg-emerald-950">
                        <p className="font-semibold py-3 flex items-center gap-1.5">
                            <GoHomeFill className="w-4 h-4" />
                            Home
                        </p>
                    </div>

                    <div className="-my-3 divide-y divide0gray-100 px-6 py-4 text-sm leading-6">
                        <div className="flex justify-between items-center gap-x-4 py-3">
                            <p className=" text-zincs-500">
                                Your personal Baddit homepage. Comehere to check in with your favorite communities.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center pb-4 pt-2">
                        <Button variant={'primary'} size={'small'}>
                            <Link href={"/r/create"}>
                                Create Community
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommunityHome