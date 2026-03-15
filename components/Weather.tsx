"use client"

import { useState,useEffect } from "react"

export default function Weather(){

const API="5ece445b397ff6b757c3e2e92edc8a15"

const [city,setCity]=useState("")
const [data,setData]=useState<any>(null)
const [time,setTime]=useState("")

useEffect(()=>{
setInterval(()=>{
const now=new Date()
setTime(now.toLocaleTimeString())
},1000)
},[])

const searchWeather=async()=>{

const res=await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
)

const weather=await res.json()

setData(weather)

}

return(

<div style={{

minHeight:"100vh",
width:"100%",
background:"linear-gradient(180deg,#020617,#0f172a,#020617)",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
color:"white",
position:"relative",
overflow:"hidden"

}}>

{/* Neon Clock */}

<div style={{

position:"absolute",
top:"25px",
right:"40px",
fontSize:"36px",
fontFamily:"monospace",
color:"#ff2d55",
textShadow:"0 0 10px red,0 0 20px red"

}}>
{time}
</div>


{/* Sun background */}

<div style={{

position:"absolute",
top:"120px",
right:"150px",
width:"180px",
height:"180px",
borderRadius:"50%",
background:"radial-gradient(circle,#fde047,#facc15,#f97316)",
boxShadow:"0 0 120px #facc15",
opacity:0.7,
zIndex:0

}}></div>


{/* Main Weather Card */}

<div style={{

width:"520px",
padding:"40px",
borderRadius:"20px",
background:"rgba(15,23,42,0.85)",
boxShadow:"0 0 60px rgba(56,189,248,0.6)",
textAlign:"center",
zIndex:1

}}>

<h1 style={{
fontSize:"40px",
color:"#38bdf8",
marginBottom:"20px"
}}>
ʜᴀʀʀʏ Weather Tool
</h1>


<div style={{
display:"flex",
gap:"10px",
justifyContent:"center"
}}>

<input

value={city}
onChange={(e)=>setCity(e.target.value)}
placeholder="Enter city"

style={{

padding:"14px",
width:"260px",
borderRadius:"10px",
border:"1px solid #38bdf8",
background:"#020617",
color:"white",
fontSize:"16px"

}}

/>

<button

onClick={searchWeather}

style={{

padding:"14px 25px",
borderRadius:"10px",
border:"none",
background:"#38bdf8",
cursor:"pointer",
fontSize:"16px"

}}

>
Search
</button>

</div>


{data && data.main && (

<div style={{
marginTop:"35px"
}}>

<h2 style={{fontSize:"26px"}}>{data.name}</h2>

<img
src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
/>

<h1 style={{
fontSize:"70px",
margin:"10px 0"
}}>
{data.main.temp}°C
</h1>

<p style={{fontSize:"20px"}}>
{data.weather[0].main}
</p>

<p>
Humidity {data.main.humidity}%
</p>

</div>

)}

</div>

</div>

)

}
