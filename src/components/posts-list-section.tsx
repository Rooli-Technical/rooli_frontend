"use client";

import postService from "@/services/post.service";
import { useAppStore } from "@/store/app-store";
import { useQuery } from "@tanstack/react-query";
import { Card } from "./ui/card";

export default function PostsListSection() {
  const { lastWorkspace } = useAppStore();
  const { isLoading, data } = useQuery({
    queryKey: ["workspace-posts", lastWorkspace],
    enabled: !!lastWorkspace,
    queryFn: async () => {
      if (lastWorkspace) {
        const response = await postService.getWorkspacePosts(lastWorkspace, {
          page: 1,
          limit: 10,
        });
        return response.data;
      }
    },
    refetchOnWindowFocus: false,
    retry: 1,
    refetchOnMount: false,
  });

  console.log("🚀 ~ file: page.tsx:140 ~ data:", data);
  const allPosts = data?.data ?? [];
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {allPosts?.map((post: any) => (
        <Card className="p-0">
          <div className=""></div>
          <div key={post?.id} className="w-full">
            <h2>{post.content}</h2>
          </div>
        </Card>
      ))}
    </div>
  );
}
