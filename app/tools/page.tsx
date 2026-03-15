import Link from "next/link"

export default function Tools(){

  return(

    <div style={{padding:"40px"}}>

      <h1 style={{fontSize:"40px"}}>
        Developer Tools
      </h1>

      <div style={{
        marginTop:"30px",
        display:"flex",
        gap:"20px"
      }}>

        <Link href="/tools/calculator">
          <button style={{
            padding:"20px",
            fontSize:"18px"
          }}>
            Calculator
          </button>
        </Link>

        <Link href="/tools/weather">
          <button style={{
            padding:"20px",
            fontSize:"18px"
          }}>
            Weather
          </button>
        </Link>

      </div>

    </div>

  )

}
