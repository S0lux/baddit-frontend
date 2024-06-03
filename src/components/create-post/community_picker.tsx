"use client";
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/store/authStore';
import useGet from '@/src/hooks/useGet';
import { set } from 'zod';
import { FaAngleDown } from 'react-icons/fa';

export default function Community_Picker() {
    const router = useRouter();
    const { name } = useParams();
    const searchParams = useSearchParams();
    const { userName } = useParams();
    const [selectedPick, setSelectedPick] = useState("");
    const { userData } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const { GetData } = useGet(`/communities`);
    const [communities, setCommunities] = useState<any[]>([]);

    useEffect(() => {
        GetData()
            .then(data => {
                setCommunities(data);
            });

    }, [])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleChange = (pick: string) => {
        const selectedName = pick;
        setSelectedPick(selectedName);
        if (userData?.username === selectedName) {
            router.push(`/user/${selectedName}/submit?type=${searchParams.get('type')}`);
        } else {
            router.push(`/r/${selectedName}/submit?type=${searchParams.get('type')}`);
        }
        closeDropdown();
    };

    useEffect(() => {
        if (name) {
            setSelectedPick(name.toString());
        } else if (userName) {
            setSelectedPick(userName.toString());
        }

    }, [searchParams, name, userName]);

    return (
        <div>
            <div className="relative inline-block">
                <button
                    className="px-4 py-2 font-medium rounded-full w-fit text-sm inline-flex items-center hover:bg-gray-200"
                    onClick={toggleDropdown}
                >
                    <div className="flex space-x-2 mt-2 items-center justify-center">
                        <div className="flex items-center">
                            {
                                selectedPick === userData?.username ? (
                                    <img
                                        src={userData?.avatarUrl}
                                        className="size-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={communities.find((item: any) => item.name === selectedPick)?.logoUrl}
                                        className="size-8 rounded-full object-cover"
                                    />
                                )
                            }
                        </div>

                        <div className="flex flex-col">
                            <div className="text-l mr-5 flex items-center">
                                <span className='flex justify-center items-center'>{selectedPick === userData?.username ? (
                                    `u/ ${userData?.username}`
                                ) : (
                                    `r/ ${selectedPick}`
                                )}  <FaAngleDown className='pl-2' size={20} /></span>
                            </div>
                        </div>
                    </div>

                </button>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-60 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <p className="px-4 py-2 font-semibold text-gray-700">Select</p>
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <p className='pl-2'>Your profile</p>
                            <li>
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        handleChange(userData?.username)
                                    }}
                                >

                                    <div className="flex space-x-2 mt-2 items-start justify-start">
                                        <div className="flex items-center">
                                            <img
                                                src={userData?.avatarUrl}
                                                className="size-8 rounded-full object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="text-l mr-5">
                                                u/ {userData?.username}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </li>
                            <p className='pl-2'>Community</p>
                            {
                                communities.map((item: any) => (
                                    <li key={item.id}>
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => {
                                                handleChange(item.name)
                                            }}
                                        >
                                            <div className="flex space-x-2 mt-2 items-start justify-start">
                                                <div className="flex items-center">
                                                    <img
                                                        src={item.logoUrl}
                                                        className="size-8 rounded-full object-cover"
                                                    />
                                                </div>

                                                <div className="flex flex-col">
                                                    <div className="text-l mr-5">
                                                        r/ {item.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )}

            </div>
        </div>
    )
}
