"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  MessageSquare,
  AtSign,
  Heart,
  Archive,
  Trash2,
  MoreHorizontal,
  Send,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react"

interface Message {
  id: string
  platform: "instagram" | "twitter" | "facebook" | "linkedin"
  type: "comment" | "dm" | "mention" | "like"
  user: {
    name: string
    username: string
    avatar: string
    verified?: boolean
  }
  content: string
  timestamp: Date
  postTitle?: string
  isRead: boolean
  isStarred: boolean
  priority: "high" | "medium" | "low"
}

const mockMessages: Message[] = [
  {
    id: "1",
    platform: "instagram",
    type: "comment",
    user: {
      name: "Sarah Johnson",
      username: "@sarahjohnson",
      avatar: "/diverse-user-avatars.png",
      verified: true,
    },
    content: "This is amazing! Can you share more details about the pricing?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    postTitle: "New product launch announcement",
    isRead: false,
    isStarred: true,
    priority: "high",
  },
  {
    id: "2",
    platform: "twitter",
    type: "mention",
    user: {
      name: "Tech Reviewer",
      username: "@techreviewer",
      avatar: "/diverse-user-avatars.png",
    },
    content: "@rooli Your platform has been a game-changer for our social media strategy! 🚀",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
    isStarred: false,
    priority: "medium",
  },
  {
    id: "3",
    platform: "facebook",
    type: "dm",
    user: {
      name: "Marketing Agency",
      username: "marketingpro",
      avatar: "/diverse-user-avatars.png",
    },
    content: "Hi! We're interested in partnering with you for our clients. Could we schedule a call?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    isRead: true,
    isStarred: false,
    priority: "high",
  },
  {
    id: "4",
    platform: "linkedin",
    type: "comment",
    user: {
      name: "Business Owner",
      username: "businessowner",
      avatar: "/diverse-user-avatars.png",
    },
    content: "Great insights! This really helped me understand social media analytics better.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    postTitle: "Industry insights and trends for 2024",
    isRead: true,
    isStarred: false,
    priority: "low",
  },
  {
    id: "5",
    platform: "instagram",
    type: "like",
    user: {
      name: "Content Creator",
      username: "@contentcreator",
      avatar: "/diverse-user-avatars.png",
      verified: true,
    },
    content: "Liked your post",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    postTitle: "Behind the scenes: Team collaboration",
    isRead: true,
    isStarred: false,
    priority: "low",
  },
]

const platformIcons = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
}

const platformColors = {
  instagram: "text-pink-500",
  twitter: "text-blue-500",
  facebook: "text-blue-600",
  linkedin: "text-blue-700",
}

const typeIcons = {
  comment: MessageSquare,
  dm: MessageSquare,
  mention: AtSign,
  like: Heart,
}

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState("")
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMessages = mockMessages.filter((message) => {
    if (filter === "unread" && message.isRead) return false
    if (filter === "starred" && !message.isStarred) return false
    if (searchQuery && !message.content.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const unreadCount = mockMessages.filter((m) => !m.isRead).length
  const starredCount = mockMessages.filter((m) => m.isStarred).length

  const handleMarkAsRead = (messageId: string) => {
    // In a real app, this would update the backend
    console.log("Mark as read:", messageId)
  }

  const handleStar = (messageId: string) => {
    // In a real app, this would update the backend
    console.log("Star message:", messageId)
  }

  const handleReply = () => {
    if (!replyText.trim() || !selectedMessage) return
    console.log("Reply to:", selectedMessage.id, "with:", replyText)
    setReplyText("")
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Inbox</h1>
          <p className="text-muted-foreground">Manage all your social media interactions in one place</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{unreadCount} unread</Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold">{mockMessages.length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Starred</p>
                <p className="text-2xl font-bold">{starredCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Filters and Search */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search messages..."
                className="pl-10 bg-background border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                <TabsTrigger value="starred">Starred ({starredCount})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Messages */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredMessages.map((message) => {
              const PlatformIcon = platformIcons[message.platform]
              const TypeIcon = typeIcons[message.type]
              const isSelected = selectedMessage?.id === message.id

              return (
                <Card
                  key={message.id}
                  className={`border-border cursor-pointer transition-all duration-200 ${
                    isSelected ? "ring-2 ring-primary" : "hover:shadow-md"
                  } ${!message.isRead ? "bg-muted/30" : ""}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={message.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-sm truncate">{message.user.name}</h3>
                            {message.user.verified && <CheckCircle className="h-3 w-3 text-blue-500" />}
                          </div>
                          <div className="flex items-center space-x-1">
                            <PlatformIcon className={`h-3 w-3 ${platformColors[message.platform]}`} />
                            <TypeIcon className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{message.content}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{formatTimestamp(message.timestamp)}</span>
                          <div className="flex items-center space-x-1">
                            {!message.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                            {message.isStarred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                            {message.priority === "high" && <AlertCircle className="h-3 w-3 text-red-500" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card className="border-border h-[700px] flex flex-col">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedMessage.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{selectedMessage.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="font-semibold">{selectedMessage.user.name}</h2>
                        {selectedMessage.user.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedMessage.user.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStar(selectedMessage.id)}
                      className={selectedMessage.isStarred ? "text-yellow-500" : ""}
                    >
                      <Star className={`h-4 w-4 ${selectedMessage.isStarred ? "fill-current" : ""}`} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleMarkAsRead(selectedMessage.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Read
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-6 space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  {React.createElement(platformIcons[selectedMessage.platform], {
                    className: `h-4 w-4 ${platformColors[selectedMessage.platform]}`,
                  })}
                  <span className="capitalize">{selectedMessage.type}</span>
                  {selectedMessage.postTitle && (
                    <>
                      <span>•</span>
                      <span>{selectedMessage.postTitle}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{formatTimestamp(selectedMessage.timestamp)}</span>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-foreground">{selectedMessage.content}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge
                    variant={selectedMessage.priority === "high" ? "destructive" : "secondary"}
                    className="capitalize"
                  >
                    {selectedMessage.priority} Priority
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {selectedMessage.type}
                  </Badge>
                </div>
              </CardContent>

              {/* Reply Section */}
              <div className="border-t border-border p-4">
                <div className="space-y-3">
                  <Textarea
                    placeholder="Write your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="min-h-20 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Clock className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                    </div>
                    <Button onClick={handleReply} disabled={!replyText.trim()}>
                      <Send className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="border-border h-[700px] flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-2">Select a message</h3>
                <p className="text-muted-foreground">Choose a message from the list to view and respond</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
