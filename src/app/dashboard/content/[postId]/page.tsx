"use client";

import useToast from "@/components/app-toast";
import BackButton from "@/components/back-button";
import DeleteModal from "@/components/modals/delete-modal";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProgressBarRouter } from "@/hooks/use-progress-bar-router";
import postService from "@/services/post.service";
import { useAppStore } from "@/store/app-store";
import { PostType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "iconsax-reactjs";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { lastWorkspace } = useAppStore();
  const { postId }: { postId: string } = useParams();
  const router = useProgressBarRouter();

  const showToast = useToast();
  const queryClient = useQueryClient();

  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["post-details", postId, lastWorkspace],
    enabled: !!postId && !!lastWorkspace,
    queryFn: async () => {
      if (lastWorkspace && postId) {
        const response = await postService.getPostById(lastWorkspace, postId);

        return response.data;
      }
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["delete-post", postId, lastWorkspace],
    mutationFn: async () => {
      if (lastWorkspace && postId) {
        const response = await postService.deletePost(lastWorkspace, postId);

        return response.data;
      }
    },
    onSuccess: () => {
      setLoading(true);
      router.back();
      setIsDeleting(false);
      queryClient.invalidateQueries({
        queryKey: ["workspace-posts", lastWorkspace],
      });
      showToast("Post deleted successfully", "success");
    },
    onError: (error: any) => {
      showToast(
        error?.response?.data?.message || "Failed to delete post",
        "error",
      );
    },
  });

  const postData: PostType | null = data?.data ?? null;

  if (isLoading || loading) {
    return (
      <div className=" min-h-[90dvh] overflow-hidden">
        <PageLoader className="bg-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6">
      <Card className="w-full max-w-5xl mx-auto overflow-hidden border-none bg-accent/5 shadow-2xl">
        <div className="flex items-center justify-between px-5">
          <BackButton />

          <Button
            variant={"destructive"}
            className=""
            onClick={() => setIsDeleting(true)}
          >
            <Trash /> Delete Post
          </Button>
        </div>
        <CardHeader className="border-b bg-accent/10">
          <CardTitle className="text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Post Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col gap-8">
            {/* Post Content */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-l-4 border-primary pl-3">
                Content
              </h2>
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 border border-border shadow-inner">
                <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap italic">
                  "{postData?.content || "No content available."}"
                </p>
              </div>
            </div>

            {/* Media Gallery */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-l-4 border-primary pl-3">
                Media Gallery
              </h2>
              {postData?.media && postData.media.length > 0 ? (
                <div className="flex w-full h-[500px] gap-3">
                  {postData.media.map((item) => (
                    <div
                      key={item.id}
                      className="relative flex-1 hover:flex-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-4xl group border-2 border-transparent hover:border-primary/30 shadow-xl"
                    >
                      <img
                        src={item.mediaFile.url}
                        alt="Media"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="text-white/60 text-xs font-medium uppercase tracking-widest">
                            Metadata
                          </span>
                          <h3 className="text-white text-lg font-bold">
                            Image {item.order}
                          </h3>
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded bg-white/20 text-white text-[10px] uppercase">
                              {item.mediaFile.mimeType.split("/")[1] + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-40 flex flex-col items-center justify-center rounded-3xl bg-accent/5 border-2 border-dashed border-border transition-colors hover:bg-accent/10">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <svg
                      className="w-6 h-6 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    No media found for this post
                  </p>
                </div>
              )}
            </div>

            {/* Post Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div className="group">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2 px-1">
                  Status
                </span>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-border group-hover:border-primary/20 transition-all">
                  <div
                    className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)] ${
                      postData?.status === "PUBLISHED"
                        ? "bg-emerald-500 shadow-emerald-500/40"
                        : postData?.status === "SCHEDULED"
                          ? "bg-amber-500 shadow-amber-500/40"
                          : "bg-slate-400"
                    }`}
                  />
                  <span className="font-bold text-foreground/80">
                    {postData?.status}
                  </span>
                </div>
              </div>

              <div className="group">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2 px-1">
                  Type
                </span>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-border group-hover:border-primary/20 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </div>
                  <span className="font-bold text-foreground/80">
                    {postData?.contentType}
                  </span>
                </div>
              </div>

              <div className="group">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2 px-1">
                  Platform
                </span>
                <div className="flex flex-wrap gap-2">
                  {postData?.destinations?.map((dest) => (
                    <div
                      key={dest.id}
                      className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/20 text-primary text-xs font-bold uppercase tracking-tighter"
                    >
                      {dest.profile.platform}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isDeleting && (
        <DeleteModal
          open={isDeleting}
          onClose={() => setIsDeleting(false)}
          title="Delete Post"
          description="Are you sure you want to delete this post?"
          onConfirm={() => {
            mutateAsync();
          }}
          isLoading={isPending}
        />
      )}
    </div>
  );
}
