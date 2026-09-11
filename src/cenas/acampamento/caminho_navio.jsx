import { Text, useTexture } from "@react-three/drei"
import { useEffect, useState, useRef } from "react"
import { Sprite } from "three"
import { useFrame } from "@react-three/fiber"


export default function Caminho_navio({tamanho, cor, posicao, nome, progresso_total, progresso_minimo, progresso_maximo, finalizado = false}) {

    const [escala_x, set_escala] = useState(0)
    const tamanho_x = tamanho[0]
    const sprite_barco = useRef(null)
    const fase_animacao = useRef(
        Math.random() * Math.PI * 2
    )

    useEffect(() => {

        if (progresso_maximo <= progresso_total || progresso_total <= progresso_minimo ) return

        const progresso_normalizado = progresso_total - progresso_minimo

        set_escala(progresso_normalizado / (progresso_maximo - progresso_minimo))

    },[progresso_total])

    useFrame(({ clock }) => {

        if (!sprite_barco.current) return

        const tempo =
            clock.elapsedTime + fase_animacao.current


        // FLUTUAR
        const movimento_vertical =
            Math.sin(tempo * 1.7) * 0.08


        sprite_barco.current.position.y =
            posicao[1] +
            0.4 +
            movimento_vertical


        // BALANÇO
        const inclinacao =
            Math.sin(tempo * 1.35) * 0.06

        sprite_barco.current.material.rotation =
            inclinacao


        // RESPIRAR

        const escala_animada =
            1 + Math.sin(tempo * 2) * 0.025

        sprite_barco.current.scale.set(
            1.5 * escala_animada,
            1.5 * escala_animada,
            1
        )

    })

    const textura_barco = useTexture("/imagens_cenas/acampamento/navio.png")

    return <group key={nome}>

            {/* PROGRESSO */}
            <group 
                position={[tamanho_x / 2 * escala_x - tamanho_x / 2 
                , 0 , 0]}>

                <mesh position={posicao} scale={[escala_x, .4, .1]}>
                    <boxGeometry args={tamanho} />
                    <meshStandardMaterial color={cor} />
                </mesh>

                <sprite ref={sprite_barco}
                    position={[posicao[0] + tamanho_x / 2 * escala_x, posicao[1] + .4, posicao[2] + .5]} 
                    scale={[1.5, 1.5, 1]}>
                    <spriteMaterial
                        map={textura_barco}
                        transparent
                        color={cor}
                    />
                </sprite>

            </group>

            {/* PROGRESSO OPACO */}
            <mesh position={posicao} scale={[1,.2,.05]} >
                <boxGeometry args={tamanho} />
                <meshStandardMaterial color={cor} opacity={.4} transparent />
            </mesh>

            {/* TEXTO */}
            <group position={[posicao[0], posicao[1] + 1.8, posicao[2] + .3]}>

                <mesh position={[0,0,-.05]}>
                    <boxGeometry args={[0.38 * nome.length + 0.5, 1, 0.01]} />
                    <meshStandardMaterial 
                        color={"#2c1a0c"} 
                        transparent={true} 
                        opacity={0.7} 
                    />
                </mesh>

                <Text  
                    color={cor} 
                    fontSize={0.7} 
                    anchorX="center" 
                    anchorY="middle"
                    font="/fontes/Athena-Ruby.ttf.woff"
                    >{nome}</Text>
            </group>

    </group>

}