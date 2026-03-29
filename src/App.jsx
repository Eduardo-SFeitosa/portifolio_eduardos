import './App.css'
import { Canvas} from '@react-three/fiber'
import ModeloBase from './modelos_auxiliares/modeloBase'
import { OrbitControls } from '@react-three/drei'

function App() {



  return (
    <>

      <Canvas camera={{ position: [0, 10, 20] }} id='canvas'>

        <directionalLight position={[2, 5, 3]} intensity={1.2} />

        <pointLight position={[0, 1, 0]} intensity={0.5} color={"#4466cc"} />

        <ambientLight />

        <ModeloBase />

        <OrbitControls />

      </Canvas>      
      
    </>
  )
}

export default App