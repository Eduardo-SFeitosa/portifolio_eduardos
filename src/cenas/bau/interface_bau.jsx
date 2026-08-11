import "./interface_bau.scss";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useState } from "react";
import { Moedas } from "./Moeda";
import { Moedas_caveira } from "./Moeda_caveira";
import { useSpring, animated } from "@react-spring/three";

import { OrbitControls } from "@react-three/drei";

export default function Interface_bau({ mudar_caminho, ...props }) {

  const [interface_ativa, set_interface] = useState(false)

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
    telefone: "",
    whatsapp: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode integrar com um serviço de email (ex: EmailJS)
    console.log("Formulário enviado:", formData);
    alert("Mensagem enviada! (simulação)");
    // Resetar formulário se desejar
  };

  const {luz} = useSpring({

    from : {
      luz : 0
    },

    to : {
      luz : .4
    },

    onRest : () => {

      set_interface(true)

    },

    config: { tension: 80, friction: 20 },

    delay : 1000
    
  })

  return (

    <div className="interface-bau">

      <Canvas className="canvas-bau" camera={{
        position: [
            2.2,
            -.7,
            15
        ],
        fov: 45,
        zoom: 1}}>

        <Moedas_caveira/>

        <animated.ambientLight intensity={luz} />

        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} target={[.5,1,-0.018]} /> 

      </Canvas>
      
      { interface_ativa && <div className="container-principal">

        {/* Painel principal com formulário e moedas */}
        <div className="painel-contato">
          <h1 className="titulo-contato">📬 Entre em contato</h1>
          <p className="subtitulo">
            Vamos conversar! Preencha o formulário ou me encontre nas redes abaixo.
          </p>

          <div className="conteudo-duas-colunas">
            Coluna do formulário 
            <div className="coluna-formulario">
              <form onSubmit={handleSubmit} className="formulario">
                <div className="campo">
                  <label htmlFor="nome">Nome *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="mensagem">Mensagem *</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows="4"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    placeholder="Escreva sua mensagem aqui..."
                  />
                </div>

                <div className="linha-dupla">
                  <div className="campo">
                    <label htmlFor="telefone">Telefone</label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="campo checkbox">
                    <label htmlFor="whatsapp">
                      <input
                        type="checkbox"
                        id="whatsapp"
                        name="whatsapp"
                        checked={formData.whatsapp}
                        onChange={handleChange}
                      />
                      Resposta via WhatsApp
                    </label>
                  </div>
                </div>

                <button type="submit" className="botao-enviar">
                  Enviar mensagem →
                </button>
              </form>
            </div>
            
          </div>
        </div>

        <div className="icones">

          <a target="_blank" href="https://github.com/Eduardo-SFeitosa"><img className="icone" src="/icones/github.png" alt="" /></a>

          <a target="_blank" href="https://www.linkedin.com/in/eduardo-santos-846970232/"><img className="icone" src="/icones/linkedin.png" alt="" /></a>

        </div>

        {/* Navegação inferior */}
        <div className="controle-caminhos">
          <button className="botao" onClick={() => mudar_caminho("voltar")}>
            ← VOLTAR PARA STACKS
          </button>
        </div>

      </div>}

    </div>
  );
}

// Componente Moeda (HTML) - ícone com link
function Moeda({ nome, link, cor, icone, download = false }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      download={download}
      className="moeda-link"
      style={{ "--cor-moeda": cor }}
    >
      <div className="moeda-icone">{icone}</div>
      <span className="moeda-nome">{nome}</span>
    </a>
  );
}

// Componente Moeda3D (cena Three.js)
function Moeda3D({ position, cor, escala = 1 }) {
  return (
    <mesh position={position} scale={[escala, escala, escala]}>
      <cylinderGeometry args={[1, 1, 0.3, 32]} />
      <meshStandardMaterial
        color={cor}
        metalness={0.7}
        roughness={0.3}
        emissive={cor}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}