import { Html } from "@react-three/drei";
import { useState } from "react";
import { Canvas } from "@react-three/fiber"
import "./interface_orbe.css"
import Esfera_stack from "./esfera_stack";

export default function Interface_orbe({proximo_caminho, voltar_caminho , ...props}) {

    const [stack, set_stack] = useState("python")

    return (
    
    <Html 

    {...props}
    
    className={"interface-orbe"} 
        
    occlude zIndexRange={[100, 0]} 
        
    style={{ position: "static" }} 
            
    scale={0.5}>

        <div className="stacks">

            <div className="stack" onClick={() => set_stack("python")} >Python</div>
            <div className="stack" onClick={() => set_stack("javascript")} >Javascript</div>
            <div className="stack" onClick={() => set_stack("html/css")} >HTML/CSS</div>
            <div className="stack" onClick={() => set_stack("sql")} >SQL</div>
            <div className="stack" onClick={() => set_stack("c#")} >C#</div>

        </div>

        <Canvas className="canvas-orbe" camera={{ position: [0, 0, 5] }}>

            <ambientLight intensity={1} />

            {stack == "python" ?  
            (<group className="conteudo-stack">
                
                <Esfera_stack cor={"blue"} nome={"DJANGO e FASTAPI"}/>
                <Esfera_stack cor={"blue"} nome={"PANDAS e NUMPY e MATPLOTLIB"}/>
                <Esfera_stack cor={"blue"} nome={"REQUESTS / BEAULTIFULSOUP / SELENIUM"}/>

            </group>)
            : stack == "javascript" ? 
                (<group>

                    <Esfera_stack cor={"blue"} nome={"THREE.JS"}/>
                    <Esfera_stack cor={"blue"} nome={"REACT"}/>
                    <Esfera_stack cor={"blue"} nome={"ROUTER"}/>
                    <Esfera_stack cor={"blue"} nome={"ANGULAR"}/>
                    <Esfera_stack cor={"blue"} nome={"NODE.JS"}/>
                    <Esfera_stack cor={"blue"} nome={"TYPESCRIPT"}/>
                    <Esfera_stack cor={"blue"} nome={"ANGULAR"}/>
                    <Esfera_stack cor={"blue"} nome={"VITE"}/>
                    
                </group>)

            : stack == "html/css" ? 
            (<group className="conteudo-stack">
                
                <Esfera_stack cor={"blue"} nome={"FORMS"}/>
                <Esfera_stack cor={"blue"} nome={"ANIMACOES"}/>
                <Esfera_stack cor={"blue"} nome={"SASS"}/>
                <Esfera_stack cor={"blue"} nome={"TAILWIND"}/>

            </group>)

            : stack == "sql" ? 
            (<group className="conteudo-stack">
                
                <Esfera_stack cor={"blue"} nome={"SQLITE"}/>
                <Esfera_stack cor={"blue"} nome={"MODELAGEM"}/>
                <Esfera_stack cor={"blue"} nome={"JOINS"}/>
                <Esfera_stack cor={"blue"} nome={"PROCEDURES"}/>
                <Esfera_stack cor={"blue"} nome={"CONSULTAS OTIMIZADAS"}/>

            </group>)

            :(<group className="conteudo-stack">
                
                <Esfera_stack cor={"blue"} nome={"ASP.NET"}/>
                <Esfera_stack cor={"blue"} nome={"WINDOWS FORMS"}/>
                <Esfera_stack cor={"blue"} nome={"API REST"}/>

            </group>)}

        </Canvas>



        <div className="controle-caminhos">

            <h1 className="botao" onClick={() => voltar_caminho("orbe")}>VOLTAR PARA JORNADA</h1>

            <h1 className="botao" onClick={() => proximo_caminho("orbe")}>AVANCAR PARA PROJETOS</h1>

        </div>
    
    </Html>)

}