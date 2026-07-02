import "./interface_porta.css"
import { Html } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Texto_3d from "../../componentes_auxiliares/texto_3d"
import { Text3D } from "@react-three/drei"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"


export default function Interface_porta({proximo_caminho, voltar_caminho , ...props}) {

  const interface_referencia = useRef(null)
  const [escala, set_escala] = useState(0) // Use useState, não useRef para animações de render

  useFrame(() => {

    if (escala >= 1 || !interface_referencia.current) return

    set_escala((prev) => {return prev + 0.02})

  })

  return (
    <Html 
      {...props} 
      
      escala={1} // Passa o estado para a prop scale
      style={{ 

        position: "static",

        transformOrigin: "center center",

      }} 
    >

      <div className="interface-porta" ref={ interface_referencia} style={{scale : escala}} >

        <div className="topo">

          <h1 className="titulo">SOBRE MIM</h1>

        </div>

        <div className="fundo-porta">

          <p>Desenvolvedor full-stack com foco em aplicacoes interativas, inovadoras e acessiveis</p>

          <br />

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, esse. Ipsum aspernatur facere sunt dolore laborum molestiae cum nemo officia nulla corporis ab officiis possimus, rem sint tempore tenetur? Alias!</p>
    
          <div className="curriculo">

            <a href="/curriculo/curriculo.pdf" download>Baixar curriculo</a>

          </div>

          <div className="controle-caminhos">

              <h1 className="botao" onClick={() => {proximo_caminho("porta") }}>AVANCAR PARA JORNADA</h1>

          </div>

        </div>

      </div>

    </Html>
  )
}
