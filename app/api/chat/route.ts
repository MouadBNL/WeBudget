import { Groq } from 'groq-sdk'
import { NextResponse } from 'next/server'
import { getTransactions } from '@/app/actions/transactions'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

const systemPrompt = `You are WeBudget AI, a direct and concise financial advisor for Moroccan SMEs.

Core guidelines:
- Keep responses short and focused
- Use bullet points for lists
- Provide numbers and facts directly
- Skip pleasantries and unnecessary explanations
- Always use MAD for monetary values

When analyzing transactions:
• Total income/expenses
• Key category breakdown
• Brief actionable recommendations

Maintain professionalism but prioritize brevity. Include Arabic greetings only when explicitly discussing cultural context.`

// Function to check if query requires transaction data
function requiresTransactionData(query: string): boolean {
  const keywords = [
    'transactions', 'expenses', 'spending', 'income', 'revenue',
    'cash flow', 'budget', 'analysis', 'financial', 'stats',
    'summary', 'report', 'overview', 'trends', 'patterns'
  ]
  return keywords.some(keyword => query.toLowerCase().includes(keyword))
}

// Function to format transactions for AI context
function formatTransactionsForContext(transactions: any[]): string {
  if (!transactions || transactions.length === 0) {
    return "No data available."
  }

  const total = transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
  const categories = new Map()
  
  transactions.forEach(t => {
    if (t.category) {
      categories.set(t.category, (categories.get(t.category) || 0) + (t.amount || 0))
    }
  })

  let context = "Data Summary:\n"
  context += `Total: ${total} MAD\n`
  context += "Categories:\n"
  categories.forEach((amount, category) => {
    context += `${category}: ${amount} MAD\n`
  })

  return context
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestMessage = messages[messages.length - 1].content

    // Check if we need transaction data
    let transactionContext = ""
    if (requiresTransactionData(latestMessage)) {
      const { success, data } = await getTransactions()
      if (success && data) {
        transactionContext = formatTransactionsForContext(data)
      }
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        // Include transaction data if available
        ...(transactionContext ? [{
          role: 'system',
          content: transactionContext
        }] : []),
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content
        }))
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 1000,
      stream: true
    })

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content || ''
            controller.enqueue(encoder.encode(text))
          }
        } catch (error) {
          controller.error(error)
        }
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
    console.error('Chat API error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'An error occurred while processing your request',
        status: error.status || 500
      },
      { status: error.status || 500 }
    )
  }
}


/*
import { Groq } from 'groq-sdk'
import { NextResponse } from 'next/server'
import { filterTransactions } from '@/app/actions/transactions'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

// First prompt to extract filter criteria
const filterExtractionPrompt = `Extract transaction filter criteria from the query. Respond in JSON format only:
{
  "dateRange": { "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" } (if mentioned),
  "categories": [] (array of categories if mentioned),
  "minAmount": number (if mentioned),
  "maxAmount": number (if mentioned),
  "type": "income" or "expense" (if mentioned)
}
Only include fields that are relevant to the query.`

// Main system prompt for responses
const systemPrompt = `You are WeBudget AI, a direct and concise financial advisor for Moroccan SMEs.

Core guidelines:
- Keep responses short and focused
- Use bullet points for lists
- Provide numbers and facts directly
- Skip pleasantries and unnecessary explanations
- Always use MAD for monetary values

When analyzing transactions:
• Total income/expenses
• Key category breakdown
• Brief actionable recommendations

Maintain professionalism but prioritize brevity.`

function requiresTransactionData(query: string): boolean {
  const keywords = [
    'transactions', 'expenses', 'spending', 'income', 'revenue',
    'cash flow', 'budget', 'analysis', 'financial', 'stats',
    'summary', 'report', 'overview', 'trends', 'patterns'
  ]
  return keywords.some(keyword => query.toLowerCase().includes(keyword))
}

function formatTransactionsForContext(transactions: any[]): string {
  if (!transactions || transactions.length === 0) {
    return "No data available."
  }

  const total = transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
  const categories = new Map()
  
  transactions.forEach(t => {
    if (t.category) {
      categories.set(t.category, (categories.get(t.category) || 0) + (t.amount || 0))
    }
  })

  let context = "Data Summary:\n"
  context += `Total: ${total} MAD\n`
  context += "Categories:\n"
  categories.forEach((amount, category) => {
    context += `${category}: ${amount} MAD\n`
  })

  return context
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestMessage = messages[messages.length - 1].content

    let transactionContext = ""
    if (requiresTransactionData(latestMessage)) {
      // First, get filter criteria from AI
      const filterCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: filterExtractionPrompt
          },
          {
            role: 'user',
            content: latestMessage
          }
        ],
        model: 'mixtral-8x7b-32768',
        temperature: 0.1, // Lower temperature for more precise JSON
        max_tokens: 500,
        stream: false
      })

      try {
        // Ensure the content is not null or undefined
        const content = filterCompletion.choices[0]?.message?.content;
        if (!content) {
          throw new Error('Message content is null or undefined');
        }
        
        // Parse the filter criteria
        const filterCriteria = JSON.parse(content);

        // Get filtered transactions
        const { success, data } = await filterTransactions(filterCriteria);
        if (success && data) {
          transactionContext = formatTransactionsForContext(data);
        }
      } catch (e) {
        console.error('Error parsing filter criteria:', e)
      }
    }

    // Get the final response
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        ...(transactionContext ? [{
          role: 'system',
          content: transactionContext
        }] : []),
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content
        }))
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 1000,
      stream: true
    })

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content || ''
            controller.enqueue(encoder.encode(text))
          }
        } catch (error) {
          controller.error(error)
        }
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
    console.error('Chat API error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'An error occurred while processing your request',
        status: error.status || 500
      },
      { status: error.status || 500 }
    )
  }
}
  */