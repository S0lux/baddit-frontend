import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaAngleDown, FaWrench } from 'react-icons/fa';
import Navbar from '@/src/components/profile-view/navbar';
import { useAuthStore } from '../../store/authStore';
import { useParams, useRouter } from "next/navigation"

const Avatar: React.FC<{ src: string; alt: string; user: any }> = ({ src, alt, user }) => {
    const { userData } = useAuthStore();

    return (
        <div className="p-4 z-0">
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
                    {user?.username === userData?.username ?
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

const Header: React.FC<{ userName: string, user: any }> = ({ userName, user }) => {
    return (
        <div className="p-2">
            <div className="flex items-center justify-start w-full">
                {user && (
                    <>
                        <Avatar src={user?.avatarUrl} alt={`User ${user?.username}`} user={user} />
                        <div className="ml-4">
                            <p className="text-2xl font-bold m-0">{user?.username}</p>
                            <p className="m-0 text-base">u/{user?.username}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default function Top({ userName, user }: { userName: string, user: any }) {
    const { userData } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const [sortOption, setSortOption] = useState('new');
    const router = useRouter();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleSortChange = (sortOption: string) => {
        router.push(`/user/${userName}?sort=${sortOption}`);
        setSortOption(sortOption);
        closeDropdown();
    };

    return (
        <div className="p-2">
            <Header userName={userName} user={user} />
            <Navbar userName={userName} />
            <div className="p-2 flex">
                {user?.username === userData?.username ? (
                    <Link
                        href={`/user/${userName}/submit`}
                        className="flex items-center px-4 py-2 h-9 bg-white rounded-full shadow-sm text-l font-medium text-gray-700 hover:bg-gray-200 border border-black w-fit justify-center"
                    >
                        + Create Post
                    </Link>
                ) : null}
                <div className='pl-4'>
                    <div className="relative inline-block">
                        <button
                            className="px-4 py-2 font-medium rounded-full text-sm inline-flex items-center hover:bg-gray-200"
                            onClick={toggleDropdown}
                        >
                            {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)} <FaAngleDown className='pl-2' size={20} />
                        </button>

                        {isOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-24 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <p className="px-4 py-2 font-semibold text-gray-700">Sort by</p>
                                <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <li>
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleSortChange('hot')}
                                        >
                                            Hot
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleSortChange('new')}
                                        >
                                            New
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleSortChange('top')}
                                        >
                                            Top
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <hr className="mt-2 border-t border-gray-400" />
        </div>
    );
}