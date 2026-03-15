"use client"

import { useState } from "react"

export default function Weather(){

  const [city,setCity] = useState("")
  const [data,setData] = useState<any>(null)

  const getWeather = async ()=>{

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ece445b397ff6b757c3e2e92edc8a15&units=metric`
    )

    const result = await res.json()

    setData(result)

  }

  return(

    <div style={{textAlign:"center"}}>

      <h2>Weather Tool</h2>

      <input
        placeholder="Enter city"
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        style={{padding:"10px"}}
      />

      <button
        onClick={getWeather}
        style={{marginLeft:"10px"}}
      >
        Search
      </button>

      {data && (

        <div style={{marginTop:"20px"}}>

          <h3>{data.name}</h3>
          <p>Temp: {data.main.temp} °C</p>
          <p>{data.weather[0].main}</p>

        </div>

      )}

    </div>

  )
}
