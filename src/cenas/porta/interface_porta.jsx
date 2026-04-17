import { Html } from "@react-three/drei";
import "./interface_porta.css"

export default function Interface_porta(props) {

    return (
    
    <Html position={props.position} className={"interface-porta elemento-html"} occlude zIndexRange={[100, 0]} style={{ position: "static" }} scale={0.5}>

        <div className="background">

            <h1>TESTE</h1>

        </div>
    
    </Html>)

}