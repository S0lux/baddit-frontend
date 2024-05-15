import Post_user from '@/src/components/profile-view/post_user'
import React from 'react'
import { FaAngleDoubleUp } from 'react-icons/fa'

export default function Home({ params }: { params: { userName: string } }) {
    return (
        <div className=''>
            <Post_user />

            <h1>Lifetime Performance</h1>

            <div className='flex items-start justify-start'>
                <div className='flex h-16 w-32 bg-white border-solid border-2 rounded-xl justify-center items-center'>
                    <FaAngleDoubleUp className='w-5 h-5 mr-2' />
                    <p>Upvote Rate</p>
                </div>
                <div className='flex h-16 w-32 bg-white border-solid border-2 rounded-xl justify-center items-center'>
                    <FaAngleDoubleUp className='w-5 h-5 mr-2' />
                    <p>Upvote Rate</p>
                </div>
                <div className='flex h-16 w-32 bg-white border-solid border-2 rounded-xl justify-center items-center'>
                    <FaAngleDoubleUp className='w-5 h-5 mr-2' />
                    <p>Upvote Rate</p>
                </div>
            </div>
        </div>
    )
}
