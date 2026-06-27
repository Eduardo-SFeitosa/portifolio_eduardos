import "./interface_porta.css"
import { Html } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Texto_3d from "../../componentes_auxiliares/texto_3d"
import { OrbitControls, ScrollControls } from "@react-three/drei"
import { useState, useEffect } from "react"

export default function Interface_porta({proximo_caminho, voltar_caminho , ...props}) {

  const [texto, setTexto] = useState("")

  const script = `
  <h1>TESTE</h1>

          <p>Desenvolvedor full-stack com foco em aplicacoes interativas, inovadoras e acessiveis</p>

          <br />

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, esse. Ipsum aspernatur facere sunt dolore laborum molestiae cum nemo officia nulla corporis ab officiis possimus, rem sint tempore tenetur? Alias!</p>

  `    

  useEffect(() => {
      const interval = setInterval(() => {
        setTexto(prev => prev + script[prev.length])
      }, 100)

      return () => clearInterval(interval)
    }, [])

  return (

    <Html {...props} style={{ position: "static" }}>

      <Canvas className="canvas-porta" camera={{ position: [0, 0, 13] }}>

        <OrbitControls></OrbitControls>

        <ambientLight intensity={1} />

        <Texto_3d
        size={10}
        texto={texto}
        />

      </Canvas>


      <div className="interface-porta">

        <div className="topo">

          <h1>SOBRE MIM</h1>

        </div>

        <div className="fundo-porta">

          <h1>TESTE</h1>

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
