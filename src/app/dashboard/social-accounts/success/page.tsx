"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useProgressBarRouter } from "@/hooks/use-progress-bar-router";
import workSpaceService from "@/services/workspace.service";
import { useAppStore } from "@/store/app-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Page() {
  const router = useProgressBarRouter();
  const queryClient = useQueryClient();
  const userProfile: any = queryClient.getQueryData(["user-profile"]);
  const searchParams = useSearchParams();
  const { platform, setPlatform } = useAppStore();

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const oauth_verifier = searchParams.get("oauth_verifier");
  const oauth_token = searchParams.get("oauth_token");

  const [status, setStatus] = useState<"LOADING" | "ERROR" | "SUCCESS">(
    "LOADING"
  );
  const [isMounted, setIsMounted] = useState(false);

  const { mutateAsync } = useMutation({
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
    onSuccess: () => {
      setStatus("SUCCESS");
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["workspaces", userProfile?.result?.lastActiveWorkspace],
      });

      router.push("/dashboard/social-accounts");
      setPlatform(null);
    },
    onError: () => {
      setStatus("ERROR");
      setPlatform(null);
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
  }, [isMounted]);

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
        </h2>
        <p className="text-muted-foreground">
          {status === "SUCCESS" &&
            "Your social account has been successfully connected. You will be redirected shortly."}
          {status === "ERROR" &&
            "Something went wrong with verification, please try again."}
          {status === "LOADING" &&
            "We are verifying your social account, please wait..."}
        </p>
        {status === "ERROR" && (
          <Button onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />;
    </Suspense>
  );
}
