"use client"

import { useState } from "react"

export default function Weather(){

const [city,setCity] = useState("")
const [weather,setWeather] = useState<any>(null)
const [error,setError] = useState("")

const getWeather = async () => {

try{

  setError("")
  setWeather(null)

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ece445b397ff6b757c3e2e92edc8a15&units=metric`
  )

  const data = await res.json()

  if(data.cod !== 200){
    setError("City not found")
    return
  }

  setWeather(data)

}catch{
  setError("Weather fetch failed")
}

}

return(

<div
  style={{
    background:"linear-gradient(135deg,#0f172a,#020617)",
    padding:"40px",
    borderRadius:"20px",
    width:"420px",
    textAlign:"center",
    color:"white",
    boxShadow:"0 0 30px rgba(56,189,248,0.4)"
  }}
>

  <h1
    style={{
      fontSize:"32px",
      marginBottom:"25px",
      color:"#38bdf8",
      textShadow:"0 0 15px #38bdf8"
    }}
  >
    Weather Tool
  </h1>

  <div>

    <input
      placeholder="Enter city"
      value={city}
      onChange={(e)=>setCity(e.target.value)}
      style={{
        padding:"12px",
        width:"65%",
        borderRadius:"10px",
        border:"1px solid #38bdf8",
        background:"#020617",
        color:"white",
        outline:"none",
        boxShadow:"0 0 10px rgba(56,189,248,0.5)"
      }}
    />

    <button
      onClick={getWeather}
      style={{
        marginLeft:"10px",
        padding:"12px 16px",
        borderRadius:"10px",
        border:"none",
        background:"#38bdf8",
        color:"#020617",
        fontWeight:"bold",
        cursor:"pointer",
        boxShadow:"0 0 12px #38bdf8"
      }}
    >
      Search
    </button>

  </div>

  {error && (
    <p style={{color:"red",marginTop:"20px"}}>
      {error}
    </p>
  )}

  {weather && (

    <div
      style={{
        marginTop:"30px",
        padding:"20px",
        borderRadius:"15px",
        background:"rgba(2,6,23,0.8)",
        boxShadow:"0 0 20px rgba(56,189,248,0.3)"
      }}
    >

      <h2 style={{fontSize:"28px"}}>
        {weather.name}
      </h2>

      <h1
        style={{
          fontSize:"48px",
          margin:"10px 0",
          color:"#38bdf8"
        }}
      >
        {weather.main.temp}°C
      </h1>

      <p style={{fontSize:"20px"}}>
        ☁ {weather.weather[0].main}
      </p>

      <p style={{marginTop:"10px"}}>
        💧 Humidity: {weather.main.humidity}%
      </p>

    </div>

  )}

</div>

)
}
