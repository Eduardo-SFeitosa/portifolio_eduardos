import { Html } from "@react-three/drei";
import "./interface_mina.css"

export default function Interface_mina(props) {

    return (
    
    <Html 
    {...props}
    className={"interface-mina"}  
    zIndexRange={[100, 0]} 
    style={{ position: "static" }} 
    scale={0.5}>

        <h1>teste</h1>
    
    </Html>)

}