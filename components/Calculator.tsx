"use client"

import { useState } from "react"

export default function Calculator() {

const [display,setDisplay] = useState("")
const [memory,setMemory] = useState(0)

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

  // percentage handling
  exp = exp.replace(/(\d+)\+(\d+)%/, (_,a,b)=>
    Number(a) + (Number(a)*Number(b)/100)
  )

  exp = exp.replace(/(\d+)-(\d+)%/, (_,a,b)=>
    Number(a) - (Number(a)*Number(b)/100)
  )

  exp = exp.replace(/(\d+)\*(\d+)%/, (_,a,b)=>
    Number(a) * (Number(b)/100)
  )

  exp = exp.replace(/(\d+)\/(\d+)%/, (_,a,b)=>
    Number(a) / (Number(b)/100)
  )

  setDisplay(eval(exp).toString())

}catch{
  setDisplay("Error")
}

}

const memoryAdd = ()=>{
setMemory(memory + Number(display || 0))
}

const memorySub = ()=>{
setMemory(memory - Number(display || 0))
}

const memoryRecall = ()=>{
setDisplay(memory.toString())
}

const memoryClear = ()=>{
setMemory(0)
}

const btn = {
height:"60px",
fontSize:"18px",
borderRadius:"10px",
border:"none",
cursor:"pointer"
}

return(

<div
  style={{
    width:"360px",
    padding:"25px",
    borderRadius:"20px",
    background:"#1e293b",
    color:"white",
    boxShadow:"0 10px 30px rgba(0,0,0,0.6)"
  }}
>

  <div
    style={{
      fontSize:"30px",
      textAlign:"right",
      marginBottom:"15px",
      background:"#020617",
      padding:"12px",
      borderRadius:"8px"
    }}
  >
    {display || "0"}
  </div>

  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px"}}>

    <button style={btn} onClick={memoryClear}>MC</button>
    <button style={btn} onClick={memoryRecall}>MR</button>
    <button style={btn} onClick={memoryAdd}>M+</button>
    <button style={btn} onClick={memorySub}>M-</button>

    <button style={{...btn,background:"#ef4444"}} onClick={clear}>C</button>
    <button style={btn} onClick={back}>⌫</button>
    <button style={btn} onClick={()=>add("%")}>%</button>
    <button style={{...btn,background:"#f59e0b"}} onClick={()=>add("/")}>÷</button>

    <button style={btn} onClick={()=>add("7")}>7</button>
    <button style={btn} onClick={()=>add("8")}>8</button>
    <button style={btn} onClick={()=>add("9")}>9</button>
    <button style={{...btn,background:"#f59e0b"}} onClick={()=>add("*")}>×</button>

    <button style={btn} onClick={()=>add("4")}>4</button>
    <button style={btn} onClick={()=>add("5")}>5</button>
    <button style={btn} onClick={()=>add("6")}>6</button>
    <button style={{...btn,background:"#f59e0b"}} onClick={()=>add("-")}>−</button>

    <button style={btn} onClick={()=>add("1")}>1</button>
    <button style={btn} onClick={()=>add("2")}>2</button>
    <button style={btn} onClick={()=>add("3")}>3</button>
    <button style={{...btn,background:"#f59e0b"}} onClick={()=>add("+")}>+</button>

    <button style={btn} onClick={()=>add("0")}>0</button>
    <button style={btn} onClick={()=>add(".")}>.</button>

    <button
      style={{...btn,gridColumn:"span 2",background:"#22c55e"}}
      onClick={calculate}
    >
      =
    </button>

  </div>

</div>

)
}
