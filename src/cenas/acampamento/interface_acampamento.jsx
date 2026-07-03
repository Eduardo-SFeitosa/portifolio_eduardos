import { Html, Text  } from "@react-three/drei";
import "./interface_acampamento.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import Caminho_mago from "./caminho_mago";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function Interface_acampamento({proximo_caminho, voltar_caminho , ...props}) {

    const ano_inicio = 2020
    const ano_atual = new Date().getFullYear() + 1
    const mes_atual = new Date().getMonth() / 12

    const duracao_total_anos = ano_atual - ano_inicio
    const escala_tempo_tamanho = 2

    const [progresso_atual, set_progresso] = useState(0)

    useFrame((clock) => {    

        set_progresso(prev => prev += .01)

    })
    
    const magos = [
        { nome: "Game Dev", inicio: 2020, duracao_anos: ano_atual - 2021 + mes_atual, cor: "#ff5733" },
        { nome: "Faculdade", inicio: 2024, duracao_anos: 2.5, cor: "#33c1ff" },
        { nome: "Técnico", inicio: 2024, duracao_anos: 2, cor: "#8e44ad" },
        { nome: "Auxiliar administrativo", inicio: 2024, duracao_anos: 2, cor: "#44ad5b" },
    ]

    return (
    
    <Html 
    {...props}
    className={"interface-acampamento"} 
    zIndexRange={[100, 0]} 
    style={{ position: "static" }} 
    scale={0.5}>

        <h1 className="titulo">JORNADA</h1>

        <Canvas className="canvas-acampamento" camera={{ position: [0, 0, 8] }}>

            <OrbitControls/>

            < ambientLight intensity={5} />

            <mesh position={[duracao_total_anos * escala_tempo_tamanho / 2, 0, -1.2]} >
                    <boxGeometry args={[duracao_total_anos * escala_tempo_tamanho, magos.length * 3.5, 0.2]} /> 
                    <meshStandardMaterial color={"#2d2d2d"} transparent opacity={0.5} />
            </mesh>

            {Array.from({ length: duracao_total_anos + 1 }, (_, i) => {
                    const ano = ano_inicio + i
                    const pos_x = i * escala_tempo_tamanho
                    return (
                        <group key={i} position={[pos_x, 0, -1]}>

                            <mesh position={[0, -0.5, 0]}>
                                <boxGeometry args={[0.05, magos.length * 3.5 + 1, 0.2]} />
                                <meshBasicMaterial color={"#ffffff"} opacity={0.5} />
                            </mesh>
                            <Text position={[0, -magos.length * 2.2, 0]} color="white" fontSize={0.6} anchorX="center">{ano}</Text>
                        </group>
                    )
            })}

            {magos.map((mago, i) => {
                    // Calcula o centro do bloco na linha do tempo (anchor na esquerda)
                    const pos_x_centro = (mago.inicio - ano_inicio) * escala_tempo_tamanho + (mago.duracao_anos * escala_tempo_tamanho / 2)
                    const y_centro = i * 3 - (magos.length - 1) * 1.5 // Centraliza verticalmente

                    return (
                        <Caminho_mago
                        posicao={[pos_x_centro, y_centro, 0]}
                        tamanho={[mago.duracao_anos * escala_tempo_tamanho, 1, .5]}
                        progresso_total={progresso_atual}
                        progresso_minimo={mago.inicio - ano_inicio}
                        progresso_maximo={mago.inicio - ano_inicio + mago.duracao_anos}
                        nome={mago.nome}
                        cor={mago.cor}
                        />
                    )
            })}

        </Canvas>

        <div className="controle-caminhos">

            <h1 className="botao" onClick={() => voltar_caminho("acampamento")}>VOLTAR PARA SOBRE</h1>

            <h1 className="botao" onClick={() => proximo_caminho("acampamento")}>AVANCAR PARA STACKS</h1>

        </div>
    
    </Html>)

}
