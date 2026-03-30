import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function AguaAnimada() {
  
  const materialRef = useRef()

  // Carrega as três texturas
  const colorMap = useLoader(TextureLoader, '/texturas/Water.png')
  const normalMap = useLoader(TextureLoader, '/texturas/Water_n.png')
  const noiseMap = useLoader(TextureLoader, '/texturas/Water_noise.png')

  // Configura repetição e wrap das texturas após o carregamento
  useEffect(() => {
    const textures = [colorMap, normalMap, noiseMap]
    textures.forEach(tex => {
      if (tex) {
        tex.wrapS = THREE.RepeatWrapping
        tex.wrapT = THREE.RepeatWrapping
        tex.repeat.set(2, 2)
      }
    })
  }, [colorMap, normalMap, noiseMap])
  

  // Animação do offset UV
  useFrame(({ clock }) => {
    if (materialRef.current) {
      // clock.getElapsedTime() is safe – it's not THREE.Clock
      const t = clock.getElapsedTime()
      materialRef.current.map.offset.x = t * 0.05
      materialRef.current.map.offset.y = t * 0.03
      materialRef.current.normalMap.offset.x = t * 0.07
      materialRef.current.normalMap.offset.y = t * 0.04
    }
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <meshStandardMaterial
        ref={materialRef}
        map={colorMap}
        normalMap={normalMap}
        color={0x88aaff}
        roughness={0.3}
        metalness={0.85}
        emissive={0x112233}
        emissiveIntensity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}