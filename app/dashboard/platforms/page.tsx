"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  CheckCircle,
  XCircle,
  Settings,
  Users,
  MessageSquare,
  Heart,
  BarChart3,
  AlertTriangle,
  Plus,
  Unlink,
  RefreshCw,
} from "lucide-react"

interface Platform {
  id: string
  name: string
  icon: any
  color: string
  connected: boolean
  status: "active" | "error" | "pending"
  followers: string
  engagement: string
  postsThisMonth: number
  lastSync: string
  features: string[]
  limits: {
    postsPerDay: number
    charactersLimit: number
  }
  settings: {
    autoPost: boolean
    optimalTiming: boolean
    hashtagSuggestions: boolean
  }
}

const platforms: Platform[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-500",
    connected: true,
    status: "active",
    followers: "12.3K",
    engagement: "4.8%",
    postsThisMonth: 24,
    lastSync: "2 minutes ago",
    features: ["Posts", "Stories", "Reels", "IGTV"],
    limits: { postsPerDay: 25, charactersLimit: 2200 },
    settings: { autoPost: true, optimalTiming: true, hashtagSuggestions: true },
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    color: "text-blue-500",
    connected: true,
    status: "active",
    followers: "8.7K",
    engagement: "3.2%",
    postsThisMonth: 45,
    lastSync: "5 minutes ago",
    features: ["Tweets", "Threads", "Spaces"],
    limits: { postsPerDay: 300, charactersLimit: 280 },
    settings: { autoPost: true, optimalTiming: false, hashtagSuggestions: true },
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-600",
    connected: true,
    status: "error",
    followers: "3.5K",
    engagement: "2.1%",
    postsThisMonth: 18,
    lastSync: "2 hours ago",
    features: ["Posts", "Stories", "Events", "Pages"],
    limits: { postsPerDay: 25, charactersLimit: 63206 },
    settings: { autoPost: false, optimalTiming: true, hashtagSuggestions: false },
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "text-blue-700",
    connected: false,
    status: "pending",
    followers: "0",
    engagement: "0%",
    postsThisMonth: 0,
    lastSync: "Never",
    features: ["Posts", "Articles", "Stories"],
    limits: { postsPerDay: 25, charactersLimit: 3000 },
    settings: { autoPost: false, optimalTiming: false, hashtagSuggestions: false },
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    color: "text-red-500",
    connected: false,
    status: "pending",
    followers: "0",
    engagement: "0%",
    postsThisMonth: 0,
    lastSync: "Never",
    features: ["Videos", "Shorts", "Community Posts"],
    limits: { postsPerDay: 6, charactersLimit: 5000 },
    settings: { autoPost: false, optimalTiming: false, hashtagSuggestions: false },
  },
]

const statusColors = {
  active: "text-green-500",
  error: "text-red-500",
  pending: "text-yellow-500",
}

const statusBadges = {
  active: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
}

export default function PlatformsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [showConnectDialog, setShowConnectDialog] = useState(false)

  const connectedPlatforms = platforms.filter((p) => p.connected)
  const availablePlatforms = platforms.filter((p) => !p.connected)

  const handleConnect = (platformId: string) => {
    console.log("Connecting to platform:", platformId)
    setShowConnectDialog(false)
  }

  const handleDisconnect = (platformId: string) => {
    console.log("Disconnecting from platform:", platformId)
  }

  const handleSettingChange = (platformId: string, setting: string, value: boolean) => {
    console.log("Setting change:", platformId, setting, value)
  }

  const handleSync = (platformId: string) => {
    console.log("Syncing platform:", platformId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Platforms</h1>
          <p className="text-muted-foreground">Connect and manage your social media platforms</p>
        </div>
        <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Connect Platform
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect New Platform</DialogTitle>
              <DialogDescription>Choose a platform to connect to your Rooli account</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {availablePlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <platform.icon className={`h-6 w-6 ${platform.color}`} />
                    <div>
                      <h3 className="font-medium">{platform.name}</h3>
                      <p className="text-sm text-muted-foreground">{platform.features.join(", ")}</p>
                    </div>
                  </div>
                  <Button onClick={() => handleConnect(platform.id)}>Connect</Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connected</p>
                <p className="text-2xl font-bold">{connectedPlatforms.length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Followers</p>
                <p className="text-2xl font-bold">24.5K</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Engagement</p>
                <p className="text-2xl font-bold">3.4%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Posts This Month</p>
                <p className="text-2xl font-bold">87</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <Card key={platform.id} className="border-border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <platform.icon className={`h-8 w-8 ${platform.color}`} />
                      <div>
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          {platform.connected ? (
                            <>
                              <CheckCircle className={`h-3 w-3 ${statusColors[platform.status]}`} />
                              <Badge className={statusBadges[platform.status]} variant="secondary">
                                {platform.status}
                              </Badge>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">Not connected</span>
                            </>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platform.connected ? (
                    <>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-lg font-bold text-primary">{platform.followers}</p>
                          <p className="text-xs text-muted-foreground">Followers</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-primary">{platform.engagement}</p>
                          <p className="text-xs text-muted-foreground">Engagement</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Posts this month</span>
                          <span>
                            {platform.postsThisMonth}/{platform.limits.postsPerDay * 30}
                          </span>
                        </div>
                        <Progress
                          value={(platform.postsThisMonth / (platform.limits.postsPerDay * 30)) * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last sync:</span>
                        <span>{platform.lastSync}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleSync(platform.id)} className="flex-1">
                          <RefreshCw className="mr-2 h-3 w-3" />
                          Sync
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPlatform(platform)}
                          className="flex-1"
                        >
                          <Settings className="mr-2 h-3 w-3" />
                          Settings
                        </Button>
                      </div>

                      {platform.status === "error" && (
                        <div className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-700">Connection error - please reconnect</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground mb-3">Connect to start managing this platform</p>
                      <Button onClick={() => handleConnect(platform.id)} className="w-full">
                        Connect {platform.name}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {connectedPlatforms.map((platform) => (
              <Card key={platform.id} className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <platform.icon className={`h-6 w-6 ${platform.color}`} />
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisconnect(platform.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Unlink className="mr-2 h-3 w-3" />
                      Disconnect
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-posting</Label>
                        <p className="text-sm text-muted-foreground">Automatically publish scheduled posts</p>
                      </div>
                      <Switch
                        checked={platform.settings.autoPost}
                        onCheckedChange={(checked) => handleSettingChange(platform.id, "autoPost", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Optimal timing</Label>
                        <p className="text-sm text-muted-foreground">Post at the best times for engagement</p>
                      </div>
                      <Switch
                        checked={platform.settings.optimalTiming}
                        onCheckedChange={(checked) => handleSettingChange(platform.id, "optimalTiming", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Hashtag suggestions</Label>
                        <p className="text-sm text-muted-foreground">Get AI-powered hashtag recommendations</p>
                      </div>
                      <Switch
                        checked={platform.settings.hashtagSuggestions}
                        onCheckedChange={(checked) => handleSettingChange(platform.id, "hashtagSuggestions", checked)}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium mb-3">Platform Limits</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Posts per day:</span>
                        <span>{platform.limits.postsPerDay}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Character limit:</span>
                        <span>{platform.limits.charactersLimit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Supported features:</span>
                        <span>{platform.features.length}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {connectedPlatforms.map((platform) => (
              <Card key={platform.id} className="border-border">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <platform.icon className={`h-6 w-6 ${platform.color}`} />
                    <CardTitle className="text-lg">{platform.name} Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{platform.followers}</p>
                      <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{platform.engagement}</p>
                      <p className="text-sm text-muted-foreground">Engagement</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Posts this month</span>
                      <span className="font-medium">{platform.postsThisMonth}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg. likes per post</span>
                      <span className="font-medium">
                        {platform.id === "instagram" ? "156" : platform.id === "twitter" ? "89" : "67"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg. comments per post</span>
                      <span className="font-medium">
                        {platform.id === "instagram" ? "23" : platform.id === "twitter" ? "12" : "8"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Best posting time</span>
                      <span className="font-medium">
                        {platform.id === "instagram" ? "6:00 PM" : platform.id === "twitter" ? "12:00 PM" : "9:00 AM"}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Platform Settings Dialog */}
      {selectedPlatform && (
        <Dialog open={!!selectedPlatform} onOpenChange={() => setSelectedPlatform(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <selectedPlatform.icon className={`h-5 w-5 ${selectedPlatform.color}`} />
                {selectedPlatform.name} Settings
              </DialogTitle>
              <DialogDescription>Configure your {selectedPlatform.name} integration settings</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Posting Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Default posting time</Label>
                      <p className="text-sm text-muted-foreground">When to post if no time is specified</p>
                    </div>
                    <Select defaultValue="optimal">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="optimal">Optimal</SelectItem>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Custom hashtags</Label>
                    <Input placeholder="Add default hashtags for this platform" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Content Formatting</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-resize images</Label>
                      <p className="text-sm text-muted-foreground">Automatically resize images to platform specs</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Add watermark</Label>
                      <p className="text-sm text-muted-foreground">Add your brand watermark to images</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedPlatform(null)}>
                  Cancel
                </Button>
                <Button onClick={() => setSelectedPlatform(null)}>Save Settings</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
