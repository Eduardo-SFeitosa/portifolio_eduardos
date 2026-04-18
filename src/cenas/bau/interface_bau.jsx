import "./interface_bau.css"
import { Html } from "@react-three/drei"

export default function Interface_bau (props) {

    return (

        <Html position={props.position} className={"interface-bau"} occlude zIndexRange={[100, 0]} style={{ position: "static" }} scale={0.5}>

            <div className="fundo-bau" >
            
                <p style={{overflowWrap: "break-word"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta dolorum perspiciatis, corrupti laboriosam consequatur ab nobis repellendus numquam in nihil dolorem ipsam et aspernatur, aliquam tenetur dolor dolore voluptatem iusto porro distinctio corporis excepturi hic maiores praesentium! Tenetur tempore aliquid quas, ipsa enim facere necessitatibus repellat accusantium iure? Saepe iusto amet harum aut autem doloribus fugit distinctio praesentium nisi dolore.</p>
            
            </div>

        </Html>
        
    )

}