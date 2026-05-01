import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'

export default function Controle_de_camera({coordenadas_camera, referencia_camera, camera_travada, caminho_atual, direcao_camera}) {

  const scroll = useScroll()

  useEffect(() => {

    scroll.el.scrollTop = 0

  },[caminho_atual])

  useFrame(() => {

    if (referencia_camera && camera_travada){

      const progresso = scroll.offset
  
      const localizacao = coordenadas_camera.getPoint(progresso)

      const direcao = direcao_camera.getPoint(progresso)
      
      referencia_camera.current.lookAt(direcao)
    
      referencia_camera.current.position.copy(localizacao)

    }

  })

  return null
}