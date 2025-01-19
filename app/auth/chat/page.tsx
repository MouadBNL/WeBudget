"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QuickSuggestions } from "@/components/partials/quick-suggestions";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chat() {
  // State management
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Marhaba! I'm your WeBudget AI assistant, specializing in financial advice for Moroccan SMEs. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Refs and hooks
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Handle new chat creation
  const handleNewChat = () => {
    setMessages([
      {
        text: "Marhaba! I'm your WeBudget AI assistant, specializing in financial advice for Moroccan SMEs. How can I assist you today?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  // Handle message sending
  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map((msg) => ({
            role: msg.isUser ? "user" : "assistant",
            content: msg.text,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponseText = "";

      if (!reader) {
        throw new Error("No response stream available");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        aiResponseText += chunk;

        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];

          if (!lastMessage.isUser) {
            lastMessage.text = aiResponseText;
          } else {
            newMessages.push({
              text: aiResponseText,
              isUser: false,
              timestamp: new Date(),
            });
          }

          return newMessages;
        });
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to get response. Please try again.",
        variant: "destructive",
      });

      // Remove the failed message attempt
      setMessages((prev) =>
        prev.filter((msg) => msg.text !== userMessage.text)
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-1 mt-auto h-full bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <Bot className="h-5 w-5" />
              </Avatar>
              <div>
                <h2 className="font-semibold">WeBudget AI Assistant</h2>
                <p className="text-sm text-muted-foreground">
                  Your financial advisor
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewChat}
              className="ml-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.isUser
                      ? "flex-row-reverse space-x-reverse"
                      : "flex-row"
                  }`}
                >
                  {!message.isUser && (
                    <Avatar className="mt-0.5">
                      <Bot className="h-5 w-5" />
                    </Avatar>
                  )}
                  <Card
                    className={`p-3 ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </Card>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4 bg-card">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Ask about financial analysis, budgeting, or business insights
            </p>
          </div>
        </div>
      </div>
      <div className="border-b p-4 bg-card">
        <QuickSuggestions
          onSelect={(query) => {
            setInputMessage(query);
            // Optional: automatically send the message
            // handleSend()
          }}
        />
      </div>
    </div>
  );
}
