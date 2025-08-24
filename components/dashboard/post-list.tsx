import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, Copy, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockPosts = [
  {
    id: 1,
    content:
      "New product launch announcement! 🚀 We're excited to share our latest innovation with you. This has been months in the making and we can't wait for you to try it out.",
    platforms: ["Instagram", "Twitter", "Facebook"],
    scheduledDate: "Dec 15, 2024",
    scheduledTime: "09:00 AM",
    status: "scheduled",
    engagement: { views: 0, likes: 0, comments: 0 },
  },
  {
    id: 2,
    content:
      "Behind the scenes: Team collaboration at its finest. Here's how we work together to create amazing content for our community.",
    platforms: ["LinkedIn", "Instagram"],
    scheduledDate: "Dec 16, 2024",
    scheduledTime: "02:30 PM",
    status: "scheduled",
    engagement: { views: 0, likes: 0, comments: 0 },
  },
  {
    id: 3,
    content: "Weekly motivation Monday post - Remember, every expert was once a beginner. Keep pushing forward! 💪",
    platforms: ["Twitter", "Facebook", "LinkedIn"],
    scheduledDate: "Dec 18, 2024",
    scheduledTime: "11:00 AM",
    status: "draft",
    engagement: { views: 0, likes: 0, comments: 0 },
  },
  {
    id: 4,
    content:
      "Customer success story: How @company increased their social media engagement by 150% using our platform. Read the full case study in our bio!",
    platforms: ["Instagram", "LinkedIn"],
    scheduledDate: "Dec 12, 2024",
    scheduledTime: "03:00 PM",
    status: "published",
    engagement: { views: 1247, likes: 89, comments: 12 },
  },
  {
    id: 5,
    content:
      "Industry insights: The future of social media marketing in 2024. What trends should you be watching? Thread below 👇",
    platforms: ["Twitter"],
    scheduledDate: "Dec 10, 2024",
    scheduledTime: "10:00 AM",
    status: "published",
    engagement: { views: 2156, likes: 156, comments: 23 },
  },
]

const platformColors = {
  Instagram: "bg-pink-500",
  Twitter: "bg-blue-500",
  Facebook: "bg-blue-600",
  LinkedIn: "bg-blue-700",
}

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  draft: "bg-gray-100 text-gray-800",
  published: "bg-green-100 text-green-800",
}

export function PostList() {
  return (
    <div className="space-y-4">
      {mockPosts.map((post) => (
        <Card key={post.id} className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={statusColors[post.status as keyof typeof statusColors]}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {post.scheduledDate} at {post.scheduledTime}
                  </span>
                </div>

                <p className="text-foreground mb-4 line-clamp-2">{post.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Platforms:</span>
                      <div className="flex items-center space-x-1">
                        {post.platforms.map((platform) => (
                          <div
                            key={platform}
                            className={`w-3 h-3 rounded-full ${platformColors[platform as keyof typeof platformColors]}`}
                            title={platform}
                          />
                        ))}
                      </div>
                    </div>

                    {post.status === "published" && (
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.engagement.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>❤️</span>
                          <span>{post.engagement.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>💬</span>
                          <span>{post.engagement.comments}</span>
                        </div>
                      </div>
                    )}
                  </div>
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
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  {post.status === "published" && (
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Analytics
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
