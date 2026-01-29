"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { User, Lock, Bell, CreditCard, Instagram } from "lucide-react";
import UserProfile from "@/components/settings/user-profile";
import UserSecuritySettings from "@/components/settings/user-security-settings";
import UserNotifications from "@/components/settings/user-notifications";
import UserBilling from "@/components/settings/user-billing";
import { Shop } from "iconsax-reactjs";
import UserWorkspaces from "@/components/settings/user-workspaces";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Account Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="workspaces">
            <Shop className="mr-2 h-4 w-4" />
            Workspaces
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <UserProfile />
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <UserSecuritySettings />
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <UserNotifications />
        </TabsContent>

        <TabsContent value="workspaces" className="space-y-6">
          <UserWorkspaces />
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <UserBilling />
        </TabsContent>
      </Tabs>
    </div>
  );
}
