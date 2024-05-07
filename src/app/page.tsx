import PostList from "../components/post/post-list";
import DashboardLayout from "../components/dashboard/dashboard-layout/layout";

export default function Home() {
  return (
    <div className="h-screen ">
      <DashboardLayout>
        <PostList />
      </DashboardLayout>
    </div>
  );
}
