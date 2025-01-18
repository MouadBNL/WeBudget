import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowUpRight, HandCoins, TrendingDown, Wallet } from "lucide-react";

export default function ProfitCard() {
  return (
    <Card className="p-4 border rounded-lg shadow-sm">
      <div className="flex justify-between items-center p-0 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Total Profit</h4>
          <p className="text-2xl font-semibold text-gray-900">$20,190.00</p>
        </div>
        <div className="p-2 bg-orange-100 rounded-md text-orange-600">
          <HandCoins />
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <ArrowUpRight className="h-4 w-4 text-green-500 mr-2" />
        <span className="font-medium text-green-500">8%</span>
        <span className="ml-1">vs last month</span>
      </div>
    </Card>
  );
}
