"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import useToast from "../app-toast";
import authService from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProgressBarRouter } from "@/hooks/use-progress-bar-router";
import { useAppStore } from "@/store/app-store";
import { Spinner } from "../ui/spinner";

export default function LogoutModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const showToast = useToast();
  const router = useProgressBarRouter();

  const { clearAuth } = useAppStore();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["logout-user"],
    mutationFn: async () => {
      await authService.logoutUser();
    },
    onSuccess: () => {
      showToast("You have been logged out successfully", "success");
      setOpen(false);
      clearAuth();
      queryClient.clear();
      router.replace("/auth/login");
    },
    onError: (error: any) => {
      showToast(error?.response?.data?.message, "error");
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl text-center">
            Logout from Rooli?
          </DialogTitle>
          <DialogDescription className="text-center font-medium">
            Are you sure you want to logout from TrustBasket?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid grid-cols-2 gap-4 sm:justify-center w-full">
          <DialogClose asChild className="disabled:cursor-not-allowed">
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="w-full disabled:cursor-not-allowed"
            onClick={() => mutateAsync()}
            disabled={isPending}
          >
            {isPending && <Spinner className="mr-1 h-4 w-4 " />}
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
