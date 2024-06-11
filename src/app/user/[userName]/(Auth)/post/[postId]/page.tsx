import PostDetail from "@/src/app/r/[name]/[postId]/page";

export default function userPostDetail({
  params,
}: {
  params: { name: string; postId: string };
}) {
  return <PostDetail params={params}></PostDetail>;
}
