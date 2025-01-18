// app/auth/chat/page.tsx
'use client'

import React, { useState } from 'react'
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, RefreshCw } from "lucide-react"

interface ChatMessage {
  text: string
  isUser: boolean
  timestamp: Date
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Marhaba! I'm your WeBudget AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const newMessage = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    setInputMessage('')

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I understand you're interested in financial analysis. Let me help you with that.",
        isUser: false,
        timestamp: new Date()
      }])
    }, 1000)
  }

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex h-screen">
      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4 bg-white">
          <div className="flex items-center space-x-4">
            <Avatar>
              <Bot className="h-5 w-5" />
            </Avatar>
            <div>
              <h2 className="font-semibold">WeBudget AI Assistant</h2>
              <p className="text-sm text-muted-foreground">Your financial advisor</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.isUser ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  {!message.isUser && (
                    <Avatar className="mt-0.5">
                      <Bot className="h-5 w-5" />
                    </Avatar>
                  )}
                  <Card className={`p-3 ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4 bg-white">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Ask me about financial analysis, budgeting, or business insights
          </p>
        </div>
      </div>
    </div>
  )
}