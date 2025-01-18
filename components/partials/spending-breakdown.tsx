'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const data = [
  { name: 'Inventory', value: 35000 },
  { name: 'Operations', value: 25000 },
  { name: 'Marketing', value: 15000 },
  { name: 'Utilities', value: 10000 },
]

const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#3b82f6']

export function SpendingBreakdown() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} MAD`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}