"use client"

import { useState } from "react"

export default function ChatBot(){

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

const res = await fetch("/api/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:userMsg
})
})

const data = await res.json()

setTyping(false)

setMessages(prev=>[
...prev,
{role:"bot",text:data.reply}
])

}catch{

setTyping(false)

setMessages(prev=>[
...prev,
{role:"bot",text:"AI server error"}
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

💬

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
justifyContent:"space-between"
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


{/* MESSAGES */}

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

{typing && (

<div>

<span
style={{
background:"#1e293b",
padding:"8px 12px",
borderRadius:"12px"
}}
>

Typing...

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
