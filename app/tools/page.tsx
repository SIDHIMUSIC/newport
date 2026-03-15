"use client"

import { useState } from "react"

export default function ToolsPage() {

  const [num1,setNum1] = useState("")
  const [num2,setNum2] = useState("")
  const [result,setResult] = useState("")

  const calculate = () => {
    setResult(String(Number(num1) + Number(num2)))
  }

  return (

    <div style={{padding:"40px"}}>

      <h1 style={{fontSize:"32px"}}>Developer Tools</h1>

      <h2>Simple Calculator</h2>

      <input
        placeholder="Number 1"
        value={num1}
        onChange={(e)=>setNum1(e.target.value)}
      />

      <input
        placeholder="Number 2"
        value={num2}
        onChange={(e)=>setNum2(e.target.value)}
      />

      <button onClick={calculate}>
        Add
      </button>

      <p>Result: {result}</p>

    </div>
  )
}
