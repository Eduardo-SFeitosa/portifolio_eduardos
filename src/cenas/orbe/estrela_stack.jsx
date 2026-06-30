import { useState } from "react"
import { Html, useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three"

export default function Estrela_stack({ nome, cor, posicao }) {

    const [em_foco, set_em_foco] = useState(false)

    return (

        <>
        
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

        </>

    )

}