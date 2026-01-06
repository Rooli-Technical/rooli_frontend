"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const data = [
  { name: "Instagram", value: 35, color: "#E1306C" },
  { name: "Twitter", value: 28, color: "#1DA1F2" },
  { name: "Facebook", value: 22, color: "#4267B2" },
  { name: "LinkedIn", value: 15, color: "#0077B5" },
]

const chartConfig = {
  value: {
    label: "Engagement %",
  },
}

export function PlatformBreakdown() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif">Platform Breakdown</CardTitle>
        <CardDescription>Engagement distribution by platform</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className="text-sm font-semibold ml-auto">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
