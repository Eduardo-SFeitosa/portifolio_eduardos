import { useState } from "react"
import { Html } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";

export default function Esfera_stack({ nome, cor, posicao }) {

    const [em_foco, set_em_foco] = useState(false)

    return (

        <RigidBody
            position={posicao}
            colliders="ball"
            restitution={1}        // quique 100% (não perde energia)
            friction={0}           // sem atrito
            linearDamping={0}      // sem desaceleração linear
            angularDamping={0}     // sem desaceleração rotacional
            canSleep={false}
            linearVelocity={[
                (Math.random() - 0.5) * 10,  // velocidade aleatória inicial
                (Math.random() - 0.5) * 10,
                0,
            ]}
        >

            <mesh
                onPointerDown={() => set_em_foco(!em_foco)}
            >
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshStandardMaterial color={cor} />
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