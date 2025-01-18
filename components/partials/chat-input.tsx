'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SendHorizontal, Paperclip } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  onAttachFile?: (file: File) => void
}

export function ChatInput({ onSendMessage, onAttachFile }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t p-4">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <Paperclip className="h-4 w-4" />
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file && onAttachFile) {
                onAttachFile(file)
              }
            }}
          />
        </Button>
        <Input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..." 
          className="flex-1"
        />
        <Button size="icon" onClick={handleSend}>
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Try asking about: expense analysis, cash flow forecasting, or investment advice
      </div>
    </div>
  )
}