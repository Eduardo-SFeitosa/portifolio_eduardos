import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function ControleDeCamera() {

  const scroll = useScroll()

  useFrame((state) => {
    const t = scroll.offset // 0 → 1

    state.camera.position.x = t * 20
    state.camera.position.y = 10
    state.camera.position.z = 20 - t * 10

    state.camera.lookAt(0, 0, 0)
  })

  return null
}