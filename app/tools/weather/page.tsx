"use client"

import { useState } from "react"

export default function WeatherTool(){

  const [city,setCity] = useState("")
  const [data,setData] = useState<any>(null)

  const getWeather = async ()=>{

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
    )

    const result = await res.json()

    setData(result)

  }

  return(

    <div
      style={{
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
      }}
    >

      <h1 style={{fontSize:"40px",marginBottom:"30px"}}>
        Weather Tool
      </h1>

      <input
        placeholder="Enter City"
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        style={{padding:"10px",fontSize:"16px"}}
      />

      <button
        onClick={getWeather}
        style={{
          marginTop:"10px",
          padding:"10px 20px"
        }}
      >
        Get Weather
      </button>

      {data && (

        <div style={{marginTop:"20px"}}>

          <h2>{data.name}</h2>
          <p>{data.main.temp} °C</p>
          <p>{data.weather[0].main}</p>

        </div>

      )}

    </div>

  )
}
