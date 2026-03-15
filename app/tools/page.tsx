"use client"

import { useState } from "react"

export default function Weather(){

const API="5ece445b397ff6b757c3e2e92edc8a15"

const [city,setCity]=useState("")
const [data,setData]=useState<any>(null)
const [likes,setLikes]=useState(0)
const [dislikes,setDislikes]=useState(0)

const searchWeather=async()=>{

const res=await fetch(
"https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric"
)

const weather=await res.json()

setData(weather)

}

return(

<div style={{
minHeight:"100vh",
background:"linear-gradient(135deg,#020617,#0f172a,#020617)",
display:"flex",
flexDirection:"column",
alignItems:"center",
paddingTop:"80px",
color:"white"
}}><h1 style={{
fontSize:"40px",
marginBottom:"10px",
color:"#38bdf8"
}}>
ʜᴀʀʀʏ Weather Tool
</h1><p style={{opacity:0.7}}>
Live Weather Report
</p><div style={{
marginTop:"30px",
display:"flex",
gap:"10px"
}}><input
value={city}
onChange={(e)=>setCity(e.target.value)}
placeholder="Enter city"
style={{
padding:"12px",
borderRadius:"10px",
border:"1px solid #38bdf8",
background:"#020617",
color:"white"
}}
/>

<button
onClick={searchWeather}
style={{
padding:"12px 20px",
borderRadius:"10px",
border:"none",
background:"#38bdf8",
cursor:"pointer"
}}

«»

Search
</button>

</div>{data && data.main && (

<div style={{
marginTop:"40px",
padding:"30px",
borderRadius:"20px",
background:"rgba(15,23,42,0.8)",
boxShadow:"0 0 30px rgba(56,189,248,0.5)",
textAlign:"center",
width:"420px"
}}><h2>{data.name}</h2><img
src={"https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"}
/>

<h1 style={{fontSize:"60px"}}>
{data.main.temp}°C
</h1><p>{data.weather[0].main}</p><p>
Humidity {data.main.humidity}%
</p></div>)}

<div style={{
marginTop:"40px",
textAlign:"center"
}}><p>
If you loved and enjoyed this
</p><div style={{
display:"flex",
gap:"20px",
justifyContent:"center",
marginTop:"10px"
}}><button
onClick={()=>setLikes(likes+1)}
style={{
padding:"10px 20px",
borderRadius:"10px",
background:"#22c55e",
border:"none",
cursor:"pointer"
}}

«»

👍 {likes}
</button>

<button
onClick={()=>setDislikes(dislikes+1)}
style={{
padding:"10px 20px",
borderRadius:"10px",
background:"#ef4444",
border:"none",
cursor:"pointer"
}}

«»

👎 {dislikes}
</button>

</div></div></div>)

}
