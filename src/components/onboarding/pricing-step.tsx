"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addCommas, cn, formatMoney } from "@/lib/utils";

export type PlanFeatures = {
  analytics?: boolean;
  aiCaptions?: boolean;
  teamFeatures?: boolean;
  approvalWorkflows?: boolean;
  collaboratorRoles?: boolean;
  whiteLabel?: boolean;
  clientReporting?: boolean;
  prioritySupport?: boolean;
  [key: string]: boolean | undefined;
};

interface PricingStepProps {
  selectedPlan: string;
  onSelect: (plan: string) => void;
  plans: {
    id: string;
    name: string;
    description: string;
    price: string;
    currency: string;
    interval: string;
    features: PlanFeatures;
    tier?: string;
    maxWorkspaces: number;
    maxSocialProfilesPerWorkspace: number;
    maxTeamMembers: number;
    monthlyAiCredits: number;
  }[];
  accountType: string | null;
  timezone: string;
}

export function PricingStep({
  selectedPlan,
  onSelect,
  plans,
  accountType,
  timezone = "Africa/Lagos",
}: PricingStepProps) {
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">(
    "MONTHLY"
  );

  const filteredPlans = plans.filter((plan) => {
    if (!accountType || !plan.tier) return plan.interval === billingCycle;

    return plan.interval === billingCycle;
  });

  console.log("🚀 ~ file: pricing-step.tsx:62 ~ filteredPlans:", filteredPlans);

  return (
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
          onValueChange={(val) => setBillingCycle(val as "MONTHLY" | "YEARLY")}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="MONTHLY">Monthly</TabsTrigger>
            <TabsTrigger value="YEARLY" className="flex items-center gap-1.5">
              Yearly
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                Save 5%
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div
        className={cn(`grid gap-5 grid-cols-1 md:grid-cols-2  justify-center`)}
      >
        {filteredPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative cursor-pointer transition-all hover:border-primary border-2 flex flex-col ${
              selectedPlan === plan.id
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
            onClick={() => onSelect(plan.id)}
          >
            <CardHeader>
              <CardTitle className="font-serif text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col">
              <div className="text-3xl font-bold">
                <span className="text-base font-semibold text-primary">
                  {timezone === "Africa/Lagos" ? "₦" : "$"}
                </span>
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
                  {plan.maxTeamMembers === 1 ? "Team Member" : "Team Members"}
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

        {billingCycle === "YEARLY" && (
          <Card
            className={`relative cursor-pointer transition-all hover:border-primary border-2 flex flex-col border-border`}
          >
            <CardHeader>
              <CardTitle className="font-serif text-xl">Enterprise</CardTitle>
              <CardDescription>
                For large organizations with custom needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Starts at
                </p>
                <div className="text-3xl font-bold">
                  <span className="text-base font-semibold text-primary">
                    {timezone === "Africa/Lagos" ? "₦" : "$"}
                  </span>
                  {timezone === "Africa/Lagos" ? "250,000" : "2,000"}
                  <span className="text-sm font-normal text-muted-foreground">
                    /yr
                  </span>
                </div>
              </div>
              <ul className="space-y-2 flex-1">
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Unlimited Workspaces
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Unlimited Social Profiles
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Unlimited Team Members
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Custom AI Credits
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Priority Support
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  White-labeling
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => {
                  window.open("mailto:support@rooli.com", "_blank");
                }}
              >
                Talk to Sales
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
