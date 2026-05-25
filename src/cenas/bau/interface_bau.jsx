import "./interface_bau.css"
import { Html } from "@react-three/drei"

export default function Interface_bau (props) {

    return (

        <Html position={props.position} 
        className={"interface-bau"} 
        zIndexRange={[100, 0]} 
        style={{ position: "static" }} 
        scale={0.5}>

            <div className="fundo-bau" >
            
            <div className="contato-gemas">
                
            </div>

            <div className="contato-moedas">

            </div>
                
            </div>

        </Html>
        
    )

}