import "./interface_bau.scss";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useRef, useState } from "react";

export default function Interface_bau({ proximo_caminho, voltar_caminho, ...props }) {
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

  return (
    <Html
      {...props}
      className="interface-bau"
      zIndexRange={[100, 0]}
      style={{ position: "static" }}
    >
      <div className="container-bau">
        {/* Painel principal com formulário e moedas */}
        <div className="painel-contato">
          <h1 className="titulo-contato">📬 Entre em contato</h1>
          <p className="subtitulo">
            Vamos conversar! Preencha o formulário ou me encontre nas redes abaixo.
          </p>

          <div className="conteudo-duas-colunas">
            {/* Coluna do formulário */}
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

            {/* Coluna das moedas (links sociais + currículo) */}
            <div className="coluna-moedas">
              <div className="moedas-container">
                <Moeda
                  nome="GitHub"
                  link="https://github.com/seu-usuario"
                  cor="#f0f0f0"
                  icone="🐙"
                />
                <Moeda
                  nome="itch.io"
                  link="https://seu-usuario.itch.io"
                  cor="#fa5c5c"
                  icone="🎮"
                />
                <Moeda
                  nome="LinkedIn"
                  link="https://linkedin.com/in/seu-perfil"
                  cor="#0a66c2"
                  icone="🔗"
                />
                <Moeda
                  nome="Currículo"
                  link="/curriculo/curriculo.pdf"
                  cor="#ffd966"
                  icone="📄"
                  download
                />
              </div>
            </div>
          </div>
        </div>


        {/* Navegação inferior */}
        <div className="controle-caminhos">
          <button className="botao" onClick={() => voltar_caminho("bau")}>
            ← VOLTAR PARA STACKS
          </button>
        </div>
      </div>
    </Html>
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