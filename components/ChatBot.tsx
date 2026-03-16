"use client"

import { useState } from "react"

export default function ChatBot(){

const [open,setOpen]=useState(false)
const [messages,setMessages]=useState([
{role:"bot",text:"Hi 👋 I'm Harry's AI assistant."}
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

}

return(

<>

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
cursor:"pointer"
}}
>

💬

</div>

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
flexDirection:"column"
}}
>

<div
style={{
padding:"12px",
background:"#0f172a",
color:"white",
display:"flex",
justifyContent:"space-between"
}}
>

Harry AI

<button
onClick={()=>setOpen(false)}
style={{
background:"none",
border:"none",
color:"white"
}}
>
✖
</button>

</div>

<div style={{flex:1,padding:"10px",overflowY:"auto"}}>

{messages.map((m,i)=>(
<div key={i} style={{marginBottom:"10px"}}>
{m.text}
</div>
))}

</div>

<div style={{display:"flex"}}>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
style={{flex:1}}
/>

<button onClick={sendMessage}>
Send
</button>

</div>

</div>

)}

</>

)

}
