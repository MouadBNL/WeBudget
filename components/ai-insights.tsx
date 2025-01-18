'use client'

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react"

const insights = [
  {
    title: "Inventory Optimization",
    description: "Your current inventory turnover rate is below industry average. Consider adjusting stock levels of low-moving items.",
    impact: "+2,500 MAD monthly",
    type: "positive",
  },
  {
    title: "Payment Timing",
    description: "Moving supplier payments to align with revenue peaks could improve cash flow by 15%",
    impact: "+4,200 MAD monthly",
    type: "positive",
  },
  {
    title: "Expense Alert",
    description: "Utility costs increased 23% compared to seasonal average. Review energy consumption patterns.",
    impact: "-1,800 MAD monthly",
    type: "negative",
  },
]

export function AIInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights.map((insight, index) => (
        <Card key={index} className="bg-slate-50">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {insight.type === "positive" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <h4 className="font-semibold">{insight.title}</h4>
                </div>
                <p className="text-sm text-gray-600">{insight.description}</p>
                <div className={`text-sm font-medium ${
                  insight.type === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {insight.impact}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}