import { useState, useRef, useMemo } from "react"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

import "./interface_orbe.scss"

export default function Estrela_stack({ nome, cor, posicao }) {

    const [em_foco, set_foco] = useState(false)

    const estrela = useRef(null)
    const brilho = useRef(null)

    const movimento_vertical = Math.random() * -.010

    const movimento_lateral = Math.random() * .02

    const atraso = useRef(Math.random() * Math.PI * 2)

    const cores = ["red", "blue", "purple", "green"]

    const cor_escolhida = useMemo(() => {

        return cores[Math.floor(Math.random() * cores.length)]

    }, [])

    {/* ANIMACAO */}
    useFrame(({clock}) => {

        if (!estrela.current || !brilho.current) return

        const delta = clock.getElapsedTime()

        if (!em_foco) {

            estrela.current.position.y = Math.sin(delta + atraso.current) * movimento_vertical
            
            estrela.current.position.x = Math.sin(delta + atraso.current) * movimento_lateral

        }

        brilho.current.emissiveIntensity = Math.sin(delta + atraso.current) * 20 + 30

    })

    return (

        <group position={posicao}>

            <group
                onPointerOver={() => set_foco(true)}
                onPointerOut={() => set_foco(false)}
                ref={estrela}
            >

                <mesh>
                    <sphereGeometry args={[0.015, 16, 16]} />

                    <meshStandardMaterial
                        emissive={cor_escolhida}
                        color={cor_escolhida}
                        emissiveIntensity={30}
                        ref={brilho}
                        opacity={0.05}
                    />
                </mesh>

                <EffectComposer>

                    <Bloom
                        intensity={.3}
                        luminanceThreshold={0}
                        luminanceSmoothing={0}
                    />

                </EffectComposer>

                
            </group>
      
            {em_foco && <Html
                position={[0,.15,0]}
                scale={0.5}
                className="estrela-texto"
                style={{ position: "block" }}>

                    <h1 className="estrela-nome">
                        {nome}
                    </h1>
            </Html>}

        </group>

    )

}