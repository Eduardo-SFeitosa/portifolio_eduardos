import "./interface_bau.css"
import { Html } from "@react-three/drei"

export default function Interface_bau ({proximo_caminho, voltar_caminho , ...props}) {

    return (

        <Html position={props.position} 
        className={"interface-bau"} 
        zIndexRange={[100, 0]} 
        style={{ position: "static" }} 
        scale={0.5}>
            
                <div className="contato-gemas">

                    <div className="gema">

                        <h1>Entre em contato</h1>

                        <div className="formulario">

                            <form action="">

                                <label htmlFor="nome">Nome*</label>
                                <input required type="text" name="nome" />
                                <label htmlFor="email">Email*</label>
                                <input required type="email" name="email" />
                                <label htmlFor="mensagem">Mensagem*</label>
                                <textarea required name="mensagem" id="mensagem"></textarea>
                                <label htmlFor="telefone">Telefone</label>
                                <input type="number" name="telefone" id="telefone" />
                                <label htmlFor="whatssap">Resposta via whatssap</label>
                                <input type="checkbox" name="whatssap" id="whatssap" />
                                <input type="submit" value="Enviar" />

                            </form>

                        </div>

                    </div>

                    <div className="gema">

                        <a href="/curriculo/curriculo.pdf" download>Baixar curriculo</a>

                    </div>          

                </div>

                <div className="contato-moedas">

                    <div className="moeda">Github</div>
                    <div className="moeda">Itch.io</div>
                    <div className="moeda">Linkedin</div>

                </div>

                <div className="controle-caminhos">

                    <h1 className="botao" onClick={() => voltar_caminho("bau")}>VOLTAR PARA STACKS</h1>

                </div>

        </Html>
        
    )

}