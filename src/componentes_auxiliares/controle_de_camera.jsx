import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { forwardRef, useImperativeHandle } from "react"
import { CatmullRomCurve3, Vector3  } from 'three'

const Controle_de_camera = forwardRef((props, ref ) => {

  const referencia_camera = props.referencia_camera 
  const camera_travada_em = useRef(null)
  const progresso = useRef(0)
  const controlando_camera = useRef(true)
  const caminho_invertido = useRef(false)

  const caminho_atual = props.caminho_atual

  useImperativeHandle( ref, () => ({

    progresso_scroll() {
      return progresso.current
    },
    travar_camera,
    destravar_camera,
    desativar_controle,
    ativar_controle

  }))

  const ignorar_scroll = useRef(false)

  const coordenadas_caminhos = {
  
      porta : {
        
        posicao : new CatmullRomCurve3([
          new Vector3(-17.2, 0, -7.9),
          new Vector3(-13, 0, -7.8),
          new Vector3(-13, 0, -6.1),
          new Vector3(-13, 1.4, -1.7),
          new Vector3(-11, 1.4, -1.6),
          new Vector3(-11, 1.4, 2),
          new Vector3(-8.8, 0.77, 2.3),
        ]),

        direcao : new CatmullRomCurve3([
          new Vector3(-12, 0, -8.3),
          new Vector3(-12, 0, -6),
          new Vector3(-9, 0, 20),
          new Vector3(0, 1.6, -2),
          new Vector3(-11, 1.6, 10),
          new Vector3(-9, 1, 10),
          new Vector3(-9, 1, 10),
        ])
  
      },
  
      acampamento : {

        posicao : new CatmullRomCurve3([

          new Vector3(-8.8, 0.77, 2.3),
          new Vector3(-7, 1, 1.89),
          new Vector3(-7, 1.3, 2.08),
          new Vector3(-6.87, 2.82, 5.25),
          new Vector3(-5.39, 2.52, 5.71),
          new Vector3(-4.21, 3.95, 10.00),
          new Vector3(-4.8, 3.2, 12.50),
  
        ]),

        direcao : new CatmullRomCurve3([

          new Vector3(-9, 1, 10),
          new Vector3(-1.09, 1, 0),
          new Vector3(-7, 2, 12),
          new Vector3(-2, 2, 6),
          new Vector3(-3.10, 2, 12),
          new Vector3(-6, 1.6, 17),
          new Vector3(-6, 2.7, 12.7),
  
        ])
      },

      orbe : {

        posicao : new CatmullRomCurve3([

          new Vector3(-4.8, 3.2, 12.50),
          new Vector3(-4.21, 3.95, 10),
          new Vector3(-0.73, 4.15, 10),
          new Vector3(3.25, 4.15, 10),
          new Vector3(3.25, 4.15, 4.35),
          new Vector3(3.25, 4.15, 2.13),
  
        ]),
        
        direcao : new CatmullRomCurve3([

          new Vector3(-6, 2.7, 12.7),
          new Vector3(-6, 1.6, 17),
          new Vector3(20, 2, 6.5),
          new Vector3(-0.52, 2, -0.52),
          new Vector3(0, 4, 0),
          new Vector3(-3.14, 4, 2.3),
  
        ])
      },

      mina : {

        posicao : new CatmullRomCurve3([

          new Vector3(3.25, 4.15, 2.13),
          new Vector3(4.75, 4.15, 2.13),
          new Vector3(7, 4.15, 2.13),
          new Vector3(7, 4.15, 0.16),
          new Vector3(7.25, 3.15, -3.27),
          new Vector3(8.30, 3.11, -3.98),
  
        ]),
        direcao : new CatmullRomCurve3([

          new Vector3(-3.14, 4, 2.3),
          new Vector3(10, 3, -4),
          new Vector3(7, 3, -4),
          new Vector3(7.5, 1, -6),
          new Vector3(8, 2, -7),
          new Vector3(9.5, 2.4, -2),
  
        ])
      },

      bau : {

        posicao : new CatmullRomCurve3([

          new Vector3(8.30, 3.11, -3.98),
          new Vector3(7.11, 3.26, -4.13),
          new Vector3(7.11, 2.46, -7.69),
          new Vector3(3.09, 1.25, -7.61),
          new Vector3(3.09, 1.29, -9.52),
          new Vector3(3.6, 0.22, -13.91),
          new Vector3(0.62, 0.22, -13.91),
          new Vector3(-3, 1.39, -13.91),
          new Vector3(-2, 1.64, -16.19),
  
        ]),

        direcao : new CatmullRomCurve3([

          new Vector3(9.5, 2.4, -2),
          new Vector3(8, 2, -7),
          new Vector3(5, 1.18, -8),
          new Vector3(3, 1, -9),
          new Vector3(3, 1, -10),
          new Vector3(3, -.5, -16),
          new Vector3(-8, 0, -15),
          new Vector3(1, 1, -18),
          new Vector3(-.5, .5, -18.5),
  
        ])
      },
  
  }

  const scroll = useScroll()

  const desativar_controle = () => {

    controlando_camera.current = false

  }

  const ativar_controle = () => {

    controlando_camera.current = true

  }

  const travar_scroll = ( posicao ) => {

    ignorar_scroll.current = true;

    if (scroll?.el) {

      scroll.el.style.overflow = 'hidden';

      scroll.el.scrollTop = 0
      
      scroll.el.dispatchEvent(new Event('scroll'));

    }

    setTimeout(() => {
      if (scroll?.el) {
        
        scroll.el.style.overflow = 'auto';

      }
      
      ignorar_scroll.current = false;
    }, 50);

  }

  const travar_camera = ( posicao, cena ) => {

    const pontos_alvo_posicao = coordenadas_caminhos[cena]["posicao"].points

    const pontos_alvo_direcao = coordenadas_caminhos[cena]["direcao"].points

    travar_scroll(posicao)

    const travar_em = posicao == "comeco" ? 0 : pontos_alvo_posicao.length - 1

    camera_travada_em.current = {
      "posicao" : pontos_alvo_posicao[travar_em],
      "direcao" : pontos_alvo_direcao[travar_em]
    }
    
  }

  const destravar_camera = ( voltar ) => {

    camera_travada_em.current = null

    caminho_invertido.current = voltar ? true : false

  }

  useFrame(() => {

    if (!controlando_camera.current) return

    if ( camera_travada_em.current ) {

      const { posicao, direcao } = camera_travada_em.current
      const camera = referencia_camera.current
      referencia_camera.current.lookAt(direcao)
      camera.position.lerp(posicao, 0.1)

      return

    }

    progresso.current = caminho_invertido.current ? 1 - scroll.offset : scroll.offset 

    if (!referencia_camera || ignorar_scroll.current) return

    if (!coordenadas_caminhos[caminho_atual] || progresso.current < 0) return    

    const localizacao = coordenadas_caminhos[caminho_atual]["posicao"].getPoint(progresso.current)
      
    const direcao = coordenadas_caminhos[caminho_atual]["direcao"].getPoint(progresso.current)
    
    referencia_camera.current.lookAt(direcao)

    referencia_camera.current.position.copy(localizacao)

  })

})

export default Controle_de_camera