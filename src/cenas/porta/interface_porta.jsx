import "./interface_porta.scss";
import { Html } from "@react-three/drei";
import { FaGithub, FaLinkedin, FaDownload, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Interface_porta({ mudar_caminho , ...props }) {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    setAberto(true);
  }, []);

  return (
    
      <div className={`portal-container ${aberto ? "aberto" : ""}`}>
        <div className="portal-door">

          {/* Moldura da porta */}
          <div className="door-frame">
            <div className="door-arch">
              <div className="ornament-top"></div>
            </div>
            <div className="door-content">
              <div className="cabecalho">
                <span className="simbolo">✦</span>
                <h1 className="titulo">SOBRE MIM</h1>
                <span className="simbolo">✦</span>
              </div>

              <div className="linha-divisoria">
                <span className="ornamento">◈</span>
              </div>

              <p className="destaque">
                Desenvolvedor full-stack com foco em aplicações interativas, inovadoras e acessíveis.
              </p>

              <p className="descricao">
                Através da <span className="destaque-texto">criação de experiências digitais</span>, 
                unindo design e tecnologia. Especializado em <strong>React, Three.js, Node.js</strong> 
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
                  <a href="https://github.com/seuuser" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                  <a href="https://linkedin.com/in/seuuser" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                </div>
              </div>

              {/* Botão agora dentro do conteúdo, como uma maçaneta/fechadura */}
              <div className="botoes-porta">
                <button className="botao-passagem" onClick={() => mudar_caminho()}>
                  <FaLock className="icone-fechadura" />
                  <span>AVANÇAR PARA JORNADA</span>
                  <span className="seta">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Elementos decorativos da porta (dobradiças) */}
          <div className="hinge left"></div>
          <div className="hinge right"></div>
        </div>
      </div>
  );
}