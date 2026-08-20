import { Html, useGLTF } from "@react-three/drei";
import { useState, useRef } from "react";
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
    const [animacao_sair, set_animacao] = useState(false)
    const versao_mobile = window.innerHeight > window.innerWidth ? true : false

    const zoom_camera = versao_mobile ? 7 : 4

    const icones_tamanho = versao_mobile ? .008 : .005
    const icones_espacamento = versao_mobile ? .3 : .2
    const icones_padding_bottom = versao_mobile ? 3.5 : 2.5

    const escala_constelacoes = 4
    const atraso_estrelas = .3 * 1000

    const constelacoes = {

    python: {
        estrelas: [
            { nome: "DJANGO",      cor: "#0DB14B", posicao: [-0.55,  0.35, 0], margem_esquerda: 0, margem_cima: 0 },
            { nome: "FASTAPI",     cor: "#00C58E", posicao: [-0.25,  0.15, 0], margem_esquerda: 2, margem_cima: 0 },
            { nome: "PANDAS",      cor: "#6A5CFF", posicao: [-0.50, -0.05, 0], margem_esquerda: 0, margem_cima: 2 },
            { nome: "NUMPY",       cor: "#4DABF7", posicao: [-0.10, -0.25, 0], margem_esquerda: 0, margem_cima: 2 },
            { nome: "MATPLOTLIB",  cor: "#FFB347", posicao: [ 0.25, -0.10, 0], margem_esquerda: 2, margem_cima: 2 },
            { nome: "REQUESTS",    cor: "#B388FF", posicao: [ 0.50,  0.15, 0], margem_esquerda: 1, margem_cima: 0 },
            { nome: "SELENIUM",    cor: "#43D854", posicao: [ 0.20,  0.40, 0], margem_esquerda: 0, margem_cima: 0 },
        ],
        estrelas_mobile: [
            { nome: "DJANGO",      cor: "#0DB14B", posicao: [-0.55,  0.55, 0], margem_esquerda: 1, margem_cima: 0 },
            { nome: "FASTAPI",     cor: "#00C58E", posicao: [-0.25,  0.15, 0], margem_esquerda: 0, margem_cima: 2 },
            { nome: "PANDAS",      cor: "#6A5CFF", posicao: [-0.70, -0.7, 0], margem_esquerda: 2, margem_cima: 0 },
            { nome: "NUMPY",       cor: "#4DABF7", posicao: [-0.00, -.95, 0], margem_esquerda: 0, margem_cima: 2 },
            { nome: "MATPLOTLIB",  cor: "#FFB347", posicao: [ 0.5, -0.50, 0], margem_esquerda: 0, margem_cima: 0 },
            { nome: "REQUESTS",    cor: "#B388FF", posicao: [ 0.50,  0.15, 0], margem_esquerda: 0, margem_cima: 0 },
            { nome: "SELENIUM",    cor: "#43D854", posicao: [ 0.40,  0.60, 0], margem_esquerda: 0, margem_cima: 0 },
        ]
    },

    javascript: {

        estrelas: [
            { nome: "REACT",       cor: "#61DAFB", posicao: [-0.45,  0.45, 0], margem_esquerda: 0, margem_cima: 0 },
            { nome: "THREE.JS",    cor: "#D9D9D9", posicao: [-0.10,  0.15, 0], margem_esquerda: 0, margem_cima: 1 },
            { nome: "ANGULAR",     cor: "#DD0031", posicao: [ 0.35,  0.35, 0], margem_esquerda: 2, margem_cima: 0 },
            { nome: "NODE.JS",     cor: "#68A063", posicao: [ 0.05, -0.05, 0], margem_esquerda: 2, margem_cima: 1 },
            { nome: "TYPESCRIPT",  cor: "#3178C6", posicao: [ 0.45, -0.35, 0], margem_esquerda: 2, margem_cima: 0 },
            { nome: "ROUTER",      cor: "#F44250", posicao: [ 0.00, -0.20, 0], margem_esquerda: 0, margem_cima: 0 },
            { nome: "VITE",        cor: "#9C6BFF", posicao: [-0.30, -0.45, 0], margem_esquerda: 0, margem_cima: 0 },
        ],

        estrelas_mobile : [
            { nome: "REACT",       cor: "#61DAFB", posicao: [-0.45,  0.55, 0], margem_esquerda: 0, margem_cima: 0 },
            { nome: "THREE.JS",    cor: "#D9D9D9", posicao: [-0.25,  0.15, 0], margem_esquerda: 0, margem_cima: 2 },
            { nome: "ANGULAR",     cor: "#DD0031", posicao: [ 0.25,  0.45, 0], margem_esquerda: 2, margem_cima: 0 },
            { nome: "NODE.JS",     cor: "#68A063", posicao: [ 0.1, -0.05, 0], margem_esquerda: 2, margem_cima: 1 },
            { nome: "TYPESCRIPT",  cor: "#3178C6", posicao: [ 0.25, -0.45, 0], margem_esquerda: 1, margem_cima: 2 },
            { nome: "ROUTER",      cor: "#F44250", posicao: [ -0.20, -0.40, 0], margem_esquerda: 0, margem_cima: 0 },
            { nome: "VITE",        cor: "#9C6BFF", posicao: [-0.40, -0.85, 0], margem_esquerda: 2, margem_cima: 1 },
        ]
    },

    html_css: {

        estrelas: [
            { nome: "FORMS",       cor: "#FFD166", posicao: [ 0.00,  0.40, 0], margem_esquerda: 1, margem_cima: 0 },
            { nome: "CSS",         cor: "#2965F1", posicao: [ 0.1,  0.15, 0], margem_esquerda: 2, margem_cima: 1 },
            { nome: "SASS",        cor: "#CF649A", posicao: [ 0.2, -0.05, 0], margem_esquerda: 2, margem_cima: 2 },
            { nome: "ANIMACOES",   cor: "#7AE582", posicao: [ 0.00, -0.30, 0], margem_esquerda: 0, margem_cima: 2 },
            { nome: "TAILWIND",    cor: "#38BDF8", posicao: [-0.25, -0.05, 0], margem_esquerda: 0, margem_cima: 1 },
            { nome: "HTML",        cor: "#E34F26", posicao: [-0.25,  0.20, 0], margem_esquerda: 0, margem_cima: 0 },
        ],

        estrelas_mobile : [
            { nome: "FORMS",       cor: "#FFD166", posicao: [ 0.00,  0.55, 0], margem_esquerda: 1, margem_cima: 0 },
            { nome: "CSS",         cor: "#2965F1", posicao: [ 0.2,  0.25, 0], margem_esquerda: 2, margem_cima: 1 },
            { nome: "SASS",        cor: "#CF649A", posicao: [ 0.4, -0.1, 0], margem_esquerda: 2, margem_cima: 2 },
            { nome: "ANIMACOES",   cor: "#7AE582", posicao: [ 0.00, -0.60, 0], margem_esquerda: 0, margem_cima: 2 },
            { nome: "TAILWIND",    cor: "#38BDF8", posicao: [-0.45, -0.05, 0], margem_esquerda: 2, margem_cima: 1 },
            { nome: "HTML",        cor: "#E34F26", posicao: [-0.20,  0.30, 0], margem_esquerda: 0, margem_cima: 0 },
        ]

    },

    csharp: {
        estrelas: [
            { nome: "ASP.NET",         cor: "#7C4DFF", posicao: [ 0.00,  0.50, 0], margem_esquerda: 1, margem_cima: 0 },
            { nome: "API REST",        cor: "#26C6DA", posicao: [-0.45, -0.30, 0], margem_esquerda: 2, margem_cima: 0 },
            { nome: "WINDOWS FORMS",   cor: "#FFCA28", posicao: [ 0.45, -0.30, 0], margem_esquerda: 0, margem_cima: 2 },
            { nome: ".NET",            cor: "#A855F7", posicao: [ 0.00,  0.00, 0], margem_esquerda: 2, margem_cima: 0 },
        ],

        estrelas_mobile : [
            { nome: "ASP.NET",         cor: "#7C4DFF", posicao: [ 0.00,  0.50, 0], margem_esquerda: 1, margem_cima: 0 },
            { nome: "API REST",        cor: "#26C6DA", posicao: [-0.55, -0.30, 0], margem_esquerda: 2, margem_cima: 0 },
            { nome: "WINDOWS FORMS",   cor: "#FFCA28", posicao: [ 0.5, -0.40, 0], margem_esquerda: 0, margem_cima: 2 },
            { nome: ".NET",            cor: "#A855F7", posicao: [ 0.15,  0.10, 0], margem_esquerda: 2, margem_cima: 0 },
        ]
    }
    }

    const atual = constelacoes[stack]

    //aplica escala das constelacoes
    const estrelas = versao_mobile ? atual.estrelas_mobile.map(estrela => ({
        ...estrela,
        posicao: estrela.posicao.map(v => v * escala_constelacoes)
    }))
    : atual.estrelas.map(estrela => ({
        ...estrela,
        posicao: estrela.posicao.map(v => v * escala_constelacoes)
    }))

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

    const mudar_animacao = (voltar = false) => {

        //espera .3s para animacao rodas
        setTimeout(() => {
            if (voltar) {
                set_direcao(voltar); 
            }else {
                set_direcao()
            }
            set_interface(null)
            
        }, 300); 

    }

    return (

        <div className={`interface-orbe ${animacao_sair ? "animacao-sair" : ""}`}>

            <h1>STACKS</h1>

            <Canvas className="canvas-orbe" camera={{ position: [0, 0, zoom_camera] }}>

                <ambientLight intensity={1} />

                {/* SELECAO / ICONES */}
                <group position={[0, icones_padding_bottom, 0]} >

                    {icones.map((icone, i) => {

                        const Icone_componente = icone.componente
                        const posicao_x = Math.floor(icones.length / 2) + i - icones.length + .5 + icones_espacamento * i

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
                                    scale={icones_tamanho}
                                />
                            </mesh>
                        </>
                    })}

                </group>

                <group position={[0, -.6, 0]}>

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
                            delay_texto={estrelas.length * atraso_estrelas}
                        />
                    ))}

                    {estrelas.map((estrela, i) => {

                        const promixa_estrela = estrelas.length - 1 == i ? estrelas[i] : estrelas[i + 1]

                        return <Linha
                            key={`linha: ${estrela.nome}`}
                            atraso={i * atraso_estrelas}
                            ponto_1={estrela.posicao}
                            ponto_2={promixa_estrela.posicao}
                        />

                    })}

                </group>
            </Canvas>

            <div className="controle-caminhos">

                <h1 className="botao" onClick={() => { mudar_animacao("voltar") }}>VOLTAR PARA JORNADA</h1>

                <h1 className="botao" onClick={() => { mudar_animacao() }}>AVANCAR PARA PROJETOS</h1>

            </div>

        </div>)
}