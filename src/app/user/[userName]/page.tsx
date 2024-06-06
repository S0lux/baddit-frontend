import LifetimePerformance from '@/src/components/profile-view/lifetimePerformance'
import Post_user from '@/src/components/profile-view/post_user'
import React from 'react'
import { FaAngleDoubleUp } from 'react-icons/fa'

export default function Home({ params }: { params: { userName: string } }) {
    return (
        <div className=''>
            <LifetimePerformance />
            <Post_user />
        </div>
    )
}
