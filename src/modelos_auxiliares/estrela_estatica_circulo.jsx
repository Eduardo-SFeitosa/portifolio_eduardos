import { Sparkles } from "@react-three/drei"

export default function EstrelaEstatica(props) {

    const profundidade = props.profundidade

    const largura = props.largura

    const altura = props.altura

    const particulas = props.particulas

    const nome = props.nome

    const cores = ["red", "blue", "purple", "white", "green"]

    return (

        <group {...props}>

            {cores.map((cor) => {

                return <Sparkles
                    count={particulas / cores.length}
                    scale={[largura * 2, altura * 2, profundidade * 2]}
                    size={10}
                    speed={1}
                    opacity={1}
                    color={cor}
                />

            })
            }

        </group>

    )

}