"use client"

import { useState } from "react"

export default function Calculator() {

  const [display,setDisplay] = useState("")

  const addValue = (val:string)=>{
    setDisplay(display + val)
  }

  const calculate = ()=>{
    try{
      setDisplay(eval(display).toString())
    }catch{
      setDisplay("Error")
    }
  }

  const clear = ()=>{
    setDisplay("")
  }

  const backspace = ()=>{
    setDisplay(display.slice(0,-1))
  }

  return(

    <div
      style={{
        width:"380px",
        background:"#0f172a",
        padding:"25px",
        borderRadius:"15px",
        boxShadow:"0px 10px 25px rgba(0,0,0,0.5)",
        color:"white"
      }}
    >

      <input
        value={display}
        readOnly
        style={{
          width:"100%",
          padding:"18px",
          fontSize:"24px",
          marginBottom:"20px",
          borderRadius:"8px",
          border:"none",
          background:"#1e293b",
          color:"white",
          textAlign:"right",
          overflow:"hidden"
        }}
      />

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(4,1fr)",
          gap:"12px"
        }}
      >

        <button onClick={clear} style={{background:"#ef4444",padding:"15px"}}>C</button>
        <button onClick={backspace} style={{padding:"15px"}}>⌫</button>
        <button onClick={()=>addValue("%")} style={{padding:"15px"}}>%</button>
        <button onClick={()=>addValue("/")} style={{padding:"15px"}}>÷</button>

        <button onClick={()=>addValue("7")} style={{padding:"15px"}}>7</button>
        <button onClick={()=>addValue("8")} style={{padding:"15px"}}>8</button>
        <button onClick={()=>addValue("9")} style={{padding:"15px"}}>9</button>
        <button onClick={()=>addValue("*")} style={{padding:"15px"}}>×</button>

        <button onClick={()=>addValue("4")} style={{padding:"15px"}}>4</button>
        <button onClick={()=>addValue("5")} style={{padding:"15px"}}>5</button>
        <button onClick={()=>addValue("6")} style={{padding:"15px"}}>6</button>
        <button onClick={()=>addValue("-")} style={{padding:"15px"}}>−</button>

        <button onClick={()=>addValue("1")} style={{padding:"15px"}}>1</button>
        <button onClick={()=>addValue("2")} style={{padding:"15px"}}>2</button>
        <button onClick={()=>addValue("3")} style={{padding:"15px"}}>3</button>
        <button onClick={()=>addValue("+")} style={{padding:"15px"}}>+</button>

        <button onClick={()=>addValue("0")} style={{padding:"15px"}}>0</button>
        <button onClick={()=>addValue(".")} style={{padding:"15px"}}>.</button>

        <button
          onClick={calculate}
          style={{
            gridColumn:"span 2",
            background:"#22c55e",
            padding:"15px"
          }}
        >
          =
        </button>

      </div>

    </div>

  )
}
