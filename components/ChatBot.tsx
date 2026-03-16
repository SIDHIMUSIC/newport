"use client"

import { useState } from "react"

export default function ChatBot() {

const [open,setOpen] = useState(false)

const [messages,setMessages] = useState([
{role:"bot",text:"Hi 👋 I'm Harry's AI assistant. How can I help you?"}
])

const [input,setInput] = useState("")

const sendMessage = () => {

if(!input.trim()) return

const newMessages = [
...messages,
{role:"user",text:input}
]

setMessages(newMessages)

setTimeout(()=>{

setMessages([
...newMessages,
{role:"bot",text:"I'm a demo assistant. Soon I will have real AI replies."}
])

},600)

setInput("")

}

return(

<>

{/* Floating Button */}

<div
onClick={()=>setOpen(!open)}
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
zIndex:999,
fontSize:"22px"
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
boxShadow:"0 0 30px rgba(0,255,150,0.4)",
display:"flex",
flexDirection:"column",
overflow:"hidden",
zIndex:999
}}
>

{/* Header */}

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
textAlign:m.role==="user" ? "right" : "left"
}}
>

<span
style={{
background:m.role==="user" ? "#22c55e" : "#1e293b",
padding:"8px 12px",
borderRadius:"12px",
display:"inline-block"
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
placeholder="Type message..."
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
padding:"10px 14px",
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
