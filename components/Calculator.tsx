"use client"

import { useState } from "react"

export default function Calculator() {

const [display,setDisplay] = useState("")

const add = (v:string)=>{
setDisplay(display + v)
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

const back = ()=>{
setDisplay(display.slice(0,-1))
}

const btnStyle = {
height:"65px",
fontSize:"20px",
borderRadius:"50%",
border:"none",
cursor:"pointer"
}

return(

<div
  style={{
    width:"340px",
    padding:"25px",
    borderRadius:"25px",
    backdropFilter:"blur(20px)",
    background:"rgba(30,41,59,0.8)",
    boxShadow:"0 15px 40px rgba(0,0,0,0.6)",
    color:"white"
  }}
>

  <div
    style={{
      fontSize:"34px",
      textAlign:"right",
      marginBottom:"25px",
      minHeight:"40px",
      overflow:"hidden"
    }}
  >
    {display || "0"}
  </div>

  <div
    style={{
      display:"grid",
      gridTemplateColumns:"repeat(4,1fr)",
      gap:"12px"
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

    <button style={{...btnStyle,gridColumn:"span 2",borderRadius:"30px"}} onClick={()=>add("0")}>0</button>
    <button style={btnStyle} onClick={()=>add(".")}>.</button>
    <button style={{...btnStyle,background:"#22c55e"}} onClick={calculate}>=</button>

  </div>

</div>

)
}
