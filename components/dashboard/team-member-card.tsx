import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Shield, Mail } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  email: string
  role: string
  avatar: string
  status: string
  lastActive: string
  permissions: string[]
  joinedDate: string
}

interface TeamMemberCardProps {
  member: TeamMember
}

const roleColors = {
  Owner: "bg-purple-100 text-purple-800",
  Admin: "bg-blue-100 text-blue-800",
  Editor: "bg-green-100 text-green-800",
  Viewer: "bg-gray-100 text-gray-800",
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
              <AvatarFallback>
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Role
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                View Permissions
              </DropdownMenuItem>
              {member.role !== "Owner" && (
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Member
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Role</span>
            <Badge className={roleColors[member.role as keyof typeof roleColors]}>{member.role}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${member.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
              <span className="text-sm capitalize">{member.status}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Active</span>
            <span className="text-sm">{member.lastActive}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Joined</span>
            <span className="text-sm">{member.joinedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
