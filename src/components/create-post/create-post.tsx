"use client";
import { Button } from '@/src/components/button/button'
import CommunityPicker from '@/src/components/create-post/community_picker'
import ImagePost from '@/src/components/create-post/imagePost';
import LinkPost from '@/src/components/create-post/linkPost';
import TextPost from '@/src/components/create-post/textPost';
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function Create_Post() {
    const [title, setTitle] = useState('')
    const [postType, setPostType] = useState('text');
    const router = useRouter()
    const name = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const styleClass = (type: string) => {
        return `hover:text-white px-3 py-2 hover:bg-gray-500 rounded-2xl mr-2 ${postType === type ? 'underline ' : ''}`;
    };


    const renderForm = () => {
        switch (postType) {
            case 'text':
                return (
                    <TextPost />
                );
            case 'image':
                return (
                    <ImagePost />
                );
            case 'link':
                return (
                    <LinkPost />
                );
            default:
                return <TextPost />;

        }
    }

    const handlePostTypeChange = (type: string) => {
        router.push(name + '?' + createQueryString('type', type.toUpperCase()));
        setPostType(type);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    return (
        <div className='mt-4 w-fit min-w-full items-center'>
            <div>
                <h1 className='text-2xl font-bold mb-4'>Create Post</h1>
            </div>
            <div>
                <textarea
                    placeholder='Title'
                    className='w-full h-full border border-gray-300 rounded-md p-4'
                    value={title}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleTitleChange(event)}
                    maxLength={300}
                    rows={1}
                />
                <div className='flex justify-end items-end'>
                    <p className='text-right'>{title.length}/300</p>
                </div>

            </div>
            <CommunityPicker />
            <div className="flex space-x-4 mt-4">
                <button className={styleClass('text')}
                    onClick={() => handlePostTypeChange('text')}
                >
                    Text
                </button>
                <button className={styleClass('image')}
                    onClick={() => handlePostTypeChange('image')}
                >
                    Image
                </button>
                <button className={styleClass('link')}
                    onClick={() => handlePostTypeChange('link')}
                >
                    Link
                </button>
            </div>

            <div className='min-w-full'>
                {renderForm()}
            </div>

            <div className='mt-4 flex justify-end items-end'>
                <Button className='w-20' size={'small'} variant={'secondary'}>
                    Post
                </Button>
            </div>
        </div>
    )
}
