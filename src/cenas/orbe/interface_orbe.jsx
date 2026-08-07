import { Html, useGLTF } from "@react-three/drei";
import { useState } from "react";
import { Canvas } from "@react-three/fiber"
import { Physics, RigidBody } from "@react-three/rapier";
import { Line } from "@react-three/drei"
import { OrbitControls } from "@react-three/drei";

import { Css_icon } from "./modelos_orbe/css_icon.jsx";
import { Html5_icon } from "./modelos_orbe/html5_icon.jsx";
import { Javascript_icon } from "./modelos_orbe/Javascript_icon.jsx";
import { Python_icon } from "./modelos_orbe/python_icon.jsx";
import { Csharp_icon } from "./modelos_orbe/csharp_icon.jsx";

import Estrela_stack from "./estrela_stack";
import Brilho from "../../componentes_auxiliares/brilho.jsx"
import "./interface_orbe.scss"
import Linha from "./linha.jsx";

export default function Interface_orbe({ mudar_caminho, set_interface, set_direcao }) {

    const [stack, set_stack] = useState("python")

    const constelacoes = {

        python: {

            estrelas: [
                { nome: "DJANGO", posicao: [-0.55, 0.35, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "FASTAPI", posicao: [-0.25, 0.15, 0], margem_esquerda: 1, margem_cima : 0, },
                { nome: "PANDAS", posicao: [-0.50, -0.05, 0], margem_esquerda: 2, margem_cima : 0, },
                { nome: "NUMPY", posicao: [-0.10, -0.25, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "MATPLOTLIB", posicao: [0.25, -0.10, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "REQUESTS", posicao: [0.50, 0.15, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "SELENIUM", posicao: [0.20, 0.40, 0], margem_esquerda: 0, margem_cima : 0, },
            ],

            linhas: [
                [-0.55, 0.35, 0],
                [-0.25, 0.15, 0],
                [-0.50, -0.05, 0],
                [-0.10, -0.25, 0],
                [0.25, -0.10, 0],
                [0.50, 0.15, 0],
                [0.20, 0.40, 0],
            ]
        },

        javascript: {

            estrelas: [
                { nome: "REACT", posicao: [-0.45, 0.45, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "THREE.JS", posicao: [-0.10, 0.15, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "ANGULAR", posicao: [0.35, 0.35, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "NODE.JS", posicao: [0.05, -0.05, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "TYPESCRIPT", posicao: [0.45, -0.35, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "ROUTER", posicao: [0.00, -0.20, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "VITE", posicao: [-0.30, -0.45, 0], margem_esquerda: 0, margem_cima : 0, },
            ],

            linhas: [
                [-0.45, 0.45, 0],
                [-0.10, 0.15, 0],
                [0.35, 0.35, 0],
                [0.05, -0.05, 0],
                [0.45, -0.35, 0],
                [0.00, -0.20, 0],
                [-0.30, -0.45, 0],
            ]
        },

        html_css: {

            estrelas: [
                { nome: "FORMS", posicao: [0, 0.30, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "CSS", posicao: [0.25, 0.15, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "SASS", posicao: [0.15, -0.05, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "ANIMACOES", posicao: [0, -0.25, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "TAILWIND", posicao: [-0.15, -0.05, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "HTML", posicao: [-0.25, 0.15, 0], margem_esquerda: 0, margem_cima : 0, },
            ],

            linhas: [
                [0, 0.30, 0],
                [0.25, 0.15, 0],
                [0.15, -0.05, 0],
                [0, -0.25, 0],
                [-0.15, -0.05, 0],
                [-0.25, 0.15, 0],
                [0, 0.30, 0],
            ]
        },

        csharp: {

            estrelas: [
                { nome: "ASP.NET", posicao: [0.00, 0.50, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "API REST", posicao: [-0.45, -0.30, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: "WINDOWS FORMS", posicao: [0.45, -0.30, 0], margem_esquerda: 0, margem_cima : 0, },
                { nome: ".NET", posicao: [0.00, 0.00, 0], margem_esquerda: 0, margem_cima : 0, },
            ],

            linhas: [
                [0.00, 0.50, 0],
                [-0.45, -0.30, 0],
                [0.45, -0.30, 0],
                [0.00, 0.00, 0],
            ]
        }
    }

    const atual = constelacoes[stack]

    const atraso_estrelas = .3 * 1000
    const escala_constelacoes = 4

    const estrelas = atual.estrelas.map(estrela => ({
        ...estrela,
        posicao: estrela.posicao.map(v => v * escala_constelacoes)
    }))

    const linhas = atual.linhas.map(ponto =>
        ponto.map(v => v * escala_constelacoes)
    )

    const icones = [
        {
            nome: "python",
            componente: Python_icon,
            cor: "yellow",
        },
        {
            nome: "html_css",
            componente: Css_icon,
            cor: "blue",
        },
        {
            nome: "javascript",
            componente: Javascript_icon,
            cor: "yellow",
        },
        {
            nome: "html_css",
            componente: Html5_icon,
            cor: "orange",
        },
        {
            nome: "csharp",
            componente: Csharp_icon,
            cor: "purple",
        },
    ]

    return (

        <div className="interface-orbe">

            <h1>STACKS</h1>

            <Canvas className="canvas-orbe" camera={{ position: [0, 0, 4] }}>

                <ambientLight intensity={1} />

                {/* SELECAO */}
                <group position={[0, 2, 0]} >

                    {icones.map((icone, i) => {

                        const Icone_componente = icone.componente
                        const posicao_x = Math.floor(icones.length / 2) + i - icones.length + 1

                        return <>

                            <mesh
                                raycast={() => null}
                                position={[posicao_x, 0, 0]}
                            >
                                <sphereGeometry args={[.5, 8, 8]} />

                                <Brilho
                                    falloff={4.2}
                                    glowInternalRadius={4.1}
                                    glowSharpness={1.3}
                                    glowColor={icone.cor}
                                    side={"THREE.DoubleSide"}
                                    opacity={.20}
                                    depthTest={false}
                                />

                                <Icone_componente
                                    onPointerDown={() => { set_stack(icone.nome) }}
                                    scale={0.005}
                                />
                            </mesh>
                        </>
                    })}

                </group>

                <group position={[0, -1, 0]}>

                    {/* CONSTELACOES */}

                    {estrelas.map((estrela, i) => (
                        <Estrela_stack
                            key={`${estrela.posicao} index:${i}`}
                            nome={estrela.nome}
                            posicao={estrela.posicao}
                            margem_cima={estrela.margem_cima}
                            margem_esquerda={estrela.margem_esquerda}
                            cor={atual.cor}
                            delay={i * atraso_estrelas}
                        />
                    ))}

                    {linhas.map((linha, i) => {

                        const promixo_ponto = linhas.length - 1 == i ? linhas[i] : linhas[i + 1]

                        return <Linha
                            key={`${linha} index:${i}`}
                            atraso={i * atraso_estrelas}
                            ponto_1={linha}
                            ponto_2={promixo_ponto}
                        />

                    })}

                </group>
            </Canvas>

            <div className="controle-caminhos">

                <h1 className="botao" onClick={() => { set_direcao("voltar"); set_interface(null) }}>VOLTAR PARA JORNADA</h1>

                <h1 className="botao" onClick={() => { set_direcao(); set_interface(null) }}>AVANCAR PARA PROJETOS</h1>

            </div>

        </div>)
}