'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Activity,
  Target,
  AlertCircle
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FinancialMetric {
  label: string
  value: number
  trend: number
  currency?: boolean
  percentage?: boolean
}

interface Recommendation {
  title: string
  description: string
  impact: string
  type: 'positive' | 'negative' | 'neutral'
  priority: 'high' | 'medium' | 'low'
}

export function FinancialInsightPanel() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  const metrics: FinancialMetric[] = [
    { label: 'Cash Flow', value: 94760, trend: 8.2, currency: true },
    { label: 'Expenses', value: 85430, trend: -5.1, currency: true },
    { label: 'Profit Margin', value: 22.5, trend: 1.2, percentage: true },
    { label: 'Working Capital', value: 156000, trend: 3.4, currency: true }
  ]

  const recommendations: Recommendation[] = [
    {
      title: 'Optimize Inventory Levels',
      description: 'Current stock levels exceed optimal range by 15%. Consider reducing inventory of slow-moving items.',
      impact: '+2,500 MAD monthly',
      type: 'positive',
      priority: 'high'
    },
    {
      title: 'Supplier Payment Terms',
      description: 'Extending payment terms to net-60 could improve working capital position.',
      impact: '+4,200 MAD monthly',
      type: 'positive',
      priority: 'medium'
    },
    {
      title: 'Energy Cost Management',
      description: 'Utility expenses 23% above industry average. Consider energy audit.',
      impact: '-1,800 MAD monthly',
      type: 'negative',
      priority: 'high'
    }
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-white">
        <h3 className="font-semibold flex items-center text-lg">
          <Sparkles className="h-5 w-5 mr-2 text-primary" />
          Financial Insights
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time analysis and recommendations
        </p>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                selected={selectedMetric === metric.label}
                onClick={() => setSelectedMetric(metric.label)}
              />
            ))}
          </div>

          {/* Financial Health Score */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Activity className="h-4 w-4 mr-2 text-primary" />
                Financial Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">78/100</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Good
                  </Badge>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Your business health score is above industry average (72/100)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Target className="h-4 w-4 mr-2 text-primary" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <RecommendationItem
                    key={rec.title}
                    recommendation={rec}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts Section */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-yellow-800">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Action Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <ActionItem
                  title="Tax Filing Deadline"
                  description="Annual tax return due in 15 days"
                  daysRemaining={15}
                />
                <ActionItem
                  title="Pending Approvals"
                  description="3 invoices awaiting review"
                  daysRemaining={2}
                />
                <ActionItem
                  title="Bank Reconciliation"
                  description="Monthly reconciliation needed"
                  daysRemaining={5}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}

function MetricCard({
  metric,
  selected,
  onClick
}: {
  metric: FinancialMetric
  selected: boolean
  onClick: () => void
}) {
  const formatValue = (value: number) => {
    if (metric.currency) {
      return new Intl.NumberFormat('fr-MA', {
        style: 'currency',
        currency: 'MAD',
        maximumFractionDigits: 0
      }).format(value)
    }
    if (metric.percentage) {
      return `${value}%`
    }
    return value.toLocaleString()
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={`cursor-pointer transition-all ${
              selected ? 'ring-2 ring-primary' : ''
            }`}
            onClick={onClick}
          >
            <CardContent className="p-3">
              <div className="text-sm font-medium">{metric.label}</div>
              <div className="text-xl font-bold mt-1">
                {formatValue(metric.value)}
              </div>
              <div className={`text-xs flex items-center mt-1 ${
                metric.trend > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend > 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(metric.trend)}% vs last month
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to see detailed analysis</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function RecommendationItem({ recommendation }: { recommendation: Recommendation }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-green-600 bg-green-50'
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <h4 className="font-medium text-sm">{recommendation.title}</h4>
        <Badge 
          variant="outline" 
          className={getPriorityColor(recommendation.priority)}
        >
          {recommendation.priority}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        {recommendation.description}
      </p>
      <div className={`text-sm font-medium ${
        recommendation.type === 'positive' 
          ? 'text-green-600' 
          : recommendation.type === 'negative' 
            ? 'text-red-600' 
            : 'text-blue-600'
      }`}>
        {recommendation.impact}
      </div>
    </div>
  )
}

function ActionItem({
  title,
  description,
  daysRemaining
}: {
  title: string
  description: string
  daysRemaining: number
}) {
  return (
    <div className="flex items-start space-x-3">
      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
      <div>
        <h4 className="font-medium text-sm text-yellow-800">{title}</h4>
        <p className="text-sm text-yellow-700 mt-0.5">{description}</p>
        <p className="text-xs text-yellow-600 mt-1">
          Due in {daysRemaining} days
        </p>
      </div>
    </div>
  )
}