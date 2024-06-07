"use client";
import PostCard from '@/src/components/post/post-card';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import Spinner from '@/src/components/spinner/spinner';
import Image from 'next/image';
import CommunityCard from './community-card';


const fetchCommunities = async (cursor = '') => {
    const response = await axios.get(`https://api.baddit.life/v1/communities?cursor=${cursor}`);
    return response.data;
};

const InfiniteSubbaddit = () => {
    const [communities, setCommunities] = useState<any[]>([]);
    const [cursor, setCursor] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreCommunity = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const data = await fetchCommunities(cursor);
        setCommunities((prevCommunities) => {
            const newCommunities = data.filter((community: any) => !prevCommunities.some(prevCommunities => prevCommunities.id === community.id));
            return [...prevCommunities, ...newCommunities];
        });
        setCursor(data[data.length - 1]?.id);
        setHasMore(data.length === 10);
        setLoading(false);
    };

    useEffect(() => {
        loadMoreCommunity();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 25) {
                loadMoreCommunity();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [cursor, loading, hasMore]);

    if (communities.length > 0) {
        return (
            <div>
                <div className='container'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-full gap-x-6 gap-y-6 px-8'>
                        {communities.map((community) => (
                            <CommunityCard key={community.id} community={community} />
                        ))}
                    </div>
                </div>
                {loading && <><Spinner className='mx-auto -mt-28 size-20' /></>}
                {!hasMore && (
                    <div className="text-center py-5 text-gray-600 text-lg dark:text-white">
                        <p>That's all best of baddit!!!!</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center justify-center text-center'>
            <Image src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png" alt="Empty" width={120} height={189} />
            <p>Create your whole world</p>
        </div>);
};

export default InfiniteSubbaddit;

