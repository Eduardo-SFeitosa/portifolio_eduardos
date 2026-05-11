import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { CatmullRomCurve3, Vector3  } from 'three'

export default function Controle_de_camera({referencia_camera, camera_travada, caminho_atual }) {

  const  ignorar_scroll = useRef(false)

  const coordenadas_caminhos = {
  
      inicio : {
        
        posicao : new CatmullRomCurve3([
          new Vector3(-17.2, 0, -8),
          new Vector3(-12.6, 0, -8),
        ]),
        direcao : new CatmullRomCurve3([
          new Vector3(-12, 0, -8),
          new Vector3(-12, 0, -6),
        ])
  
      },
  
      porta : {
        
        posicao : new CatmullRomCurve3([
          new Vector3(-17.2, 0, -7.9),
          new Vector3(-13, 0, -7.8),
          new Vector3(-13, 0, -6.1),
          new Vector3(-13, 1.4, -1.7),
          new Vector3(-11, 1.4, -1.6),
          new Vector3(-11, 1.4, 2),
          new Vector3(-9, 0.77, 1.89),
        ]),

        direcao : new CatmullRomCurve3([
          new Vector3(-12, 0, -8.3),
          new Vector3(-12, 0, -6),
          new Vector3(-9, 0, 20),
          new Vector3(0, 1.6, -2),
          new Vector3(-11, 1.6, 10),
          new Vector3(-9, 1, 10),
        ])
  
      },
  
      acampamento : {

        posicao : new CatmullRomCurve3([

          new Vector3(-9, 0.77, 1.89),
          new Vector3(-7, 0.77, 1.89),
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
          new Vector3(3.59, 0.22, -13.91),
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
          new Vector3(3, 0, -16),
          new Vector3(-8, 0, -15),
          new Vector3(1, 1, -18),
          new Vector3(-.5, .5, -18.5),
  
        ])
      },
  
  }
  
  const coordenadas_decisoes = {

      porta : {
        rotacao : [-1.5707973260741874, 3.795917873777866e-8, 3.1036243530453027],
        posicao : [-8.456733005501444, 3.2868203201560813, 2.3165971323725607]
      },
  
      acampamento : {
        rotacao : [-1.5707971560256422, -5.589064063782636e-7, -2.5485262456046573],
        posicao : [-4.0184470184083745, 6.224340374771204, 10.624272808241919]
      },
  
      orbe : {
        rotacao : [-1.5707953272056208, 2.865798293463784e-8, 0.028661907086076834],
        posicao : [2.7727011088553293, 6.896761090625276, 2.431893417251977]
      },
  
      mina : {
        rotacao : [-1.5707958619252793, -8.853791498842958e-7, -1.0873089834052614],
        posicao : [7.625877384180385, 5.336587564243731, -3.991256943623446]
      },
  
      bau : {
        rotacao : [-1.5707958618015005, -8.856151143544813e-7, -1.0873090846069526],
        posicao : [-2.133894018214775, 4.34668147646163, -16.619114817879197]
      }
  }

  const scroll = useScroll()


  //resetar o scroll
  useLayoutEffect(() => {

    ignorar_scroll.current = true;

    if (scroll?.el) {

      scroll.el.style.overflow = 'hidden';

      scroll.el.scrollTop = 0;
      
      scroll.el.dispatchEvent(new Event('scroll'));
    }

    setTimeout(() => {
      if (scroll?.el) {
        
        scroll.el.style.overflow = 'auto';

      }
      
      ignorar_scroll.current = false;
    }, 50);

  }, [caminho_atual]);

  useFrame(() => {

    if (!referencia_camera || camera_travada || ignorar_scroll.current) return

    const progresso = scroll.offset

    const localizacao = coordenadas_caminhos[caminho_atual]["posicao"].getPoint(progresso)
      
    const direcao = coordenadas_caminhos[caminho_atual]["direcao"].getPoint(progresso)
    
    referencia_camera.current.lookAt(direcao)
      
    referencia_camera.current.position.copy(localizacao)

  })

  return null
}