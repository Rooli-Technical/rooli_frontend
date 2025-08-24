"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, List, Plus, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PostCreator } from "@/components/dashboard/post-creator"
import { CalendarView } from "@/components/dashboard/calendar-view"
import { PostList } from "@/components/dashboard/post-list"

export default function SchedulerPage() {
  const [showPostCreator, setShowPostCreator] = useState(false)
  const [view, setView] = useState<"calendar" | "list">("calendar")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Content Scheduler</h1>
          <p className="text-muted-foreground">Plan, create, and schedule your social media content</p>
        </div>
        <Button onClick={() => setShowPostCreator(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Badge variant="secondary">This Week</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Badge variant="outline">Pending</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">This Month</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Platforms</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Badge variant="secondary">Connected</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search posts..." className="pl-10 w-64 bg-background border-border" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={view === "calendar" ? "default" : "outline"} size="sm" onClick={() => setView("calendar")}>
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
            <List className="mr-2 h-4 w-4" />
            List
          </Button>
        </div>
      </div>

      {/* Content */}
      {view === "calendar" ? <CalendarView /> : <PostList />}

      {/* Post Creator Modal */}
      {showPostCreator && <PostCreator onClose={() => setShowPostCreator(false)} />}
    </div>
  )
}
