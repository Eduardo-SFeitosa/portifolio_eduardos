import { Html } from "@react-three/drei";
import "./interface_acampamento.css"

export default function Interface_acampamento(props) {

    return (
    
    <Html 

    {...props}
    className={"interface-acampamento"} 
    zIndexRange={[100, 0]} 
    style={{ position: "static" }} 
    scale={0.5}>

        <h1 className="titulo" >JORNADA</h1>

        <div className="caminhos">

            <div className="caminho">



            </div>

            <div className="caminho">



            </div>

            <div className="caminho">



            </div>

        </div>
    
    </Html>)

}