"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import Top from "@/src/components/profile-view/top";
import RightSidebar from "@/src/components/profile-view/rightSidebar";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import Spinner from "@/src/components/spinner/spinner";

export default function Profile_View(params: { component: React.ReactNode }) {
  const { userName } = useParams<{ userName: string }>();
  const { userData } = useAuthStore();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (userData?.username !== userName) {
      axios
        .get(`https://api.baddit.life/v1/users/${userName}`)
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setUser(userData);
      setLoading(false);
    }
    console.log(user);
    console.log(userData);
  }, [userName, userData]);

  if (loading) {
    return (
      <div>
        <Spinner className="w-4" />
      </div>
    );
  }

  if (pathname.includes("/submit")) {
    return (
      <div className="flex items-center justify-center">{params.component}</div>
    );
  }
  if (pathname.includes("/post/")) {
    return (
      <div className="flex w-full items-start justify-start">
        {params.component}
      </div>
    );
  } else if (userData?.userName === userName) {
    return (
      <div>
        <main className="ml-16 flex">
          <div className="w-screen max-w-screen-md">
            <Top userName={userName} user={user} />
            <div className="flex w-full items-center justify-center">
              {params.component}
            </div>
          </div>
          <div className="mr-0 hidden lg:block">
            <RightSidebar user={user} />
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div>
        <main className="ml-16 flex">
          <div className="w-screen max-w-screen-md">
            <Top userName={userName} user={user} />
            <div className="flex w-full items-center justify-center">
              {params.component}
            </div>
          </div>
          <div className="mr-0 hidden lg:block ">
            <RightSidebar user={user} />
          </div>
        </main>
      </div>
    );
  }
}
