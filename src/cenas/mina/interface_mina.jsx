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

    const projetos = [
        {  
            id : 1,
            nome: "Mine Diver", 
            posicao_gema : [-2,1.5,.1], 
            rotacao_gema : [8.5,5,0],
            imagem: "/imagens_cenas/mina/mina.png", 
            descricao: "Jogo 2D de exploração de cavernas",
            opiniao: "Foi onde aprendi a usar física no desenvolvimento de jogos.",
            critica: "O loop do jogo ficava muito repetitivo.",
            melhoria: "Implementei um sistema de eventos aleatórios e power-ups.",
            formato: "esmeralda", 
            cor: "azul" 
        },
        {  
            id : 2,
            nome: "Shrimp Shack", 
            posicao_gema : [-.43,1.3,.8],
            rotacao_gema : [7,5.6,.5],
            imagem: "/imagens_cenas/mina/shrimp.png", 
            descricao: "Simulador de gerenciamento de restaurante",
            opiniao: "Um projeto divertido para explorar sistemas de UI complexos.",
            critica: "A curva de aprendizado era muito alta no início.",
            melhoria: "Adicionei um mini-tutorial guiado e dicas de ferramentas.",
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

        {projeto_escolhido != null ? <div className="informacoes-projeto" onClick={() => set_projeto(null)}> 
            
            <h1 className="titulo">{projetos[projeto_escolhido].nome}</h1> 
            
            <img className="imagem" src={projetos[projeto_escolhido].imagem} alt="" /> 
            
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
                        onPointerDown={() => {
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