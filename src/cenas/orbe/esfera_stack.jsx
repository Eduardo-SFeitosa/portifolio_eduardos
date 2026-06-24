import { useState } from "react"
import { Html, useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three"

export default function Esfera_stack({ nome, cor, posicao }) {

    const [em_foco, set_em_foco] = useState(false)

    const textura = useTexture("/stacks/react.png")

    textura.wrapS = THREE.RepeatWrapping
    textura.wrapT = THREE.ClampToEdgeWrapping

    textura.repeat.set(2, 1)

    return (

        <RigidBody
            position={posicao}
            colliders="ball"
            restitution={1}        
            friction={0}           
            linearDamping={0}      
            angularDamping={0}    
            canSleep={false}
            linearVelocity={[
                (Math.random() - 0.5) * 10,  // velocidade inicial
                (Math.random() - 0.5) * 10,
                0,
            ]}
        >

            <mesh
                onPointerDown={() => set_em_foco(!em_foco)}
            >
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshStandardMaterial color={cor} 
                map={textura}/>
            </mesh>

            {em_foco && (
                <Html
                    style={{ pointerEvents: "none" }}
                    scale={0.5}
                    position={[2,1,0]}
                    width={"fit-content"} height={"fit-content"}
                    style={{ position: "block" }}>

                    <h1 className="esfera-nome">
                        {nome}
                    </h1>
                </Html>
            )}

        </RigidBody>

    )

}