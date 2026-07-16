import { Html } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { OrbitControls, ScrollControls } from "@react-three/drei"
import { Parede } from "./Parede";
import { Vector3 } from "three";

import "./interface_mina.scss"
import Gemas from "./Gemas"

export default function Interface_mina({proximo_caminho, voltar_caminho , ...props}) {

    const [referencia_camera, set_camera] = useState(null)
    const [projeto_escolhido, set_projeto] = useState(null)
    const [interface_visivel, set_interface] = useState(false)

    const projetos = [
        {  
            id : 1,
            nome: "Mine Diver", 
            posicao_gema : [-2,1.5,.1], 
            rotacao_gema : [8.5,5,0],
            imagem: "/imagens_cenas/mina/mina.png", 
            link : "https://gem-sheep.itch.io/mine-diver",
            funcao : "Programador, designer, compositor SFX",
            grupo : "Projeto proprio",
            descricao: "Jogo 2D de exploração de cavernas",
            formato: "esmeralda", 
            cor: "azul" 
        },
        {  
            id : 2,
            nome: "Shrimp Shack", 
            posicao_gema : [-.43,1.3,.8],
            rotacao_gema : [7,5.6,.5],
            imagem: "/imagens_cenas/mina/shrimp.png", 
            link : "https://milqmochi.itch.io/shrimp-shack",
            funcao : "Programador e deisgner",
            grupo : "Moon Shrimp Studio",
            descricao: "Simulador de gerenciamento de restaurante",
            formato: "gota", 
            cor: "laranja" 
        }
    ]

    useEffect(() => {
        
        if (!referencia_camera) return

        referencia_camera.lookAt(new Vector3(1.7, -1.6, -0.6))

        referencia_camera.position.copy(new Vector3(-1.5, 1.7 ,2))

    }, [referencia_camera])

    return (
    
    <Html 
    {...props}
    className={"interface-mina"}  
    zIndexRange={[100, 0]} 
    style={{ position: "static" }}>

        {interface_visivel && projeto_escolhido != null ? <div className="informacoes-projeto"> 
            
            <h1 className="titulo">{projetos[projeto_escolhido].nome}</h1> 
            
            <a href={projetos[projeto_escolhido].link} target="_blank">
                <img className="imagem" src={projetos[projeto_escolhido].imagem} alt="" /> 
            </a>

            <h1 className="botao-fechar" onClick={() => set_projeto(null)} >FEHCAR PROJETO</h1>
            
        </div> 
        : null}
        
        <Canvas className="canvas-mina" onCreated={(state) => {
            set_camera(state.camera)
            }}>

                < ambientLight intensity={1} />

                < directionalLight position={[2, 0, 3]} intensity={.2} />

                {projetos.map((projeto, index) => {

                    return <Gemas
                        projeto_escolhido={projeto_escolhido}
                        gema_index={index}
                        scale={.2}
                        key={projeto.nome}
                        posicao_inicial={projeto.posicao_gema}
                        posicao_final={[-1.2, 1.7 ,.8]}
                        rotation={projeto.rotacao_gema}
                        selecionado={projeto_escolhido === projeto.nome}
                        formato={projeto.formato}
                        cor={projeto.cor}
                        set_interface={set_interface}
                        onPointerDown={() => {
                            console.log("ESCOLHIDO ",projetos[index])
                            set_projeto(index)
                        }}
                    />
                })}

                <Parede/>
        </Canvas>

        <div className="controle-caminhos">

            <h1 className="botao" onClick={() => voltar_caminho()}>VOLTAR PARA STACKS</h1>

            <h1 className="botao" onClick={() => proximo_caminho()}>AVANCAR PARA CONTATO</h1>

        </div>
    
    </Html>)

}