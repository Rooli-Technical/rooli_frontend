"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns"

const mockPosts = [
  {
    id: 1,
    date: new Date(2024, 11, 15),
    time: "09:00",
    content: "New product launch announcement! 🚀",
    platforms: ["instagram", "twitter"],
    status: "scheduled",
  },
  {
    id: 2,
    date: new Date(2024, 11, 16),
    time: "14:30",
    content: "Behind the scenes: Team collaboration",
    platforms: ["linkedin"],
    status: "scheduled",
  },
  {
    id: 3,
    date: new Date(2024, 11, 18),
    time: "11:00",
    content: "Weekly motivation Monday post",
    platforms: ["twitter", "facebook"],
    status: "draft",
  },
]

const platformColors = {
  instagram: "bg-pink-500",
  twitter: "bg-blue-500",
  facebook: "bg-blue-600",
  linkedin: "bg-blue-700",
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getPostsForDay = (day: Date) => {
    return mockPosts.filter((post) => isSameDay(post.date, day))
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <Card className="border-border">
      <CardContent className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((day) => {
            const dayPosts = getPostsForDay(day)
            const isCurrentMonth = isSameMonth(day, currentDate)
            const isDayToday = isToday(day)

            return (
              <div
                key={day.toISOString()}
                className={`min-h-24 p-2 border border-border rounded-lg ${
                  isCurrentMonth ? "bg-background" : "bg-muted/30"
                } ${isDayToday ? "ring-2 ring-primary" : ""}`}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                  } ${isDayToday ? "text-primary" : ""}`}
                >
                  {format(day, "d")}
                </div>

                <div className="space-y-1">
                  {dayPosts.slice(0, 2).map((post) => (
                    <div
                      key={post.id}
                      className="text-xs p-1 rounded bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        {post.platforms.map((platform) => (
                          <div
                            key={platform}
                            className={`w-2 h-2 rounded-full ${platformColors[platform as keyof typeof platformColors]}`}
                          />
                        ))}
                        <span className="text-xs">{post.time}</span>
                      </div>
                      <div className="truncate">{post.content}</div>
                    </div>
                  ))}

                  {dayPosts.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center">+{dayPosts.length - 2} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
