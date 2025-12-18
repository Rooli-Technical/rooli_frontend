"use client";

import { Card } from "@/components/ui/card";
import { Building2, User } from "lucide-react";

interface AgencyStepProps {
  isAgency: boolean | null;
  onSelect: (isAgency: boolean) => void;
}

export function AgencyStep({ isAgency, onSelect }: AgencyStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-serif">
          Tell us about yourself
        </h2>
        <p className="text-muted-foreground">
          This helps us customize your experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card
          className={`p-6 cursor-pointer transition-all hover:border-primary border-2 flex flex-col items-center justify-center text-center space-y-4 h-64 ${
            isAgency === false ? "border-primary bg-primary/5" : "border-border"
          }`}
          onClick={() => onSelect(false)}
        >
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-lg">I'm a Business/Individual</h3>
            <p className="text-sm text-muted-foreground mt-2">
              I'm managing social media for my own brand or company
            </p>
          </div>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all hover:border-primary border-2 flex flex-col items-center justify-center text-center space-y-4 h-64 ${
            isAgency === true ? "border-primary bg-primary/5" : "border-border"
          }`}
          onClick={() => onSelect(true)}
        >
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-lg">I'm an Agency</h3>
            <p className="text-sm text-muted-foreground mt-2">
              I manage social media for multiple clients or organizations
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
