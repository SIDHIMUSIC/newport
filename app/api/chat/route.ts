import { NextResponse } from "next/server"

export async function POST(req: Request){

try{

const { message } = await req.json()

const res = await fetch(
"https://openrouter.ai/api/v1/chat/completions",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`
},
body:JSON.stringify({
model:"meta-llama/llama-3-8b-instruct",
messages:[
{role:"system",content:"You are Harry's AI assistant."},
{role:"user",content:message}
]
})
}
)

const data = await res.json()

return NextResponse.json({
reply:data.choices?.[0]?.message?.content || "AI failed"
})

}catch{

return NextResponse.json({
reply:"Server error"
})

}

}
