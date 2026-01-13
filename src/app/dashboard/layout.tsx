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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showToast = useToast();
  const router = useProgressBarRouter();
  const [organizationModal, setOrganizationModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await authService.getUserProfile();

      return response.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
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
    }
  }, [isLoading, userProfile]);

  if (isLoading) return <PageLoader />;

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full">
        <AppSidebar
          toggleOrganizationModal={() =>
            setOrganizationModal(!organizationModal)
          }
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
        />

        <LogoutModal open={logoutModal} setOpen={setLogoutModal} />
      </div>
    </SidebarProvider>
  );
}
