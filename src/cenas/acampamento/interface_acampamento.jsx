import { Html, Text } from "@react-three/drei";
import "./interface_acampamento.scss"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { useScroll } from '@react-three/drei'
import Caminho_mago from "./caminho_mago";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export default function Interface_acampamento({ mudar_caminho, set_interface }) {

    const [progresso_atual, set_progresso] = useState(0)

    const linha_guia = useRef(null)
    const versao_mobile = window.innerHeight > window.innerWidth ? true : false

    const ano_inicio = 2023
    const ano_atual = new Date().getFullYear() + 1
    const mes_atual = new Date().getMonth() / 12

    const duracao_total_anos = ano_atual - ano_inicio
    const escala_tempo_tamanho = versao_mobile ? 2.5 : 4.5
    const posicao_x_camera = versao_mobile ? 5 : 9

    const pocoes = [
        { nome: "Game Dev", inicio: 2023, duracao_anos: ano_atual - ano_inicio - 1 + mes_atual, cor: "#ff5733" },
        { nome: "Faculdade", inicio: 2024, duracao_anos: 2.5, duracao_meses: 6, cor: "#33c1ff" },
        { nome: "Técnico", inicio: 2024, duracao_anos: 2, duracao_meses: 0, cor: "#8e44ad" },
        { nome: "Auxiliar administrativo", inicio: 2024, duracao_anos: 2, cor: "#44ad5b" },
    ]

    useEffect(() => {

        if (!linha_guia.current) return

        var posicao_x = progresso_atual * duracao_total_anos * escala_tempo_tamanho

        linha_guia.current.position.copy(new Vector3(posicao_x, 0, .1))

    }, [progresso_atual])

    return (
        <div className="container-acampamento">

            <div className="interface-acampamento">

                <h1 className="titulo">JORNADA</h1>

                <Canvas className="canvas-acampamento" camera={{ position: [posicao_x_camera, 1, 11.5] }}>


                    <ScrollControls pages={3} damping={0}>

                        <Controle_scroll set_progresso={set_progresso} />

                        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} target={[posicao_x_camera, 1, 0]} />

                        < ambientLight intensity={5} />

                        {/* LINHA DE REFERENCIA */}
                        <mesh ref={linha_guia}>
                            <boxGeometry args={[0.05, pocoes.length * 3.5, 0.01]} />
                            <meshBasicMaterial color={"black"} />
                        </mesh>

                        {/* ANOS E BARRAS */}
                        {Array.from({ length: duracao_total_anos + 1 }, (_, i) => {
                            const ano = ano_inicio + i
                            const pos_x = i * escala_tempo_tamanho

                            return (
                                <group key={i} position={[pos_x, 0, 0]}>

                                    <Text position={[0, pocoes.length * 2, 0]} color="black" fontSize={0.6} anchorX="center">{ano}</Text>

                                    <mesh position={[0, 0, 0]}>

                                        <boxGeometry args={[0.05, 
                                            pocoes.length * 3.2 + 1, 
                                            0.01]} />

                                        <meshStandardMaterial color={"#dd0b0b0c"}
                                            transparent={true}
                                            opacity={0.3} />

                                    </mesh>
                                </group>
                            )
                        })}

                        {/* POCOES */}
                        {pocoes.map((mago, i) => {
                            const pos_x_centro = (mago.inicio - ano_inicio) * escala_tempo_tamanho + (mago.duracao_anos * escala_tempo_tamanho / 2)
                            const y_centro = i * 3 - (pocoes.length - 1) * 1.5

                            return (
                                <Caminho_mago
                                    key={i}
                                    posicao={[pos_x_centro, y_centro, 0]}
                                    tamanho={[mago.duracao_anos * escala_tempo_tamanho, 1, .5]}
                                    progresso_total={progresso_atual * duracao_total_anos}
                                    progresso_minimo={mago.inicio - ano_inicio}
                                    progresso_maximo={mago.inicio - ano_inicio + mago.duracao_anos}
                                    nome={mago.nome}
                                    cor={mago.cor}
                                />
                            )
                        })}

                    </ScrollControls>

                </Canvas>

                <div className="controle-caminhos">

                    <h1 className="botao" onClick={() => { mudar_caminho("voltar"); set_interface(null) }}>VOLTAR PARA SOBRE</h1>

                    <h1 className="botao" onClick={() => { mudar_caminho(); set_interface(null) }}>AVANCAR PARA STACKS</h1>

                </div>

            </div>

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