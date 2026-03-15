"use client"

import { useState } from "react"

export default function Calculator() {

const [display,setDisplay] = useState("")

const add = (v:string)=>{
setDisplay(display + v)
}

const clear = ()=>{
setDisplay("")
}

const back = ()=>{
setDisplay(display.slice(0,-1))
}

const calculate = ()=>{

try{

  let exp = display

  // percentage fix (19+9%)
  if(exp.includes("%")){
    const parts = exp.split("+")
    if(parts.length === 2){
      const base = Number(parts[0])
      const percent = Number(parts[1].replace("%",""))
      const result = base + (base * percent / 100)
      setDisplay(result.toString())
      return
    }
  }

  setDisplay(eval(exp).toString())

}catch{
  setDisplay("Error")
}

}

const btnStyle = {
height:"65px",
fontSize:"20px",
borderRadius:"12px",
border:"none",
cursor:"pointer"
}

return(

<div
  style={{
    width:"350px",
    padding:"25px",
    borderRadius:"20px",
    background:"#1e293b",
    boxShadow:"0 10px 30px rgba(0,0,0,0.6)",
    color:"white"
  }}
>

  <div
    style={{
      fontSize:"32px",
      textAlign:"right",
      marginBottom:"20px",
      minHeight:"40px",
      background:"#0f172a",
      padding:"10px",
      borderRadius:"8px"
    }}
  >
    {display || "0"}
  </div>

  <div
    style={{
      display:"grid",
      gridTemplateColumns:"repeat(4,1fr)",
      gap:"10px"
    }}
  >

    <button style={{...btnStyle,background:"#ef4444"}} onClick={clear}>C</button>
    <button style={btnStyle} onClick={back}>⌫</button>
    <button style={btnStyle} onClick={()=>add("%")}>%</button>
    <button style={{...btnStyle,background:"#f59e0b"}} onClick={()=>add("/")}>÷</button>

    <button style={btnStyle} onClick={()=>add("7")}>7</button>
    <button style={btnStyle} onClick={()=>add("8")}>8</button>
    <button style={btnStyle} onClick={()=>add("9")}>9</button>
    <button style={{...btnStyle,background:"#f59e0b"}} onClick={()=>add("*")}>×</button>

    <button style={btnStyle} onClick={()=>add("4")}>4</button>
    <button style={btnStyle} onClick={()=>add("5")}>5</button>
    <button style={btnStyle} onClick={()=>add("6")}>6</button>
    <button style={{...btnStyle,background:"#f59e0b"}} onClick={()=>add("-")}>−</button>

    <button style={btnStyle} onClick={()=>add("1")}>1</button>
    <button style={btnStyle} onClick={()=>add("2")}>2</button>
    <button style={btnStyle} onClick={()=>add("3")}>3</button>
    <button style={{...btnStyle,background:"#f59e0b"}} onClick={()=>add("+")}>+</button>

    <button style={btnStyle} onClick={()=>add("0")}>0</button>
    <button style={btnStyle} onClick={()=>add(".")}>.</button>

    <button
      style={{
        ...btnStyle,
        gridColumn:"span 2",
        background:"#22c55e"
      }}
      onClick={calculate}
    >
      =
    </button>

  </div>

</div>

)
}
