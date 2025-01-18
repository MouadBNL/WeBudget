'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Bot } from "lucide-react"

interface ChatMessageProps {
  content: string
  role: 'assistant' | 'user'
  timestamp: Date
}

export function ChatMessage({ content, role, timestamp }: ChatMessageProps) {
  const isAssistant = role === 'assistant'

  return (
    <div className={`flex items-start space-x-4 ${!isAssistant && 'justify-end'}`}>
      {isAssistant && (
        <Avatar>
          <AvatarImage src="/bot-avatar.png" />
          <AvatarFallback>
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <Card 
        className={`p-4 max-w-[80%] ${
          isAssistant ? 'bg-primary/5' : 'bg-primary text-primary-foreground'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <time className="text-xs text-muted-foreground mt-2 block">
          {timestamp.toLocaleTimeString()}
        </time>
      </Card>
      {!isAssistant && (
        <Avatar>
          <AvatarImage src="/user-avatar.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}