"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import workSpaceService from "@/services/workspace.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SocialAccountProps } from "@/types";
import SocialsItem from "@/components/dashboard/socials-item";
import useToast from "@/components/app-toast";
import { useAppStore } from "@/store/app-store";

export default function SocialAccountsPage() {
  const queryClient = useQueryClient();
  const userProfile: any = queryClient.getQueryData(["user-profile"]);

  const showToast = useToast();
  const { setPlatform } = useAppStore();

  const { isLoading, data: connectedSocials } = useQuery({
    queryKey: ["workspaces", userProfile?.result?.lastActiveWorkspace],
    queryFn: async () => {
      const response = await workSpaceService.getWorkSpaceSocials(
        userProfile?.result?.lastActiveWorkspace
      );

      return response?.data;
    },
    enabled: !!userProfile?.result?.lastActiveWorkspace,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: connectSocialAccount, isPending: connectingAccount } =
    useMutation({
      mutationFn: async (payload: {
        platform: "TWITTER" | "INSTAGRAM" | "FACEBOOK" | "LINKEDIN";
        organizationId: string;
      }) => {
        setPlatform(payload.platform);
        const response = await workSpaceService.connectSocialAccount(payload);

        return response?.data;
      },
      onSuccess: (data) => {
        const { url } = data;
        showToast(
          "You will be redirected to connect your social account",
          "success"
        );
        window.open(url, "_blank");
      },
      onError: (error: any) => {
        const errorMsg =
          error?.response?.data?.message || "Something went wrong";
        showToast(errorMsg, "error");
        setPlatform(null);
      },
    });

  const userSocials: SocialAccountProps[] = useMemo(() => {
    if (!isLoading) {
      if (!userProfile?.result?.lastActiveWorkspace) return [];

      const allowedPlatforms: string[] =
        userProfile?.result?.allowedPlatforms || [];

      if (allowedPlatforms?.length === 0) return [];

      const socials: SocialAccountProps[] = [];

      allowedPlatforms.forEach((platform) => {
        if (connectedSocials?.length === 0) {
          socials.push({
            platform,
            connected: false,
            username: "",
            followers: "",
            id: "",
          });
        }
        // const social = data?.result?.socialProfiles?.find(
        //   (social) => social.platform === platform
        // );
        // if (social) {
        //   socials.push({
        //     platform: social?.platform || "",
        //     connected: true,
        //     username: social?.username || "",
        //     followers: social?.followers || "",
        //     id: social?.id || "",
        //   });
        // }
      });

      return socials;
    }

    // const workspaceSocials = data?.result?.socialProfiles || [];

    return [];
  }, [userProfile, connectedSocials, isLoading]);

  console.log("🚀 ~ file: page.tsx:45 ~ userSocials:", userSocials);

  async function handleConnect(platform: string) {
    connectSocialAccount({
      platform: platform as "TWITTER" | "INSTAGRAM" | "FACEBOOK" | "LINKEDIN",
      organizationId: userProfile?.result?.organization?.id,
    });
  }

  return (
    <div>
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif">
            Connected Social Media Accounts
          </CardTitle>
          <CardDescription>
            Manage your connected social media platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          )}

          {!isLoading && userSocials?.length === 0 && (
            <div className="space-y-4 min-h-[250px] flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold text-center">
                No social accounts connected
              </h2>
              <p className="text-muted-foreground text-center">
                You are not permitted to connect social accounts, contact rooli
                support.
              </p>
              <Button>Contact support</Button>
            </div>
          )}

          {!isLoading && userSocials?.length !== 0 && (
            <div className=" space-y-5">
              {userSocials?.map((social, index) => (
                <SocialsItem
                  key={index}
                  item={social}
                  onConnect={() => handleConnect(social.platform)}
                  isLoading={connectingAccount}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
