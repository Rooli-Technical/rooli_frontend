import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { CreditCard } from "lucide-react";
import { Badge } from "../ui/badge";

export default function UserBilling() {
  return (
    <div>
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif">Subscription & Billing</CardTitle>
          <CardDescription>
            Manage your subscription and payment methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold">Pro Plan</h4>
                <p className="text-sm text-muted-foreground">Billed monthly</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$29</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Next billing date: January 15, 2025</p>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  Change Plan
                </Button>
                <Button variant="outline" size="sm">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Payment Method</h4>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">
                    Expires 12/2027
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Billing History</h4>
            <div className="space-y-2">
              {[
                { date: "Dec 15, 2024", amount: "$29.00", status: "Paid" },
                { date: "Nov 15, 2024", amount: "$29.00", status: "Paid" },
                { date: "Oct 15, 2024", amount: "$29.00", status: "Paid" },
              ].map((invoice, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{invoice.date}</p>
                    <p className="text-sm text-muted-foreground">Pro Plan</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-medium">{invoice.amount}</p>
                    <Badge className="bg-green-100 text-green-800">
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
