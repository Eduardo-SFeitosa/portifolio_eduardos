
import { VFXEmitter, VFXParticles } from "wawa-vfx"

export default function EstrelaCadente(props) {

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

                    gravity: [0, -3, 0],

                    renderMode: "billboard",

                }
                }
            />

            <VFXEmitter

                emitter={nome}

                frustumCulled={false}

                settings={{

                    loop: true,

                    directionMin: [0, -2, -3],

                    directionMax: [0, -4, -5],

                    spread: 6,

                    speed: [15, 25],

                    size: [.5, 1.5],

                    startPositionMin: [-largura, altura, -profundidade],

                    startPositionMax: [largura, altura - 8, profundidade ],

                    spawnMode: "continuous",

                    duration: 90,

                    nbParticles: particulas,

                    particlesLifetime: [10, 15],

                    colorStart: corAleatoria(20),

                    colorEnd: corAleatoria(20),

                }}
            />

        </group>

    )

}