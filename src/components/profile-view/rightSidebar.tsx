"use client";
import React, { use, useEffect, useState } from 'react';
import { FaCamera, FaCopy } from 'react-icons/fa';
import { Button } from '@/src/components/button/button';
import { FaBirthdayCake, FaShare, FaPlus, FaCheckCircle } from 'react-icons/fa';
import { FaRegCircleXmark } from "react-icons/fa6";
import Link from 'next/link';
import { useAuthStore } from '@/src/store/authStore';
import axios from 'axios';
import Spinner from '@/src/components/spinner/spinner';


const RightSidebar: React.FC<{ user: any }> = ({ user }) => {

    const { userData } = useAuthStore();
    const [communities, setCommunities] = useState<any[]>([]);
    const [loadingCommunities, setLoadingCommunities] = useState(true);

    const [showAllCommunities, setShowAllCommunities] = useState(false);

    const handleShowMore = () => {
        setShowAllCommunities(true);
    };

    const fetchCommunities = async () => {
        let cursor = "";
        let endReached = false;
        let allCommunities = [...communities];
        while (!endReached) {
            const data = await axios.get(`https://api.baddit.life/v1/communities?cursor=${cursor}`, {
                withCredentials: true,
            }).then(res => res.data);

            if (data.length > 0) {
                const newCommunities = data.filter((community: any) => !allCommunities.some((c: any) => c.id === community.id));
                allCommunities = [...allCommunities, ...newCommunities];
                cursor = data[data.length - 1].id;
            } else {
                endReached = true;
            }
        }
        setLoadingCommunities(false);
        setCommunities(allCommunities);
    }

    useEffect(() => {
        fetchCommunities();
    }, []);

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
    }

    const communitiesList = communities.filter((community) => community?.ownerId === user?.id);

    const formattedDate = new Date(user?.registeredAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <aside className="ml-8 mt-3 flex mr-1">
            <div className=" rounded-2xl w-80 bg-[#f5f5f5] dark:bg-[#04090a]">
                {user?.username === userData?.username ?
                    <><div className="bg-pink-300 top-0 rounded-t-2xl flex justify-end items-end h-28 p-4 dark:bg-purple-300">
                        <a
                            aria-label="Edit profile avatar"
                            className=""
                            href="/setting">
                            <div className="right-0 flex items-end justify-center rounded-full border-2 border-solid bg-gray-300 dark:bg-gray-500">
                                <div className="flex items-center justify-center w-10 h-10">
                                    <FaCamera />
                                </div>
                            </div>
                        </a>
                    </div></> : <></>}
                <div className="p-4 h-fit">
                    <div>
                        <h2 className="text-black font-bold text-2xl p-1 mb-2 dark:text-white">{user?.username}</h2>
                        <Button variant={"destructive"} size={"small"} className="" onClick={copyUrl}>
                            <span className="flex items-center"><FaShare className='mr-2' /> <p>Share</p></span>
                        </Button>

                        <hr className="mt-4 border-t border-gray-400" />
                    </div>
                    <div>
                        <h3 className="font-bold mt-4">ABOUT</h3>
                        <ol className="mt-2">
                            <li className='mt-2'>
                                <p className='font-bold'>Cake day </p>
                                <span className='flex items-center'> <FaBirthdayCake className='mr-2' /> <p>{formattedDate}</p></span>
                            </li>
                            {user?.username === userData?.username ?
                                <>
                                    <li className='mt-2'>
                                        <p className='font-bold'>Email</p>
                                        <p>{userData?.email}</p>
                                        {userData?.emailVerified ? (
                                            <div className='flex items-center'>
                                                <FaCheckCircle className='text-green-500 fas fa-heart mr-2' />
                                                <p className='text-green-500'>Verified</p>
                                            </div>
                                        ) : (
                                            <div className='flex items-center'>
                                                <FaRegCircleXmark className='text-red-600 fas fa-heart mr-2' />
                                                <p className='text-red-600'>Not verified</p>
                                            </div>
                                        )}
                                    </li></> : <></>}
                        </ol>
                        <hr className="mt-4 border-t border-gray-400" />
                    </div>
                    {user?.username === userData?.username ?
                        <>
                            <h3 className="font-bold mt-2">SETTINGS</h3>
                            <div className="flex space-x-2 mt-2 items-center justify-center">
                                <Link
                                    href="/setting"
                                    className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 border border-black w-full justify-center">
                                    Go to Setting
                                </Link>
                            </div>
                        </> : <>
                            {loadingCommunities ? <div className='justify-center items-center p-4 w-full'><Spinner className='w-4'></Spinner></div> : <>
                                {communitiesList.length > 0 ? <h3 className="font-bold mt-2">MODERATOR OF THESE COMMUNITIES</h3> : null}
                                {communitiesList.slice(0, showAllCommunities ? communitiesList.length : 3).map((community) => (
                                    <div key={community.id} className="flex items-center justify-between mt-2">
                                        <div className="flex items-center">
                                            <img
                                                src={community.logoUrl}
                                                alt={community.name}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <div className="ml-2 text-lg">
                                                r/{community.name}
                                            </div>
                                        </div>
                                        <Link href={`/r/${community.name}`}>
                                            <Button variant={"monochrome"} size={"small"}>
                                                View
                                            </Button>
                                        </Link>

                                    </div>
                                ))}
                                {communitiesList.length > 3 ? <>
                                    {!showAllCommunities && (
                                        <button onClick={handleShowMore}>See more...</button>
                                    )}
                                    {showAllCommunities && (<button onClick={() => setShowAllCommunities(false)}>See less...</button>)}
                                </> : null}
                                {communitiesList.length === 0 ? <h3 className="font-bold mt-2">No communities found</h3> : null}
                            </>}
                        </>}

                </div>
            </div >
        </aside >
    );
};

export default RightSidebar;
