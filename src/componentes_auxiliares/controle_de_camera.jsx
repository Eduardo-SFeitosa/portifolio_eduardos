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
  
      rio : {
        
        posicao : new CatmullRomCurve3([
  
        ]),
        direcao : new CatmullRomCurve3([
  
        ])
  
      },
  
      porta : {
        
        posicao : new CatmullRomCurve3([
          new Vector3(-17.2, 0, -7.8),
          new Vector3(-13, 0, -7.8),
          new Vector3(-13, 0, -6.1),
          new Vector3(-13, 1.4, -1.7),
          new Vector3(-11, 1.4, -1.6),
          new Vector3(-11, 1.4, 2),
          new Vector3(-9, 0.77, 1.89),
        ]),

        direcao : new CatmullRomCurve3([
          new Vector3(-12, 0, -7.8),
          new Vector3(-12, 0, -6),
          new Vector3(10, 0, 300),
          new Vector3(0, 1.6, -2),
          new Vector3(0, 1.6, -2),
          new Vector3(-11, 1.6, 150),
          new Vector3(0, 1, 500)
        ])
  
      },
  
      acampamento : {

        posicao : new CatmullRomCurve3([

          new Vector3(-9, 0.77, 1.89),

          new Vector3(-9, 1.1638161796821167, 2.0934465072055444),
          new Vector3(-6.6, 1.1380044853810525, 2.0315852543617083),
          new Vector3(-7, 2.4357155078625228, 5.912774312178762),
          new Vector3(-4.7, 2.613480285224395, 5.628657216888813),
          new Vector3(-4.5, 3.6, 9.612795012334084),
  
        ]),
        direcao : new CatmullRomCurve3([

          new Vector3(0, 1, 500),

          new Vector3(-1.1247934360202119, -1.4304761277904006, -1.1209375956796985),
          new Vector3(-3.0494515675959994, -0.01567934495027623, -3.140143899637158),
          new Vector3(-0.26861830479855825, -1.4908136905076705, -0.2678000902184276),
          new Vector3(-2.99653481844655, -0.11694453054873762, -3.124549504132997),
          new Vector3(-2.76080460383091, 0.05417539598980463, 3.119918793689745),
  
        ])
      },
  
      orbe : {
        posicao : new CatmullRomCurve3([
  
        ]),
        direcao : new CatmullRomCurve3([
  
        ])
      },
  
      mina : {
        posicao : new CatmullRomCurve3([
  
        ]),
        direcao : new CatmullRomCurve3([
  
        ])
      },
  
      bau : {
        posicao : new CatmullRomCurve3([
  
        ]),
        direcao : new CatmullRomCurve3([
  
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