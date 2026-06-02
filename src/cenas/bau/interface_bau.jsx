import "./interface_bau.css"
import { Html } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { CameraControls } from "@react-three/drei";

export default function Interface_bau({ proximo_caminho, voltar_caminho, ...props }) {

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

            <Canvas className="canvas-bau">

                <CameraControls />

                <ambientLight intensity={.2} />

                <Moeda name="github" position={[ -2 , 0 , 0]} />

                <Moeda name="itch.io" position={[ 0 , 0 , 0]}/>

                <Moeda name="linkedin" position={[ 2 , 0 , 0]} />

                <pointLight
                    position={[0, 0, -10]}
                    intensity={Math.PI * 11}
                    color="#ffffff"
                    decay={2}
                />

            </Canvas>

            <div className="controle-caminhos">

                <h1 className="botao" onClick={() => voltar_caminho("bau")}>VOLTAR PARA STACKS</h1>

            </div>

        </Html>

    )

}

function Moeda({position, color}) {

    return (
        <mesh position={position}>
            {/* args format: [radius, widthSegments, heightSegments] */}
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )

}