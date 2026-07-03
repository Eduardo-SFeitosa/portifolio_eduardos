import { Text } from "@react-three/drei"
import { useEffect, useState, useRef } from "react"
import { Pocao } from "./Pocao"

export default function Caminho_mago({tamanho, cor, posicao, nome, progresso_total, progresso_minimo, progresso_maximo}) {

    const [escala_x, set_escala] = useState(0)
    const tamanho_x = tamanho[0]

    useEffect(() => {

        if (progresso_maximo <= progresso_total || progresso_total <= progresso_minimo ) return

        const progresso_normalizado = progresso_total - progresso_minimo

        set_escala(progresso_normalizado / (progresso_maximo - progresso_minimo))

    },[progresso_total])

    return <group>

            {/* PROGRESSO */}
            <group position={[tamanho_x / 2 * escala_x - tamanho_x / 2, 0 , 0]}>

                <mesh position={posicao} key={nome} scale={[escala_x, 1, .1]}>
                    <boxGeometry args={tamanho} />
                    <meshStandardMaterial color={cor} />
                </mesh>

                <Pocao
                position={[posicao[0] + tamanho_x / 2 * escala_x, posicao[1] - .8 , posicao[2] + .5]}
                cor={cor}
                quantidade_liquido={escala_x}/>

            </group>

            {/* PROGRESSO OPACO */}
            <mesh position={posicao} key={nome} scale={[1,1,.1]} >
                <boxGeometry args={tamanho} />
                <meshStandardMaterial color={cor} opacity={.2} transparent />
            </mesh>

            <Text position={[posicao[0], posicao[1] + 1.2, posicao[2]]} color="white" fontSize={0.6} anchorX="center">{nome}</Text>

        </group>

}