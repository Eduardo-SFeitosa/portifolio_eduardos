import "./App.css"

import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, ScrollControls } from "@react-three/drei"

import Controle_de_camera from "./componentes_auxiliares/controle_de_camera"

import ModeloBase from "./modelos_auxiliares/modelo_base"

import AguaAnimada from "./modelos_auxiliares/agua_animada"

import BauDoTesouro from "./cenas/bau/bau_do_tesouro"

import Acampamento from "./cenas/acampamento/acampamento"

import Porta from "./cenas/porta/porta"

import Interface_porta from "./cenas/porta/interface_porta"

import Orbe from "./cenas/orbe/orbe"

import Mina from "./cenas/mina/mina"

import EstrelaEstatica from "./modelos_auxiliares/estrela_estatica_circulo"

function App() {

  const [cena_em_foco , set_cena_em_foco] = useState(null)

  const [caminho_atual , set_caminho] = useState("porta")

  const referencia_camera = useRef(null)

  const controle_de_camera_ref = useRef(null)

  const posicao_de_cenas = {

    porta : {
      posicao : [ -8.8, .1, 2.9 ] ,
      rotacao : [ 0, 0, 0]
    },

    acampamento : {
      posicao : [ -6.2 , 2 , 13 ] ,
      rotacao : [ 0, 0, 0]
    },

    orbe : {
      posicao : [ 1.3, 3, 2 ],
      rotacao : [ 0, 0, 0]
    },

    mina : {
      posicao : [ 9.222 , 1.975 , -3.066 ],
      rotacao : [ 0, 0, 0]
    },

    bau : {
      posicao : [-.9, 0, -17.8],
      rotacao : [ 0, -.7, 0]
    },

  }

  const teleportar = ( cena ) =>  {

    set_caminho(cena)

    set_cena_em_foco(cena)

  }

  const travar_camera = (cena) => {

    if ( !cena ) return

    const cenas_ordem = Object.keys(posicao_de_cenas)

    const index_atual = cenas_ordem.indexOf(cena)

    const cena_passada = (cenas_ordem.indexOf(caminho_atual) -1 == index_atual)

    if ( caminho_atual == cena && controle_de_camera_ref.current.progresso_scroll() > .8 || cena_passada ) {

      set_cena_em_foco(cena)

    }

  }

  const destravar_camera = ( voltar = false ) => {

    set_cena_em_foco(null)

    controle_de_camera_ref.current.destravar_camera(voltar)

  }

  const proximo_caminho = ( cena ) => {

    if ( cena != cena_em_foco ) return

    const cenas_ordem = Object.keys(posicao_de_cenas)

    const index_atual = cenas_ordem.indexOf(cena)

    if ( cenas_ordem.length > index_atual + 1){

        set_caminho(cenas_ordem[index_atual + 1])

    }

    destravar_camera()
    
  }

  const voltar_caminho = ( cena ) => {

    const cenas_ordem = Object.keys(posicao_de_cenas)

    const index_atual = cenas_ordem.indexOf(cena)

    if ( index_atual){

      set_caminho(cenas_ordem[index_atual])

    }

    destravar_camera("voltar")

  }

  useEffect(() => {

    if (!cena_em_foco) return
    
    if (cena_em_foco == caminho_atual){

      controle_de_camera_ref.current.travar_camera("final", cena_em_foco)

    }else{

      controle_de_camera_ref.current.travar_camera("comeco", caminho_atual)

    }

  }, [cena_em_foco])

  return (

    <>

      <Canvas onCreated={(state) => {
        referencia_camera.current = state.camera
      }} id="canvas">   

        <ScrollControls pages={cena_em_foco == null ? 4 : 0} damping={0.6} enabled={cena_em_foco == null}>

          <Controle_de_camera
            referencia_camera={referencia_camera}
            ref={controle_de_camera_ref}
            caminho_atual={caminho_atual}
            camera_travada={cena_em_foco != null}
          />

          

          {/* 

            <Controle_de_camera
            referencia_camera={referencia_camera}
            ref={controle_de_camera_ref}
            caminho_atual={caminho_atual}
            camera_travada={cena_em_foco != null}
          />

            <OrbitControls/>
          
          */}

            < directionalLight position={[2, 5, 3]} intensity={1.2} />

            < pointLight position={[0, 10, 0]} intensity={700} color={"#2e4daa"} />

            < pointLight position={[0, 10, 20]} intensity={700} color={"#2e4daa"} />

            < pointLight position={[0, 10, -20]} intensity={700} color={"#2e4daa"} />

            < pointLight position={[0, 10, -20]} intensity={700} color={"#2e4daa"} />

            < pointLight position={[-10, 10, 0]} intensity={400} color={"#2e4daa"} />

            < pointLight position={[-17.2, 5, -8]} intensity={400} color={"#2e4daa"} />

            < ambientLight intensity={0.3} />

            < ModeloBase />

            <Porta 
            onPointerDown={() => { cena_em_foco != "porta" ? travar_camera("porta") : null}} 
            proximo_caminho={proximo_caminho} 
            voltar_caminho={voltar_caminho} 
            position={posicao_de_cenas["porta"]["posicao"]} 
            rotation={posicao_de_cenas["porta"]["rotacao"]} 
            ativado={ cena_em_foco == "porta" ? true : false}
            />

            <Acampamento 
            onPointerDown={() => { cena_em_foco != "acampamento" ? travar_camera("acampamento") : null}} 
            proximo_caminho={proximo_caminho} 
            voltar_caminho={voltar_caminho} 
            position={posicao_de_cenas["acampamento"]["posicao"]} 
            rotation={posicao_de_cenas["acampamento"]["rotacao"]} 
            ativado={ cena_em_foco == "acampamento" ? true : false}
            />

            <Orbe 
            onPointerDown={() => { cena_em_foco != "orbe" ? travar_camera("orbe") : null}} 
            proximo_caminho={proximo_caminho} 
            voltar_caminho={voltar_caminho} 
            position={posicao_de_cenas["orbe"]["posicao"]} 
            rotation={posicao_de_cenas["orbe"]["rotacao"]} 
            ativado={ cena_em_foco == "orbe" ? true : false}
            />

            <Mina 
            onPointerDown={() => { cena_em_foco != "mina" ? travar_camera("mina") : null}} 
            referencia_camera={referencia_camera}
            proximo_caminho={proximo_caminho} 
            voltar_caminho={voltar_caminho} 
            position={posicao_de_cenas["mina"]["posicao"]} 
            rotation={posicao_de_cenas["mina"]["rotacao"]} 
            ativado={ cena_em_foco == "mina" ? true : false}
            controle_de_camera={controle_de_camera_ref}
            />

            <BauDoTesouro 
            onPointerDown={() => { cena_em_foco != "bau" ? travar_camera("bau") : null }} 
            proximo_caminho={proximo_caminho} 
            voltar_caminho={voltar_caminho} 
            position={posicao_de_cenas["bau"]["posicao"]} 
            rotation={posicao_de_cenas["bau"]["rotacao"]} 
            ativado={ cena_em_foco == "bau" ? true : false}
            />            

            < EstrelaEstatica nome="estrelasEsquerda" position={[ -25, 15, 0 ]} largura={10} altura={20} profundidade={20} particulas={800} />

            < EstrelaEstatica nome="estrelasDireita" position={[ 25, 15, 0 ]} largura={10} altura={20} profundidade={20} particulas={800}/>

            < EstrelaEstatica nome="estrelasFrente" position={[ 0, 15, 25 ]} largura={40} altura={20} profundidade={10} particulas={800}/>

            < EstrelaEstatica nome="estrelasTras" position={[ 0, 15, -30 ]} largura={40} altura={20} profundidade={10} particulas={800}/>

            < EstrelaEstatica nome="estrelasCima" position={[ 0, 25, 0 ]} largura={20} altura={10} profundidade={20} particulas={1000}/>

            < AguaAnimada 
            
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]} 
              position={[ 0 , -2.5 , 0.05 ]} 
              size={[30, 20, 128, 128]}
            
            />

        </ScrollControls>
          
      </Canvas>

      <div className="navegacao" style={{width:"200px", display:"flex", position:"fixed", top:0, zIndex:15}}>

            <button className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => teleportar("porta")} >SOBRE</button>
            <button className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => teleportar("acampamento")} >JORNADA</button>
            <button className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => teleportar("orbe")} >STACKS</button>
            <button className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => teleportar("mina")} >PROJETOS</button>
            <button className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => teleportar("bau")} >CONTATO</button>

      </div>
      
    </>

  )
}

export default App
