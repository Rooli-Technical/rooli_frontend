import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart, MessageSquare, Share } from "lucide-react"

const topPosts = [
  {
    id: 1,
    content: "New product launch announcement! 🚀 We're excited to share our latest innovation...",
    platform: "Instagram",
    platformColor: "bg-pink-500",
    metrics: { views: 12400, likes: 890, comments: 67, shares: 23 },
    engagement: "7.2%",
  },
  {
    id: 2,
    content: "Industry insights: The future of social media marketing in 2024. What trends...",
    platform: "Twitter",
    platformColor: "bg-blue-500",
    metrics: { views: 8900, likes: 234, comments: 45, shares: 89 },
    engagement: "4.1%",
  },
  {
    id: 3,
    content: "Behind the scenes: Team collaboration at its finest. Here's how we work...",
    platform: "LinkedIn",
    platformColor: "bg-blue-700",
    metrics: { views: 5600, likes: 156, comments: 23, shares: 34 },
    engagement: "3.8%",
  },
]

export function TopPosts() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif">Top Performing Posts</CardTitle>
        <CardDescription>Your best content from the last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {topPosts.map((post, index) => (
          <div key={post.id} className="p-4 border border-border rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                <div className={`w-3 h-3 rounded-full ${post.platformColor}`} />
                <span className="text-sm font-medium">{post.platform}</span>
                <Badge variant="secondary">{post.engagement} engagement</Badge>
              </div>
            </div>

            <p className="text-sm text-foreground line-clamp-2">{post.content}</p>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.metrics.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.metrics.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.metrics.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share className="h-4 w-4" />
                  <span>{post.metrics.shares}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
