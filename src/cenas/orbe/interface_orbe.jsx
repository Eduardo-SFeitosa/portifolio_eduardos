import { Html } from "@react-three/drei";
import "./interface_orbe.css"

export default function Interface_orbe(props) {

    return (
    
    <Html 

    {...props}
    
    className={"interface-orbe"} 
        
    occlude zIndexRange={[100, 0]} 
        
    style={{ position: "static" }} 
            
    scale={0.5}>

        <h1>TESTE</h1>
    
    </Html>)

}