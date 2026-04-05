import "./App.css"

import { Canvas} from "@react-three/fiber"
import { OrbitControls, ScrollControls } from "@react-three/drei"

import ModeloBase from "./modelos_auxiliares/modeloBase"

import AguaAnimada from "./modelos_auxiliares/aguaAnimada"

import BauDoTesouro from "./modelos_auxiliares/bauDoTesouro"

import Acampamento from "./modelos_auxiliares/acampamento"

import Porta from "./modelos_auxiliares/Porta"

import Orbe from "./modelos_auxiliares/Orbe"

import ControleDeCamera from "./componentes_auxiliares/controleDeCamera"

function App() {

  return (

    <>

      <Canvas camera={{ position: [0, 10, 20] }} id="canvas">

        

          < directionalLight position={[2, 5, 3]} intensity={1.2} />

          < pointLight position={[0, 1, 0]} intensity={0.5} color={"#4466cc"} />

          < ambientLight />

          < ModeloBase />

          < BauDoTesouro />

          < Acampamento />

          < Porta />

          < Orbe />

          < AguaAnimada 
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]} 
          position={[ 0 , -2.5 , 0.05 ]} 
          size={[30, 20, 128, 128]}
          />

          < OrbitControls />
          



      </Canvas>      
      
    </>
  )
}

export default App