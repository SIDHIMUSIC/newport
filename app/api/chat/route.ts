import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const { message } = await req.json()

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer":"http://localhost:3000",
        "X-Title":"Harry AI Assistant"
      },
      body:JSON.stringify({
        model:"meta-llama/llama-3-8b-instruct",
        messages:[
          {role:"system",content:"You are Harry's helpful AI assistant."},
          {role:"user",content:message}
        ]
      })
    })

    const data = await res.json()

    console.log("AI response:",data)

    return NextResponse.json({
      reply:data.choices?.[0]?.message?.content || "AI failed"
    })

  } catch (err) {

    console.log(err)

    return NextResponse.json({
      reply:"Server AI error"
    })

  }

}
