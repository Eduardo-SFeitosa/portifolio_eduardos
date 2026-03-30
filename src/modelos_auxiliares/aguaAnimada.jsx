import { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three'
import * as THREE from "three"

export default function AguaAnimada(props) {

  const referenciaAgua = useRef()

  // Load all textures
  const texturaPrincipal = useLoader(TextureLoader, '/texturas/Water.png')
  const texturaReferencia = useLoader(TextureLoader, '/texturas/Water_n.png')
  const texturaBarulho = useLoader(TextureLoader, '/texturas/Water_noise.png')

  // configura texturas para se repitirem e não esticar
  useEffect(() => {
    const texturas = [texturaPrincipal, texturaReferencia, texturaBarulho]
    texturas.forEach(textura => {
      textura.wrapS = RepeatWrapping
      textura.wrapT = RepeatWrapping
      textura.repeat.set(3, 3)
    })
  }, [texturaPrincipal, texturaReferencia, texturaBarulho])

  // Animação
  useFrame(({ clock }) => {

    const delta = clock.getElapsedTime()

    if (referenciaAgua.current) {
      // Velocidade da animação da agua
      referenciaAgua.current.map.offset.x = delta * 0.01
      referenciaAgua.current.normalMap.offset.x = delta * 0.04

      // Velocidade da animação de noise
      referenciaAgua.current.emissiveMap.offset.x = delta * 0.1
      
    }
  })

  return (
    <>
      
      <mesh {...props} receiveShadow>
        <planeGeometry args={props.size} />
          <meshStandardMaterial
            ref={referenciaAgua}
            map={texturaPrincipal}
            normalMap={texturaReferencia}
            emissiveMap={texturaBarulho}    
            emissive={0x88aaff}      
            emissiveIntensity={0.6}
            color={0x88aaff}
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
      </mesh>
    </>
  )
}