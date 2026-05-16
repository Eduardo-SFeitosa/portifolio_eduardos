import "./App.css"

import { useState, useEffect, useRef } from "react"

import { Canvas } from "@react-three/fiber"

import { OrbitControls, ScrollControls } from "@react-three/drei"

import Controle_de_camera from "./componentes_auxiliares/controle_de_camera"

import ModeloBase from "./modelos_auxiliares/modelo_base"

import AguaAnimada from "./modelos_auxiliares/agua_animada"

import BauDoTesouro from "./cenas/bau/bau_do_tesouro"

import Acampamento from "./cenas/acampamento/acampamento"

import Porta from "./cenas/porta/porta"

import Orbe from "./cenas/orbe/orbe"

import Mina from "./cenas/mina/mina"

import EstrelaEstatica from "./modelos_auxiliares/estrela_estatica_circulo"

function App() {

  const [cena_em_foco , set_cena_em_foco] = useState(null)

  const [caminho_atual , set_caminho] = useState("porta")

  const referencia_camera = useRef(null)

  const controle_de_camera_ref = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {

      const cam = referencia_camera.current

      console.log(`rotation [${cam.rotation.x.toFixed(2)}, ${cam.rotation.y.toFixed(2)}, ${cam.rotation.z.toFixed(2)}]`);

      console.log(`position [${cam.position.x.toFixed(2)}, ${cam.position.y.toFixed(2)}, ${cam.position.z.toFixed(2)}]`);
      
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup: remove listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const posicao_de_cenas = {

    porta : {
      posicao : [-8.71, 0.77, 1.89],
      rotacao : [-3.11, 0.01, 3.14]
    },

    acampamento : {
      posicao : [-4.48, 3.11, 12.61],
      rotacao : [-1.81, 1.10, 1.83]
    },

    orbe : {
      posicao : [2.64, 4.47, 2.00],
      rotacao : [-1.81, 1.33, 1.82]
    },

    mina : {
      posicao : [8.82, 2.99, -3.56],
      rotacao : [-2.11, -0.56, -2.41]
    },

    bau : {
      posicao : [-2.34, 1.59, -15.88],
      rotacao : [-0.49, -0.54, -0.27]
    },

  }

  const proximo_caminho = (cena) => {
    
    if (cena && cena == caminho_atual) {

      controle_de_camera_ref.current.resetar_scroll()

      console.log(controle_de_camera_ref.current.progresso_scroll())

      const cenas_ordem = Object.keys(posicao_de_cenas)

      const index_atual = cenas_ordem.indexOf(cena)

      set_cena_em_foco(cena)

      if ( cenas_ordem.length > index_atual + 1){

        set_caminho(cenas_ordem[index_atual + 1])

      }

    }else {

      set_cena_em_foco(null)

    }
    
  }

  const voltar_caminho = ( cena ) => {

    if (cena && cena == caminho_atual) {

      const cenas_ordem = Object.keys(posicao_de_cenas)

      const index_atual = cenas_ordem.indexOf(cena)

      if ( 0 < index_atual - 1 ){

        set_caminho(cenas_ordem[index_atual - 1])

        set_cena_em_foco(null)

      }

    }

  }

  return (

    <>

      <Canvas onCreated={(state) => {
        referencia_camera.current = state.camera
      }} id="canvas">   

        <ScrollControls pages={cena_em_foco == null ? 4 : 0} damping={0.6} enabled={cena_em_foco == null}>

          <Controle_de_camera
            referencia_camera={referencia_camera}
            ref={controle_de_camera_ref}
            caminho_atual={caminho_atual}
            camera_travada={cena_em_foco != null}
            
          >

          </Controle_de_camera>

          {/* 

            <Controle_de_camera
            referencia_camera={referencia_camera}
            caminho_atual={caminho_atual}
            camera_travada={cena_em_foco != null}
            
            >

            </Controle_de_camera>

            <OrbitControls/>
          
          */}

          < directionalLight position={[2, 5, 3]} intensity={1.2} />

            < pointLight position={[0, 1, 0]} intensity={0.5} color={"#4466cc"} />

            < ambientLight />

            < ModeloBase />

            <BauDoTesouro proximo_caminho={proximo_caminho} voltar_caminho={voltar_caminho} position={[-.9, 0, -17.8]} rotation={[ 0, -.7, 0]} />

            <Acampamento proximo_caminho={proximo_caminho} voltar_caminho={voltar_caminho} position={[ -6.2 , 2 , 13 ]} />

            <Porta proximo_caminho={proximo_caminho} voltar_caminho={voltar_caminho} position={[ -8.8, .1, 2.9 ]} />

            <Orbe proximo_caminho={proximo_caminho} voltar_caminho={voltar_caminho} position={[ 1.3, 3, 2 ]} />

            <Mina proximo_caminho={proximo_caminho} voltar_caminho={voltar_caminho} position={[ 9.222 , 1.975 , -3.066 ]} />

            < EstrelaEstatica nome="estrelasEsquerda" position={[ -25, 15, 0 ]} largura={10} altura={20} profundidade={20} particulas={800} />

            < EstrelaEstatica nome="estrelasDireita" position={[ 25, 15, 0 ]} largura={10} altura={20} profundidade={20} particulas={800}/>

            < EstrelaEstatica nome="estrelasFrente" position={[ 0, 15, 25 ]} largura={40} altura={20} profundidade={10} particulas={800}/>

            < EstrelaEstatica nome="estrelasTras" position={[ 0, 15, -30 ]} largura={40} altura={20} profundidade={10} particulas={800}/>

            < EstrelaEstatica nome="estrelasCima" position={[ 0, 25, 0 ]} largura={20} altura={10} profundidade={20} particulas={1000}/>

            < AguaAnimada 
            
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]} 
              position={[ 0 , -2.5 , 0.05 ]} 
              size={[30, 20, 128, 128]}
            
            />

        </ScrollControls>


          
      </Canvas>           
      
    </>

  )
}

export default App
