"use client";
import useToast from "@/components/app-toast";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useProgressBarRouter } from "@/hooks/use-progress-bar-router";
import workSpaceService from "@/services/workspace.service";
import { useAppStore } from "@/store/app-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
} from "react-icons/fa6";

function Page() {
  const showToast = useToast();
  const router = useProgressBarRouter();
  const queryClient = useQueryClient();
  const userProfile: any = queryClient.getQueryData(["user-profile"]);

  const { platform, setPlatform } = useAppStore();

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const oauth_verifier = searchParams.get("oauth_verifier");
  const oauth_token = searchParams.get("oauth_token");

  const [status, setStatus] = useState<
    "LOADING" | "ERROR" | "SUCCESS" | "SELECTIDS"
  >("LOADING");
  const [isMounted, setIsMounted] = useState(false);
  const [platformPages, setPlatformPages] = useState<
    {
      id: string;
      name: string;
      type: string;
      username: string;
      platform: string;
    }[]
  >([]);
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { isPending: isVerifying, mutateAsync } = useMutation({
    mutationKey: ["verify-connection"],
    mutationFn: async (data: {
      platform: "TWITTER" | "INSTAGRAM" | "FACEBOOK" | "LINKEDIN";
      code?: string;
      state?: string;
      oauth_verifier?: string;
      oauth_token?: string;
    }) => {
      const response = workSpaceService.connectedSocialsVerification({
        platform: data.platform as
          | "TWITTER"
          | "INSTAGRAM"
          | "FACEBOOK"
          | "LINKEDIN",
        data: {
          code: data.code,
          state: data.state,
          oauth_verifier: data.oauth_verifier,
          oauth_token: data.oauth_token,
        },
      });

      return response;
    },
    onSuccess: (socialData) => {
      console.log("🚀 ~ file: page.tsx:74 ~ socialData:", socialData);
      const { connectionId, availablePages } = socialData;
      console.log("🚀 ~ file: page.tsx:76 ~ availablePages:", availablePages);
      const items: {
        id: string;
        name: string;
        type: string;
        username: string;
        platform: string;
      }[] = [];

      availablePages.forEach((page: any) => {
        items.push({
          id: page.id,
          name: page.name,
          type: page.type,
          username: page.username,
          platform: page.platform,
        });
      });

      setStatus("SELECTIDS");
      setConnectionId(connectionId);
      setPlatformPages(items);
    },
    onError: () => {
      setStatus("ERROR");

      showToast(
        "Something went wrong with verification, please try again.",
        "error"
      );
    },
  });

  const { isPending, mutateAsync: addBulkSocialAccounts } = useMutation({
    mutationKey: ["add-bulk-social-accounts"],
    mutationFn: async () => {
      await workSpaceService.addBulkSocialAccounts(
        userProfile?.result?.lastActiveWorkspace,
        {
          connectionId: connectionId!,
          platform: platform as
            | "TWITTER"
            | "INSTAGRAM"
            | "FACEBOOK"
            | "LINKEDIN",
          platformIds: platformPages.map((page) => page.id),
        }
      );
    },
    onSuccess: () => {
      setStatus("SUCCESS");

      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["workspaces", userProfile?.result?.lastActiveWorkspace],
      });

      router.push("/dashboard/social-accounts");
      showToast(
        "Social accounts added successfully, you will be redirected shortly.",
        "success"
      );
    },
    onError: () => {
      setStatus("ERROR");

      showToast(
        "Something went wrong with adding social accounts, please try again.",
        "error"
      );
    },
  });

  useEffect(() => {
    if (isMounted) {
      mutateAsync({
        platform: platform as "TWITTER" | "INSTAGRAM" | "FACEBOOK" | "LINKEDIN",
        code: code || "",
        state: state || "",
        oauth_verifier: oauth_verifier || "",
        oauth_token: oauth_token || "",
      });
    }
  }, [isMounted, platform]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col items-center justify-center space-y-4">
        {status === "LOADING" && <Spinner className="h-8 w-8" />}
        <h2 className="text-2xl font-bold">
          {status === "SUCCESS" && "Social Account Connected"}
          {status === "ERROR" && "Something went wrong"}
          {status === "LOADING" && "One moment please..."}
          {status === "SELECTIDS" && "Social Account Connected"}
        </h2>
        <p className="text-muted-foreground text-center font-">
          {status === "SUCCESS" &&
            "Your social account has been successfully connected. You will be redirected shortly."}
          {status === "ERROR" &&
            "Something went wrong with verification, please try again."}
          {status === "LOADING" &&
            "We are verifying your social account, please wait..."}
          {status === "SELECTIDS" &&
            "Please select the pages you want to connect."}
        </p>

        <div className="w-full max-w-[450px] space-y-2">
          {!isVerifying &&
            platformPages?.length !== 0 &&
            platformPages.map((page) => {
              const PlatformIcon =
                {
                  INSTAGRAM: FaInstagram,
                  TWITTER: FaXTwitter,
                  FACEBOOK: FaFacebook,
                  LINKEDIN: FaLinkedin,
                }[page.platform] || FaInstagram;

              return (
                <div key={page.id} className="flex items-center space-x-2">
                  <PlatformIcon className="h-5 w-5" />
                  <div className="flex items-center justify-between space-x-2 w-full">
                    <div>
                      <p className="font-semibold text-sm">{page.name}</p>
                      <p className="text-muted-foreground text-base">
                        {page.username}
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={selectedIds.includes(page.id)}
                      onChange={() => {
                        if (selectedIds.includes(page.id)) {
                          setSelectedIds(
                            selectedIds.filter((id) => id !== page.id)
                          );
                        } else {
                          setSelectedIds([...selectedIds, page.id]);
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <Button
          disabled={
            isPending || status === "LOADING" || selectedIds.length === 0
          }
          onClick={() => {
            addBulkSocialAccounts();
          }}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
