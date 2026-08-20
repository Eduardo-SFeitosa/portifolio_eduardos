import { useState, useRef, useMemo } from "react"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import Brilho from '../../componentes_auxiliares/brilho'
import { Spring, animated, useSpring } from "@react-spring/three"
import { Vector3 } from "three"
import Linha from "./linha.jsx"

import "./interface_orbe.scss"

export default function Estrela_stack({ nome, cor, margem_cima, margem_esquerda, posicao, delay, delay_texto }) {

    const [em_foco, set_foco] = useState(false)

    const estrela = useRef(null)
    const brilho = useRef(1)

    const movimento_vertical = Math.random() * -.05

    const movimento_lateral = Math.random() * .05

    const atraso = useRef(Math.random() * Math.PI * 2)

    const cores = ["red", "blue", "purple", "green"]

    const posicoes_verticais = {
        0 : .5,
        1 : .1,
        2 : -.2,
    }

    const posicoes_horizontais = {
        0 : -.21,
        1 : -.08,
        2 : .5,
    }

    const posicao_texto = [margem_esquerda < 2 ? posicoes_horizontais[margem_esquerda] * nome.length : posicoes_horizontais[margem_esquerda], 
    posicoes_verticais[margem_cima] ,0]

    const linha_texto = [
        margem_esquerda == 0 ? posicao_texto[0] / 2 : margem_esquerda == 1 ? 0 : posicao_texto[0] * nome.length / 4,
        margem_cima == 0 ? posicao_texto[1] / 2 : margem_cima == 1 ? 0 : posicao_texto[1],
        posicao_texto[2]
    ]

    const {escala_estrela} = useSpring({

        from: { escala_estrela: [0, 0, 0] },
        to: { escala_estrela: [1, 1, 1] },

        config: { tension: 80, friction: 20 },

        onRest : () => {

            //espera ate todas as estrelas estarem visiveis
            setTimeout(() => {
                set_foco(true)
            }, delay_texto ); 
        },

        delay: delay,

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
                position={ 
                    [margem_esquerda < 2 ? posicoes_horizontais[margem_esquerda] * nome.length : posicoes_horizontais[margem_esquerda], 
                    posicoes_verticais[margem_cima] 
                    ,0]}
                scale={0.5}
                className="estrela-texto">

                    <h1 className="estrela-nome"
                    style={{ 
                        position: "block", 
                        textShadow: `0 0 4px rgba(255,255,255,.8),  0 0 6px ${cor_escolhida}`,
                        }}>
                        {nome}
                    </h1>
            </Html>}

            {em_foco && <Linha
            key={nome}
            ponto_1={[0,0,0]}
            ponto_2={linha_texto}
            cor={cor_escolhida}
            tamanho={1.8}
            />}

        </animated.group>
    )
}