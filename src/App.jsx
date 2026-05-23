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

  useEffect(() => {

    const handleKeyDown = (event) => {

      const cam = referencia_camera.current

      console.log(`rotation [${cam.rotation.x.toFixed(2)}, ${cam.rotation.y.toFixed(2)}, ${cam.rotation.z.toFixed(2)}]`);

      console.log(`position [${cam.position.x.toFixed(2)}, ${cam.position.y.toFixed(2)}, ${cam.position.z.toFixed(2)}]`);
      
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup: remove listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  const travar_camera = (cena) => {

    if ( !cena ) return

    const cenas_ordem = Object.keys(posicao_de_cenas)

    const index_atual = cenas_ordem.indexOf(cena)

    const cena_passada = (cenas_ordem.indexOf(caminho_atual) -1 == index_atual)

    if ( caminho_atual == cena || cena_passada ) {

      set_cena_em_foco(cena)

      if ( cena_passada ) {

        controle_de_camera_ref.current.travar_camera("comeco")

      }else{

        controle_de_camera_ref.current.travar_camera("final")

      }

    }

  }

  const destravar_camera = ( cena ) => {

    set_cena_em_foco(null)

    controle_de_camera_ref.current.destravar_camera()

  }

  const proximo_caminho = ( cena ) => {

    destravar_camera(cena)

    if ( cena != cena_em_foco ) return

    const cenas_ordem = Object.keys(posicao_de_cenas)

    const index_atual = cenas_ordem.indexOf(cena)

    if ( cenas_ordem.length > index_atual + 1){

        set_caminho(cenas_ordem[index_atual + 1])

    }
    
  }

  const voltar_caminho = ( cena ) => {

    const cenas_ordem = Object.keys(posicao_de_cenas)

    const index_atual = cenas_ordem.indexOf(cena)

    if ( 0 < index_atual - 1 ){

      set_caminho(cenas_ordem[index_atual - 1])

      set_cena_em_foco(null)

    }

    destravar_camera(cena)

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
            
          >

          </Controle_de_camera>

          {/* 

            <Controle_de_camera
            referencia_camera={referencia_camera}
            ref={controle_de_camera_ref}
            caminho_atual={caminho_atual}
            camera_travada={cena_em_foco != null}
            
          >

          </Controle_de_camera>

            <OrbitControls/>
          
          */}

          < directionalLight position={[2, 5, 3]} intensity={1.2} />

            < pointLight position={[0, 1, 0]} intensity={0.5} color={"#4466cc"} />

            < ambientLight />

            < ModeloBase />

            <Porta 
            onPointerDown={() => { cena_em_foco != "porta" ? travar_camera("porta") : proximo_caminho("porta")}} 
            proximo_caminho={proximo_caminho} 
            voltar_caminho={voltar_caminho} 
            position={posicao_de_cenas["porta"]["posicao"]} 
            rotation={posicao_de_cenas["porta"]["rotacao"]} 
            ativado={ cena_em_foco == "porta" ? true : false}
            />

            <Acampamento 
            onPointerDown={() => { cena_em_foco != "acampamento" ? travar_camera("acampamento") : proximo_caminho("acampamento")}} 
            proximo_caminho={proximo_caminho} 
            voltar_caminho={voltar_caminho} 
            position={posicao_de_cenas["acampamento"]["posicao"]} 
            rotation={posicao_de_cenas["acampamento"]["rotacao"]} 
            ativado={ cena_em_foco == "acampamento" ? true : false}
            />

            <Orbe 
            onPointerDown={() => { cena_em_foco != "orbe" ? travar_camera("orbe") : proximo_caminho("orbe")}} 
            proximo_caminho={proximo_caminho} 
            voltar_caminho={voltar_caminho} 
            position={posicao_de_cenas["orbe"]["posicao"]} 
            rotation={posicao_de_cenas["orbe"]["rotacao"]} 
            ativado={ cena_em_foco == "orbe" ? true : false}
            />

            <Mina 
            onPointerDown={() => { cena_em_foco != "mina" ? travar_camera("mina") : proximo_caminho("mina")}} 
            proximo_caminho={proximo_caminho} 
            voltar_caminho={voltar_caminho} 
            position={posicao_de_cenas["mina"]["posicao"]} 
            rotation={posicao_de_cenas["mina"]["rotacao"]} 
            ativado={ cena_em_foco == "mina" ? true : false}
            />

            <BauDoTesouro 
            onPointerDown={() => { cena_em_foco != "bau" ? travar_camera("bau") : proximo_caminho("bau")}} 
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

      <div className="navegacao" style={{width:"200px", display:"flex", position:"fixed", top:0,}}>

            <div className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => proximo_caminho("porta")} >porta</div>
            <div className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => proximo_caminho("acampamento")} >acampamento</div>
            <div className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => proximo_caminho("orbe")} >orbe</div>
            <div className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => proximo_caminho("mina")} >mina</div>
            <div className="links" style={{zIndex:10, backgroundColor:"white"}} onClick={() => proximo_caminho("bau")} >bau</div>

      </div>
      
    </>

  )
}

export default App
