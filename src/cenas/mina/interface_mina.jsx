import { Html } from "@react-three/drei";
import { useState } from "react";
import "./interface_mina.css"

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

        <div className="mina-conteudo">

            {mostrar_sites ? 
            
                <div className="conteudo-sites">
                    
                    <div className="bloco">

                        <img className="bloco-imagem" src="/projetos/cine_ja.jpg" alt="" />
                        
                        <h2 className="bloco-nome">Cine Já</h2>

                    </div>

                </div>:

                <div className="conteudo-jogos">

                    <div className="bloco">

                        <img className="bloco-imagem" src="/projetos/diver.jpg" alt="" />
                        
                        <h2 className="bloco-nome">Mine diver</h2>

                    </div>

                    <div className="bloco">

                        <img className="bloco-imagem" src="/projetos/diver.jpg" alt="" />
                        
                        <h2 className="bloco-nome">Shrimp Shack</h2>

                    </div>

                </div>
            }

        </div>

        <div className="controle-caminhos">

            <h1 className="botao" onClick={() => voltar_caminho("mina")}>VOLTAR PARA STACKS</h1>

            <h1 className="botao" onClick={() => proximo_caminho("mina")}>AVANCAR PARA CONTATO</h1>

        </div>
    
    </Html>)

}