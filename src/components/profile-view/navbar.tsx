import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC<{ userName: string, userData: any }> = ({ userName, userData }) => {
    const router = usePathname();

    const linkClass = (href: string) => {
        return `hover:text-white px-3 py-2 text-sm font-medium bg-gray-300 hover:bg-gray-500 rounded-2xl mr-5 ${router === href ? 'bg-gray-500 ' : ''}`;
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