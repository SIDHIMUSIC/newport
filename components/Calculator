"use client"

import { useState } from "react"

export default function ToolsPage(){

  const [display,setDisplay] = useState("")

  const handleClick = (value:string)=>{
    setDisplay(display + value)
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

  return(

    <div style={{padding:"40px"}}>

      <h1 style={{fontSize:"36px"}}>Calculator Tool</h1>

      <input
        value={display}
        readOnly
        style={{
          width:"200px",
          padding:"10px",
          fontSize:"18px",
          marginBottom:"10px"
        }}
      />

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(4,50px)",
        gap:"5px"
      }}>

        <button onClick={()=>handleClick("7")}>7</button>
        <button onClick={()=>handleClick("8")}>8</button>
        <button onClick={()=>handleClick("9")}>9</button>
        <button onClick={()=>handleClick("/")}>÷</button>

        <button onClick={()=>handleClick("4")}>4</button>
        <button onClick={()=>handleClick("5")}>5</button>
        <button onClick={()=>handleClick("6")}>6</button>
        <button onClick={()=>handleClick("*")}>×</button>

        <button onClick={()=>handleClick("1")}>1</button>
        <button onClick={()=>handleClick("2")}>2</button>
        <button onClick={()=>handleClick("3")}>3</button>
        <button onClick={()=>handleClick("-")}>-</button>

        <button onClick={()=>handleClick("0")}>0</button>
        <button onClick={()=>handleClick(".")}>.</button>
        <button onClick={calculate}>=</button>
        <button onClick={()=>handleClick("+")}>+</button>

        <button onClick={clear}>C</button>

      </div>

    </div>

  )
}
