import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'


export default function Controle_de_camera({coordenadas_camera, referencia_camera, travar_camera, direcao_camera}) {

  const scroll = useScroll()

  useFrame(() => {

    if (referencia_camera && travar_camera){

      const progresso = scroll.offset
    
      const localizacao = coordenadas_camera.getPoint(progresso)

      const direcao = direcao_camera.getPoint(progresso)
      
      referencia_camera.current.lookAt(direcao)
    
      referencia_camera.current.position.copy(localizacao)

    }
    
  })

  return null
}