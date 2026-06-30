import { useState } from "react"
import { Html } from "@react-three/drei"
import * as THREE from "three"

export default function Estrela_stack({ nome, cor, posicao }) {

    const [em_foco, set_foco] = useState(false)

    const cores = ["red", "blue", "purple", "white", "green"]

    return (

        <group position={posicao}>

            <mesh
                onPointerOver={() => set_foco(true)}
                onPointerOut={() => set_foco(false)}
            >
                <sphereGeometry args={[0.015, 16, 16]} />

                <meshStandardMaterial
                    color={cores[Math.floor(Math.random() * cores.length)]}
                    emissive={cores[Math.floor(Math.random() * cores.length)]}
                    emissiveIntensity={10}
                />
            </mesh>
      
            {em_foco && <Html
                style={{ pointerEvents: "none" }}
                scale={0.5}
                width={"fit-content"} height={"fit-content"}
                style={{ position: "block" }}>

                <h1 className="esfera-nome">
                    {nome}
                </h1>
            </Html>}

        </group>

    )

}