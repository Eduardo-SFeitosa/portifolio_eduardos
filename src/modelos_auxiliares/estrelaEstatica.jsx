
import { VFXEmitter, VFXParticles } from "wawa-vfx"

export default function EstrelaEstatica(props) {

    const profundidade = props.profundidade

    const largura = props.largura

    const altura = props.altura

    const particulas = props.particulas

    const nome = props.nome

    const corAleatoria = (quantidade) => {

        const cores = []

        for (let index = 0; index < quantidade ; index ++){

            const r = Math.floor(Math.random() * 256)

            const g = Math.floor(Math.random() * 256)

            const b = Math.floor(Math.random() * 256)

            cores.push(`rgb(${r}, ${g}, ${b})`)

        }

        return cores

    }

    return (

        <group {...props}>

            <VFXParticles

                name={nome}

                settings={{

                    nbParticles: particulas,

                    gravity: [0, 0, 0],

                    renderMode: "billboard",

                }
                }
            />

            <VFXEmitter

                emitter={nome}

                settings={{

                    loop: true,

                    spread: 6,

                    size: [0.3, 0.8],

                    startPositionMin: [-largura, -altura, -profundidade],

                    startPositionMax: [largura, altura, profundidade],

                    directionMin: [-0.1, -0.1, -0.1],

                    directionMax: [0.1, 0.1, 0.1],

                    speed: [0.05, 0.2],

                    spawnMode: "continuous",

                    duration: 20,

                    nbParticles: particulas,

                    particlesLifetime: [50, 100],

                    colorStart: corAleatoria(20),

                    colorEnd: corAleatoria(20),

                }}
            />

        </group>

    )

}