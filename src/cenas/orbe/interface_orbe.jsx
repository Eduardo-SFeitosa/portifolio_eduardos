import { Html, useGLTF } from "@react-three/drei";
import { useState } from "react";
import { Canvas } from "@react-three/fiber"
import { Physics, RigidBody } from "@react-three/rapier";
import { randFloat } from "three/src/math/MathUtils.js";

import { Modelo_css } from "./modelos_orbe/Css.jsx";
import { Modelo_html } from "./modelos_orbe/Html.jsx";
import { Modelo_javascript } from "./modelos_orbe/Javascript.jsx";
import { Modelo_python } from "./modelos_orbe/Python.jsx";
import { Modelo_csharp } from "./modelos_orbe/Csharp.jsx";

import Estrela_stack from "./estrela_stack";
import "./interface_orbe.css"

export default function Interface_orbe({proximo_caminho, voltar_caminho , ...props}) {

    const [stack, set_stack] = useState("python")

    const posicao_aleatoria = (max_x, max_y, max_z) => {

        return [randFloat(-max_x, max_x), randFloat(-max_y, max_y), randFloat(-max_z, max_z)]

    }

    return (
    
    <Html 

    {...props}
    className={"interface-orbe"} 
    occlude
    style={{ position: "block" }}    
    scale={0.5}>

        <h1>STACKS</h1>

        <div className="stacks">

            

        </div>

        <Canvas className="canvas-orbe" camera={{ position: [0, 0, -15] }}>

            <ambientLight intensity={.2} />

            <pointLight 
                position={[0, 0, -10]} 
                intensity={Math.PI * 11} 
                color="#ffffff" 
                decay={2}
            />

                {/* SELECAO */}
                <group>

                    <Modelo_css onPointerDown={() => set_stack("html/css")}/>
                    <Modelo_html onPointerDown={() => set_stack("html/css")}/>
                    <Modelo_javascript onPointerDown={() => set_stack("javascript")}/>
                    <Modelo_python onPointerDown={() => set_stack("python")}/>
                    <Modelo_csharp onPointerDown={() => set_stack("csharp")}/>

                </group>

                 {/* CONSTELACOES */}

                {stack == "python" ?  
                (<group className="conteudo-stack">
                    
                    <Estrela_stack cor={"blue"} nome={"DJANGO e FASTAPI"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"PANDAS e NUMPY e MATPLOTLIB"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"REQUESTS / BEAULTIFULSOUP / SELENIUM"} posicao={posicao_aleatoria(17, 5 , 0)}/>

                </group>)
                : stack == "javascript" ? 
                (<group>

                    <Estrela_stack cor={"blue"} nome={"THREE.JS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"REACT"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"ROUTER"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"ANGULAR"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"NODE.JS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"TYPESCRIPT"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"ANGULAR"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"VITE"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                        
                </group>)

                : stack == "html/css" ? 
                (<group className="conteudo-stack">
                    
                    <Estrela_stack cor={"blue"} nome={"FORMS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"ANIMACOES"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"SASS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"TAILWIND"} posicao={posicao_aleatoria(17, 5 , 0)}/>

                </group>)

                : stack == "sql" ? 
                (<group className="conteudo-stack">
                    
                    <Estrela_stack cor={"blue"} nome={"SQLITE"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"MODELAGEM"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"JOINS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"PROCEDURES"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"CONSULTAS OTIMIZADAS"} posicao={posicao_aleatoria(17, 5 , 0)}/>

                </group>)

                :(<group className="conteudo-stack">
                    
                    <Estrela_stack cor={"blue"} nome={"ASP.NET"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"WINDOWS FORMS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Estrela_stack cor={"blue"} nome={"API REST"} posicao={posicao_aleatoria(17, 5 , 0)}/>

                </group>)}



        </Canvas>



        <div className="controle-caminhos">

            <h1 className="botao" onClick={() => voltar_caminho("orbe")}>VOLTAR PARA JORNADA</h1>

            <h1 className="botao" onClick={() => proximo_caminho("orbe")}>AVANCAR PARA PROJETOS</h1>

        </div>
    
    </Html>)
}