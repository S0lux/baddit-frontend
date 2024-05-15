"use client";
import React from 'react'

export default function Community_Picker() {

    const community = [
        { name: 'pesocommunity' },
        { name: 'locpino' },
        { name: 'peso' }
    ]

    return (
        <div>
            <div className='mb-4 w-full'>
                <select className="mt-2 w-48 h-10 flex items-center justify-center bg-gray-300 rounded-2xl">
                    {community.map((item) => (
                        <option key={item.name} value={item.name}>/r {item.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
