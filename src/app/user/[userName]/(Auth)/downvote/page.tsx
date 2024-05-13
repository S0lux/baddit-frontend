"use client";
import Downvote from "@/src/components/profile-view/downvote";
import { useAuthStore } from "@/src/store/authStore";
import { useParams } from "next/navigation";

export default function Home() {
    const { userName } = useParams<{ userName: string }>();
    const { userData } = useAuthStore();
    if (userData?.username !== userName) {
        return <div>Not authorized</div>;
    }
    else {
        return <div>
            <Downvote />
        </div>;
    }
}
