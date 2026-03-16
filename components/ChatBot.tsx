"use client"

import { useState } from "react"

export default function ChatBot() {

const [open,setOpen] = useState(false)
const [typing,setTyping] = useState(false)

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
setTyping(true)

setTimeout(()=>{

setTyping(false)

setMessages([
...newMessages,
{role:"bot",text:"I'm a demo AI assistant. Soon I will have real AI replies."}
])

},1200)

setInput("")
}

return(

<>

{/* META STYLE FLOATING AI BUTTON */}

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
zIndex:999,
boxShadow:"0 0 25px rgba(0,255,200,0.8)"
}}
>

<svg width="30" height="30" viewBox="0 0 24 24" fill="white">
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
display:"inline-block"
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

<span style={{animation:"blink 1s infinite"}}>●</span>
<span style={{animation:"blink 1s infinite 0.2s",marginLeft:"4px"}}>●</span>
<span style={{animation:"blink 1s infinite 0.4s",marginLeft:"4px"}}>●</span>

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
