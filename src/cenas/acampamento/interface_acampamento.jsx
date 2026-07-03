import { Html } from "@react-three/drei";
import "./interface_acampamento.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";

export default function Interface_acampamento({proximo_caminho, voltar_caminho , ...props}) {

    const ano_inicio = 2020
    const ano_atual = new Date().getFullYear()

    
    const magos = [

        {
            nome: "faculdade",
            inicio: 2024,
            duracao_anos: 2.5
        },

        {
            nome: "tecnico",
            inicio: 2024,
            duracao_anos: 2
        },

        {
            nome: "gameDev",
            inicio: 2020,
            duracao_anos: ano_atual - 2020
        },

    ]

    return (
    
    <Html 
    {...props}
    className={"interface-acampamento"} 
    zIndexRange={[100, 0]} 
    style={{ position: "static" }} 
    scale={0.5}>

        <h1 className="titulo" >JORNADA</h1>

        <Canvas className="canvas-acampamento" camera={{ position: [0, 0, 8] }}>

            <OrbitControls/>

            < ambientLight intensity={5} />

            {/* MAGOS */}
            <group position={[0, -magos.length ,0]}>
                {magos.map((mago, i) => {

                    console.log(ano_atual - mago.inicio)

                    return <Jornada_mago 
                    tamanho={[mago.duracao_anos * 3 , 2 , 1]} 
                    posicao={[ano_atual - mago.inicio , i * 3 , 0]} cor={"blue"}/>
                
                })}
            </group>

            <mesh position={[0,0, -2]}>
                <boxGeometry args={[(ano_atual - ano_inicio) * 2.5 , magos.length * 5, 1]} /> 
                <meshStandardMaterial color={"purple"} />
            </mesh>

        </Canvas>

        <div className="controle-caminhos">

            <h1 className="botao" onClick={() => voltar_caminho("acampamento")}>VOLTAR PARA SOBRE</h1>

            <h1 className="botao" onClick={() => proximo_caminho("acampamento")}>AVANCAR PARA STACKS</h1>

        </div>
    
    </Html>)

}

function Jornada_mago({tamanho, cor, posicao}) {

    return <mesh position={posicao} >
      {/* Width, Height, and Depth dimensions in the args array */}
      <boxGeometry args={tamanho} /> 
      <meshStandardMaterial color={cor} />
    </mesh>

}
