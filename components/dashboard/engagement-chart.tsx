"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { date: "Dec 1", engagement: 2400, reach: 4800 },
  { date: "Dec 2", engagement: 1398, reach: 3200 },
  { date: "Dec 3", engagement: 9800, reach: 12000 },
  { date: "Dec 4", engagement: 3908, reach: 6800 },
  { date: "Dec 5", engagement: 4800, reach: 8900 },
  { date: "Dec 6", engagement: 3800, reach: 7200 },
  { date: "Dec 7", engagement: 4300, reach: 8100 },
  { date: "Dec 8", engagement: 2400, reach: 4800 },
  { date: "Dec 9", engagement: 1398, reach: 3200 },
  { date: "Dec 10", engagement: 9800, reach: 12000 },
  { date: "Dec 11", engagement: 3908, reach: 6800 },
  { date: "Dec 12", engagement: 4800, reach: 8900 },
  { date: "Dec 13", engagement: 3800, reach: 7200 },
  { date: "Dec 14", engagement: 4300, reach: 8100 },
]

const chartConfig = {
  engagement: {
    label: "Engagement",
    color: "hsl(var(--chart-1))",
  },
  reach: {
    label: "Reach",
    color: "hsl(var(--chart-2))",
  },
}

export function EngagementChart() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif">Engagement Overview</CardTitle>
        <CardDescription>Daily engagement and reach metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="reach"
                stackId="1"
                stroke="var(--color-chart-2)"
                fill="var(--color-chart-2)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="engagement"
                stackId="1"
                stroke="var(--color-chart-1)"
                fill="var(--color-chart-1)"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
