import React from 'react';
import Profile_View from '@/src/components/profile-view/profile-view'
import DefaultLayout from '@/src/layout/default-layout/layout';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DefaultLayout>
            <div className="h-[10000px]">
                <Profile_View component={children} />
            </div>
        </DefaultLayout>
    )
}