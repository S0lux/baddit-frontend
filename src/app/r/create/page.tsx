'use client'
import { useEffect, useState } from "react"
import { Input } from "@/src/components/input/input"
import { Button } from "@/src/components/button/button"
import { useRouter } from "next/navigation"
import { CreateCommunityPayload } from "@/src/schema/communitySchema"
import usePost from "@/src/hooks/usePost"
import AlertBar from "@/src/components/alert/alert-bar"
import { AnimatePresence } from "framer-motion";

const CreateCommunity = () => {
    const [nameCommunity, setNameCommunity] = useState<string>("")
    const [descripstionCommunity, setDescriptionCommunity] = useState<string>("")
    const [message, setMessage] = useState<string>()
    const [alertBarVisible, setAlertBarVisible] = useState<boolean>(false);

    const router = useRouter()

    const { status, statusCode, loading, PostSent } = usePost(
        "https://api.baddit.life/v1/communities",
    );

    //Handle StatusCode
    useEffect(() => {
        switch (statusCode) {
            case 201:
                setMessage("Community created!");
                setTimeout(() => {
                    router.push(`/r/${nameCommunity}`)
                }, 3000);
                break;
            case 400:
                setMessage("Please choose a different community name");
                break;
            case 401:
                setMessage("You are not logged in!")
                break;
            case 409:
                setMessage("Community name already taken");
                break;
            case 500:
                setMessage("Internal server error");
                break;
            default:
                setMessage("Something went wrong");
        }
    }, [statusCode]);

    //Handle alert bar visibility
    useEffect(() => { }, [alertBarVisible]);

    //Handle Create Button
    const handleCreateBtn = async () => {
        const payload: CreateCommunityPayload = {
            name: nameCommunity,
            description: descripstionCommunity
        }

        await PostSent(payload)

        setAlertBarVisible(true);

        setTimeout(() => {
            setAlertBarVisible(false)
            console.log("timeout")
        }, 2000)
    }

    return (
        <>
            <div className="container flex items-center h-full max-w-3xl mx-auto ">
                <div className="relative dark:bg-[#181c1f] w-full h-fit p-4 rounded-lg space-y-4 shadow-2xl ">
                    <div className="flex justify-between order-last">
                        <h1 className="font-bold text-2xl">Create a community </h1>
                    </div>

                    <hr className="bg-gray-300 h-px" />

                    <div>
                        <p className="text-xl font-medium">Name</p>
                        <p className="text-sm pb-2">Choose wisely. Once you pick a name, it can't be changed.</p>
                    </div>

                    <div className="relative">
                        <p className="absolute text-gray-400 text-sm left-0 w-8 inset-y-0 grid place-items-center">r/</p>
                        <Input value={nameCommunity} onChange={(e) => { setNameCommunity(e.target.value) }} className="pl-6">
                        </Input>
                    </div>

                    <div>
                        <p className="text-xl font-medium">Description</p>
                        <p className="text-sm pb-2">Describe about your community.</p>
                    </div>

                    <div className="relative">
                        <Input value={descripstionCommunity} onChange={(e) => { setDescriptionCommunity(e.target.value) }} >
                        </Input>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant={'ghost'} size={'small'} onClick={() => router.back()}>Cancel</Button>

                        <Button
                            variant={'primary'}
                            size={'small'}
                            disabled={nameCommunity.length === 0}
                            onClick={handleCreateBtn}
                            loading={loading}>
                            Create
                        </Button>
                    </div>
                </div>
            </div >
            <AnimatePresence>
                {alertBarVisible && (
                    <AlertBar
                        message={message ? message : ""}
                        status={status}
                        className="fixed bottom-0 mt-4 flex items-center justify-center rounded-none py-2"
                        Mkey="alert-bar"
                    ></AlertBar>
                )}
            </AnimatePresence>
        </>
    )
}

export default CreateCommunity