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
        background:"#1e293b",
        padding:"30px",
        borderRadius:"15px",
        color:"white",
        width:"350px",
        textAlign:"center"
      }}
    >

      <h2 style={{fontSize:"28px",marginBottom:"20px"}}>
        Weather Tool
      </h2>

      <input
        placeholder="Enter city"
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        style={{
          padding:"10px",
          width:"70%",
          borderRadius:"8px",
          border:"none"
        }}
      />

      <button
        onClick={getWeather}
        style={{
          marginLeft:"10px",
          padding:"10px",
          borderRadius:"8px",
          border:"none",
          background:"#38bdf8",
          color:"black",
          cursor:"pointer"
        }}
      >
        Search
      </button>

      {error && (
        <p style={{color:"red",marginTop:"15px"}}>
          {error}
        </p>
      )}

      {weather && (

        <div style={{marginTop:"20px"}}>

          <h3>{weather.name}</h3>

          <p>🌡 Temperature: {weather.main.temp} °C</p>

          <p>☁ Weather: {weather.weather[0].main}</p>

          <p>💧 Humidity: {weather.main.humidity}%</p>

        </div>

      )}

    </div>

  )
}
