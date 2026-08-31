import { Sparkles } from "@react-three/drei"

export default function EstrelaEstatica({profundidade, largura, altura, particulas, nome , cor, velocidade = 1, tamanho = 10, ...props}) {

    const cores = ["red", "blue", "purple", "white", "green"]

    return (

        <group {...props}>

            {cor ? <Sparkles
                    count={particulas}
                    scale={[largura * 2, altura * 2, profundidade * 2]}
                    size={10}
                    speed={1}
                    opacity={1}
                    color={cor}
                    size={tamanho}
                    speed={velocidade}
                />
                :
            cores.map((cor_escolhida) => {

                return <Sparkles
                    count={particulas / cores.length}
                    scale={[largura * 2, altura * 2, profundidade * 2]}
                    size={10}
                    speed={1}
                    opacity={1}
                    color={cor_escolhida}
                    size={tamanho}
                    speed={velocidade}
                />

            })
            }

        </group>

    )

}