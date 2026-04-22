import "./App.css"

import { useState, useEffect, useRef } from "react"

import { Canvas} from "@react-three/fiber"

import { OrbitControls } from "@react-three/drei"

import { ScrollControls, Scroll } from "@react-three/drei"

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

  const camera_referencia = useRef(null)

  const controle_de_camera = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {

      const cam = camera_referencia.current

      console.log(`position [${cam.position.x.toFixed(2)}, ${cam.position.y.toFixed(2)}, ${cam.position.z.toFixed(2)}]`);
      console.log(`rotation [${cam.rotation.x.toFixed(2)}, ${cam.rotation.y.toFixed(2)}, ${cam.rotation.z.toFixed(2)}]`);
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

    porta_centrada : {
      posicao : [-8.71, 0.75, 2.52],
      rotacao : [-3.11, 0.05, 3.14]
    },

    bau : {
      posicao : [-2.34, 1.59, -15.88],
      rotacao : [-0.49, -0.54, -0.27]
    },

    orbe : {
      posicao : [2.64, 4.47, 2.00],
      rotacao : [-1.81, 1.33, 1.82]
    },

    acampamento : {
      posicao : [-4.48, 3.11, 12.61],
      rotacao : [-1.81, 1.10, 1.83]
    },

    mina : {
      posicao : [8.82, 2.99, -3.56],
      rotacao : [-2.11, -0.56, -2.41]
    }

  }

  const travar_camera = (cena) => {

    const camera_atual = camera_referencia.current

    if (cena) {

      camera_atual.position.set(...posicao_de_cenas[cena].posicao)

      camera_atual.rotation.set(...posicao_de_cenas[cena].rotacao)

      set_cena_em_foco(cena)

    }else {

      set_cena_em_foco(null)

    }
    
  }

  

  return (

    <>

      <Canvas onCreated={(state) => {
        camera_referencia.current = state.camera
      }} camera={{ position: [0, 10, -10] }} id="canvas">   

        <ScrollControls pages={5} damping={0.2}>

          <Scroll>

            < directionalLight position={[2, 5, 3]} intensity={1.2} />

            < pointLight position={[0, 1, 0]} intensity={0.5} color={"#4466cc"} />

            < ambientLight />

            < ModeloBase />

            <BauDoTesouro funcao_travar_camera={travar_camera} position={[-.9, 0, -17.8]} rotation={[ 0, -.7, 0]} />

            <Acampamento funcao_travar_camera={travar_camera} position={[ -6.2 , 2 , 13 ]} />

            <Porta funcao_travar_camera={travar_camera} position={[ -8.8, .1, 2.9 ]} />

            <Orbe funcao_travar_camera={travar_camera} position={[ 1.3, 3, 2 ]} />

            <Mina funcao_travar_camera={travar_camera} position={[ 9.222 , 1.975 , -3.066 ]} />

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

          </Scroll>

        </ScrollControls>
          
      </Canvas>           
      
    </>
  )
}

export default App
