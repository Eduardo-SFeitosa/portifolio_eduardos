import { useState, useEffect, useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import './App.css'
import * as THREE from "three"

function App() {

  const sceneCanvas = useRef(null)

  const modeloPrincipal = useRef(null)

  const gltfLoader = new GLTFLoader()



  //inicializa cena do three js 
  useEffect(() => {

    const cena = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
  
    const renderer = new THREE.WebGLRenderer({
      canvas: sceneCanvas.current
    })
  
    renderer.setPixelRatio(window.devicePixelRatio)
  
    renderer.setSize(window.innerWidth , window.innerHeight)
  
    camera.position.setZ(20)

    camera.position.setY(10)

    camera.lookAt(0, -15, 0)

    const iluminacao = new THREE.AmbientLight( 0xFFFFFF )

    cena.add(iluminacao)
  
    renderer.render(cena, camera)

    gltfLoader.load("../models/cena_principal.glb", (gltf) => {

      modeloPrincipal.current = gltf.scene

      modeloPrincipal.current.position.set(0, 0, 0)

      cena.add(modeloPrincipal.current)

    })

    renderer.render(cena, camera)

    const redesenhar = () => {

      requestAnimationFrame(redesenhar)

      if (modeloPrincipal.current) {
        modeloPrincipal.current.rotation.y -= 0.005
      }
  
      renderer.render(cena, camera)
  
    }  

    redesenhar()

  }
  ,[])




  return (
    <>

      <canvas ref={sceneCanvas} id="background"></canvas>
      
    </>
  )
}

export default App
