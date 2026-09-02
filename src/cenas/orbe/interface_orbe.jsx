import { Html, useGLTF } from "@react-three/drei";
import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import EstrelaEstatica from "../../modelos_auxiliares/estrela_estatica_circulo.jsx";

import { Css_icon } from "./modelos_orbe/css_icon.jsx";
import { Html5_icon } from "./modelos_orbe/html5_icon.jsx";
import { Javascript_icon } from "./modelos_orbe/Javascript_icon.jsx";
import { Python_icon } from "./modelos_orbe/python_icon.jsx";
import { Csharp_icon } from "./modelos_orbe/csharp_icon.jsx";


import Estrela_stack from "./estrela_stack";
import Brilho from "../../componentes_auxiliares/brilho.jsx"
import Linha from "./linha.jsx";

import "./interface_orbe.scss"

export default function Interface_orbe({ mudar_caminho, set_interface, set_direcao }) {

    const [stack, set_stack] = useState("python")
    const [animacao_sair, set_animacao] = useState(false)
    const versao_mobile = window.innerHeight > window.innerWidth ? true : false

    const zoom_camera = versao_mobile ? 7 : 4

    const icones_tamanho = versao_mobile ? .008 : .005
    const icones_espacamento = versao_mobile ? .25 : .2
    const icones_padding_bottom = versao_mobile ? 4.3 : 2.5

    const constelacoes_padding_bottom = versao_mobile ? .5 : -0.6

    const escala_constelacoes = 4
    const atraso_estrelas = .3 * 1000

    const constelacoes = {

        python: {

            estrelas: [
                { nome: "DJANGO",      posicao: [-0.7,  0.55, 0], margem_esquerda: 0, margem_cima: 1 },
                { nome: "FASTAPI",     posicao: [-0.55,  0.15, 0], margem_esquerda: 0, margem_cima: 2 },
                { nome: "PANDAS",      posicao: [-0.10, 0.10, 0], margem_esquerda: 0, margem_cima: 2 },
                { nome: "NUMPY",       posicao: [ 0.15, -0.35, 0], margem_esquerda: 2, margem_cima: 1 },
                { nome: "MATPLOTLIB",  posicao: [ 0.05, 0.45, 0], margem_esquerda: 0, margem_cima: 1 },
                { nome: "REQUESTS",    posicao: [ 0.50,  0.15, 0], margem_esquerda: 2, margem_cima: 2 },
                { nome: "SELENIUM",    posicao: [ 0.80,  0.50, 0], margem_esquerda: 2, margem_cima: 2 },
            ],

            estrelas_mobile: [
                { nome: "DJANGO",      posicao: [-0.00, 0.55, 0], margem_esquerda: 1, margem_cima: 0 },
                { nome: "FASTAPI",     posicao: [-0.00, 0.35, 0], margem_esquerda: 2, margem_cima: 1 },
                { nome: "PANDAS",      posicao: [-0.35, 0.15, 0], margem_esquerda: 0, margem_cima: 0 },
                { nome: "NUMPY",       posicao: [ 0.40, -0.10, 0], margem_esquerda: 1, margem_cima: 2 },
                { nome: "MATPLOTLIB",  posicao: [-0.55, -0.45, 0], margem_esquerda: 2, margem_cima: 1 },
                { nome: "REQUESTS",    posicao: [ 0.30, -0.70, 0], margem_esquerda: 1, margem_cima: 2 },
                { nome: "SELENIUM",    posicao: [-0.15, -0.95, 0], margem_esquerda: 0, margem_cima: 0 },
            ],

            conectar_final : false

        },

        javascript: {

            estrelas: [
                { nome: "REACT",       posicao: [-0.75,  0.50, 0], margem_esquerda: 0, margem_cima: 0 },
                { nome: "THREE.JS",    posicao: [-0.60,  0.00, 0], margem_esquerda: 0, margem_cima: 1 },
                { nome: "ANGULAR",     posicao: [-0.20,  0.40, 0], margem_esquerda: 2, margem_cima: 0 },
                { nome: "NODE.JS",     posicao: [-0.10, -0.15, 0], margem_esquerda: 0, margem_cima: 2 },
                { nome: "TYPESCRIPT",  posicao: [ 0.55,  0.35, 0], margem_esquerda: 2, margem_cima: 0 },
                { nome: "ROUTER",      posicao: [ 0.45, -0.20, 0], margem_esquerda: 1, margem_cima: 2 },
                { nome: "VITE",        posicao: [0.8, -0.10, 0], margem_esquerda: 2, margem_cima: 0 },
            ],

            estrelas_mobile : [
                { nome: "REACT",       posicao: [ 0.10,  0.55, 0], margem_esquerda: 0, margem_cima: 0 },
                { nome: "THREE.JS",    posicao: [-0.30,  0.40, 0], margem_esquerda: 0, margem_cima: 2 },
                { nome: "ANGULAR",     posicao: [ 0.30,  0.25, 0], margem_esquerda: 1, margem_cima: 0 },
                { nome: "NODE.JS",     posicao: [-0.35, -0.40, 0], margem_esquerda: 0, margem_cima: 0 },
                { nome: "TYPESCRIPT",  posicao: [ 0.25, -0.35, 0], margem_esquerda: 1, margem_cima: 0 },
                { nome: "ROUTER",      posicao: [ 0.10, -0.80, 0], margem_esquerda: 2, margem_cima: 0 },
                { nome: "VITE",        posicao: [-0.35, -0.75, 0], margem_esquerda: 1, margem_cima: 0 },
            ],

            conectar_final : false,

        },

        html_css: {

            estrelas: [
                { nome: "FORMS",       posicao: [ 0.30,  0.50, 0], margem_esquerda: 1, margem_cima: 2 },
                { nome: "RESPONSIVO",         posicao: [ 0.7,  0.15, 0], margem_esquerda: 2, margem_cima: 1 },
                { nome: "SASS",        posicao: [ 0.2, -0.05, 0], margem_esquerda: 1, margem_cima: 2 },
                { nome: "ANIMACOES",   posicao: [ -0.30, -0.30, 0], margem_esquerda: 0, margem_cima: 1 },
                { nome: "TAILWIND",    posicao: [-0.55, 0.1, 0], margem_esquerda: 0, margem_cima: 1 },
                { nome: "TAGS",        posicao: [-0.40,  0.4, 0], margem_esquerda: 0, margem_cima: 0 },
            ],

            estrelas_mobile : [
                { nome: "RESPONSIVO",  posicao: [ 0.50,  0.55, 0], margem_esquerda: 0, margem_cima: 0 },
                { nome: "FORMS",       posicao: [ 0.45, -0.15, 0], margem_esquerda: 0, margem_cima: 2 },
                { nome: "SASS",        posicao: [ 0.40, -0.80, 0], margem_esquerda: 2, margem_cima: 1 },
                { nome: "ANIMACOES",   posicao: [-0.40, -0.90, 0], margem_esquerda: 1, margem_cima: 0 },
                { nome: "TAGS",        posicao: [-0.50, -0.20, 0], margem_esquerda: 2, margem_cima: 1 },
                { nome: "TAILWIND",    posicao: [-0.50,  0.45, 0], margem_esquerda: 1, margem_cima: 0 },
            ],

            conectar_final : false

        },

        csharp: {
            estrelas: [
                { nome: "ASP.NET",         posicao: [ 0.00,  -0.30, 0], margem_esquerda: 2, margem_cima: 1 },
                { nome: ".NET",            posicao: [ 0.00,  0.00, 0], margem_esquerda: 2, margem_cima: 0 },
                { nome: "API REST",        posicao: [-0.25, 0.50, 0], margem_esquerda: 0, margem_cima: 2 },
                { nome: "WINDOWS FORMS",   posicao: [ 0.25, 0.50, 0], margem_esquerda: 2, margem_cima: 2 },
            ],

            estrelas_mobile : [
                { nome: "ASP.NET",         posicao: [ 0.00,  -0.85, 0], margem_esquerda: 2, margem_cima: 1 },
                { nome: ".NET",            posicao: [ 0.0,  -0.10, 0], margem_esquerda: 2, margem_cima: 1 },
                { nome: "API REST",        posicao: [-0.55, 0.40, 0], margem_esquerda: 1, margem_cima: 2 },
                { nome: "WINDOWS FORMS",   posicao: [ 0.5, 0.40, 0], margem_esquerda: 0, margem_cima: 0 },
            ],

            conectar_final : false 
        }

    }

    const atual = constelacoes[stack]

    const cores_estrelas = [
        "#ff0000", 
        "#FF2BD6", 
        "#8A5CFF", 
        "#00c711", 
        "#FF6A00", 
    ]

    //aplica escala das constelacoes
    const estrelas = versao_mobile ? atual.estrelas_mobile.map(estrela => ({
        ...estrela,
        posicao: estrela.posicao.map(v => v * escala_constelacoes)
    }))
    : atual.estrelas.map(estrela => ({
        ...estrela,
        posicao: estrela.posicao.map(v => v * escala_constelacoes)
    }))

    const icones = [
        {
            nome: "python",
            componente: Python_icon,
            cor: "#00E5FF",
        },
        {
            nome: "html_css",
            componente: Css_icon,
            cor: "#2f2bff",
        },
        {
            nome: "javascript",
            componente: Javascript_icon,
            cor: "#fffc5c",
        },
        {
            nome: "html_css",
            componente: Html5_icon,
            cor: "#FF6A00",
        },
        {
            nome: "csharp",
            componente: Csharp_icon,
            cor: "#cc00ff",
        },
    ]

    const mudar_animacao = (voltar = false) => {

        set_animacao(true)

        //espera .3s para animacao rodas
        setTimeout(() => {
            if (voltar) {
                set_direcao(voltar); 
            }else {
                set_direcao()
            }
            set_interface(null)
            
        }, 300); 

    }

    const imagens_src = {

        mobile : {

            python : "/imagens_cenas/orbe/snake.svg",

            html_css : "/imagens_cenas/orbe/formiga.svg",

            javascript : "/imagens_cenas/orbe/lagarto_mobile.svg",

            csharp : "/imagens_cenas/orbe/candelabro.svg"

        },

        desktop : {

            python : "/imagens_cenas/orbe/dragao.svg",

            html_css : "/imagens_cenas/orbe/grifo.svg",

            javascript : "/imagens_cenas/orbe/lagarto.svg",

            csharp : "/imagens_cenas/orbe/candelabro.svg"

        }

    }

    return (

        <div className={`interface-orbe ${animacao_sair ? "animacao-sair" : ""}`}>

            <Canvas className="canvas-orbe" camera={{ position: [0, 0, zoom_camera] }}>

                <ambientLight intensity={1} />

                {/* SELECAO / ICONES */}
                <group position={[0, icones_padding_bottom, 0]} >

                    {icones.map((icone, i) => {

                        const Icone_componente = icone.componente
                        const posicao_x = Math.floor(icones.length / 2) + i - icones.length + .5 + icones_espacamento * i
                        const brilho_tamanho = versao_mobile ? 1.5 : .8

                        return <>
                            
                            { stack == icone.nome ? 
                                <mesh
                                    raycast={() => null}
                                    position={[posicao_x, 0, 0]}
                                >

                                    <sphereGeometry args={[brilho_tamanho, 8, 8]} />
                                        
                                    <Brilho
                                        falloff={4.2}
                                        glowInternalRadius={4.1}
                                        glowSharpness={1.3}
                                        glowColor={icone.cor}
                                        side={"THREE.DoubleSide"}
                                        opacity={.20}
                                        depthTest={false}
                                    />    

                                    <Icone_componente
                                        onPointerDown={() => { set_stack(icone.nome) }}
                                        scale={icones_tamanho}
                                    />

                                </mesh> : 
                                
                                <mesh
                                    raycast={() => null}
                                    position={[posicao_x, 0, 0]}
                                >
                                    <Icone_componente
                                        onPointerDown={() => { set_stack(icone.nome) }}
                                        scale={icones_tamanho}
                                    />
                                </mesh>}

                        </>
                    })}

                </group>

                {/* CONSTELACAO */}
                <group position={[0, constelacoes_padding_bottom, 0]}>

                    {/* ESTRELAS */}
                    {estrelas.map((estrela, i) => (
                        <Estrela_stack
                            key={`constelacao ${estrela.nome}`}
                            nome={estrela.nome}
                            posicao={estrela.posicao}
                            margem_cima={estrela.margem_cima}
                            margem_esquerda={estrela.margem_esquerda}
                            cor={cores_estrelas[i % cores_estrelas.length]}
                            delay={i * atraso_estrelas}
                            delay_texto={estrelas.length * atraso_estrelas}
                        />
                    ))}

                    {/* LINHAS */}
                    {estrelas.map((estrela, i) => {

                        let promixa_estrela = estrelas.length - 1 == i ? estrelas[i] : estrelas[i + 1]

                        if ( atual.conectar_final && estrelas.length - 1 == i) {

                            promixa_estrela = estrelas[0]

                        }

                        return <Linha
                            key={`linha: ${estrela.nome}`}
                            atraso={i * atraso_estrelas}
                            ponto_1={estrela.posicao}
                            ponto_2={promixa_estrela.posicao}
                            tamanho={.7}
                        />

                    })}

                </group>

                {/* ESTRELAS DO FUNDO */}

                {versao_mobile ? 
                <EstrelaEstatica
                position={[0,0,-10]}
                cor={"white"}
                largura={7.5}
                altura={12}
                profundidade={3}
                particulas={500}
                tamanho={2.5}
                velocidade={0}
                />:
                <EstrelaEstatica
                position={[0,0,-7]}
                cor={"white"}
                largura={20}
                altura={11}
                profundidade={3}
                particulas={1000}
                tamanho={2.5}
                velocidade={0}
                />}

            </Canvas>

            {versao_mobile ? <img className="imagem-constelacao" src={imagens_src["mobile"][stack]} alt="" />:
            <img className="imagem-constelacao" src={imagens_src["desktop"][stack]} alt="" />}
            

            <div className="controle-caminhos">

                <h1 className="botao" onClick={() => { mudar_animacao("voltar") }}>VOLTAR PARA JORNADA</h1>

                <h1 className="botao" onClick={() => { mudar_animacao() }}>AVANCAR PARA PROJETOS</h1>

            </div>

        </div>)
}