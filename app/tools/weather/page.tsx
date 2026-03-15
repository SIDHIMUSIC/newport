import Weather from "@/components/Weather"

export default function WeatherPage(){

  return(

    <div
      style={{
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }}
    >

      <Weather/>

    </div>

  )
}
