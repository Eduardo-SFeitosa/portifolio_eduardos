import { useRef } from "react"
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"

export default function Particula_portal({posicao_final, posicao_inicial, deletar, velocidade = 2}){

    const particula = useRef(null)

    const posicao_inicial_global = useRef(new THREE.Vector3(...posicao_inicial))
    const posicao_final_global = useRef(new THREE.Vector3(...posicao_final))
    const posicao_atual = useRef(posicao_inicial_global.current.clone())

    useFrame(({clock}) => {

        if (!particula) return

        const delta = clock.getElapsedTime()

        const direction = new THREE.Vector3().copy(posicao_final_global.current).sub(posicao_atual.current)

        const distance = direction.length()

        console.log("Current Distance:", distance)

         if (distance < 2) {
            const direction = new THREE.Vector3().copy(posicao_final_global.current).sub(posicao_atual.current)
            const distance = direction.length()
            
            if (distance > 0.1) {
                // Normaliza e aplica a velocidade
                direction.normalize()
                posicao_atual.current.add(direction.multiplyScalar(velocidade * delta))
                particula.current.position.copy(posicao_atual.current)
            } else {
                // Se chegou muito perto do destino, finaliza
                particula.current.position.copy(posicao_final_global.current)
                if (deletar) deletar()
            }
        }

    })

    return <mesh 
            ref={particula}>

                <sphereGeometry args={[0.03]} />

                <meshBasicMaterial color="purple" />

            </mesh>

}