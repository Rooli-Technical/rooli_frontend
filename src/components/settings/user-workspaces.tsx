"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/store/app-store";
import useToast from "../app-toast";
import workSpaceService from "@/services/workspace.service";
import { Skeleton } from "../ui/skeleton";
import WorkspaceItem from "../workspace-item";
import { Button } from "../ui/button";
import { Add } from "iconsax-reactjs";
import CreateWorkspaceModal from "../modals/create-workspace-modal";
import DeleteWorkspaceModal from "../modals/delete-workspace-modal";
import SwitchWorkspaceModal from "../modals/switch-workspace-modal";
import { CreateWorkspacePayload } from "@/types";

interface Workspace {
  id: string;
  name: string;
  slug: string;
  socialProfiles: any[];
  createdAt: string;
}

export default function UserWorkspaces() {
  const showToast = useToast();
  const { lastWorkspace, setLastWorkspace } = useAppStore();
  const queryClient = useQueryClient();
  const userProfile: any = queryClient.getQueryData(["user-profile"]);

  const organizationMaxWorkspace =
    userProfile?.result?.organization?.subscription?.plan?.maxWorkspaces ?? 1;

  const [currentWorkspace, setCurrentWorkspace] = useState<string>(
    lastWorkspace ?? userProfile?.result?.lastActiveWorkspace ?? "",
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null,
  );

  const { isLoading, isRefetching, data } = useQuery({
    queryKey: ["organization-worspaces", userProfile?.result?.organization?.id],
    queryFn: async () => {
      const response = await workSpaceService.getAllOrganizationWorkspaces(
        userProfile?.result?.organization?.id,
      );

      return response.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!userProfile?.result?.organization?.id,
  });

  const { mutateAsync: createWorkspace, isPending: isCreating } = useMutation({
    mutationFn: async (payload: CreateWorkspacePayload) => {
      const response = await workSpaceService.createWorkspace(
        userProfile?.result?.organization?.id,
        payload,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "organization-worspaces",
          userProfile?.result?.organization?.id,
        ],
      });
      setIsCreateModalOpen(false);
      showToast("Workspace created successfully", "success");
    },
    onError: (error: any) => {
      showToast(
        error?.response?.data?.message || "Failed to create workspace",
        "error",
      );
    },
  });

  const { mutateAsync: deleteWorkspace, isPending: isDeleting } = useMutation({
    mutationFn: async (workspaceId: string) => {
      const response = await workSpaceService.deleteWorkspace(
        userProfile?.result?.organization?.id,
        workspaceId,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "organization-worspaces",
          userProfile?.result?.organization?.id,
        ],
      });
      setIsDeleteModalOpen(false);
      showToast("Workspace deleted successfully", "success");
    },
    onError: (error: any) => {
      showToast(
        error?.response?.data?.message || "Failed to delete workspace",
        "error",
      );
    },
  });

  const { isPending: isSwitching, mutateAsync: switchWorkspaceMutation } =
    useMutation({
      mutationFn: async (workspaceId: string) => {
        const payload = {
          orgId: userProfile?.result?.organization?.id,
          workSpaceId: workspaceId,
        };
        const response = await workSpaceService.switchWorkSpace(payload);
        return response.data;
      },
      onSuccess: (_, workspaceId) => {
        queryClient.invalidateQueries({
          queryKey: [
            "organization-worspaces",
            userProfile?.result?.organization?.id,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: ["user-profile"],
        });
        setLastWorkspace(workspaceId);
        setCurrentWorkspace(workspaceId);
        setIsSwitchModalOpen(false);
        showToast("Switched workspace successfully", "success");
      },
      onError: (error: any) => {
        showToast(
          error?.response?.data?.message || "Failed to switch workspace",
          "error",
        );
      },
    });

  const handleCreateWorkspace = async (values: { name: string }) => {
    if (data?.length >= organizationMaxWorkspace) {
      showToast(
        `You have reached the limit of ${organizationMaxWorkspace} workspaces for your plan.`,
        "error",
      );
      return;
    }

    const payload: CreateWorkspacePayload = {
      name: values.name,
      clientName: userProfile?.result?.organization?.name,
      clientStatus: "Active",
      clientContact: userProfile?.result?.email,
      clientColor: "#FF0000", // Default color
    };
    await createWorkspace(payload);
  };

  const handleDeleteWorkspace = async () => {
    if (selectedWorkspace) {
      await deleteWorkspace(selectedWorkspace.id);
    }
  };

  const handleSwitchWorkspace = async () => {
    if (selectedWorkspace) {
      await switchWorkspaceMutation(selectedWorkspace.id);
    }
  };

  const isLimitReached = data?.length >= organizationMaxWorkspace;

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-serif">Workspaces</CardTitle>
            <CardDescription>
              Manage your workspaces{" "}
              {isLimitReached && (
                <span className="text-destructive font-medium ml-2">
                  (Limit reached: {organizationMaxWorkspace})
                </span>
              )}
            </CardDescription>
          </div>
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={isLimitReached}
          >
            <Add size={18} />
            Create Workspace
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(isLoading || isRefetching) && (
            <>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="w-full h-24 rounded-md" />
                ))}
            </>
          )}

          {!isLoading &&
            !isRefetching &&
            data &&
            data?.map((workspace: Workspace) => (
              <WorkspaceItem
                key={workspace.id}
                workspace={workspace}
                currentWorkspace={currentWorkspace}
                toggleDeleteWorkspace={(id) => {
                  setSelectedWorkspace(workspace);
                  setIsDeleteModalOpen(true);
                }}
                toggleSwitchWorkspace={(id) => {
                  if (currentWorkspace !== id) {
                    setSelectedWorkspace(workspace);
                    setIsSwitchModalOpen(true);
                  }
                }}
                isDeletingWorkspace={
                  isDeleting && selectedWorkspace?.id === workspace.id
                }
                isSwitchingWorkspace={
                  isSwitching && selectedWorkspace?.id === workspace.id
                }
              />
            ))}
        </CardContent>
      </Card>

      <CreateWorkspaceModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateWorkspace}
        isLoading={isCreating}
      />

      <DeleteWorkspaceModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteWorkspace}
        isLoading={isDeleting}
        workspaceName={selectedWorkspace?.name || ""}
      />

      <SwitchWorkspaceModal
        open={isSwitchModalOpen}
        onClose={() => setIsSwitchModalOpen(false)}
        onConfirm={handleSwitchWorkspace}
        isLoading={isSwitching}
        workspaceName={selectedWorkspace?.name || ""}
      />
    </div>
  );
}
