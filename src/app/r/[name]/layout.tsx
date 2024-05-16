import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function CommunityDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            {children}
        </>
    );
}