import { Html } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import "./interface_mina.css"
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { OrbitControls, ScrollControls } from "@react-three/drei"
import Gemas from "./Gemas"
import { Parede } from "./Parede";
import { Vector3 } from "three";

export default function Interface_mina({proximo_caminho, voltar_caminho , ...props}) {

    const [referencia_camera, set_camera] = useState(null)
    const [projeto_escolhido, set_projeto] = useState(null)

    const projetos = [
        {  
            nome: "Mine Diver", 
            posicao_gema : [-2,1.5,.1], 
            rotacao_gema : [8.5,5,0],
            imagem: "/projetos/diver.jpg", 
            descricao: "Jogo 2D de exploração de cavernas",
            opiniao: "Foi onde aprendi a usar física no desenvolvimento de jogos.",
            critica: "O loop do jogo ficava muito repetitivo.",
            melhoria: "Implementei um sistema de eventos aleatórios e power-ups.",
            formato: "esmeralda", 
            cor: "azul" 
        },
        {  
            nome: "Shrimp Shack", 
            posicao_gema : [-.52,1.2,1.15],
            rotacao_gema : [7,5.6,.5],
            imagem: "/projetos/shrimp.jpg", 
            descricao: "Simulador de gerenciamento de restaurante",
            opiniao: "Um projeto divertido para explorar sistemas de UI complexos.",
            critica: "A curva de aprendizado era muito alta no início.",
            melhoria: "Adicionei um mini-tutorial guiado e dicas de ferramentas.",
            formato: "gota", 
            cor: "laranja" 
        }
    ]

    useEffect(() => {
        
        if (!referencia_camera ) return

        referencia_camera.lookAt(new Vector3(1.5, -1.6, -0.6))

        referencia_camera.position.copy(new Vector3(-1.6, 1.9 ,2))

    }, [referencia_camera])
    

    return (
    
    <Html 
    {...props}
    className={"interface-mina"}  
    zIndexRange={[100, 0]} 
    style={{ position: "static" }}>

        {projeto_escolhido ? 
        <div className="informacoes-projeto" onClick={() => set_projeto(null)}>

            <h1>AAAAAA</h1>

        </div>:
        null}
        
            <Canvas className="canvas-mina" onCreated={(state) => {
            set_camera(state.camera)
            }}>

                < ambientLight intensity={1} />

                < directionalLight position={[2, 0, 3]} intensity={3} />

                {projetos.map((projeto, index) => {

                    return <Gemas
                        scale={.2}
                        key={projeto.nome}
                        position={projeto.posicao_gema}
                        rotation={projeto.rotacao_gema}
                        selecionado={projeto_escolhido === projeto.nome}
                        formato={projeto.formato}
                        cor={projeto.cor}
                        onPointerDown={() => set_projeto(projeto.nome)}
                    />
                })}

                <Parede/>
            </Canvas>

        <div className="controle-caminhos">

            <h1 className="botao" onClick={() => voltar_caminho("mina")}>VOLTAR PARA STACKS</h1>

            <h1 className="botao" onClick={() => proximo_caminho("mina")}>AVANCAR PARA CONTATO</h1>

        </div>
    
    </Html>)

}