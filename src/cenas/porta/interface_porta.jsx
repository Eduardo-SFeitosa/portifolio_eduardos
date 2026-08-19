import "./interface_porta.scss";
import { Html } from "@react-three/drei";
import { FaGithub, FaLinkedin, FaDownload, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Interface_porta({ mudar_caminho }) {

  const [animacao_sair, set_animacao] = useState(false)

  const mudar_animacao = (voltar = false) => {

    set_animacao(true)

    //espera .3s para animacao rodas
    setTimeout(() => {
      mudar_caminho(); 
    }, 300); 

  }

  return (
    
      <div className={`container-porta ${animacao_sair ? "animacao_desaparecer" : ""}`}>
        <div className="porta">

          {/* Moldura da porta */}
          <div className="door-frame">
            <div className="conteudo">
              <div className="cabecalho">
                <span className="simbolo">✦</span>
                <h1 className="titulo">SOBRE MIM</h1>
                <span className="simbolo">✦</span>
              </div>

              <div className="linha-divisoria">
                <span className="ornamento">◈</span>
              </div>

              <p className="destaque">
                Desenvolvedor com foco em aplicações interativas.
              </p>

              <p className="descricao">
                Especializado em <strong>React, Three.js, Node.js </strong> 
                e arquiteturas escaláveis. Cada projeto é uma <strong>porta</strong> para novas possibilidades.
              </p>

              <div className="tecnologias">
                <span className="tag">React</span>
                <span className="tag">Three.js</span>
                <span className="tag">Node.js</span>
                <span className="tag">TypeScript</span>
                <span className="tag">UI/UX</span>
              </div>

              <div className="acoes">
                <a href="/curriculo/curriculo.pdf" download className="btn-curriculo">
                  <FaDownload /> Baixar currículo
                </a>
                <div className="redes-sociais">
                  <a href="https://github.com/Eduardo-SFeitosa" target="_blank">
                    <FaGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/eduardo-santos-846970232/" target="_blank">
                    <FaLinkedin />
                  </a>
                </div>
              </div>

              {/* Botão agora dentro do conteúdo */}
              <div className="botoes-porta">
                <button className="botao-passagem" onClick={() => mudar_animacao()}>
                  <span>AVANÇAR PARA JORNADA</span>
                  <span className="seta">→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="dobradica cima"></div>
          <div className="dobradica baixo"></div>
        </div>
      </div>
  );
}