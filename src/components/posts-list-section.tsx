"use client";

import { useState } from "react";
import postService from "@/services/post.service";
import { useAppStore } from "@/store/app-store";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { IconType } from "react-icons/lib";
import {
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { SocialPlatforms } from "@/types";
import moment from "moment";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { shortenText } from "@/lib/utils";

const contentTypes: Record<string, string> = {
  POST: "Post",
  REEL: "Reel",
  STORY: "Story",
  THREAD: "Thread",
};

export default function PostsListSection() {
  const { lastWorkspace } = useAppStore();
  const [page, setPage] = useState(1);

  const { isLoading, data, isRefetching } = useQuery({
    queryKey: ["workspace-posts", lastWorkspace, page],
    enabled: !!lastWorkspace,
    queryFn: async () => {
      if (lastWorkspace) {
        const response = await postService.getWorkspacePosts(lastWorkspace, {
          page,
          limit: 8,
        });
        return response.data;
      }
    },
    refetchOnWindowFocus: false,
    retry: 1,
    refetchOnMount: true,
  });

  const allPosts = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta?.lastPage ?? 1;
  return (
    <div className="space-y-8">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {!isLoading &&
          !isRefetching &&
          allPosts?.map((post: any) => (
            <Link key={post?.id} href={`/dashboard/content/${post?.id}`}>
              <Card className="p-0 overflow-hidden border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-full h-[200px] relative rounded-lg overflow-hidden">
                    {post?.media?.length !== 0 && (
                      <Image
                        src={post?.media[0]?.mediaFile?.url}
                        alt="media"
                        className="w-full h-full object-cover"
                        layout="fill"
                      />
                    )}
                  </div>
                  <div key={post?.id} className="w-full px-2 pt-2 pb-5">
                    <h2 className="line-clamp-1 font-semibold">
                      {shortenText(post.content, 30)}
                    </h2>
                    <h2 className="text-sm text-muted-foreground">
                      Content type: {contentTypes[post.contentType]}
                    </h2>
                    <div className="w-fit flex gap-2 px-1 py-1 rounded-md bg-accent/20 mt-1">
                      <p className="text-xs font-bold text-accent">
                        {post?.status}
                      </p>
                    </div>
                    <div className="w-full flex flex-wrap gap-2 mt-2">
                      {post?.destinations?.map(
                        (destination: {
                          id: string;
                          contentOverride: string;
                          postId: string;
                          profile: {
                            id: string;
                            name: string;
                            platform: SocialPlatforms;
                          };
                        }) => {
                          const PlatformIcon: IconType =
                            {
                              INSTAGRAM: FaInstagram,
                              TWITTER: FaXTwitter,
                              FACEBOOK: FaFacebook,
                              LINKEDIN: FaLinkedin,
                            }[destination?.profile?.platform] || FaInstagram;

                          return (
                            <div
                              key={destination?.id}
                              className="flex items-center gap-2 border border-border rounded-md px-2 py-1"
                            >
                              <PlatformIcon className="w-3 h-3" />
                              <p className="text-[10px] font-medium">
                                {destination?.profile?.platform}
                              </p>
                            </div>
                          );
                        },
                      )}
                    </div>
                    <div className="flex items-center justify-start gap-2 mt-2">
                      <h2 className="text-xs text-muted-foreground">
                        Release Date:{" "}
                        {moment(post?.scheduledAt).format("DD/MM/YYYY")}
                      </h2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

        {(isLoading || isRefetching) &&
          Array(8)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="w-full h-[300px]" />
            ))}
      </div>
      {/* 
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPage((prev) => Math.max(prev - 1, 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={page === 1 || isLoading || isRefetching}
          >
            <FaChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              Page {page} of {totalPages}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPage((prev) => Math.min(prev + 1, totalPages));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={page === totalPages || isLoading || isRefetching}
          >
            Next
            <FaChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )} */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 1));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          disabled={page === 1 || isLoading || isRefetching}
        >
          <FaChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPage((prev) => Math.min(prev + 1, totalPages));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          disabled={page === totalPages || isLoading || isRefetching}
        >
          Next
          <FaChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
