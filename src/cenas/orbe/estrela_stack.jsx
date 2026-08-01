import { useState, useRef, useMemo } from "react"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import Brilho from '../../componentes_auxiliares/brilho'
import { Spring, animated, useSpring } from "@react-spring/three"
import { Vector3 } from "three"

import "./interface_orbe.scss"

export default function Estrela_stack({ nome, cor, posicao, delay }) {

    const [em_foco, set_foco] = useState(false)

    const estrela = useRef(null)
    const brilho = useRef(1)

    const movimento_vertical = Math.random() * -.010

    const movimento_lateral = Math.random() * .02

    const atraso = useRef(Math.random() * Math.PI * 2)

    const cores = ["red", "blue", "purple", "green"]

    const {escala_estrela} = useSpring({

        from: { escala_estrela: [0, 0, 0] },
        to: { escala_estrela: [1, 1, 1] },

        config: { tension: 80, friction: 20 },

        delay: delay * 1000,

    })

    function cor_para_hex(cor){
        var canvas_colorido = document.createElement('canvas').getContext('2d');
        canvas_colorido.fillStyle = cor;
        return canvas_colorido.fillStyle;
    }

    const cor_escolhida = useMemo(() => {
        if (!cor){
            return cores[Math.floor(Math.random() * cores.length)]
        }
        return cor
    }, [])

    {/* ANIMACAO */}
    useFrame(({clock}) => {

        if (!estrela.current) return

        const delta = clock.getElapsedTime()

        if (!em_foco) {
            estrela.current.position.y = Math.sin(delta + atraso.current) * movimento_vertical
            estrela.current.position.x = Math.sin(delta + atraso.current) * movimento_lateral
        }

        const brilho_tamanho = Math.sin((delta + atraso.current) / 1.5) * 0.2 + .5
        brilho.current.scale.set(brilho_tamanho, brilho_tamanho, brilho_tamanho)

    })

    return (

        <animated.group position={posicao} scale={escala_estrela} >

            <group
                onPointerOver={() => set_foco(true)}
                onPointerOut={() => set_foco(false)}
                ref={estrela}
            >

                <mesh>
                    <sphereGeometry args={[0.045, 16, 16]} />

                    <meshStandardMaterial
                        emissive={cor_escolhida}
                        color={cor_escolhida}
                        emissiveIntensity={5}
                        opacity={0.05}
                    />
                </mesh>

                <mesh
                    raycast={() => null}
                    position={[0, 0, 0]} 
                    ref={brilho}
                >
                    {/* Aumentado para 0.5 para ter espaço para o bloom acontecer */}
                    <sphereGeometry args={[1, 8, 8]} /> 
                    
                    <Brilho
                        falloff={4.2}
                        glowInternalRadius={4.1}
                        glowColor={cor_escolhida}
                        glowSharpness={1.3}
                        side={"THREE.DoubleSide"}
                        opacity={.30}
                        depthTest={false}
                    />
                </mesh>

                
            </group>
      
            {em_foco && <Html
                position={[.1,.4,0]}
                scale={0.5}
                className="estrela-texto"
                style={{ position: "block", color : "white" }}>

                    <h1 className="estrela-nome">
                        {nome}
                    </h1>
            </Html>}

        </animated.group>
    )
}