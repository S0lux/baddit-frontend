'use client'
import { useState } from "react"
import { Input } from "@/src/components/input/input"
import { Button } from "@/src/components/button/button"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { CreateCommunityPayload } from "@/src/schema/communitySchema"
import { useAuthStore } from "@/src/store/authStore"
import { mutate } from "swr"

const CreateCommunity = () => {
    const [nameCommunity, setNameCommunity] = useState<string>("")
    const [descripstionCommunity, setDescriptionCommunity] = useState<string>("")

    const router = useRouter()

    const { loggedIn, userData, getUserAsync } = useAuthStore();

    const { mutate: createCommunity, isPending } = useMutation({

        mutationFn: async () => {
            const payload: CreateCommunityPayload = {
                name: nameCommunity,
                description: descripstionCommunity
            }

            getUserAsync()

            const { data } = await axios.post('https://api.baddit.life/v1/communities', payload)
            return data as string
        }
    })

    // const createCommunity = () => {
    //     const payload: CreateCommunityPayload = {
    //         name: nameCommunity,
    //         description: descripstionCommunity
    //     }
    //     fetch('https://api.baddit.life/v1/communities', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ payload })
    //     }).then(res => res.json())
    //         .then(res => {
    //             if (res) {
    //                 console.log("Success")
    //             }
    //         });
    // }


    return (
        <div className="container flex items-center h-full max-w-3xl mx-auto">
            <div className="relative bg-slate-100 w-full h-fit p-4 rounded-lg space-y-4">
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

                    <Button variant={'primary'} size={'small'} disabled={nameCommunity.length === 0} onClick={() => createCommunity()}>Create</Button>
                </div>
            </div>
        </div >
    )
}

export default CreateCommunity