"use client"

import { useState } from "react"

export default function ChatBot(){

const [open,setOpen] = useState(false)

const [messages,setMessages] = useState([
{role:"bot",text:"Hi 👋 I'm Harry's AI assistant. Ask me anything."}
])

const [input,setInput] = useState("")

const sendMessage = async ()=>{

if(!input.trim()) return

const userMsg = input

setMessages(prev=>[
...prev,
{role:"user",text:userMsg}
])

setInput("")

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

setMessages(prev=>[
...prev,
{role:"bot",text:data.reply}
])

}catch{

setMessages(prev=>[
...prev,
{role:"bot",text:"AI error"}
])

}

}

return(

<>

{/* Floating button */}

<div
onClick={()=>setOpen(true)}
style={{
position:"fixed",
bottom:"30px",
left:"30px",
width:"60px",
height:"60px",
borderRadius:"50%",
background:"#22c55e",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer",
boxShadow:"0 0 20px #22c55e",
zIndex:999
}}
>

💬

</div>


{/* Chat Window */}

{open && (

<div
style={{
position:"fixed",
bottom:"100px",
left:"30px",
width:"320px",
height:"420px",
background:"#020617",
borderRadius:"16px",
display:"flex",
flexDirection:"column",
boxShadow:"0 0 35px rgba(0,255,150,0.5)",
zIndex:999
}}
>

{/* Header */}

<div
style={{
padding:"10px",
background:"#0f172a",
color:"white",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
borderTopLeftRadius:"16px",
borderTopRightRadius:"16px"
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


{/* Messages */}

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
textAlign:m.role==="user"?"right":"left"
}}
>

<span
style={{
background:m.role==="user"?"#22c55e":"#1e293b",
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

</div>


{/* Input */}

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
color:"white",
outline:"none"
}}
/>

<button
onClick={sendMessage}
style={{
padding:"10px 15px",
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
