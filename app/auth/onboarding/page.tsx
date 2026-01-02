"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PricingStep } from "@/components/onboarding/pricing-step";
import { AgencyStep } from "@/components/onboarding/agency-step";
import { OrganizationStep } from "@/components/onboarding/organization-step";
import {
  SocialMediaStep,
  SocialAccount,
} from "@/components/onboarding/social-media-step";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import PageLoader from "@/components/page-loader";
import { useQuery } from "@tanstack/react-query";
import billingService from "@/services/billing.service";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pricingPlan: "",
    isAgency: null as boolean | null,
    organizationName: "",
    connectedAccounts: [
      { platform: "Instagram", username: "@rooli_social", connected: false },
      { platform: "Twitter", username: "@rooli_app", connected: false },
      { platform: "Facebook", username: "Rooli Inc.", connected: false },
      { platform: "LinkedIn", username: "Rooli", connected: false },
    ] as SocialAccount[],
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  //QUERIES
  // const { isLoading, data: planList } = useQuery({
  //   queryKey: ["billing-plans"],
  //   queryFn: async () => {
  //     const response = await billingService.getBillingPlans();

  //     return response.data;
  //   },
  //   retry: 1,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  // });

  //END OF QUERIES

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      console.log("Onboarding Complete:", formData);
      // Here you would typically submit the data to your backend
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
        return !!formData.pricingPlan;
      case 2:
        return formData.isAgency !== null;
      case 3:
        return formData.organizationName.length > 2;
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAccountConnection = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      connectedAccounts: prev.connectedAccounts.map((acc) =>
        acc.platform === platform ? { ...acc, connected: !acc.connected } : acc
      ),
    }));
  };

  // if (isLoading) return <PageLoader />;

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
                isAgency={formData.isAgency}
                onSelect={(val) => updateFormData("isAgency", val)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <PricingStep
                selectedPlan={formData.pricingPlan}
                onSelect={(plan) => updateFormData("pricingPlan", plan)}
                plans={[]}
              />
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <OrganizationStep
                organizationName={formData.organizationName}
                onChange={(name) => updateFormData("organizationName", name)}
              />
            </div>
          )}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SocialMediaStep
                connectedAccounts={formData.connectedAccounts}
                onToggleConnect={toggleAccountConnection}
              />
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            className={step === 1 ? "invisible" : ""}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            size="lg"
            className="px-8"
          >
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
