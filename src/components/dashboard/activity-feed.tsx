import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Edit, Trash2, CheckCircle, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "member_joined",
    user: "Emily Chen",
    avatar: "/diverse-user-avatars.png",
    action: "joined the team",
    details: "as Viewer",
    timestamp: "2 hours ago",
    icon: UserPlus,
  },
  {
    id: 2,
    type: "content_published",
    user: "Sarah Johnson",
    avatar: "/diverse-user-avatars.png",
    action: "published a post",
    details: "New product launch announcement",
    timestamp: "4 hours ago",
    icon: CheckCircle,
  },
  {
    id: 3,
    type: "content_edited",
    user: "Mike Rodriguez",
    avatar: "/diverse-user-avatars.png",
    action: "edited a draft",
    details: "Weekly motivation Monday post",
    timestamp: "6 hours ago",
    icon: Edit,
  },
  {
    id: 4,
    type: "content_scheduled",
    user: "John Doe",
    avatar: "/diverse-user-avatars.png",
    action: "scheduled a post",
    details: "Behind the scenes: Team collaboration",
    timestamp: "1 day ago",
    icon: Clock,
  },
  {
    id: 5,
    type: "member_role_changed",
    user: "John Doe",
    avatar: "/diverse-user-avatars.png",
    action: "changed Mike's role",
    details: "from Viewer to Editor",
    timestamp: "2 days ago",
    icon: Edit,
  },
  {
    id: 6,
    type: "content_deleted",
    user: "Sarah Johnson",
    avatar: "/diverse-user-avatars.png",
    action: "deleted a draft",
    details: "Outdated product announcement",
    timestamp: "3 days ago",
    icon: Trash2,
  },
]

const activityColors = {
  member_joined: "bg-green-100 text-green-800",
  content_published: "bg-blue-100 text-blue-800",
  content_edited: "bg-yellow-100 text-yellow-800",
  content_scheduled: "bg-purple-100 text-purple-800",
  member_role_changed: "bg-orange-100 text-orange-800",
  content_deleted: "bg-red-100 text-red-800",
}

export function ActivityFeed() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif">Team Activity</CardTitle>
        <CardDescription>Recent actions and changes by your team members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                  <AvatarFallback>
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{activity.user}</span>
                    <span className="text-sm text-muted-foreground">{activity.action}</span>
                    <Badge className={activityColors[activity.type as keyof typeof activityColors]} variant="secondary">
                      {activity.details}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
