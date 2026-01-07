"use client";

import useToast from "@/components/app-toast";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useProgressBarRouter } from "@/hooks/use-progress-bar-router";
import billingService from "@/services/billing.service";
import { useMutation } from "@tanstack/react-query";
import { CloseCircle, InfoCircle, TickCircle } from "iconsax-reactjs";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Page() {
  const [mounted, setIsMounted] = useState(false);
  const router = useProgressBarRouter();
  const showToast = useToast();
  const searchParams = useSearchParams();
  const transactionReference = searchParams.get("trxref");
  const [paymentState, setPaymentState] = useState<
    "LOADING" | "SUCCESS" | "ERROR"
  >("LOADING");
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["verify-payment"],
    mutationFn: async () => {
      await billingService.verifyPayment({
        reference: transactionReference || "",
      });
    },
    onSuccess: () => {
      setPaymentState("SUCCESS");
    },
    onError: (error: any) => {
      showToast(error?.response?.data?.message, "error");
      setPaymentState("ERROR");
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      mutateAsync();
    }
  }, [mounted]);

  return (
    <div className="flex items-center justify-center h-screen min-h-screen max-h-screen flex-col gap-2">
      {paymentState === "LOADING" && <InfoCircle size="32" color="#FF8A65" />}
      {paymentState === "SUCCESS" && (
        <TickCircle size="32" className="text-green-600" />
      )}
      {paymentState === "ERROR" && (
        <CloseCircle size="32" className="text-destructive" />
      )}

      {paymentState === "LOADING" && (
        <h2 className="font-bold text-3xl">Payment Verification</h2>
      )}
      {paymentState === "SUCCESS" && (
        <h2 className="font-bold text-3xl">Payment Successful</h2>
      )}
      {paymentState === "ERROR" && (
        <h2 className="font-bold text-3xl">Payment Failed</h2>
      )}
      {paymentState === "LOADING" && (
        <p className="text-center">
          We are verifying your payment, please wait.
        </p>
      )}
      {paymentState === "SUCCESS" && (
        <p className="text-center">
          Your payment has been verified successfully.
        </p>
      )}
      {paymentState === "ERROR" && (
        <p className="text-center">Your payment verification failed.</p>
      )}

      {paymentState === "SUCCESS" && (
        <Button
          className="px-10 min-w-[200px]"
          onClick={() => router.replace("/dashboard")}
        >
          Go to Dashboard
        </Button>
      )}
      {paymentState === "ERROR" && (
        <Button
          className="px-10 min-w-[200px]"
          onClick={() => router.replace("/payment-plans")}
        >
          Try Again
        </Button>
      )}
      {paymentState === "LOADING" && (
        <Button
          className="px-10 w-[200px]"
          onClick={() => router.replace("/dashboard")}
          disabled={isPending}
        >
          <Spinner />
        </Button>
      )}
    </div>
  );
}

export default function PaymentVerificationPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  );
}
