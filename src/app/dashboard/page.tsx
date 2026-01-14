"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  Heart,
  Share,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import PageHeader from "@/components/page-header";
import { addCommas } from "@/lib/utils";

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const userProfile: any = queryClient.getQueryData(["user-profile"]);

  const widgets = [
    {
      title: "Total Followers",
      value: 0,
      icon: Users,
      color: "primary",
      unit: "",
    },
    {
      title: "Engagement Rate",
      value: 0,
      icon: Heart,
      color: "secondary",
      unit: "%",
    },
    {
      title: "Posts This Month",
      value: 0,
      icon: Calendar,
      color: "accent",
      unit: "",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between mb-8">
        <PageHeader
          title={`Welcome back, ${userProfile?.result?.firstName}!`}
          description="Here's what's happening with your social media today."
        />
      </div>

      {/* Stats Cards */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        {widgets.map((widget) => (
          <Card className="border-border hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {widget.title}
              </CardTitle>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <widget.icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">
                {addCommas(widget.value)}
                {widget.unit}
              </div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">+12.5%</span>
                <span className="ml-1 text-muted-foreground">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <Card className="border-border hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="font-serif text-xl">Recent Posts</CardTitle>
            <CardDescription className="text-base">
              Your latest published content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4 p-5 border border-border rounded-xl hover:bg-muted/30 transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">IG</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-foreground truncate mb-1">
                  New product launch announcement! 🚀
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Instagram • 2 hours ago
                </p>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Eye className="mr-1.5 h-4 w-4" />
                    1.2K
                  </div>
                  <div className="flex items-center">
                    <Heart className="mr-1.5 h-4 w-4" />
                    89
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="mr-1.5 h-4 w-4" />
                    12
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-5 border border-border rounded-xl hover:bg-muted/30 transition-colors">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center">
                <span className="text-secondary font-semibold text-sm">TW</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-foreground truncate mb-1">
                  Tips for better social media engagement
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Twitter • 4 hours ago
                </p>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Eye className="mr-1.5 h-4 w-4" />
                    856
                  </div>
                  <div className="flex items-center">
                    <Heart className="mr-1.5 h-4 w-4" />
                    34
                  </div>
                  <div className="flex items-center">
                    <Share className="mr-1.5 h-4 w-4" />8
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-5 border border-border rounded-xl hover:bg-muted/30 transition-colors">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center">
                <span className="text-accent font-semibold text-sm">LI</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-foreground truncate mb-1">
                  Industry insights and trends for 2024
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  LinkedIn • 1 day ago
                </p>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Eye className="mr-1.5 h-4 w-4" />
                    2.1K
                  </div>
                  <div className="flex items-center">
                    <Heart className="mr-1.5 h-4 w-4" />
                    156
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="mr-1.5 h-4 w-4" />
                    23
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Posts */}
        <Card className="border-border hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="font-serif text-xl">Upcoming Posts</CardTitle>
            <CardDescription className="text-base">
              Scheduled content for the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4 p-5 border border-border rounded-xl hover:bg-muted/30 transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">IG</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-foreground truncate mb-1">
                  Behind the scenes: Team collaboration
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Instagram • Today at 3:00 PM
                </p>
                <Badge variant="secondary" className="mt-2">
                  Scheduled
                </Badge>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-5 border border-border rounded-xl hover:bg-muted/30 transition-colors">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center">
                <span className="text-secondary font-semibold text-sm">TW</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-foreground truncate mb-1">
                  Weekly motivation Monday post
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Twitter • Tomorrow at 9:00 AM
                </p>
                <Badge variant="secondary" className="mt-2">
                  Scheduled
                </Badge>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-5 border border-border rounded-xl hover:bg-muted/30 transition-colors">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center">
                <span className="text-accent font-semibold text-sm">LI</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-foreground truncate mb-1">
                  Company culture and values update
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  LinkedIn • Wednesday at 11:00 AM
                </p>
                <Badge variant="outline" className="mt-2">
                  Draft
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
