import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default function ModeloBase ()  {

    const gltf = useLoader(GLTFLoader, "/models/cena_principal.glb")

    return <primitive object={gltf.scene} />

}