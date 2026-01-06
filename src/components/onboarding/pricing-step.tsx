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
import { addCommas, formatMoney } from "@/lib/utils";

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
}

//   {
//     id: "basic",
//     name: "Basic",
//     price: "$29",
//     description: "Essential features for individuals",
//     features: [
//       "1 User",
//       "5 Connected Accounts",
//       "Basic Analytics",
//       "Email Support",
//     ],
//   },
//   {
//     id: "gold",
//     name: "Gold",
//     price: "$79",
//     description: "Perfect for growing teams",
//     features: [
//       "5 Users",
//       "20 Connected Accounts",
//       "Advanced Analytics",
//       "Priority Support",
//       "Content Library",
//     ],
//     popular: true,
//   },
//   {
//     id: "diamond",
//     name: "Diamond",
//     price: "$199",
//     description: "For agencies and large scale",
//     features: [
//       "Unlimited Users",
//       "Unlimited Accounts",
//       "White Label",
//       "24/7 Phone Support",
//       "API Access",
//     ],
//   },
// ];

export function PricingStep({
  selectedPlan,
  onSelect,
  plans,
  accountType,
}: PricingStepProps) {
  console.log("🚀 ~ file: pricing-step.tsx:95 ~ accountType:", accountType);
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">(
    "MONTHLY"
  );

  const filteredPlans = plans.filter((plan) => {
    // Filter by account type first
    if (!accountType || !plan.tier) return plan.interval === billingCycle;

    if (accountType === "INDIVIDUAL") {
      const isValidTier = plan.tier === "CREATOR" || plan.tier === "BUSINESS";
      return isValidTier && plan.interval === billingCycle;
    }

    if (accountType === "AGENCY") {
      const isValidTier = plan.tier === "ROCKET" || plan.tier === "ENTERPRISE";
      // Enterprise plans show for both monthly and yearly
      if (plan.tier === "ENTERPRISE") {
        return isValidTier;
      }
      // Other plans still filter by billing cycle
      return isValidTier && plan.interval === billingCycle;
    }

    return plan.interval === billingCycle;
  });

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
            <TabsTrigger value="YEARLY">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap md:justify-center gap-6">
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
      </div>
    </div>
  );
}
