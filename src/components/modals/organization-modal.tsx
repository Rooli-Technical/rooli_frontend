"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import workSpaceService from "@/services/workspace.service";
import { Spinner } from "../ui/spinner";
import { useAppStore } from "@/store/app-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CreateWorkspacePayload } from "@/types";
import useToast from "../app-toast";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function OrganizationModal({
  open,
  setOpen,
  hardRefetch,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  hardRefetch: () => void;
}) {
  const showToast = useToast();
  const { lastWorkspace, setLastWorkspace } = useAppStore();
  const queryClient = useQueryClient();
  const userProfile: any = queryClient.getQueryData(["user-profile"]);
  const [currentWorkspace, setCurrentWorkspace] = useState<string>(
    lastWorkspace ?? userProfile?.result?.lastActiveWorkspace ?? ""
  );

  const [currentTab, setCurrentTab] = useState<"WORKSPACE" | "CREATE">(
    "WORKSPACE"
  );

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const watchName = form.watch("name");

  const { isLoading, data } = useQuery({
    queryKey: ["organization-worspaces", userProfile?.result?.organization?.id],
    queryFn: async () => {
      const response = await workSpaceService.getAllOrganizationWorkspaces(
        userProfile?.result?.organization?.id
      );

      return response.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!userProfile?.result?.organization?.id && !!open,
  });

  const { mutateAsync: createWorkspace, isPending } = useMutation({
    mutationFn: async (payload: CreateWorkspacePayload) => {
      const response = await workSpaceService.createWorkspace(
        userProfile?.result?.organization?.id,
        payload
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
      setCurrentTab("WORKSPACE");
      showToast("Workspace created successfully", "success");
    },
    onError: (error: any) => {
      showToast(
        error?.response?.data?.message || "Failed to create workspace",
        "error"
      );
    },
  });

  async function onSubmit(payload: FormSchema) {
    const userPayload: CreateWorkspacePayload = {
      name: payload.name,
      clientName: userProfile?.result?.organization?.name,
      clientStatus: "Active",
      clientContact: userProfile?.result?.email,
      clientColor: "#FF0000",
    };
    createWorkspace(userPayload);
  }

  function handleSwitchWorkspace() {
    setLastWorkspace(currentWorkspace);

    hardRefetch();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        {currentTab === "WORKSPACE" && (
          <>
            <DialogHeader>
              <DialogTitle>Workspaces</DialogTitle>
              <DialogDescription>Switch between workspaces</DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              {!isLoading &&
                data &&
                data?.map(
                  (workspace: {
                    id: string;
                    name: string;
                    slug: string;
                    socialProfiles: any[];
                    createdAt: string;
                  }) => (
                    <div
                      key={workspace.slug}
                      className={`p-2 rounded-md cursor-pointer hover:bg-primary/90 ${
                        currentWorkspace === workspace.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-white"
                      }`}
                      onClick={() => {
                        setCurrentWorkspace(workspace.id);
                      }}
                    >
                      {workspace.name}
                    </div>
                  )
                )}

              {isLoading && (
                <div className="w-full min-h-72 flex flex-col gap-3 items-center justify-center">
                  <Spinner className="size-10" />
                  <p>Fetching workspaces...</p>
                </div>
              )}
            </div>
            <DialogFooter className="mt-5">
              <Button
                onClick={() => setCurrentTab("CREATE")}
                variant={"outline"}
              >
                Add Workspace
              </Button>
              <Button onClick={handleSwitchWorkspace}>Switch Workspace</Button>
            </DialogFooter>
          </>
        )}
        {currentTab === "CREATE" && (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <DialogHeader>
                  <DialogTitle>Create Workspace</DialogTitle>
                  <DialogDescription>Enter workspace name</DialogDescription>
                </DialogHeader>

                <div className="mt-5">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter workspace name"
                            className="border-border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={!watchName || isPending}
                  className="w-full"
                  type="submit"
                >
                  {isPending && <Spinner className="size-5 mr-2" />}
                  Create Workspace
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
