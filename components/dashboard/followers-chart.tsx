"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { date: "Dec 1", followers: 23400 },
  { date: "Dec 2", followers: 23450 },
  { date: "Dec 3", followers: 23520 },
  { date: "Dec 4", followers: 23580 },
  { date: "Dec 5", followers: 23640 },
  { date: "Dec 6", followers: 23720 },
  { date: "Dec 7", followers: 23800 },
  { date: "Dec 8", followers: 23890 },
  { date: "Dec 9", followers: 23950 },
  { date: "Dec 10", followers: 24020 },
  { date: "Dec 11", followers: 24100 },
  { date: "Dec 12", followers: 24180 },
  { date: "Dec 13", followers: 24250 },
  { date: "Dec 14", followers: 24320 },
]

const chartConfig = {
  followers: {
    label: "Followers",
    color: "hsl(var(--chart-3))",
  },
}

export function FollowersChart() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif">Follower Growth</CardTitle>
        <CardDescription>Total followers across all platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="followers"
                stroke="var(--color-chart-3)"
                strokeWidth={3}
                dot={{ fill: "var(--color-chart-3)", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
