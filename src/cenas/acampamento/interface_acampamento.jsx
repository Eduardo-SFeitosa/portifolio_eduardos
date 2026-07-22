import { Html, Text  } from "@react-three/drei";
import "./interface_acampamento.scss"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { useScroll } from '@react-three/drei'
import Caminho_mago from "./caminho_mago";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function Interface_acampamento({ mudar_caminho }) {

    const ano_inicio = 2020
    const ano_atual = new Date().getFullYear() + 1
    const mes_atual = new Date().getMonth() / 12

    const duracao_total_anos = ano_atual - ano_inicio
    const escala_tempo_tamanho = 2.5

    const [progresso_atual, set_progresso] = useState(0)
    
    const pocoes = [
        { nome: "Game Dev", inicio: 2020, duracao_anos: ano_atual - 2021 + mes_atual, cor: "#ff5733" },
        { nome: "Faculdade", inicio: 2024, duracao_anos: 2.5, cor: "#33c1ff" },
        { nome: "Técnico", inicio: 2024, duracao_anos: 2, cor: "#8e44ad" },
        { nome: "Auxiliar administrativo", inicio: 2024, duracao_anos: 2, cor: "#44ad5b" },
    ]

    return (
    <div className="container-acampamento">

        <div className="interface-acampamento">

        <h1 className="titulo">JORNADA</h1>

        <Canvas className="canvas-acampamento" camera={{ position: [7, 0, 10] }}>

            <ScrollControls pages={5} damping={0}>

                <Controle_scroll set_progresso={set_progresso}/>

                <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} target={[7, 0, 0]} /> 

                < ambientLight intensity={5} />

                {/* ANOS E BARRAS */}
                {Array.from({ length: duracao_total_anos + 1 }, (_, i) => {
                        const ano = ano_inicio + i
                        const pos_x = i * escala_tempo_tamanho
                        return (
                            <group key={i} position={[pos_x, 0, -1]}>
                                <Text position={[0, pocoes.length * 2, 0]} color="white" fontSize={0.6} anchorX="center">{ano}</Text>
                                <mesh position={[0, -0.5, 0]}>
                                    <boxGeometry args={[0.05, pocoes.length * 3.5 + 1, 0.01]} />
                                    <meshBasicMaterial color={"#ffffff"} opacity={0.1} />
                                </mesh>
                            </group>
                        )
                })}

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

            <h1 className="botao" onClick={() => mudar_caminho("voltar")}>VOLTAR PARA SOBRE</h1>

            <h1 className="botao" onClick={() => mudar_caminho()}>AVANCAR PARA STACKS</h1>

        </div>
    
    </div>

    </div>)

}

function Controle_scroll({set_progresso}){

    const scroll = useScroll()

    useFrame(() => {
        set_progresso(prev =>
            prev !== scroll.offset ? scroll.offset : prev
        )
    })

    return null
}