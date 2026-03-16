import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const { message } = await req.json()

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer":"http://localhost:3000",
        "X-Title":"Harry AI Assistant"
      },
      body:JSON.stringify({
        model:"deepseek/deepseek-chat",
        messages:[
          { role:"system", content:"You are Harry's AI assistant on Harry's portfolio website." },
          { role:"user", content:message }
        ]
      })
    })

    const data = await response.json()

    console.log("OpenRouter Response:", data)

    if (!response.ok) {
      return NextResponse.json({
        reply: data.error?.message || "OpenRouter API error"
      })
    }

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content || "AI response empty"
    })

  } catch (error) {

    console.log("SERVER ERROR:", error)

    return NextResponse.json({
      reply:"Server error"
    })

  }

}
