import LifetimePerformance from '@/src/components/profile-view/lifetimePerformance'
import InfinitePost from '@/src/components/profile-view/post_user'
import React from 'react'

export default function Home({ params }: { params: { userName: string } }) {
    return (
        <div className=''>
            <LifetimePerformance />
            <InfinitePost />
        </div>
    )
}
