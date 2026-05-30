import { Html } from "@react-three/drei";
import { useState } from "react";
import "./interface_orbe.css"

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

        <div className="conteudo-stacks">

            {stack == "python" ?  
            (<div className="conteudo-stack">
                
                <div className="tecnologia">DJANGO e FASTAPI</div>
                <div className="tecnologia">PANDAS e NUMPY e MATPLOTLIB</div>
                <div className="tecnologia">REQUESTS / BEAULTIFULSOUP / SELENIUM</div>

            </div>)
            : stack == "javascript" ? 
                (<>

                    <div className="tecnologia">THREE.JS</div>
                    <div className="tecnologia">REACT</div>
                    <div className="tecnologia">ROUTER</div>
                    <div className="tecnologia">ANGULAR</div>
                    <div className="tecnologia">NODE.JS</div>
                    <div className="tecnologia">TYPESCRIPT</div>
                    <div className="tecnologia">ANGULAR</div>
                    <div className="tecnologia">VITE</div>
                    
                </>)

            : stack == "html/css" ? 
            (<div className="conteudo-stack">
                
                <div className="tecnologia">FORMS</div>
                <div className="tecnologia">ANIMACOES</div>
                <div className="tecnologia">SASS</div>
                <div className="tecnologia">TAILWIND</div>

            </div>)

            : stack == "sql" ? 
            (<div className="conteudo-stack">
                
                <div className="tecnologia">SQLITE</div>
                <div className="tecnologia">MODELAGEM</div>
                <div className="tecnologia">JOINS</div>
                <div className="tecnologia">PROCEDURES</div>
                <div className="tecnologia">CONSULTAS OTIMIZADAS</div>

            </div>)

            :(<div className="conteudo-stack">
                
                <div className="tecnologia">ASP.NET</div>
                <div className="tecnologia">WINDOWS FORMS</div>
                <div className="tecnologia">API REST</div>

            </div>)}

        </div>

        <div className="controle-caminhos">

            <h1 className="botao" onClick={() => voltar_caminho("orbe")}>VOLTAR PARA JORNADA</h1>

            <h1 className="botao" onClick={() => proximo_caminho("orbe")}>AVANCAR PARA PROJETOS</h1>

        </div>
    
    </Html>)

}