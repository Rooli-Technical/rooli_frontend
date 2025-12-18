"use client";

import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingStepProps {
  selectedPlan: string;
  onSelect: (plan: string) => void;
}

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$29",
    description: "Essential features for individuals",
    features: [
      "1 User",
      "5 Connected Accounts",
      "Basic Analytics",
      "Email Support",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "$79",
    description: "Perfect for growing teams",
    features: [
      "5 Users",
      "20 Connected Accounts",
      "Advanced Analytics",
      "Priority Support",
      "Content Library",
    ],
    popular: true,
  },
  {
    id: "diamond",
    name: "Diamond",
    price: "$199",
    description: "For agencies and large scale",
    features: [
      "Unlimited Users",
      "Unlimited Accounts",
      "White Label",
      "24/7 Phone Support",
      "API Access",
    ],
  },
];

export function PricingStep({ selectedPlan, onSelect }: PricingStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-serif">Select Your Plan</h2>
        <p className="text-muted-foreground">
          Choose the plan that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative cursor-pointer transition-all hover:border-primary border-2 ${
              selectedPlan === plan.id
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
            onClick={() => onSelect(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="font-serif text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">
                {plan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /mo
                </span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    {feature}
                  </li>
                ))}
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
