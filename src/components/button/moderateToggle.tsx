'use client'
import { FC, useEffect } from 'react'
import { Button } from './button'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import { useRouter } from 'next/navigation'

interface JoinLeaveToggleProps {
    communityName: string,
    memberName: string,
    initRole: string
}

const ModerateToggle = (params: JoinLeaveToggleProps) => {
    const { communityName, memberName, initRole } = params
    const [role, setRole] = useState<string>(initRole)

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleModerate = async () => {
        setLoading(true);
        try {
            let res = await axios.post(
                `https://api.baddit.life/v1/communities/${communityName}/moderators`,
                { memberName: memberName },
                { withCredentials: true },
            );
            toast.success(res.data.message);

            setRole("MODERATOR")
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
        setLoading(false);
    }

    const handleUnModerate = async () => {
        console.log("Submitted")
        setLoading(true);
        try {
            let res = await axios.delete(
                `https://api.baddit.life/v1/communities/${communityName}/moderators/${memberName}`,
                { withCredentials: true }
            ); console.log("Success")
            toast.success(res.data.message);

            setRole("MEMBER")
        } catch (err: any) {
            console.log("failed")
            console.log(err)
            toast.error(err.response.data.message);
        }
        setLoading(false);
    }

    // return joinStatus == "Joined" ? (
    //     <Button
    //         size={"medium"}
    //         variant={"outlined"}
    //         className='dark:text-white'
    //         onClick={handleUnJoinBtn}
    //         loading={loading}
    //     >Joined</Button>
    // ) : (
    //     <Button
    //         size={"medium"}
    //         variant={"primary"}
    //         className='text-white'
    //         loading={loading}
    //         onClick={handleJoinBtn}
    //     >Join</Button>
    // )

    return (
        <>
            {role == "MEMBER" &&
                <Button
                    size={"medium"}
                    variant={"outlined"}

                    onClick={handleModerate}
                    loading={loading}
                >
                    MEMBER
                </Button>}

            {role == "MODERATOR" &&
                <Button
                    size={"medium"}
                    variant={"outlined"}

                    onClick={handleUnModerate}
                    loading={loading}>
                    MODERATOR
                </Button>}
            {role == "ADMIN" &&
                <p
                    className='text-lg font-bold dark:text-white mr-4 text-componentSecondary'>
                    ADMIN
                </p>}
        </>
    )
}

export default ModerateToggle
