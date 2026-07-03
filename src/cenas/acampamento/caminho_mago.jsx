import { Text } from "@react-three/drei"
import { useEffect, useState, useRef } from "react"

export default function Caminho_mago({tamanho, cor, posicao, nome, progresso_total, progresso_minimo}) {

    const [escala_x, set_escala] = useState(0)

    useEffect(() => {

        if (escala_x > 1 || progresso_total - progresso_minimo < 0) return

        set_escala(progresso_total - progresso_minimo)

    },[progresso_total])

    return <group>

            {/* PROGRESSO */}
            <group position={[tamanho[0] / 2 * escala_x - tamanho[0] / 2, 0 , 0]}>

                <mesh position={posicao} key={nome} scale={[escala_x, 1, 1]}>
                    <boxGeometry args={tamanho} />
                    <meshStandardMaterial color={cor} />
                </mesh>

            </group>

            {/* PROGRESSO OPACO */}
            <mesh position={posicao} key={nome} >
                <boxGeometry args={tamanho} />
                <meshStandardMaterial color={cor} opacity={.2} transparent />
            </mesh>

            <Text position={[posicao[0], posicao[1] + 1.2, posicao[2]]} color="white" fontSize={0.6} anchorX="center">{nome}</Text>

        </group>

}