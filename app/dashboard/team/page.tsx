"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InviteMemberDialog } from "@/components/dashboard/invite-member-dialog"
import { TeamMemberCard } from "@/components/dashboard/team-member-card"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { Plus, Users, UserCheck, Clock, Shield } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    role: "Owner",
    avatar: "/diverse-user-avatars.png",
    status: "active",
    lastActive: "2 minutes ago",
    permissions: ["all"],
    joinedDate: "Jan 2024",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Admin",
    avatar: "/diverse-user-avatars.png",
    status: "active",
    lastActive: "1 hour ago",
    permissions: ["create", "edit", "publish", "analytics"],
    joinedDate: "Feb 2024",
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    email: "mike@company.com",
    role: "Editor",
    avatar: "/diverse-user-avatars.png",
    status: "active",
    lastActive: "3 hours ago",
    permissions: ["create", "edit"],
    joinedDate: "Mar 2024",
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily@company.com",
    role: "Viewer",
    avatar: "/diverse-user-avatars.png",
    status: "inactive",
    lastActive: "2 days ago",
    permissions: ["view"],
    joinedDate: "Apr 2024",
  },
]

const pendingInvites = [
  {
    id: 1,
    email: "alex@company.com",
    role: "Editor",
    invitedBy: "John Doe",
    invitedDate: "2 days ago",
  },
  {
    id: 2,
    email: "lisa@company.com",
    role: "Viewer",
    invitedBy: "Sarah Johnson",
    invitedDate: "1 week ago",
  },
]

export default function TeamPage() {
  const [showInviteDialog, setShowInviteDialog] = useState(false)

  const activeMembers = teamMembers.filter((member) => member.status === "active").length
  const totalMembers = teamMembers.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground">Manage your team members, roles, and permissions</p>
        </div>
        <Button onClick={() => setShowInviteDialog(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers}</div>
            <p className="text-xs text-muted-foreground">Online in last 24h</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingInvites.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Permission levels</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Management Tabs */}
      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="invites">Pending Invites</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invites" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif">Pending Invitations</CardTitle>
              <CardDescription>Team members who haven't accepted their invitations yet</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingInvites.length > 0 ? (
                <div className="space-y-4">
                  {pendingInvites.map((invite) => (
                    <div
                      key={invite.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{invite.email.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{invite.email}</p>
                          <p className="text-sm text-muted-foreground">
                            Invited by {invite.invitedBy} • {invite.invitedDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{invite.role}</Badge>
                        <Button variant="outline" size="sm">
                          Resend
                        </Button>
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No pending invitations</h3>
                  <p className="text-muted-foreground">All team members have accepted their invitations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif">Owner</CardTitle>
                <CardDescription>Full access to all features and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Create content</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Edit content</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Publish content</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">View analytics</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Manage team</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Billing & settings</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif">Admin</CardTitle>
                <CardDescription>Manage content and view analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Create content</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Edit content</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Publish content</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">View analytics</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Manage team</span>
                    <Badge className="bg-red-100 text-red-800">✗</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Billing & settings</span>
                    <Badge className="bg-red-100 text-red-800">✗</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif">Editor</CardTitle>
                <CardDescription>Create and edit content, requires approval to publish</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Create content</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Edit content</span>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Publish content</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Approval required</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">View analytics</span>
                    <Badge className="bg-red-100 text-red-800">✗</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Manage team</span>
                    <Badge className="bg-red-100 text-red-800">✗</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Billing & settings</span>
                    <Badge className="bg-red-100 text-red-800">✗</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif">Viewer</CardTitle>
                <CardDescription>View-only access to content and basic analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Create content</span>
                    <Badge className="bg-red-100 text-red-800">✗</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Edit content</span>
                    <Badge className="bg-red-100 text-red-800">✗</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Publish content</span>
                    <Badge className="bg-red-100 text-red-800">✗</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">View analytics</span>
                    <Badge className="bg-green-100 text-green-800">Basic only</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Manage team</span>
                    <Badge className="bg-red-100 text-red-800">✗</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Billing & settings</span>
                    <Badge className="bg-red-100 text-red-800">✗</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <ActivityFeed />
        </TabsContent>
      </Tabs>

      {/* Invite Member Dialog */}
      {showInviteDialog && <InviteMemberDialog onClose={() => setShowInviteDialog(false)} />}
    </div>
  )
}
