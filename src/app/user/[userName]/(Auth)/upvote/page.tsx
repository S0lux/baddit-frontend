"use client";
import InfinitePost from "@/src/components/profile-view/post_user";
import Upvote from "@/src/components/profile-view/upvote";
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
            <Upvote />
        </div>;
    }
}
