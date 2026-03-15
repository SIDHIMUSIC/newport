import Calculator from "@/components/Calculator"

export default function ToolsPage(){

return(

<div
  style={{
    height:"100vh",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    background:"#020617",
    color:"white"
  }}
>

  <h1 style={{fontSize:"40px",marginBottom:"30px"}}>
    Developer Tools
  </h1>

  <Calculator/>

</div>

)
}
