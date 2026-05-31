import { useRef, useState } from "react"
import { Html } from "@react-three/drei"

export default function Esfera_stack({ nome , ...props}) {

    const esfera_referencia = useRef()
    const em_foco = useState(false)
    const cor = props.cor

    return (
        
        <group>

            <mesh ref={esfera_referencia}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color={cor} />
            </mesh>

            { em_foco? <Html><h1>{nome}</h1></Html> : null}

        </group>

    )

}