"use client";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Calendar,
  BarChart3,
  Users,
  Settings,
  PenTool,
  ImageIcon,
  MessageSquare,
  HelpCircle,
  ChevronsUpDown,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Content Scheduler", href: "/dashboard/scheduler", icon: Calendar },
  { name: "Content Library", href: "/dashboard/content", icon: ImageIcon },
  {
    name: "Social Accounts",
    href: "/dashboard/social-accounts",
    icon: Instagram,
  },
  { name: "AI Assistant", href: "/dashboard/ai-assistant", icon: PenTool },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Inbox", href: "/dashboard/inbox", icon: MessageSquare, badge: "3" },
];

const bottomNavigation = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help & Support", href: "/dashboard/help", icon: HelpCircle },
];

export default function AppSidebar({
  toggleOrganizationModal,
}: {
  toggleOrganizationModal: () => void;
}) {
  const pathname = usePathname();

  const queryClient = useQueryClient();
  const userProfile: any = queryClient.getQueryData(["user-profile"]);

  const userType = userProfile?.result?.UserType;
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="pt-2 pb-3 space-y-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-bold text-xl text-sidebar-foreground">
              <Image src="/logo.png" alt="Rooli" width={68} height={68} />
            </span>
          </div>

          <div
            className="w-full bg-primary p-2 rounded-md cursor-pointer hover:bg-primary/90 flex items-center justify-between"
            onClick={toggleOrganizationModal}
          >
            <div>
              <p className="text-white text-xs font-semibold">Organization</p>
              <h2 className="text-white text-sm font-semibold">
                Organization Name
              </h2>
            </div>
            <ChevronsUpDown color="#fff" size={16} />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="pb-5 px-5">
        <SidebarMenu className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "py-5 rounded-md text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                    isActive &&
                      "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                >
                  <Link href={item.href}>
                    <div className="flex items-center justify-start">
                      <item.icon className="mr-3 h-4 w-4" />
                      <p className="ml-2 font-semibold">{item.name}</p>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 border-t border-sidebar-border space-y-2">
          {bottomNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
