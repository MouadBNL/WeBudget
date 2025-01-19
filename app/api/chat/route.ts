import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

const systemPrompt = `You are WeBudget AI, a specialized financial advisor for Moroccan SMEs. You have expertise in:
- Financial analysis and reporting
- Budget optimization and cost management
- Cash flow forecasting and management
- Investment planning and strategy
- Moroccan tax regulations and compliance
- Islamic finance principles and products

Provide advice in a professional, clear manner. Use MAD (Moroccan Dirham) for all monetary values.
If appropriate, incorporate Arabic greetings and business terminology.
Focus on practical, actionable advice specific to the Moroccan business context.
Always provide specific examples and numbers when discussing financial concepts.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Start a chat
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    })

    // Prepare the chat history
    const chatHistory = messages.map((msg: any) => ({
      role: msg.role,
      text: msg.content
    }))

    // Add system prompt to the first message
    const userMessage = messages[messages.length - 1].content
    const prompt = messages.length === 1 
      ? `${systemPrompt}\n\nUser: ${userMessage}`
      : userMessage

    // Get response
    const result = await chat.sendMessage(prompt)
    const response = await result.response
    const text = response.text()

    // Create a stream from the response
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(text))
        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error: any) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'An error occurred while processing your request',
        status: error.status || 500
      },
      { status: error.status || 500 }
    )
  }
}