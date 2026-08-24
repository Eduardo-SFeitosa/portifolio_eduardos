import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, ScrollControls } from "@react-three/drei"

import { FaUser } from "react-icons/fa"
import ModeloBase from "./modelos_auxiliares/modelo_base"
import AguaAnimada from "./modelos_auxiliares/agua_animada"
import Porta from "./cenas/porta/porta"
import Interface_porta from "./cenas/porta/interface_porta"
import Acampamento from "./cenas/acampamento/acampamento"
import Interface_acampamento from "./cenas/acampamento/interface_acampamento"
import Orbe from "./cenas/orbe/orbe"
import Interface_orbe from "./cenas/orbe/interface_orbe"
import Mina from "./cenas/mina/mina"
import Interface_mina from "./cenas/mina/interface_mina"
import Bau from "./cenas/bau/bau_do_tesouro"
import Interface_bau from "./cenas/bau/interface_bau"

import Controle_de_camera from "./componentes_auxiliares/controle_de_camera"
import EstrelaEstatica from "./modelos_auxiliares/estrela_estatica_circulo"

import "./app.scss"

function App() {

  const [cena_em_foco , set_cena_em_foco] = useState(null)
  const [interface_ativa, set_interface] = useState(null)
  const [caminho_atual , set_caminho] = useState("porta")

  const referencia_camera = useRef(null)
  const controle_de_camera_ref = useRef(null)
  const [direcao_caminho, set_direcao] = useState("avancar")

  const versao_mobile = window.innerHeight > window.innerWidth ? true : false

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

    if (cena_em_foco == cena) return

    set_interface(null)
    set_caminho(cena)
    set_cena_em_foco(cena)
    controle_de_camera_ref.current.ativar_controle()

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
    set_interface(null)

    controle_de_camera_ref.current.destravar_camera(voltar)

  }

  const mudar_caminho = (direcao = "avancar") => {

    const cenas_ordem = Object.keys(posicao_de_cenas)

    const index_atual = cenas_ordem.indexOf(cena_em_foco)

    if (direcao == "avancar") {

      if ( cenas_ordem.length > index_atual + 1){
        set_caminho(cenas_ordem[index_atual + 1])
      }

      destravar_camera()

    }
    else{

      if ( index_atual){

      set_caminho(cenas_ordem[index_atual])

      }

      destravar_camera("voltar")

    }
  }

  useEffect(() => {

    if (!cena_em_foco) return
    
    if (cena_em_foco == caminho_atual){

      controle_de_camera_ref.current.travar_camera("final", cena_em_foco)

    }else{

      controle_de_camera_ref.current.travar_camera("comeco", caminho_atual)

    }

  }, [cena_em_foco])

  const controlar_clique = ( cena , acao="clique" ) => {

    //se estiver em desktop ignora necessidade de onPointerUp
    if (!versao_mobile && acao == "clique" && cena) travar_camera(cena)

    else if (versao_mobile && cena && acao != "clique") {
      travar_camera(cena)
    }

  }

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
          
            < ModeloBase />

            { /* MODELOS INTERATIVOS */}
            <group>

              <Porta 
              onPointerDown={() => { if (cena_em_foco != "porta") { controlar_clique("porta"); } }} 
              onPointerUp={() => { cena_em_foco != "porta" && versao_mobile ? controlar_clique("porta", "soltar") : null}}
              set_interface={set_interface}
              position={posicao_de_cenas["porta"]["posicao"]} 
              rotation={posicao_de_cenas["porta"]["rotacao"]} 
              ativado={ cena_em_foco == "porta" ? true : false}
              />

              <Acampamento 
              onPointerDown={() => { if (cena_em_foco != "acampamento") { controlar_clique("acampamento"); } }} 
              onPointerUp={() => { cena_em_foco != "acampamento" && versao_mobile ? controlar_clique("acampamento", "soltar") : null}}
              set_interface={set_interface}
              position={posicao_de_cenas["acampamento"]["posicao"]} 
              rotation={posicao_de_cenas["acampamento"]["rotacao"]} 
              ativado={ cena_em_foco == "acampamento" ? true : false}
              />

              <Orbe 
              onPointerDown={() => { if (cena_em_foco != "orbe") { controlar_clique("orbe"); } }} 
              onPointerUp={() => { cena_em_foco != "orbe" && versao_mobile ? controlar_clique("orbe", "soltar") : null}}
              referencia_camera={referencia_camera}
              set_interface={set_interface}
              position={posicao_de_cenas["orbe"]["posicao"]} 
              rotation={posicao_de_cenas["orbe"]["rotacao"]} 
              ativado={ cena_em_foco == "orbe" ? true : false}
              controle_de_camera={controle_de_camera_ref}
              interface_ativa={interface_ativa}
              direcao_caminho={direcao_caminho}
              mudar_caminho={mudar_caminho}
              />

              <Mina 
              onPointerDown={() => { cena_em_foco != "mina" ? controlar_clique("mina") : null}} 
              onPointerUp={() => { cena_em_foco != "mina" && versao_mobile ? controlar_clique("mina", "soltar") : null}}
              referencia_camera={referencia_camera}
              set_interface={set_interface}
              position={posicao_de_cenas["mina"]["posicao"]} 
              rotation={posicao_de_cenas["mina"]["rotacao"]} 
              ativado={ cena_em_foco == "mina" ? true : false}
              controle_de_camera={controle_de_camera_ref}
              interface_ativa={interface_ativa}
              direcao_caminho={direcao_caminho}
              mudar_caminho={mudar_caminho}
              />

              <Bau 
              onPointerDown={() => { cena_em_foco != "bau" ? controlar_clique("bau") : null }} 
              onPointerUp={() => { cena_em_foco != "bau" && versao_mobile ? controlar_clique("bau", "soltar") : null}}
              set_interface={set_interface}
              position={posicao_de_cenas["bau"]["posicao"]} 
              rotation={posicao_de_cenas["bau"]["rotacao"]} 
              ativado={ cena_em_foco == "bau" ? true : false}
              />    

            </group>

            {/* ESTRELAS */}
            <group>

              < EstrelaEstatica nome="estrelasEsquerda" position={[ -25, 15, 0 ]} largura={10} altura={20} profundidade={20} particulas={800} />

              < EstrelaEstatica nome="estrelasDireita" position={[ 25, 15, 0 ]} largura={10} altura={20} profundidade={20} particulas={800}/>

              < EstrelaEstatica nome="estrelasFrente" position={[ 0, 15, 25 ]} largura={40} altura={20} profundidade={10} particulas={800}/>

              < EstrelaEstatica nome="estrelasTras" position={[ 0, 15, -30 ]} largura={40} altura={20} profundidade={10} particulas={800}/>

              < EstrelaEstatica nome="estrelasCima" position={[ 0, 25, 0 ]} largura={20} altura={10} profundidade={20} particulas={1000}/>

            </group>
            
            < AguaAnimada 
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]} 
              position={[ 0 , -2.5 , 0.05 ]} 
              size={[30, 20, 128, 128]}
            />

        </ScrollControls>

        {/* ILUMINACAO */}
        <group>

          {/* GLOBAL */}
          < directionalLight position={[2, 5, 3]} intensity={.3} />
          < ambientLight intensity={0.3} />

          {/* ENTRADA */}
          < pointLight position={[-17.2, 5, -8]} intensity={400} color={"#2e4daa"} />
          
          {/* PORTA / ACAMPAMENTO / ORBE */}
          < pointLight position={[0, 10, 0]} intensity={700} color={"#2e4daa"} />
          < pointLight position={[0, 10, 20]} intensity={700} color={"#2e4daa"} />

          {/* BAU / MINA */}
          < pointLight position={[0, 10, -20]} intensity={700} color={"#2e4daa"} />
          < pointLight position={[0, 10, -20]} intensity={700} color={"#2e4daa"} />

          {/* ENTRADA */}
          < pointLight position={[-10, 10, 0]} intensity={400} color={"#2e4daa"} />

        </group>

      </Canvas>

      {/* INTERFACES */}
      <div className="interfaces">
        {interface_ativa == null ? null

        :interface_ativa == "porta" ? <Interface_porta mudar_caminho={mudar_caminho}/>

        :interface_ativa == "acampamento" ? <Interface_acampamento mudar_caminho={mudar_caminho} set_interface={set_interface}/>

        :interface_ativa == "orbe" ? <Interface_orbe mudar_caminho={mudar_caminho} set_direcao={set_direcao} set_interface={set_interface}/>

        :interface_ativa == "mina" ? <Interface_mina mudar_caminho={mudar_caminho} set_direcao={set_direcao} set_interface={set_interface}/>

        :interface_ativa == "bau" ? <Interface_bau mudar_caminho={mudar_caminho}/>
        
        : null}
      </div>

      <div className="navegacao">

            <button className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => teleportar("porta")} > <FaUser /> SOBRE</button>
            <button className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => teleportar("acampamento")} >JORNADA</button>
            <button className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => teleportar("orbe")} >STACKS</button>
            <button className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => teleportar("mina")} >PROJETOS</button>
            <button className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => teleportar("bau")} >CONTATO</button>

      </div>
      
    </>

  )
}

export default App
