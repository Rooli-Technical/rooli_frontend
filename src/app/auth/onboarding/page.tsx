"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PricingStep } from "@/components/onboarding/pricing-step";
import { AgencyStep } from "@/components/onboarding/agency-step";
import { OrganizationStep } from "@/components/onboarding/organization-step";

import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import PageLoader from "@/components/page-loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import billingService from "@/services/billing.service";
import authService from "@/services/auth.service";
import { CompleteOnboardingPayload } from "@/types";
import useToast from "@/components/app-toast";
import { Spinner } from "@/components/ui/spinner";
import { useAppStore } from "@/store/app-store";

export default function OnboardingPage() {
  const { setOrganizationId, setAccessToken, setRefreshToken } = useAppStore();
  const showToast = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pricingPlan: "",
    accountType: null as string | null,
    organizationName: "",
    initialWorkspaceName: "",
    organizationEmail: "",
    timezone: "Africa/Lagos",
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  //QUERIES
  const { isLoading, data: planList } = useQuery({
    queryKey: ["billing-plans"],
    queryFn: async () => {
      const response = await billingService.getBillingPlans();

      return response.data;
    },
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["complete-onboarding"],
    mutationFn: async (payload: CompleteOnboardingPayload) => {
      const response = await authService.completeOnboarding(payload);

      return response.data;
    },
    onSuccess: (data) => {
      showToast("Onboarding completed successfully", "success");
      const { paymentUrl, activeWorkspaceId, refreshToken, accessToken } = data;
      setOrganizationId(activeWorkspaceId);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      window.location.href = paymentUrl;
    },
    onError: (error: any) => {
      const errorResponse =
        error?.response.data?.message || "Something went wrong";
      showToast(errorResponse, "error");
    },
  });

  //END OF QUERIES

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const payload: CompleteOnboardingPayload = {
        planId: formData.pricingPlan,
        userType: formData.accountType || "",
        name: formData.organizationName,
        email: formData.organizationEmail,
        timezone: formData.timezone,
      };

      if (formData.initialWorkspaceName) {
        payload.initialWorkspaceName = formData.initialWorkspaceName;
      }

      mutateAsync(payload);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!formData.accountType;
      case 2:
        return !!formData.pricingPlan;
      case 3:
        const isAgency = formData.accountType === "AGENCY";
        const workspaceValid = isAgency
          ? formData.initialWorkspaceName &&
            formData.initialWorkspaceName.length > 2
          : true;
        return (
          formData.organizationName.length > 2 &&
          workspaceValid &&
          formData.organizationEmail.length > 5 &&
          !!formData.timezone
        );
      default:
        return false;
    }
  };

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Progress Header */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Completed</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content Area */}
        <div className="min-h-[400px] flex flex-col justify-center py-8">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AgencyStep
                accountType={formData.accountType}
                onSelect={(val) => updateFormData("accountType", val)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <PricingStep
                selectedPlan={formData.pricingPlan}
                onSelect={(plan) => updateFormData("pricingPlan", plan)}
                plans={planList ?? []}
                accountType={formData.accountType}
              />
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <OrganizationStep
                organizationName={formData.organizationName}
                initialWorkspaceName={formData.initialWorkspaceName}
                organizationEmail={formData.organizationEmail}
                timezone={formData.timezone}
                accountType={formData.accountType}
                onChange={updateFormData}
              />
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1 || isPending}
            className={step === 1 ? "invisible" : ""}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepValid() || isPending}
            size="lg"
            className="px-8"
          >
            {isPending && <Spinner />}
            {step === totalSteps ? "Complete Setup" : "Continue"}
            {step === totalSteps ? (
              <Check className="ml-2 h-4 w-4" />
            ) : (
              <ChevronRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
