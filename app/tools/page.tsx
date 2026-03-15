import Link from "next/link"

export default function ToolsPage(){

  return(

    <div
      style={{
        padding:"60px",
        textAlign:"center"
      }}
    >

      <h1 style={{fontSize:"40px",marginBottom:"40px"}}>
        Developer Tools
      </h1>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
          gap:"20px",
          maxWidth:"700px",
          margin:"auto"
        }}
      >

        <Link href="/tools/calculator">
          <button style={{padding:"20px",fontSize:"18px"}}>
            Calculator
          </button>
        </Link>

        <Link href="/tools/weather">
          <button style={{padding:"20px",fontSize:"18px"}}>
            Weather
          </button>
        </Link>

        <Link href="/tools/password">
          <button style={{padding:"20px",fontSize:"18px"}}>
            Password Generator
          </button>
        </Link>

        <Link href="/tools/qr">
          <button style={{padding:"20px",fontSize:"18px"}}>
            QR Generator
          </button>
        </Link>

      </div>

    </div>

  )
}
