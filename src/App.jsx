import { useState, useEffect, useRef } from 'react'
import './App.css'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import * as THREE from "three"

function App() {

  const sceneCanvas = useRef(null)

  //inicializa cena do three js 
  useEffect(() => {

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
  
    const renderer = new THREE.WebGLRenderer({
      canvas: sceneCanvas.current
    })
  
    renderer.setPixelRatio(window.devicePixelRatio)
  
    renderer.setSize(window.innerWidth , window.innerHeight)
  
    camera.position.setZ(60)
  
  
    renderer.render(scene, camera)

    const geometrt = new THREE.TorusGeometry(20,10,20,40)

    const material = new THREE.MeshBasicMaterial({color : 0xFF6347, wireframe : true})

    const torus = new THREE.Mesh(geometrt, material)

    scene.add(torus)

    renderer.render(scene, camera)

    const redesenhar = () => {

      requestAnimationFrame(redesenhar)

      torus.rotation.x += 0.01

      torus.rotation.y += 0.02

      torus.rotation.z += 0.03
  
      renderer.render(scene, camera)
  
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
