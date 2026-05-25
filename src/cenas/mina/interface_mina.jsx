import { Html } from "@react-three/drei";
import { useState } from "react";
import "./interface_mina.css"

export default function Interface_mina(props) {

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

        <div className="mina-conteudo">

            {mostrar_sites ? 
            
            <div className="conteudo-sites">
                sites mt brabos
            </div>:

            <div className="conteudo-jogos">
                jogos mt brabos
            </div>
        }

        </div>
    
    </Html>)

}