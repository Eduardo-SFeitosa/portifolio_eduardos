import "./App.css"

import { Canvas} from "@react-three/fiber"

import { Html, OrbitControls, ScrollControls } from "@react-three/drei"

import ModeloBase from "./modelos_auxiliares/modelo_base"

import AguaAnimada from "./modelos_auxiliares/agua_animada"

import BauDoTesouro from "./cenas/bau/bau_do_tesouro"

import Acampamento from "./cenas/acampamento/acampamento"

import Porta from "./cenas/porta/porta"

import Orbe from "./cenas/orbe/orbe"

import Mina from "./cenas/mina/mina"

import EstrelaEstatica from "./modelos_auxiliares/estrela_estatica_circulo"

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

          <OrbitControls target={[0, 0, 0]} />
          
      </Canvas>           
      
    </>
  )
}

export default App