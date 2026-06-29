import "./interface_porta.css"
import { Html } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Texto_3d from "../../componentes_auxiliares/texto_3d"
import { Text3D } from "@react-three/drei"
import { OrbitControls, ScrollControls } from "@react-three/drei"
import { useState, useEffect } from "react"

export default function Interface_porta({proximo_caminho, voltar_caminho , ...props}) {

  return (

    <Html {...props} style={{ position: "static" }}>

      <div className="interface-porta">

        <div className="topo">

          <h1>SOBRE MIM</h1>

        </div>

        <div className="fundo-porta">

          <p>Desenvolvedor full-stack com foco em aplicacoes interativas, inovadoras e acessiveis</p>

          <br />

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, esse. Ipsum aspernatur facere sunt dolore laborum molestiae cum nemo officia nulla corporis ab officiis possimus, rem sint tempore tenetur? Alias!</p>

    
          <div className="curriculo" onClick={() => console.log("aaa")} >

            <a href="/curriculo/curriculo.pdf" download>Baixar curriculo</a>

          </div>

          <div className="controle-caminhos">

              <h1 className="botao" onClick={() => proximo_caminho("porta")}>AVANCAR PARA JORNADA</h1>

          </div>

        </div>

      </div>
    </Html>
  )
}
