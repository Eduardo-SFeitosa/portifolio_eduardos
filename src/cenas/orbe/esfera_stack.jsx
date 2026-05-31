import { useState } from "react"
import { Html } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";

export default function Esfera_stack({ nome, cor , position = [0, 0, 0]}) {

    const [em_foco, set_em_foco] = useState(false)

    return (
        
        <RigidBody
        position={position}
        colliders="ball"           // colisor esférico automático
        restitution={0.7}         // quique
        linearVelocity={[
            (Math.random() - 0.5) * 2,  // velocidade aleatória inicial
            (Math.random() - 0.5) * 2,
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
            <Html occlude>
                <h1 style={{ color: "black", background: "white", padding: "2px 5px", width:"30px", height:"30px" }}>
                    {nome}
                </h1>
            </Html>
        )}

        </RigidBody>

    )

}