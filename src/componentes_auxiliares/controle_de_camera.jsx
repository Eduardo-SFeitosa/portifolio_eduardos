import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'


export default function Controle_de_camera({coordenadas_camera, referencia_camera}) {

  const scroll = useScroll()

  useFrame(() => {

    if (referencia_camera){

      const progresso = scroll.offset
    
      const localizacao = coordenadas_camera.getPoint(progresso)
    
      referencia_camera.current.position.copy(localizacao)

    }
    
  })

  return null
}