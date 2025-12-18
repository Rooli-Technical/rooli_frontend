"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export interface SocialAccount {
  platform: string;
  username: string;
  connected: boolean;
}

interface SocialMediaStepProps {
  connectedAccounts: SocialAccount[];
  onToggleConnect: (platform: string) => void;
}

export function SocialMediaStep({
  connectedAccounts,
  onToggleConnect,
}: SocialMediaStepProps) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-serif">Connect Accounts</h2>
        <p className="text-muted-foreground">
          Link your social media profiles to get started
        </p>
      </div>

      <div className="space-y-4">
        {connectedAccounts.map((account) => {
          const PlatformIcon =
            {
              Instagram: Instagram,
              Twitter: Twitter,
              Facebook: Facebook,
              LinkedIn: Linkedin,
            }[account.platform] || Instagram;

          return (
            <Card key={account.platform} className="border-border">
              <CardContent className="p-4 flex items-center justify-between">
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
                <div className="flex items-center space-x-2">
                  {account.connected ? (
                    <>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <Check className="mr-1 h-3 w-3" />
                        Connected
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onToggleConnect(account.platform)}
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => onToggleConnect(account.platform)}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
