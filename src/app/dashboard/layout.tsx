"use client";
import type React from "react";
import { Header } from "@/components/dashboard/header";
import { useEffect, useState } from "react";
import OrganizationModal from "@/components/modals/organization-modal";
import { useQuery } from "@tanstack/react-query";
import authService from "@/services/auth.service";
import PageLoader from "@/components/page-loader";
import { useProgressBarRouter } from "@/hooks/use-progress-bar-router";
import useToast from "@/components/app-toast";
import LogoutModal from "@/components/modals/logout-modal";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import workSpaceService from "@/services/workspace.service";
import { useAppStore } from "@/store/app-store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showToast = useToast();
  const router = useProgressBarRouter();
  const [organizationModal, setOrganizationModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { setLastWorkspace, lastWorkspace } = useAppStore();

  const {
    data: userProfile,
    isLoading,
    refetch: refetchUserProfile,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await authService.getUserProfile();

      return response.data;
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: workspaceLoading,
    data: workspaceDetails,
    refetch: refetchWorkspaceDetails,
  } = useQuery({
    queryKey: [
      "workspace-details",
      lastWorkspace,
      userProfile?.result?.organization?.id,
    ],
    queryFn: async () => {
      const response = await workSpaceService.getWorkSpaceById(
        userProfile?.result?.organization?.id,
        lastWorkspace || ""
      );

      return response.data;
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!userProfile?.result?.lastActiveWorkspace && !!lastWorkspace,
  });

  useEffect(() => {
    if (!isLoading && userProfile) {
      if (!userProfile?.result?.isOnboardingComplete) {
        showToast("Please complete onboarding", "warning");
        router.push("/auth/onboarding");
        return;
      }

      if (userProfile?.subscriptionStatus === "inactive") {
        showToast(
          "Please complete payment to have access to dashboard.",
          "warning"
        );
        router.replace("/payment-plans");
        return;
      }

      setLastWorkspace(userProfile?.result?.lastActiveWorkspace);
    }
  }, [isLoading, userProfile]);

  function hardRefetch() {
    refetchUserProfile();
    refetchWorkspaceDetails();
  }

  if (isLoading || workspaceLoading) return <PageLoader />;

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full">
        <AppSidebar
          toggleOrganizationModal={() =>
            setOrganizationModal(!organizationModal)
          }
          currentWorkspace={workspaceDetails ?? null}
        />

        <div className=" w-full flex flex-col overflow-hidden">
          <Header
            toggleLogoutModal={() => setLogoutModal(!logoutModal)}
            userData={userProfile}
          />
          <main className="flex-1 overflow-y-auto bg-muted/30 p-5">
            {children}
          </main>
        </div>

        <OrganizationModal
          open={organizationModal}
          setOpen={setOrganizationModal}
          hardRefetch={hardRefetch}
        />

        <LogoutModal open={logoutModal} setOpen={setLogoutModal} />
      </div>
    </SidebarProvider>
  );
}
