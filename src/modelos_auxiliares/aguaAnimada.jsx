import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { useRef } from "react"
import { useTexture } from "@react-three/drei"

export default function AguaAnimada() {
  const materialRef = useRef()

  const [colorMap, noiseMap] = useTexture([
    "/texturas/Water.png",
    "/texturas/Water_noise.png",
  ])

  return (
    
    <mesh >
        
      <planeGeometry args={[20, 20, 128, 128]} />

      <meshStandardMaterial map={colorMap} />
     
    </mesh>

  )
}
