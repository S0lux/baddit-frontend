import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../button/button';

const CommunityNavbar: React.FC<{ name: string }> = ({ name }) => {
    const router = usePathname();
    const { userData } = useAuthStore();

    const linkClass = (href: string) => {
        return `px-3 py-2 text-l font-medium  no-underline hover:underline rounded-2xl mr-5 ${router === href ? 'bg-gray-500 text-white' : ''}`;
    };

    return (
        <nav className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex gap-x-6">
                        <Link href={`/r/${name}/posts`} className={linkClass(`/r/${name}/posts`)}>Posts</Link>
                        <Link href={`/r/${name}/members`} className={linkClass(`/r/${name}/members`)}>Members</Link>
                        <Button
                            size={"small"}
                        >Posts</Button>
                        <Button
                            size={"small"}
                        >Members</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default CommunityNavbar;