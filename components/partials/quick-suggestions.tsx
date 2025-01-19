'use client'

import { Button } from "@/components/ui/button"
import { 
  Calculator, 
  TrendingUp, 
  PiggyBank, 
  Calendar,
  FileText,
  Scale
} from "lucide-react"

interface QuickSuggestionProps {
  onSelect: (query: string) => void
}

export function QuickSuggestions({ onSelect }: QuickSuggestionProps) {
  const suggestions = [
    {
      icon: <Calculator className="w-4 h-4" />,
      label: "Financial Analysis",
      query: "Can you analyze my business financials if I share my monthly revenue of 50,000 MAD and expenses of 35,000 MAD?"
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: "Growth Strategy",
      query: "What are the best strategies to grow my small business in Morocco considering current market conditions?"
    },
    {
      icon: <PiggyBank className="w-4 h-4" />,
      label: "Cost Optimization",
      query: "How can I optimize my business costs while maintaining quality? Focus on practical steps for a Moroccan SME."
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      label: "Cash Flow Planning",
      query: "Help me create a 6-month cash flow forecast for my business, considering seasonal variations in Morocco."
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: "Tax Planning",
      query: "What are the key tax considerations and deadlines I should be aware of as a Moroccan SME owner?"
    },
    {
      icon: <Scale className="w-4 h-4" />,
      label: "Islamic Finance",
      query: "Can you explain the available Islamic finance options for expanding my business in Morocco?"
    }
  ]

  return (
    <div className="p-4 bg-muted/50 rounded-lg">
      <h3 className="text-sm font-medium mb-3">Quick Questions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="justify-start h-auto py-2"
            onClick={() => onSelect(suggestion.query)}
          >
            <div className="flex items-center space-x-2">
              {suggestion.icon}
              <span className="text-sm">{suggestion.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}



