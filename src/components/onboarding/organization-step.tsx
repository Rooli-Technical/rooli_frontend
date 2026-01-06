"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, Mail, LayoutDashboard, Globe } from "lucide-react";

interface OrganizationStepProps {
  organizationName: string;
  initialWorkspaceName?: string;
  organizationEmail: string;
  timezone: string;
  accountType: string | null;
  onChange: (key: string, value: string) => void;
}

export function OrganizationStep({
  organizationName,
  initialWorkspaceName,
  organizationEmail,
  timezone,
  accountType,
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
              className="pl-9 bg-input border-border"
              value={organizationName}
              onChange={(e) => onChange("organizationName", e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {accountType === "AGENCY" && (
          <div className="space-y-2">
            <Label htmlFor="workspaceName">Initial Workspace Name</Label>
            <div className="relative">
              <LayoutDashboard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="workspaceName"
                placeholder="Main Workspace"
                className="pl-9 bg-input border-border"
                value={initialWorkspaceName || ""}
                onChange={(e) =>
                  onChange("initialWorkspaceName", e.target.value)
                }
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="orgEmail">Organization Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="orgEmail"
              type="email"
              placeholder="admin@acme.inc"
              className="pl-9 bg-input border-border"
              value={organizationEmail}
              onChange={(e) => onChange("organizationEmail", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <div className="relative">
            <div className="absolute left-3 top-2.5 z-10">
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
            <Select
              value={timezone}
              onValueChange={(value) => onChange("timezone", value)}
            >
              <SelectTrigger className="pl-9 bg-input border-border w-full">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Africa/Lagos">
                  West Africa Time (WAT)
                </SelectItem>
                <SelectItem value="America/New_York">
                  Eastern Time (ET)
                </SelectItem>
                <SelectItem value="America/Chicago">
                  Central Time (CT)
                </SelectItem>
                <SelectItem value="America/Denver">
                  Mountain Time (MT)
                </SelectItem>
                <SelectItem value="America/Los_Angeles">
                  Pacific Time (PT)
                </SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
