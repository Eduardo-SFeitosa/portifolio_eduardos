import { useState, useRef } from "react"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

export default function Estrela_stack({ nome, cor, posicao }) {

    const [em_foco, set_foco] = useState(false)

    const estrela = useRef(null)

    const atraso_animacao = Math.random() * -.015

    const movimento_lateral = Math.random() * .03

    const fase = useRef(Math.random() * Math.PI * 2)

    const cores = ["red", "blue", "purple", "white", "green"]

    useFrame(({clock}) => {

        const delta = clock.getElapsedTime()

        if (estrela.current && !em_foco) {

        estrela.current.position.y = Math.sin(delta + fase.current) * atraso_animacao
        
        estrela.current.position.x = Math.sin(delta + fase.current) * movimento_lateral

        }
        
    })


    return (

        <group position={posicao}>

            <mesh
                onPointerOver={() => set_foco(true)}
                onPointerOut={() => set_foco(false)}
                ref={estrela}
            >
                <sphereGeometry args={[0.015, 16, 16]} />

                <meshStandardMaterial
                    color={cores[Math.floor(Math.random() * cores.length)]}
                    emissive={cores[Math.floor(Math.random() * cores.length)]}
                    emissiveIntensity={10}
                />

            </mesh>
      
            {em_foco && <Html
                position={[0,.1,0]}
                style={{ pointerEvents: "none" }}
                scale={0.5}
                style={{
                        pointerEvents: "none"
                }}
                width={"fit-content"} height={"fit-content"}
                style={{ position: "block" }}>

                <h1 className="esfera-nome" style={{color:"purple"}}>
                    {nome}
                </h1>
            </Html>}

        </group>

    )

}