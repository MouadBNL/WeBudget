import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell, TrendingUp, CreditCard, Wallet } from "lucide-react"
import { IncomeChart } from "@/components/partials/income-charts"
import { SpendingBreakdown } from "@/components/partials/spending-breakdown"
import { AIInsights } from "@/components/ai-insights"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* AI Insights Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <Bell className="h-4 w-4" />
        <AlertTitle>AI Financial Insights</AlertTitle>
        <AlertDescription>
          Based on your spending patterns, you could save 2,500 MAD monthly by optimizing your inventory purchases.
          Click to see detailed analysis.
        </AlertDescription>
      </Alert>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-violet-500 to-violet-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Net Income</span>
              <TrendingUp className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180,190 MAD</div>
            <p className="text-sm opacity-85">↗ +12% vs last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Expected</span>
              <CreditCard className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">350,000 MAD</div>
            <p className="text-sm opacity-85">↗ 2% vs last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Total Expenses</span>
              <Wallet className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85,430 MAD</div>
            <p className="text-sm opacity-85">↘ -5% vs last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Cash Flow</span>
              <TrendingUp className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94,760 MAD</div>
            <p className="text-sm opacity-85">↗ +8% vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Trends */}
        <Card className="lg:col-span-2 bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <CardTitle>Revenue Trends</CardTitle>
            </div>
            <Tabs defaultValue="1y" className="space-y-4">
              <TabsList>
                <TabsTrigger value="1y">1y</TabsTrigger>
                <TabsTrigger value="6m">6m</TabsTrigger>
                <TabsTrigger value="1m">1m</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <IncomeChart />
          </CardContent>
        </Card>

        {/* Spending Breakdown */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingBreakdown />
          </CardContent>
        </Card>

        {/* AI Insights Section */}
        <Card className="lg:col-span-3 bg-white">
          <CardHeader>
            <CardTitle>AI-Powered Financial Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <AIInsights />
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-3 bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex items-center space-x-2">
              <Input 
                placeholder="Search transactions" 
                className="max-w-xs"
              />
              <Button variant="outline">Export</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Transaction rows... */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}