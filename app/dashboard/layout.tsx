"use client";
import type React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { useState } from "react";
import OrganizationModal from "@/components/modals/organization-modal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [organizationModal, setOrganizationModal] = useState(false);
  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        toggleOrganizationModal={() => setOrganizationModal(!organizationModal)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          {children}
        </main>
      </div>

      <OrganizationModal
        open={organizationModal}
        setOpen={setOrganizationModal}
      />
    </div>
  );
}
