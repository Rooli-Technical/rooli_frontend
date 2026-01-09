"use client";
import useToast from "@/components/app-toast";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addCommas, formatMoney } from "@/lib/utils";
import billingService from "@/services/billing.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useAppStore } from "@/store/app-store";
import authService from "@/services/auth.service";

export default function Page() {
  const showToast = useToast();
  const { setReference } = useAppStore();
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">(
    "MONTHLY"
  );
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
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

  const filteredPlans = useMemo(() => {
    if (isLoading) return [];
    if (!planList) return [];
    return planList.filter((plan: any) => plan.interval === billingCycle);
  }, [planList, isLoading, billingCycle]);

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["billing-checkout"],
    mutationFn: async (plan: string) => {
      const response = await billingService.billingCheckout({
        planId: plan,
      });

      return response.data;
    },
    onSuccess: (data) => {
      console.log("🚀 ~ file: page.tsx:53 ~ data:", data);
      const { paymentUrl, reference } = data;
      setReference(reference);
      window.location.href = paymentUrl;
    },
    onError: (error: any) => {
      showToast(error?.response?.data?.message, "error");
    },
  });

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold font-serif">Select Your Plan</h2>
            <p className="text-muted-foreground">
              Choose the plan that best fits your needs
            </p>
          </div>

          <div className="flex justify-center">
            <Tabs
              value={billingCycle}
              onValueChange={(val) =>
                setBillingCycle(val as "MONTHLY" | "YEARLY")
              }
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="MONTHLY">Monthly</TabsTrigger>
                <TabsTrigger value="YEARLY">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap md:justify-center gap-6">
            {filteredPlans.map((plan: any) => (
              <Card
                key={plan.id}
                className={`relative cursor-pointer transition-all hover:border-primary border-2 flex flex-col ${
                  selectedPlan === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardHeader>
                  <CardTitle className="font-serif text-xl">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <div className="text-3xl font-bold">
                    {/* <span className="text-base font-semibold text-primary">
              {plan.currency}
            </span> */}
                    {formatMoney(plan.price)}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{billingCycle === "MONTHLY" ? "mo" : "yr"}
                    </span>
                  </div>
                  <ul className="space-y-2 flex-1">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      {plan.maxWorkspaces > 100
                        ? "Unlimited"
                        : addCommas(plan.maxWorkspaces)}{" "}
                      {plan.maxWorkspaces === 1 ? "Workspace" : "Workspaces"}
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      {plan.maxSocialProfilesPerWorkspace > 100
                        ? "Unlimited"
                        : addCommas(plan.maxSocialProfilesPerWorkspace)}{" "}
                      Social Profiles / Workspace
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      {plan.maxTeamMembers > 100
                        ? "Unlimited"
                        : addCommas(plan.maxTeamMembers)}{" "}
                      {plan.maxTeamMembers === 1
                        ? "Team Member"
                        : "Team Members"}
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      {addCommas(plan.monthlyAiCredits)} AI Credits / Month
                    </li>
                    {Object.entries(plan.features).map(([key, value], i) => {
                      if (!value) return null;
                      return (
                        <li key={i} className="flex items-center text-sm">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </li>
                      );
                    })}
                  </ul>
                  <Button
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    className="w-full mt-4"
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="w-full flex items-center justify-center py-10">
          <Button
            disabled={!selectedPlan || isPending}
            onClick={() => {
              if (selectedPlan) {
                mutateAsync(selectedPlan);
              }
            }}
            className="disabled:opacity-50"
          >
            {isPending && <Spinner />}
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
