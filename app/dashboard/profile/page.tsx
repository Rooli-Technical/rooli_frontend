"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Calendar,
  Camera,
  Edit,
  Trophy,
  TrendingUp,
  Users,
  MessageSquare,
  Heart,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  CheckCircle,
  XCircle,
  Settings,
  Bell,
} from "lucide-react"

const userStats = [
  { label: "Total Posts", value: "247", icon: MessageSquare, color: "text-blue-500" },
  { label: "Total Followers", value: "24.5K", icon: Users, color: "text-green-500" },
  { label: "Engagement Rate", value: "4.8%", icon: Heart, color: "text-red-500" },
  { label: "Reach", value: "156K", icon: TrendingUp, color: "text-purple-500" },
]

const achievements = [
  { title: "Content Creator", description: "Published 100+ posts", icon: Trophy, earned: true },
  { title: "Engagement Master", description: "Achieved 5%+ engagement rate", icon: Heart, earned: true },
  { title: "Viral Content", description: "Post reached 10K+ views", icon: TrendingUp, earned: true },
  { title: "Community Builder", description: "Gained 1K+ followers", icon: Users, earned: false },
]

const connectedPlatforms = [
  { name: "Instagram", icon: Instagram, connected: true, followers: "12.3K", color: "text-pink-500" },
  { name: "Twitter", icon: Twitter, connected: true, followers: "8.7K", color: "text-blue-500" },
  { name: "Facebook", icon: Facebook, connected: true, followers: "3.5K", color: "text-blue-600" },
  { name: "LinkedIn", icon: Linkedin, connected: false, followers: "0", color: "text-blue-700" },
]

const recentActivity = [
  { action: "Published post", platform: "Instagram", time: "2 hours ago" },
  { action: "Scheduled post", platform: "Twitter", time: "4 hours ago" },
  { action: "Replied to comment", platform: "Facebook", time: "6 hours ago" },
  { action: "Updated profile", platform: "Rooli", time: "1 day ago" },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Social media strategist and content creator passionate about helping brands grow their online presence. 5+ years of experience in digital marketing.",
    website: "https://johndoe.com",
    joinDate: "January 2023",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    marketingEmails: false,
    darkMode: false,
    autoSchedule: true,
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    // In a real app, this would save to backend
    console.log("Profile saved:", profileData)
  }

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
    // In a real app, this would save to backend
    console.log("Preference updated:", key, value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
          <Edit className="mr-2 h-4 w-4" />
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/diverse-user-avatars.png" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                        disabled={!isEditing}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Profile Picture</DialogTitle>
                        <DialogDescription>Upload a new profile picture</DialogDescription>
                      </DialogHeader>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium mb-2">Upload new picture</p>
                        <p className="text-sm text-muted-foreground mb-4">JPG, PNG up to 5MB</p>
                        <Button>Choose File</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-2xl font-bold">{profileData.name}</h2>
                  <p className="text-muted-foreground">{profileData.email}</p>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Joined {profileData.joinDate}
                  </Badge>
                </div>

                <div className="w-full pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">247</p>
                      <p className="text-sm text-muted-foreground">Posts</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">24.5K</p>
                      <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-border mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="font-medium">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!isEditing}
                      className="min-h-24"
                    />
                  </div>
                  {isEditing && (
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest actions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.platform}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="platforms" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Connected Platforms</CardTitle>
                  <CardDescription>Manage your social media platform connections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {connectedPlatforms.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <platform.icon className={`h-6 w-6 ${platform.color}`} />
                        <div>
                          <h3 className="font-medium">{platform.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {platform.connected ? `${platform.followers} followers` : "Not connected"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {platform.connected ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <Button variant="outline" size="sm">
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                            <Button size="sm">Connect</Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Your milestones and accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg ${
                          achievement.earned ? "border-primary bg-primary/5" : "border-border bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <achievement.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                        {achievement.earned && (
                          <Badge variant="secondary" className="mt-2">
                            Earned
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                  <CardDescription>Your journey towards the next achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Community Builder</span>
                      <span>750/1000 followers</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Consistency Master</span>
                      <span>18/30 days</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={preferences.pushNotifications}
                      onCheckedChange={(checked) => handlePreferenceChange("pushNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports">Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Get weekly performance summaries</p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={preferences.weeklyReports}
                      onCheckedChange={(checked) => handlePreferenceChange("weeklyReports", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive product updates and tips</p>
                    </div>
                    <Switch
                      id="marketing-emails"
                      checked={preferences.marketingEmails}
                      onCheckedChange={(checked) => handlePreferenceChange("marketingEmails", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    App Preferences
                  </CardTitle>
                  <CardDescription>Customize your app experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Use dark theme</p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={preferences.darkMode}
                      onCheckedChange={(checked) => handlePreferenceChange("darkMode", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-schedule">Auto Schedule</Label>
                      <p className="text-sm text-muted-foreground">Automatically schedule posts at optimal times</p>
                    </div>
                    <Switch
                      id="auto-schedule"
                      checked={preferences.autoSchedule}
                      onCheckedChange={(checked) => handlePreferenceChange("autoSchedule", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
