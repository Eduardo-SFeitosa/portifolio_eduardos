import { Html } from "@react-three/drei";
import { useState } from "react";
import "./interface_mina.css"
import { Canvas } from "@react-three/fiber"

export default function Interface_mina({proximo_caminho, voltar_caminho , ...props}) {

    const [mostrar_sites, set_mostrar_sites] = useState(true)

    return (
    
    <Html 
    {...props}
    className={"interface-mina"}  
    zIndexRange={[100, 0]} 
    style={{ position: "static" }} 
    scale={0.5}>

        <div className="navegacao-mina">
            <h1 className="link-projetos" onClick={() => set_mostrar_sites(true)}>SITES</h1>
            <h1 className="link-projetos" onClick={() => set_mostrar_sites(false)}>JOGOS</h1>
        </div>

        <Canvas className="canvas-mina">

        </Canvas>

        <div className="controle-caminhos">

            <h1 className="botao" onClick={() => voltar_caminho("mina")}>VOLTAR PARA STACKS</h1>

            <h1 className="botao" onClick={() => proximo_caminho("mina")}>AVANCAR PARA CONTATO</h1>

        </div>
    
    </Html>)

}