import "./interface_bau.scss";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useState, useRef } from "react";
import { Moedas } from "./Moeda";
import { Moedas_caveira } from "./Moeda_caveira";
import { useSpring, animated } from "@react-spring/three";
import emailjs from '@emailjs/browser';

import { OrbitControls } from "@react-three/drei";

export default function Interface_bau({ mudar_caminho, ...props }) {

  const [interface_ativa, set_interface] = useState(false)

  const [dados_formulario, set_dados] = useState({
    nome: "",
    email: "",
    mensagem: "",
    telefone: "",
    whatsapp: false,
  });

  const referencia_formulario = useRef(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    set_dados((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Formulário enviado:", dados_formulario);

    //enviar email
    emailjs
      .sendForm(
        'service_28tiwcs',   // ID de servico
        'template_pnztxqe',  // ID de template
        referencia_formulario.current,
        { publicKey: 'hoK4pJ4kAjJ_nR588' }
      )
      
      .then(
        () => {
          alert('Email enviado!');
          set_dados({
            nome: "",
            email: "",
            mensagem: "",
            telefone: "",
            whatsapp: false,
          })
        },
        (error) => {
          alert('Falha ao mandar email: ' + error.text);
        }
    );
  };

  const {luz} = useSpring({

    from : {
      luz : 0
    },

    to : {
      luz : .35
    },

    onRest : () => {

      set_interface(true)

    },

    config: { tension: 50, friction: 70, precision:.1 },

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
      
      {interface_ativa && (

        <div className="interface-overlay">

          {/* Decorative glow behind the card */}

          <div className="card-glow" />


          {/* MAIN CARD */}

          <section className="container-principal">


            {/* Header */}

            <header className="cabecalho-contato">

              <h1 className="titulo-contato">
                Entre em contato
              </h1>

              <p className="subtitulo">
                Mande uma mensagem e vamos conversar.
              </p>

            </header>


            {/* Divider */}

            <div className="divisor">
              <span />
              <span className="diamante" />
              <span />
            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="formulario"
              ref={referencia_formulario}
            >

              <div className="campo">

                <label htmlFor="nome">Nome</label>

                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={dados_formulario.nome}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome"
                />

              </div>


              <div className="campo">

                <label htmlFor="email">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={dados_formulario.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                />

              </div>


              <div className="campo">

                <label htmlFor="mensagem">
                  Mensagem
                </label>

                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows="4"
                  value={dados_formulario.mensagem}
                  onChange={handleChange}
                  required
                  placeholder="Escreva sua mensagem..."
                />
              </div>

              <div className="linha-dupla">

                <div className="campo">

                  <label htmlFor="telefone">
                    Telefone
                  </label>

                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={dados_formulario.telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                  />

                </div>


                <label
                  htmlFor="whatsapp"
                  className="checkbox"
                >

                  <input
                    type="checkbox"
                    id="whatsapp"
                    name="whatsapp"
                    checked={dados_formulario.whatsapp}
                    onChange={handleChange}
                  />

                  <span className="checkbox-custom" />

                  <span>
                    Responder via WhatsApp
                  </span>

                </label>

              </div>


              <button
                type="submit"
                className="botao-enviar"
              >

                <span>
                  ENVIAR MENSAGEM
                </span>

                <span className="seta">
                  →
                </span>

              </button>

            </form>


            {/* SOCIAL */}

            <div className="social-section">

              <span className="social-label">
                OU ME ENCONTRE AQUI
              </span>

              <div className="social-links">

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Eduardo-SFeitosa"
                  className="social-link"
                >

                  <img
                    src="/icones/github.png"
                    alt="GitHub"
                  />

                  <div>
                    <strong>GitHub</strong>
                    <span>Projetos e código</span>
                  </div>

                </a>


                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/eduardo-santos-846970232/"
                  className="social-link"
                >

                  <img
                    src="/icones/linkedin.png"
                    alt="LinkedIn"
                  />

                  <div>
                    <strong>LinkedIn</strong>
                    <span>Perfil profissional</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="controle-caminhos">

              <button
                  className="botao-voltar"
                  onClick={() => mudar_caminho("voltar")}
                >

                  <span>
                    ←
                  </span>

                  VOLTAR PARA STACKS

              </button>

            </div>


          </section>


          {/* BACK BUTTON */}

          

        </div>

      )}

    </div>
  );
}