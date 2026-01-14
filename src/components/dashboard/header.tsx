import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Plus, User, Settings, LogOut, Menu } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useProgressBarRouter } from "@/hooks/use-progress-bar-router";

const Title: Record<string, string> = {
  analytics: "Analytics",
  "": "Dashboard",
  scheduler: "Content Scheduler",
  content: "Content Library",
  "social-accounts": "Social Accounts",
  "ai-assistant": "AI Assistant",
  team: "Team",
  "/dashboard/inbox": "Inbox",
};

export function Header({
  toggleLogoutModal,
  userData,
}: {
  toggleLogoutModal: () => void;
  userData: any;
}) {
  const pathname = usePathname();
  const router = useProgressBarRouter();

  const { toggleSidebar } = useSidebar();

  const currentPath = pathname.split("/")[2];
  const notificationCount = 0;

  const header:
    | "Analytics"
    | "Dashboard"
    | "Content Scheduler"
    | "Content Library"
    | "Social Accounts"
    | "AI Assistant"
    | "Team"
    | "Inbox" = useMemo(() => {
    if (!currentPath) return "Dashboard";
    if (currentPath.includes("analytics")) return "Analytics";
    if (currentPath.includes("scheduler")) return "Content Scheduler";
    if (currentPath.includes("content")) return "Content Library";
    if (currentPath.includes("social-accounts")) return "Social Accounts";
    if (currentPath.includes("ai-assistant")) return "AI Assistant";
    if (currentPath.includes("team")) return "Team";
    if (currentPath.includes("inbox")) return "Inbox";
    return "Dashboard";
  }, [pathname.split("/")[2]]);

  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      <button onClick={toggleSidebar} className="block md:hidden">
        <Menu />
      </button>
      <h2 className="text-lg font-semibold hidden md:block md:ml-0">
        {header}
      </h2>

      {/* Actions */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Create Button */}
        <Button
          className="bg-primary hover:bg-primary/90 flex items-center justify-center"
          onClick={() => router.push("/dashboard/content/create-post")}
        >
          <Plus className="md:mr-2 md:h-4 md:w-4" />
          <p className="hidden md:block">Create Post</p>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">
                  Post scheduled successfully
                </p>
                <p className="text-xs text-muted-foreground">
                  Your Instagram post will go live at 3:00 PM
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Team member added</p>
                <p className="text-xs text-muted-foreground">
                  Sarah joined your workspace
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Analytics report ready</p>
                <p className="text-xs text-muted-foreground">
                  Weekly performance summary is available
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={userData?.result?.profilePicture ?? ""}
                  alt="User"
                />
                <AvatarFallback>
                  {userData?.result?.firstName[0] +
                    userData?.result?.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userData?.result?.firstName +
                    " " +
                    userData?.result?.lastName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userData?.result?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleLogoutModal}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
