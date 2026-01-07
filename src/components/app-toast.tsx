"use client";

import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { CloseCircle, TickCircle, Warning2 } from "iconsax-reactjs";

const useToast = () => {
  const showCustomToast = (
    message: string,
    variant: "success" | "error" | "warning"
  ) => {
    toast(
      <div className="flex z-100 w-full items-center justify-start gap-3">
        {variant === "warning" ? (
          <Warning2 size={32} className="text-orange-600" />
        ) : variant === "success" ? (
          <TickCircle size={32} className="text-primary" />
        ) : (
          <CloseCircle size={32} className="text-destructive" />
        )}

        <div className="w-full">
          <p
            className={cn(
              "text-sm text-primary font-normal",
              variant === "error" && "capitalize text-destructive",
              variant === "warning" && "text-orange-600"
            )}
          >
            {message}
          </p>
        </div>
      </div>,
      {}
    );
  };

  return showCustomToast;
};

export default useToast;
