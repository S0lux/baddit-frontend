import React from 'react';
import Profile_View from '@/src/components/profile-view/profile-view'
import DefaultLayout from '@/src/layout/default-layout/layout';
import { Divider } from '@/src/layout/components/sidebar';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DefaultLayout>
            <Profile_View component={<div className='w-full'>{children}</div>} />
        </DefaultLayout>
    )
}