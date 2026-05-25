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

                <div className="gema">

                    <h1>Entre em contato</h1>

                    <form action="">

                        <label htmlFor="nome">Nome</label>
                        <input type="text" name="nome" />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" />
                        <label htmlFor="mensagem">Mensagem</label>
                        <textarea name="mensagem" id="mensagem"></textarea>
                        <input type="submit" value="Enviar" />

                    </form>

                </div>

                <div className="gema">

                    <h1>Baixar curriculo</h1>

                </div>          

            </div>

            <div className="contato-moedas">

                <div className="moeda">Github</div>
                <div className="moeda">Itch.io</div>
                <div className="moeda">Linkedin</div>

            </div>
                
            </div>

        </Html>
        
    )

}