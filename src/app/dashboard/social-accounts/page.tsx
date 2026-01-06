"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React, { useState } from "react";

export default function SocialAccountsPage() {
  const [connectedAccounts] = useState([
    {
      platform: "Instagram",
      username: "@techcorp",
      connected: true,
      followers: "12.4K",
    },
    {
      platform: "Twitter",
      username: "@techcorp",
      connected: true,
      followers: "8.7K",
    },
    {
      platform: "Facebook",
      username: "TechCorp Inc.",
      connected: true,
      followers: "15.2K",
    },
    {
      platform: "LinkedIn",
      username: "TechCorp Inc.",
      connected: false,
      followers: "0",
    },
  ]);
  return (
    <div>
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif">
            Connected Social Media Accounts
          </CardTitle>
          <CardDescription>
            Manage your connected social media platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedAccounts.map((account) => {
            const PlatformIcon =
              {
                Instagram: Instagram,
                Twitter: Twitter,
                Facebook: Facebook,
                LinkedIn: Linkedin,
              }[account.platform] || Instagram;

            return (
              <div
                key={account.platform}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <PlatformIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{account.platform}</h4>
                    <p className="text-sm text-muted-foreground">
                      {account.connected ? account.username : "Not connected"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {account.connected && (
                    <div className="text-right">
                      <p className="text-sm font-medium">{account.followers}</p>
                      <p className="text-xs text-muted-foreground">followers</p>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    {account.connected ? (
                      <>
                        <Badge className="bg-green-100 text-green-800">
                          <Check className="mr-1 h-3 w-3" />
                          Connected
                        </Badge>
                        <Button variant="outline" size="sm">
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button size="sm">Connect</Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
