'use client'
import { useAuthStore } from "@/src/store/authStore";
import { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { Divider } from "./divider";


const ButtonCreateCommunity = () => {
    const loggedIn = useAuthStore((state) => state.loggedIn);

    const getUserAsync = useAuthStore((state) => state.getUserAsync);

    useEffect(() => {
        getUserAsync();
    }, []);

    return (
        <>
            {loggedIn == true && (<div>
                <a
                    href="/r/create"
                    className="flex flex-row items-center justify-between space-x-2 rounded border-backgroundSecondary bg-background pl-3 pr-1.5 mb-2 hover:bg-backgroundSecondary"
                >
                    <div className="flex min-h-10 flex-row items-center justify-between gap-2 w-full rounded py-0.5 hover:bg-backgroundSecondary text-xs text-textSecondary">
                        CREATE COMMUNITY
                        <GoPlus className="w-6 h-6 justify-self-end" />
                    </div>
                </a>
                <Divider />
            </div>
            )}
        </>
    )
}

export default ButtonCreateCommunity