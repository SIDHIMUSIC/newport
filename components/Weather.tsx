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
background:"linear-gradient(180deg,#020617,#0f172a,#020617)",
overflow:"hidden",
position:"relative",
color:"white",
display:"flex",
flexDirection:"column",
alignItems:"center",
paddingTop:"100px"

}}>

{/* CLOCK */}

<div style={{

position:"absolute",
top:"20px",
right:"30px",
fontSize:"28px",
color:"#ff2d55",
textShadow:"0 0 10px red"

}}>
{time}
</div>


{/* CLOUDS */}

<div style={{
position:"absolute",
top:"60px",
width:"200%",
height:"200px",
background:"url('https://i.ibb.co/7QpKsCX/clouds.png') repeat-x",
animation:"cloudMove 60s linear infinite",
opacity:0.4
}}></div>


{/* SUN */}

<div style={{

position:"absolute",
top:"80px",
left:"80px",
width:"120px",
height:"120px",
background:"radial-gradient(circle,#facc15,#f97316)",
borderRadius:"50%",
boxShadow:"0 0 60px #facc15",
animation:"spin 20s linear infinite"

}}></div>


<h1 style={{

fontSize:"42px",
color:"#38bdf8",
marginBottom:"10px"

}}>
ʜᴀʀʀʏ Weather Tool
</h1>


<div style={{

display:"flex",
gap:"10px",
marginTop:"20px"

}}>

<input

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
background:"#38bdf8",
border:"none",
cursor:"pointer"

}}

>
Search
</button>

</div>


{data && data.main && (

<div style={{

marginTop:"40px",
padding:"30px",
borderRadius:"20px",
background:"rgba(15,23,42,0.9)",
boxShadow:"0 0 40px #38bdf8",
textAlign:"center",
width:"420px"

}}>

<h2>{data.name}</h2>

<img
src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
/>

<h1 style={{fontSize:"64px"}}>
{data.main.temp}°C
</h1>

<p>{data.weather[0].main}</p>

<p>
Humidity {data.main.humidity}%
</p>

</div>

)}

<style jsx>{`

@keyframes cloudMove{

0%{transform:translateX(0)}
100%{transform:translateX(-50%)}

}

@keyframes spin{

0%{transform:rotate(0deg)}
100%{transform:rotate(360deg)}

}

`}</style>

</div>

)

}
