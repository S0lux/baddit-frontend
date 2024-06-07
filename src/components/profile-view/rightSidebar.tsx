import React from 'react';
import { FaCamera } from 'react-icons/fa';
import { Button } from '@/src/components/button/button';
import { FaBirthdayCake, FaShare, FaPlus, FaCheckCircle } from 'react-icons/fa';
import { FaRegCircleXmark } from "react-icons/fa6";
import Link from 'next/link';
import { useAuthStore } from '@/src/store/authStore';

const RightSidebar: React.FC<{ user: any }> = ({ user }) => {

    const { userData } = useAuthStore();

    const formattedDate = new Date(user?.registeredAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <aside className="ml-8 mt-3 flex mr-1">
            <div className="bg-gray-300 rounded-2xl w-80">
                {user?.username === userData?.username ?
                    <><div className="bg-pink-300 top-0 rounded-t-2xl flex justify-end items-end h-28 p-4">
                        <a
                            aria-label="Edit profile avatar"
                            className=""
                            href="/setting">
                            <div className="right-0 flex items-end justify-center rounded-full border-2 border-solid bg-gray-300">
                                <div className="flex items-center justify-center w-10 h-10">
                                    <FaCamera />
                                </div>
                            </div>
                        </a>
                    </div></> : <></>}
                <div className="p-4 h-fit">
                    <div>
                        <h2 className="text-black font-bold text-2xl p-1 mb-2">{user?.username}</h2>
                        {user?.username === userData?.username ?
                            <>
                                <Button variant={"destructive"} size={"small"} className="">
                                    <span className="flex items-center"><FaShare className='mr-2' /> <p>Share</p></span>
                                </Button></> : <>
                                <Button variant={"monochrome"} size={"small"} className="">
                                    <span className="flex items-center"><FaPlus className='mr-2' /> <p>Follow</p></span>
                                </Button>
                            </>}

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
                            <h3 className="font-bold mt-2">MODERATOR OF THESE COMMUNITIES</h3>
                            <div className="flex space-x-2 mt-2 items-center justify-center">
                                <div className="flex items-center">
                                    <img
                                        src={'https://placehold.co/100x100/pink/white?text=logo'}
                                        className="size-8 rounded-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <div className="text-l mr-5">
                                        r/ communityName
                                    </div>
                                </div>
                                <Button className='' variant={"monochrome"} size={"small"}>
                                    Join
                                </Button>
                            </div>
                        </>}

                </div>
            </div >
        </aside>
    );
};

export default RightSidebar;
