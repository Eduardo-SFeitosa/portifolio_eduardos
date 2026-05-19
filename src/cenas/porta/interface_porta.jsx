import "./interface_porta.css"
import { Html } from "@react-three/drei"

export default function Interface_porta({ avancar_caminho, retornar_caminho, ...props}) {
    
  return (

    <Html {...props} style={{ position: "static" }} onClick={console.log("aaa")}>

      <div className="interface-porta">

        <div className="topo">

          <h1>SOBRE MIM</h1>

        </div>

        <div className="fundo-porta">

          <h1>TESTE</h1>

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia fugit commodi rem magnam praesentium error sed expedita velit iure vero excepturi minus molestias enim optio, labore aut libero mollitia.

        </div>

        <div className="curriculo" onClick={() => console.log("aaa")} >

          <h2>Baixar curriculo</h2>

        </div>

      </div>
    </Html>
  )
}
