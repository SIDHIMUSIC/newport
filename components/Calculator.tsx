"use client"

import { useState } from "react"

export default function Calculator(){

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
        width:"300px",
        background:"#1e293b",
        padding:"20px",
        borderRadius:"10px",
        color:"white"
      }}
    >

      <input
        value={display}
        readOnly
        style={{
          width:"100%",
          padding:"15px",
          fontSize:"22px",
          marginBottom:"15px",
          borderRadius:"6px"
        }}
      />

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(4,1fr)",
          gap:"10px"
        }}
      >

        <button onClick={clear} style={{background:"#ef4444"}}>C</button>
        <button onClick={backspace}>⌫</button>
        <button onClick={()=>addValue("%")}>%</button>
        <button onClick={()=>addValue("/")}>÷</button>

        <button onClick={()=>addValue("7")}>7</button>
        <button onClick={()=>addValue("8")}>8</button>
        <button onClick={()=>addValue("9")}>9</button>
        <button onClick={()=>addValue("*")}>×</button>

        <button onClick={()=>addValue("4")}>4</button>
        <button onClick={()=>addValue("5")}>5</button>
        <button onClick={()=>addValue("6")}>6</button>
        <button onClick={()=>addValue("-")}>−</button>

        <button onClick={()=>addValue("1")}>1</button>
        <button onClick={()=>addValue("2")}>2</button>
        <button onClick={()=>addValue("3")}>3</button>
        <button onClick={()=>addValue("+")}>+</button>

        <button onClick={()=>addValue("0")}>0</button>
        <button onClick={()=>addValue(".")}>.</button>
        <button
          onClick={calculate}
          style={{
            gridColumn:"span 2",
            background:"#22c55e"
          }}
        >
          =
        </button>

      </div>

    </div>

  )
}
