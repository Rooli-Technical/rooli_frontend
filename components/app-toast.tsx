"use client";
import { cn } from "@/lib/utils";
import { ToastErrorIcon, ToastSuccessIcon, ToastWarningIcon } from "@/public";
import Image from "next/image";
import { toast } from "sonner";

const useToast = () => {
  const showCustomToast = (
    // header: string,
    message: string,
    variant: "success" | "error" | "warning"
  ) => {
    toast(
      <div className="flex z-100 w-full items-start min-w-[250px] py-4 px-4 rounded-xl max-w-[300px] shadow-sm justify-start gap-3">
        {variant === "warning" ? (
          <Image
            src={ToastWarningIcon}
            alt="warning"
            width={32}
            height={32}
            className="object-cover rounded-full overflow-hidden"
          />
        ) : variant === "success" ? (
          <Image
            src={ToastSuccessIcon}
            alt="succes"
            width={32}
            height={32}
            className="object-cover rounded-full overflow-hidden"
          />
        ) : (
          <Image
            src={ToastErrorIcon}
            alt="error"
            width={32}
            height={32}
            className="object-cover rounded-full overflow-hidden"
          />
        )}

        <div className="w-full">
          {/* <h2 className="text-base text-[#120321] font-semibold">{header}</h2> */}
          <p
            className={cn(
              "text-sm text-[#898A8D] font-normal",
              variant === "error" && "capitalize"
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
