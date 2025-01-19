import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BudgetDashboard() {
  // Sample data - In real app, this would come from your API
  const monthlyData = [
    { month: "Jan", spent: 4000, budget: 5000 },
    { month: "Feb", spent: 4500, budget: 5000 },
    { month: "Mar", spent: 3800, budget: 5000 },
    { month: "Apr", spent: 4200, budget: 5000 },
  ];

  const categories = [
    { name: "Operations", spent: 2500, budget: 3000, color: "bg-blue-600" },
    { name: "Marketing", spent: 1500, budget: 2000, color: "bg-green-600" },
    { name: "Inventory", spent: 3000, budget: 4000, color: "bg-purple-600" },
    { name: "Utilities", spent: 800, budget: 1000, color: "bg-orange-600" },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,000 MAD</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Spent This Month
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l5.1 5.1" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7,400 MAD</div>
            <p className="text-xs text-muted-foreground">
              74% of monthly budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,600 MAD</div>
            <p className="text-xs text-muted-foreground">
              26% remaining this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Budget by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{category.name}</span>
                  <span>
                    {Math.round((category.spent / category.budget) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(category.spent / category.budget) * 100}
                  className={category.color}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{category.spent} MAD spent</span>
                  <span>{category.budget} MAD budget</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spending Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Trends</CardTitle>
        </CardHeader>
        {/* <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="spent" stroke="#8884d8" />
                <Line type="monotone" dataKey="budget" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent> */}
      </Card>
    </div>
  );
}
