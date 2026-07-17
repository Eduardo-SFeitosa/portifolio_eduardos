import { Html } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { OrbitControls, ScrollControls } from "@react-three/drei"
import { Parede } from "./Parede";
import { Vector3 } from "three";

import "./interface_mina.scss"
import Gemas from "./Gemas"

export default function Interface_mina({ mudar_caminho, set_direcao , set_interface }) {

  const [referencia_camera, set_camera] = useState(null)
  const [projeto_escolhido, set_projeto] = useState(null)
  const [projeto_visivel, set_interface_projeto] = useState(false)

  const projetos = [
    {
      id: 1,
      nome: "Mine Diver",
      posicao_gema: [-2, 1.5, .1],
      rotacao_gema: [8.5, 5, 0],
      imagem: "/imagens_cenas/mina/mina.png",
      link: "https://gem-sheep.itch.io/mine-diver",
      funcao: "Programador, designer, compositor SFX",
      empresa: null,
      descricao: "Jogo 2D de exploração de cavernas",
      formato: "esmeralda",
      cor: "azul"
    },
    {
      id: 2,
      nome: "Shrimp Shack",
      posicao_gema: [-.43, 1.3, .8],
      rotacao_gema: [7, 5.6, .5],
      imagem: "/imagens_cenas/mina/shrimp.png",
      link: "https://milqmochi.itch.io/shrimp-shack",
      funcao: "Programador e deisgner",
      empresa: "Moon Shrimp Studio",
      descricao: "Simulador de gerenciamento de restaurante",
      formato: "gota",
      cor: "laranja"
    }
  ]

  useEffect(() => {

    if (!referencia_camera) return

    referencia_camera.lookAt(new Vector3(1.7, -1.6, -0.6))

    referencia_camera.position.copy(new Vector3(-1.5, 1.7, 2))

  }, [referencia_camera])

  return (

    <div className="interface-mina">

      {projeto_visivel && projeto_escolhido != null ? <div className="informacoes-projeto">
        <div className="card-projeto">
          {/* Cabeçalho com título e botão fechar */}
          <div className="cabecalho">
            <h1 className="titulo">{projetos[projeto_escolhido].nome}</h1>
            <button className="botao-fechar" onClick={() => set_projeto(null)}>
              ✕
            </button>
          </div>

          {/* Imagem (link para o projeto) */}
          <a href={projetos[projeto_escolhido].link} target="_blank" rel="noopener noreferrer" className="link-imagem">
            <img className="imagem" src={projetos[projeto_escolhido].imagem} alt={projetos[projeto_escolhido].nome} />
          </a>

          {/* Detalhes em grid */}
          <div className="detalhes">
            <div className="detalhe-item">
              <span className="rotulo">Descrição</span>
              <p className="valor">{projetos[projeto_escolhido].descricao}</p>
            </div>
            <div className="detalhe-item">
              <span className="rotulo">Função</span>
              <p className="valor">{projetos[projeto_escolhido].funcao}</p>
            </div>
            {projetos[projeto_escolhido].empresa && (
              <div className="detalhe-item">
                <span className="rotulo">Empresa</span>
                <p className="valor">{projetos[projeto_escolhido].empresa}</p>
              </div>
            )}
            <div className="detalhe-item">
              <span className="rotulo">Link</span>
              <a href={projetos[projeto_escolhido].link} target="_blank" rel="noopener noreferrer" className="valor link">
                {projetos[projeto_escolhido].link.replace(/^https?:\/\//, '')}
              </a>
            </div>
          </div>
        </div>
      </div> : null}

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
            posicao_final={[-1.2, 1.7, .8]}
            rotation={projeto.rotacao_gema}
            selecionado={projeto_escolhido === projeto.nome}
            formato={projeto.formato}
            cor={projeto.cor}
            set_interface={set_interface_projeto}
            onPointerDown={() => {
              set_projeto(index)
            }}
          />
        })}

        <Parede />
      </Canvas>

      <div className="controle-caminhos">

        <h1 className="botao" onClick={() => {set_direcao("voltar"); set_interface(null) }}>VOLTAR PARA STACKS</h1>

        <h1 className="botao" onClick={() => {set_direcao("avancar"); set_interface(null) }}>AVANCAR PARA CONTATO</h1>

      </div>

    </div>
  )

}