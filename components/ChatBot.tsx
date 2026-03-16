"use client"

import { useState } from "react"

export default function ChatBot(){

const API_KEY="YOUR_OPENROUTER_API_KEY"

const [open,setOpen]=useState(false)
const [typing,setTyping]=useState(false)

const [messages,setMessages]=useState([
{role:"bot",text:"Hi 👋 I'm Harry's AI assistant. Ask me anything."}
])

const [input,setInput]=useState("")

const sendMessage = async ()=>{

if(!input.trim()) return

const userMsg=input

setMessages(prev=>[
...prev,
{role:"user",text:userMsg}
])

setInput("")
setTyping(true)

try{

const res=await fetch(
"https://openrouter.ai/api/v1/chat/completions",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${API_KEY}`,
"HTTP-Referer":"https://your-site.com",
"X-Title":"Harry AI Assistant"
},
body:JSON.stringify({
model:"deepseek/deepseek-chat",
messages:[
{role:"system",content:"You are Harry's AI assistant on his website."},
{role:"user",content:userMsg}
]
})
}
)

const data=await res.json()

const reply=data.choices?.[0]?.message?.content || "AI error"

setTyping(false)

setMessages(prev=>[
...prev,
{role:"bot",text:reply}
])

}catch{

setTyping(false)

setMessages(prev=>[
...prev,
{role:"bot",text:"Error connecting to AI"}
])

}

}

return(

<>

{/* FLOATING BUTTON */}

<div
onClick={()=>setOpen(!open)}
style={{
position:"fixed",
bottom:"30px",
left:"30px",
width:"64px",
height:"64px",
borderRadius:"50%",
background:"linear-gradient(135deg,#00f5a0,#00d9f5,#7c3aed)",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer",
boxShadow:"0 0 25px rgba(0,255,200,0.9)",
zIndex:999
}}
>

<svg width="28" height="28" viewBox="0 0 24 24" fill="white">
<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
</svg>

</div>


{/* CHAT WINDOW */}

{open && (

<div
style={{
position:"fixed",
bottom:"110px",
left:"30px",
width:"330px",
height:"440px",
background:"#020617",
borderRadius:"16px",
boxShadow:"0 0 40px rgba(0,255,150,0.4)",
display:"flex",
flexDirection:"column",
overflow:"hidden",
zIndex:999
}}
>

{/* HEADER */}

<div
style={{
padding:"12px",
background:"#0f172a",
color:"white",
fontWeight:"bold",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<span>Harry AI Assistant</span>

<button
onClick={()=>setOpen(false)}
style={{
background:"none",
border:"none",
color:"white",
fontSize:"18px",
cursor:"pointer"
}}
>
✖
</button>

</div>


{/* MESSAGE AREA */}

<div
style={{
flex:1,
padding:"10px",
overflowY:"auto",
color:"white"
}}
>

{messages.map((m,i)=>(

<div
key={i}
style={{
marginBottom:"10px",
textAlign:m.role==="user" ? "right" : "left"
}}
>

<span
style={{
background:m.role==="user" ? "#22c55e" : "#1e293b",
padding:"8px 12px",
borderRadius:"12px",
display:"inline-block",
maxWidth:"80%"
}}
>

{m.text}

</span>

</div>

))}


{/* TYPING ANIMATION */}

{typing && (

<div style={{marginBottom:"10px"}}>

<span
style={{
background:"#1e293b",
padding:"8px 12px",
borderRadius:"12px",
display:"inline-block"
}}
>

<span>●</span>
<span style={{marginLeft:"4px"}}>●</span>
<span style={{marginLeft:"4px"}}>●</span>

</span>

</div>

)}

</div>


{/* INPUT */}

<div
style={{
display:"flex",
borderTop:"1px solid #334155"
}}
>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={(e)=>e.key==="Enter" && sendMessage()}
placeholder="Ask AI..."
style={{
flex:1,
padding:"10px",
border:"none",
background:"#020617",
color:"white"
}}
/>

<button
onClick={sendMessage}
style={{
padding:"10px 16px",
background:"#22c55e",
border:"none",
cursor:"pointer",
color:"white"
}}
>
Send
</button>

</div>

</div>

)}

</>

)

}
