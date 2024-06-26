import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC<{ userName: string }> = ({ userName }) => {
    const router = usePathname();
    const { userData } = useAuthStore();

    const linkClass = (href: string) => {
        return `px-3 py-2 text-l font-medium  no-underline hover:underline rounded-2xl mr-5 ${router === href ? 'bg-gray-500 text-white dark:text-black dark:bg-white' : ''}`;
    };

    return (
        <nav className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex">
                        <Link href={`/user/${userName}`} className={linkClass(`/user/${userName}`)}>Overview</Link>
                        <Link href={`/user/${userName}/post`} className={linkClass(`/user/${userName}/post`)}>Posts</Link>
                        <Link href={`/user/${userName}/comments`} className={linkClass(`/user/${userName}/comments`)}>Comments</Link>
                        {userName === userData?.username ?
                            <>
                                <Link href={`/user/${userName}/upvote`} className={linkClass(`/user/${userName}/upvote`)}>Upvote</Link>
                                <Link href={`/user/${userName}/downvote`} className={linkClass(`/user/${userName}/downvote`)}>Downvote</Link></>
                            : <></>}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;