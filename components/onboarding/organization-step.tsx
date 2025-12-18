"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";

interface OrganizationStepProps {
  organizationName: string;
  onChange: (name: string) => void;
}

export function OrganizationStep({
  organizationName,
  onChange,
}: OrganizationStepProps) {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-serif">Create Organization</h2>
        <p className="text-muted-foreground">Let's set up your workspace</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="orgName">Organization Name</Label>
          <div className="relative">
            <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="orgName"
              placeholder="Acme Inc."
              className="pl-9"
              value={organizationName}
              onChange={(e) => onChange(e.target.value)}
              autoFocus
            />
          </div>
          <p className="text-xs text-muted-foreground">
            This will be the name displayed in your workspace and on invoices.
          </p>
        </div>
      </div>
    </div>
  );
}
