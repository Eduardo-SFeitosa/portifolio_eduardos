import { Html } from "@react-three/drei";
import { useState } from "react";
import { Canvas } from "@react-three/fiber"
import { Physics, RigidBody } from "@react-three/rapier";
import { CameraControls } from "@react-three/drei";
import "./interface_orbe.css"
import Esfera_stack from "./esfera_stack";
import { randFloat } from "three/src/math/MathUtils.js";

export default function Interface_orbe({proximo_caminho, voltar_caminho , ...props}) {

    const [stack, set_stack] = useState("python")

    const posicao_aleatoria = (max_x, max_y, max_z) => {

        return [randFloat(-max_x, max_x), randFloat(-max_y, max_y), randFloat(-max_z, max_z)]

    }

    return (
    
    <Html 

    {...props}
    className={"interface-orbe"} 
    occlude
    style={{ position: "block" }}    
    scale={0.5}>

        <div className="stacks">

            <div className="stack" onClick={() => set_stack("python")} >Python</div>
            <div className="stack" onClick={() => set_stack("javascript")} >Javascript</div>
            <div className="stack" onClick={() => set_stack("html/css")} >HTML/CSS</div>
            <div className="stack" onClick={() => set_stack("sql")} >SQL</div>
            <div className="stack" onClick={() => set_stack("c#")} >C#</div>

        </div>

        <Canvas className="canvas-orbe" camera={{ position: [0, 0, -13] }}>

            <ambientLight intensity={.2} />

            <pointLight 
                position={[0, 0, -10]} 
                intensity={Math.PI * 11} 
                color="#ffffff" 
                decay={2}
            />

            <Physics gravity={[0,0,0]}>

                {/* paredes */}
                <group>
                
                    {/* teto */}
                    <RigidBody type="fixed" friction={0} position={[0, 7, 0]}>
                        <mesh color="red">
                            <boxGeometry args={[38, .1, 9]} />
                        </mesh>
                    </RigidBody>

                    {/* chao */}
                    <RigidBody type="fixed" friction={0} position={[0, -7, 0]}>
                        <mesh color="red">
                            <boxGeometry args={[38, .1, 9]} />
                        </mesh>
                    </RigidBody>

                    {/* parede esquerda */}
                    <RigidBody type="fixed" friction={0} position={[19, 0, 0]}>
                        <mesh color="red">
                            <boxGeometry args={[.1, 15, 9]} />
                        </mesh>
                    </RigidBody>

                    {/* parede direita */}
                    <RigidBody type="fixed" friction={0} position={[-19, 0, 0]}>
                        <mesh color="red">
                            <boxGeometry args={[.1, 15, 9]} />
                        </mesh>
                    </RigidBody>

                    {/* parede frente */}
                    <RigidBody type="fixed" friction={0} position={[0, 0, 5]}>
                        <mesh visible={false} >
                            <boxGeometry args={[38, 15, .1]} />
                        </mesh>
                    </RigidBody>

                    {/* parede tras */}
                    <RigidBody type="fixed" friction={0} position={[0, 0, -5]}>
                        <mesh visible={false} >
                            <boxGeometry args={[38, 15, .1]} />
                        </mesh>
                    </RigidBody>

                </group>

                {stack == "python" ?  
                (<group className="conteudo-stack">
                    
                    <Esfera_stack cor={"blue"} nome={"DJANGO e FASTAPI"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Esfera_stack cor={"blue"} nome={"PANDAS e NUMPY e MATPLOTLIB"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Esfera_stack cor={"blue"} nome={"REQUESTS / BEAULTIFULSOUP / SELENIUM"} posicao={posicao_aleatoria(17, 5 , 0)}/>

                </group>)
                : stack == "javascript" ? 
                (<group>

                        <Esfera_stack cor={"blue"} nome={"THREE.JS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                        <Esfera_stack cor={"blue"} nome={"REACT"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                        <Esfera_stack cor={"blue"} nome={"ROUTER"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                        <Esfera_stack cor={"blue"} nome={"ANGULAR"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                        <Esfera_stack cor={"blue"} nome={"NODE.JS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                        <Esfera_stack cor={"blue"} nome={"TYPESCRIPT"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                        <Esfera_stack cor={"blue"} nome={"ANGULAR"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                        <Esfera_stack cor={"blue"} nome={"VITE"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                        
                </group>)

                : stack == "html/css" ? 
                (<group className="conteudo-stack">
                    
                    <Esfera_stack cor={"blue"} nome={"FORMS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Esfera_stack cor={"blue"} nome={"ANIMACOES"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Esfera_stack cor={"blue"} nome={"SASS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Esfera_stack cor={"blue"} nome={"TAILWIND"} posicao={posicao_aleatoria(17, 5 , 0)}/>

                </group>)

                : stack == "sql" ? 
                (<group className="conteudo-stack">
                    
                    <Esfera_stack cor={"blue"} nome={"SQLITE"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Esfera_stack cor={"blue"} nome={"MODELAGEM"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Esfera_stack cor={"blue"} nome={"JOINS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Esfera_stack cor={"blue"} nome={"PROCEDURES"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Esfera_stack cor={"blue"} nome={"CONSULTAS OTIMIZADAS"} posicao={posicao_aleatoria(17, 5 , 0)}/>

                </group>)

                :(<group className="conteudo-stack">
                    
                    <Esfera_stack cor={"blue"} nome={"ASP.NET"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Esfera_stack cor={"blue"} nome={"WINDOWS FORMS"} posicao={posicao_aleatoria(17, 5 , 0)}/>
                    <Esfera_stack cor={"blue"} nome={"API REST"} posicao={posicao_aleatoria(17, 5 , 0)}/>

                </group>)}

            </Physics>

        </Canvas>



        <div className="controle-caminhos">

            <h1 className="botao" onClick={() => voltar_caminho("orbe")}>VOLTAR PARA JORNADA</h1>

            <h1 className="botao" onClick={() => proximo_caminho("orbe")}>AVANCAR PARA PROJETOS</h1>

        </div>
    
    </Html>)

}