"use client";
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Community_Picker() {
    const router = useRouter();
    const { name } = useParams();
    const [selectedCommunity, setSelectedCommunity] = useState('');
    const searchParams = useSearchParams();

    const community = [
        { name: 'pesocommunity' },
        { name: 'locpino' },
        { name: 'peso' }
    ]

    const handleChange = (event: any) => {
        const selectedName = event.target.value;
        setSelectedCommunity(selectedName);
        router.push(`/r/${selectedName}/submit?type=${searchParams.get('type')}`);
    };

    useEffect(() => {
        // Initialize selected community from URL parameters
        setSelectedCommunity(name.toString());
    }, [searchParams]);


    return (
        <div>
            <div className='mb-4 w-full'>
                <select className=" p-2 mt-2 w-48 h-10 flex items-center justify-center bg-gray-300 rounded-2xl"
                    value={selectedCommunity}
                    onChange={handleChange}>
                    {community.map((item) => (
                        <option key={item.name} value={item.name}>/r {item.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}