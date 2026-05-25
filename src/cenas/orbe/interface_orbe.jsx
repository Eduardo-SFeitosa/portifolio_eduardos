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

        <div className="stacks">

            <div className="stack">Python</div>
            <div className="stack">Javascript</div>
            <div className="stack">HTML/CSS</div>
            <div className="stack">SQL</div>
            <div className="stack">C#</div>

        </div>

        <div className="conteudo-stacks">

            

        </div>
    
    </Html>)

}