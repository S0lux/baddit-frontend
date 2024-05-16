'use client'
import { FC, useEffect } from 'react'
import { Button } from './button'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

interface JoinLeaveToggleProps {
    communityName: string,
    joinStatus: string
}

const JoinLeaveToggle = (params: JoinLeaveToggleProps) => {
    const { communityName, joinStatus } = params
    const [loading, setLoading] = useState(false)

    const handleJoinBtn = async () => {
        setLoading(true);
        try {
            let res = await axios.post(
                `https://api.baddit.life/v1/communities/${communityName}/members`, null,
                { withCredentials: true },
            );
            toast.success(res.data.message);
            mutate(`https://api.baddit.life/v1/communities/${communityName}`)
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
        setLoading(false);
    }

    const handleUnJoinBtn = async () => {
        console.log("Submitted")
        setLoading(true);
        try {
            let res = await axios.delete(
                `https://api.baddit.life/v1/communities/${communityName}/members`,
                { withCredentials: true }
            );
            console.log("Success")
            toast.success(res.data.message);
            mutate(`https://api.baddit.life/v1/communities/${communityName}`)
        } catch (err: any) {
            console.log("failed")
            console.log(err)
            toast.error(err.response.data.message);
        }
        setLoading(false);
    }

    return joinStatus == "Joined" ? (
        <Button
            size={"medium"}
            variant={"outlined"}
            className='dark:text-white'
            onClick={handleUnJoinBtn}
            loading={loading}
        >Joined</Button>
    ) : (
        <Button
            size={"medium"}
            variant={"primary"}
            className='text-white'
            loading={loading}
            onClick={handleJoinBtn}
        >Join</Button>
    )
}

export default JoinLeaveToggle
