import { Html, Text } from "@react-three/drei";
import "./interface_acampamento.scss"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { useScroll } from '@react-three/drei'

import Caminho_mago from "./caminho_mago";
import Caminho_navio from "./caminho_navio";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export default function Interface_acampamento({ mudar_caminho, set_interface }) {

    const [progresso_atual, set_progresso] = useState(0)
    const [animacao_sair, set_animacao] = useState(false)

    const linha_guia = useRef(null)
    const versao_mobile = window.innerHeight > window.innerWidth ? true : false

    const ano_inicio = 2023
    const ano_atual = new Date().getFullYear() + 1
    const mes_atual = new Date().getMonth() / 12

    const duracao_total_anos = ano_atual - ano_inicio
    const escala_tempo_tamanho = versao_mobile ? 2.8 : 5.5
    const posicao_x_camera = versao_mobile ? 5.5 : 11
    const posicao_y_camera = versao_mobile ? -1 : 0

    const navios = [
        { nome: "Freelancer - Game Dev", inicio: 2023.5, duracao_anos: ano_atual - ( ano_inicio + .5 ) - 1 + mes_atual, cor: "#ff5733", finalizado: false },
        { nome: "Bacharelado em ADS", inicio: 2024, duracao_anos: 2.5, duracao_meses: 6, cor: "#698cff", finalizado: true },
        { nome: "Auxiliar administrativo", inicio: 2024, duracao_anos: 2, cor: "#44ad5b", finalizado: true },
    ]

    useEffect(() => {

        if (!linha_guia.current) return

        var posicao_x = progresso_atual * duracao_total_anos * escala_tempo_tamanho

        linha_guia.current.position.copy(new Vector3(posicao_x, 1, .1))

    }, [progresso_atual])

    const mudar_animacao = (voltar = false) => {

        set_animacao(true)

        //espera .3s para animacao rodas
        setTimeout(() => {

            set_interface(null)
            if (voltar) {
                mudar_caminho(voltar); 
            }else {
                mudar_caminho()
            }
            
        }, 300); 

    }

    return (
        <div className="container-acampamento">

            <div className={`interface-acampamento ${animacao_sair ? "animacao_desaparecer" : ""}`}>

                <h1 className="titulo">JORNADA</h1>

                <Canvas className="canvas-acampamento" camera={{ position: [posicao_x_camera, posicao_y_camera, 17] }} style={{"position" : "absolute"}}>

                    <ScrollControls pages={3} damping={0}>

                        <Controle_scroll set_progresso={set_progresso} />

                        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} target={[posicao_x_camera, posicao_y_camera, 0]} />

                        < ambientLight intensity={5} />

                        {/* LINHA DE REFERENCIA */}
                        <mesh ref={linha_guia}>
                            <boxGeometry args={[0.05, navios.length * 4.0, 0.01]} />
                            <meshBasicMaterial color={"black"} />
                        </mesh>

                        {/* ANOS E BARRAS */}
                        {Array.from({ length: duracao_total_anos + 1 }, (_, i) => {
                            const ano = ano_inicio + i
                            const pos_x = i * escala_tempo_tamanho
                            const pos_y = 1.5 + navios.length * 2

                            return (
                                <group key={i} position={[pos_x, pos_y , 0]}>
                                    <Text position={[0, 0, 0]} color="black" fontSize={0.6} anchorX="center">{ano}</Text>
                                    <mesh position={[0,0,-.05]}>
                                        <boxGeometry args={[2 , 1, 0.01]} />
                                            <meshStandardMaterial 
                                                color={"#ffaeae"} 
                                                transparent={true} 
                                                opacity={0.7} 
                                            />
                                    </mesh>
                                </group>
                            )
                        })}

                        {/* navios */}
                        {navios.map((navio, i) => {
                            const pos_x_centro = (navio.inicio - ano_inicio) * escala_tempo_tamanho + (navio.duracao_anos * escala_tempo_tamanho / 2)
                            const y_centro = i * 4 - (navios.length - 1) * 2

                            return (
                                <Caminho_navio
                                    key={i}
                                    posicao={[pos_x_centro, y_centro, 0]}
                                    tamanho={[navio.duracao_anos * escala_tempo_tamanho, 1, .5]}
                                    progresso_total={progresso_atual * duracao_total_anos}
                                    progresso_minimo={navio.inicio - ano_inicio}
                                    progresso_maximo={navio.inicio - ano_inicio + navio.duracao_anos}
                                    nome={navio.nome}
                                    cor={navio.cor}
                                    finalizado={navio.finalizado}
                                />
                            )
                        })}

                    </ScrollControls>

                </Canvas>

                <div className="controle-caminhos">

                    <h1 className="botao" onClick={() => { mudar_animacao("voltar") }}>VOLTAR PARA SOBRE</h1>

                    <h1 className="botao" onClick={() => { mudar_animacao() }}>AVANCAR PARA STACKS</h1>

                </div>

            </div>

            <img className="fundo-pergaminho" src="imagens_cenas/acampamento/pergaminho.png" alt="" />

        </div>)

}

function Controle_scroll({ set_progresso }) {

    const scroll = useScroll()

    useFrame(() => {
        set_progresso(prev =>
            prev !== scroll.offset ? scroll.offset : prev
        )
    })

    return null
}