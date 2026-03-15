import Link from "next/link"

export default function Tools(){

  return(

    <div style={{
      minHeight:"100vh",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      background:"#020617",
      color:"white"
    }}>

      <h1 style={{
        fontSize:"50px",
        marginBottom:"40px"
      }}>
        ʜᴀʀʀʏ Developer Tools
      </h1>

      <div style={{
        display:"flex",
        gap:"30px"
      }}>

        <Link href="/tools/calculator">

          <button style={{
            padding:"20px 40px",
            fontSize:"20px",
            borderRadius:"12px",
            border:"none",
            background:"#38bdf8",
            cursor:"pointer"
          }}>
            Calculator
          </button>

        </Link>

        <Link href="/tools/weather">

          <button style={{
            padding:"20px 40px",
            fontSize:"20px",
            borderRadius:"12px",
            border:"none",
            background:"#22c55e",
            cursor:"pointer"
          }}>
            Weather
          </button>

        </Link>

      </div>

    </div>

  )

}
