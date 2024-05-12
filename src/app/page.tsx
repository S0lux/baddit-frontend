import DefaultLayout from "../components/dashboard/dashboard-layout/layout";
import CommunityHome from "./r/page";
import React from "react";

export default function Home() {
  return (
    <DefaultLayout>
      <CommunityHome />
    </DefaultLayout>
  );
}
