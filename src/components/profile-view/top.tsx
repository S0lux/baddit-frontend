import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWrench } from 'react-icons/fa';
import Navbar from '@/src/components/profile-view/navbar';


const Avatar: React.FC<{ src: string; alt: string; userName: string, userData: any }> = ({ src, alt, userName, userData }) => {
    return (
        <div className="p-4">
            <div className="flex items-center flex-shrink-0 pr-md relative w-16 h-16">
                <Image
                    src={src}
                    alt={alt}
                    width={64}
                    height={64}
                    className="absolute block m-0 rounded-full border-2 border-solid overflow-hidden object-cover aspect-square"
                    objectFit="cover"
                />

                <div className="absolute bottom-0 right-0 ">
                    {userName === userData?.username ?
                        <Link aria-label="Edit profile avatar" className="px-[var(--rem6)] items-center justify-center inline-flex " href="/setting">
                            <div className="flex items-center justify-center rounded-full border-2 border-solid bg-gray-300">
                                <div className="flex items-center justify-center w-5 h-5">
                                    <FaWrench size={12} />
                                </div>
                            </div>
                        </Link> : <></>}
                </div>
            </div>
        </div>
    );
}

const Header: React.FC<{ userName: string, userData: any }> = ({ userName, userData }) => {
    return (
        <div className="p-4">
            <div className="flex items-center justify-start w-full">
                {userData && (
                    <>
                        <Avatar src={userData?.avatarUrl} alt={`User ${userData?.username}`} userName={userName} userData={userData} />
                        <div className="ml-4">
                            <p className="text-2xl font-bold m-0">{userData?.username}</p>
                            <p className="m-0 text-base">u/{userData?.username}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};



export default function Top({ userName, userData }: { userName: string, userData: any }) {

    return (
        <div className="p-4">
            <Header userName={userName} userData={userData} />
            <Navbar userName={userName} userData={userData} />
            <div className="p-4">
                <Link
                    href="/create_post"
                    className="flex items-center px-4 py-2 h-12 bg-white rounded-full shadow-sm text-xl font-medium text-gray-700 hover:bg-gray-200 border border-black w-full justify-center ">
                    + Create Post
                </Link>
            </div>
            <hr className="mt-4 border-t border-gray-400" />
        </div>
    );
}
