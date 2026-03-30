import './App.css'
import { Canvas} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState, useEffect } from 'react'

import ModeloBase from './modelos_auxiliares/modeloBase'
import AguaAnimada from './modelos_auxiliares/aguaAnimada'

function App() {
  const [version, setVersion] = useState(0)

  useEffect(() => {
    setVersion(v => v + 1)
  }, [])
  

  return (
    <>

      <Canvas camera={{ position: [0, 10, 20] }} id='canvas'>

        <directionalLight position={[2, 5, 3]} intensity={1.2} />

        <pointLight position={[0, 1, 0]} intensity={0.5} color={"#4466cc"} />

        <ambientLight />

        <ModeloBase />

        <AguaAnimada key={version} />

        <OrbitControls />

      </Canvas>      
      
    </>
  )
}

export default App