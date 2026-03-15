"use client"

import { useState, useEffect } from "react"

export default function Weather(){

const API="5ece445b397ff6b757c3e2e92edc8a15"

const [city,setCity] = useState("")
const [weather,setWeather] = useState<any>(null)
const [error,setError] = useState("")

const getWeatherByCity = async (cityName:string)=>{

try{

  setError("")

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}&units=metric`
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

const getLocationWeather = ()=>{

navigator.geolocation.getCurrentPosition(async (pos)=>{

  const lat=pos.coords.latitude
  const lon=pos.coords.longitude

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`
  )

  const data = await res.json()

  setWeather(data)

})

}

useEffect(()=>{
getLocationWeather()
},[])

return(

<div
  style={{
    minHeight:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"linear-gradient(-45deg,#020617,#0f172a,#1e293b,#020617)",
    backgroundSize:"400% 400%",
    animation:"gradient 15s ease infinite",
    color:"white"
  }}
>

  <div
    style={{
      padding:"40px",
      borderRadius:"20px",
      background:"rgba(2,6,23,0.8)",
      textAlign:"center",
      width:"400px",
      boxShadow:"0 0 25px rgba(56,189,248,0.4)"
    }}
  >

    <h1
      style={{
        fontSize:"32px",
        marginBottom:"20px",
        color:"#38bdf8"
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
          borderRadius:"10px",
          border:"1px solid #38bdf8",
          background:"#020617",
          color:"white"
        }}
      />

      <button
        onClick={()=>getWeatherByCity(city)}
        style={{
          marginLeft:"10px",
          padding:"12px",
          borderRadius:"10px",
          border:"none",
          background:"#38bdf8",
          cursor:"pointer"
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

      <div style={{marginTop:"30px"}}>

        <h2>{weather.name}</h2>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />

        <h1 style={{fontSize:"50px"}}>
          {weather.main.temp}°C
        </h1>

        <p style={{fontSize:"20px"}}>
          {weather.weather[0].main}
        </p>

        <p>
          💧 Humidity: {weather.main.humidity}%
        </p>

      </div>

    )}

  </div>

  <style jsx>{`

    @keyframes gradient {

      0% {background-position:0% 50%}

      50% {background-position:100% 50%}

      100% {background-position:0% 50%}

    }

  `}</style>

</div>

)

}
