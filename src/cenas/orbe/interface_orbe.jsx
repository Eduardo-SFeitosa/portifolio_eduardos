import { Html, useGLTF } from "@react-three/drei";
import { useState } from "react";
import { Canvas } from "@react-three/fiber"
import { Physics, RigidBody } from "@react-three/rapier";
import { Line } from "@react-three/drei"
import { OrbitControls } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'

import { Modelo_css } from "./modelos_orbe/Css.jsx";
import { Modelo_html } from "./modelos_orbe/Html.jsx";
import { Modelo_javascript } from "./modelos_orbe/Javascript.jsx";
import { Modelo_python } from "./modelos_orbe/Python.jsx";
import { Modelo_csharp } from "./modelos_orbe/Csharp.jsx";

import Estrela_stack from "./estrela_stack";
import "./interface_orbe.scss"

export default function Interface_orbe({ mudar_caminho }) {

    const [stack, set_stack] = useState("python")

    const constelacoes = {

        python: {
            cor: "#4FC3F7",

            estrelas: [
                { nome: "DJANGO", posicao: [-0.35, 0.05, 0] },
                { nome: "FASTAPI", posicao: [-0.15, 0.20, 0] },
                { nome: "PANDAS", posicao: [0.05, 0.15, 0] },
                { nome: "NUMPY", posicao: [0.20, 0.00, 0] },
                { nome: "MATPLOTLIB", posicao: [0.05, -0.15, 0] },
                { nome: "REQUESTS", posicao: [-0.10, -0.20, 0] },
                { nome: "SELENIUM", posicao: [-0.30, -0.10, 0] },
            ],

            linhas: [
                [-0.35, 0.05, 0],
                [-0.15, 0.20, 0],
                [0.05, 0.15, 0],
                [0.20, 0.00, 0],
                [0.05, -0.15, 0],
                [-0.10, -0.20, 0],
                [-0.30, -0.10, 0],
                [-0.35, 0.05, 0],
            ]
        },

        javascript: {
            cor: "#FFD54F",

            estrelas: [
                { nome: "REACT", posicao: [-0.35, 0.35, 0] },
                { nome: "ANGULAR", posicao: [0.35, 0.35, 0] },

                { nome: "THREE.JS", posicao: [-0.15, 0.10, 0] },
                { nome: "NODE.JS", posicao: [0, 0, 0] },
                { nome: "TYPESCRIPT", posicao: [0.15, -0.10, 0] },

                { nome: "ROUTER", posicao: [-0.30, -0.35, 0] },
                { nome: "VITE", posicao: [0.30, -0.35, 0] },
            ],

            linhas: [
                [-0.35, 0.35, 0],
                [-0.15, 0.10, 0],
                [0, 0, 0],
                [0.15, -0.10, 0],
                [0.30, -0.35, 0],

                [0.35, 0.35, 0],
                [0.15, -0.10, 0],

                [-0.15, 0.10, 0],
                [0.15, -0.10, 0],

                [-0.30, -0.35, 0],
                [0, 0, 0]
            ]
        },

        html_css: {
            cor: "#FF8A65",

            estrelas: [
                { nome: "HTML", posicao: [-0.25, 0.15, 0] },
                { nome: "CSS", posicao: [0.25, 0.15, 0] },
                { nome: "SASS", posicao: [0.15, -0.05, 0] },
                { nome: "TAILWIND", posicao: [-0.15, -0.05, 0] },
                { nome: "ANIMACOES", posicao: [0, -0.25, 0] },
                { nome: "FORMS", posicao: [0, 0.30, 0] },
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
            cor: "#BA68C8",

            estrelas: [
                { nome: "ASP.NET", posicao: [0, 0.25, 0] },
                { nome: "API REST", posicao: [0.25, 0.05, 0] },
                { nome: "WINDOWS FORMS", posicao: [0, -0.25, 0] },
            ],

            linhas: [
                [0, 0.25, 0],
                [0.25, 0.05, 0],
                [0, -0.25, 0],
            ]
        }

    }

    const [linePoints, setLinePoints] = useState([])

    const atual = constelacoes[stack]

    return (
    
    <div>

        <h1>STACKS</h1>

        <Canvas className="canvas-orbe" camera={{ position: [0, 0, .8] }}>

            <ambientLight intensity={1} />

            <pointLight 
                position={[0, 0, 2]} 
                intensity={4} 
                color="#ffffff" 
            />

                {/* SELECAO */}
                <group position={[0,.2,0]}>

                    <Modelo_css position={[ .25, .2 ,0]} onPointerDown={() => set_stack("html_css")}/>
                    <Modelo_html position={[ .15, .2 ,0]} onPointerDown={() => set_stack("html_css")}/>
                    <Modelo_javascript position={[ -.2, .2 ,0]} onPointerDown={() => {set_stack("javascript")}}/>
                    <Modelo_python position={[ -.4, .2 ,0]} onPointerDown={() => {set_stack("python")}}/>
                    <Modelo_csharp position={[ .6, .2 ,0]} onPointerDown={() => {set_stack("csharp")}}/>

                </group>

                <group position={[0,-.1,0]}>
                    
                    {/* CONSTELACOES */}

                    {atual.estrelas.map((estrela, i) => (
                        <Estrela_stack
                            key={estrela.nome}
                            nome={estrela.nome}
                            posicao={estrela.posicao}
                            cor={atual.cor}
                            delay={i * 0.15}
                        />
                    ))}

                    <Line
                        points={atual.linhas}
                        color={"wheat"}
                        lineWidth={.9}
                        transparent
                        opacity={0.15}
                    />

                    <Line
                        points={atual.linhas}
                        color={"wheat"}
                        lineWidth={.2}
                    />
                    
                </group>

        </Canvas>



        <div className="controle-caminhos">

            <h1 className="botao" onClick={() => mudar_caminho("voltar")}>VOLTAR PARA JORNADA</h1>

            <h1 className="botao" onClick={() => mudar_caminho()}>AVANCAR PARA PROJETOS</h1>

        </div>
    
    </div>)
}