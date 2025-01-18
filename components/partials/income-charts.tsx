'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const chartData = [
  { month: 'Feb 23', income: 15000 },
  { month: 'Mar 23', income: 20000 },
  { month: 'Apr 23', income: 30000 },
  { month: 'May 23', income: 28000 },
  { month: 'Jun 23', income: 22000 },
]

export function IncomeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="income" 
          stroke="#4F46E5" 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}