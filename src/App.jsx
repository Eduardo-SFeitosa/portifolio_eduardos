import "./App.css"

import { Canvas} from "@react-three/fiber"

import { Html, OrbitControls, ScrollControls } from "@react-three/drei"

import ModeloBase from "./modelos_auxiliares/modeloBase"

import AguaAnimada from "./modelos_auxiliares/aguaAnimada"

import BauDoTesouro from "./modelos_auxiliares/bauDoTesouro"

import Acampamento from "./modelos_auxiliares/acampamento"

import Porta from "./modelos_auxiliares/porta"

import Orbe from "./modelos_auxiliares/orbe"

import Mina from "./modelos_auxiliares/mina"

import EstrelaCadente from "./modelos_auxiliares/estrelaCadente"

import EstrelaEstaticaQuadrada from "./modelos_auxiliares/estrelaEstaticaQuadrada"

import ControleDeCamera from "./componentes_auxiliares/controleDeCamera"

function App() {

  return (

    <>

      <Canvas camera={{ position: [0, 10, -20] }} id="canvas">   

          < directionalLight position={[2, 5, 3]} intensity={1.2} />

          < pointLight position={[0, 1, 0]} intensity={0.5} color={"#4466cc"} />

          < ambientLight />

          < ModeloBase />

          < BauDoTesouro position={[-.9, 0, -17.8]} rotation={[ 0, -.7, 0]} />

          < Acampamento position={[ -6.2 , 2 , 13 ]} />

          < Porta position={[ -8.8, .1, 2.9 ]} />

          < Orbe position={[ 1.3, 3, 2 ]} />

          < Mina position={[ 9.222 , 1.975 , -3.066 ]} />

          < EstrelaEstaticaQuadrada nome="estrelasEsquerda" position={[ -50, 15, 10 ]} largura={5} altura={30} profundidade={50} particulas={800} />

          < EstrelaEstaticaQuadrada nome="estrelasDireita" position={[ 50, 15, 10 ]} largura={5} altura={30} profundidade={50} particulas={800}/>

          < EstrelaEstaticaQuadrada nome="estrelasFrente" position={[ 0, 15, 40 ]} largura={80} altura={30} profundidade={10} particulas={800}/>

          < EstrelaEstaticaQuadrada nome="estrelasTras" position={[ 0, 15, -40 ]} largura={80} altura={30} profundidade={10} particulas={800}/>

          < EstrelaEstaticaQuadrada nome="estrelasCima" position={[ 0, 50, 0 ]} largura={80} altura={4} profundidade={80} particulas={1000}/>

          < AguaAnimada 
          
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]} 
            position={[ 0 , -2.5 , 0.05 ]} 
            size={[30, 20, 128, 128]}
          
          />

          <OrbitControls target={[0, 0, 0]} />
          
      </Canvas>           
      
    </>
  )
}

export default App