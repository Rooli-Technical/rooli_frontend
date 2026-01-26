import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../app-toast";
import workSpaceService from "@/services/workspace.service";
import { Spinner } from "../ui/spinner";

export default function DisconnectModal({
  open,
  setOpen,
  platform,
  handleClose,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  platform: any;

  handleClose: () => void;
}) {
  const showToast = useToast();
  const queryClient = useQueryClient();
  const userProfile: any = queryClient.getQueryData(["user-profile"]);

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["disconnect-account"],
    mutationFn: async () => {
      const response = await workSpaceService.disconnectSocialAccount(
        userProfile?.result?.organization?.id,
        platform?.connection?.id,
      );

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaces", userProfile?.result?.lastActiveWorkspace],
      });
      showToast("Account disconnected successfully", "success");
      handleClose();
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.message || "Something went wrong";
      showToast(errorMsg, "error");
    },
  });
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Disconnect {platform?.platform}</DialogTitle>
          <DialogDescription>
            Are you sure you want to disconnect {platform?.platform}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isPending} variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            variant={"destructive"}
            onClick={() => mutateAsync()}
          >
            {isPending && <Spinner />}
            Disconnect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
