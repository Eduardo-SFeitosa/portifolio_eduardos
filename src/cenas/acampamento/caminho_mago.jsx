import { Text } from "@react-three/drei"
import { useState } from "react"

export default function Caminho_mago({tamanho, cor, posicao, nome, progresso_total}) {

    const [progresso, set_progresso] = useState(0)
    const posicao_x = 1

    return <group>


            <group position={[-tamanho[0] / 2 ,0,0]}>

                <mesh position={posicao} key={nome} scale={[.01, 1, 1]} >
                    <boxGeometry args={tamanho} />
                    <meshStandardMaterial color={cor} />
                </mesh>

            </group>


            

            <mesh position={posicao} key={nome} >
                <boxGeometry args={tamanho} />
                <meshStandardMaterial color={cor} opacity={.2} transparent />
            </mesh>

            <Text position={[posicao[0], posicao[1] + 1.2, posicao[2]]} color="white" fontSize={0.6} anchorX="center">{nome}</Text>

        </group>

}