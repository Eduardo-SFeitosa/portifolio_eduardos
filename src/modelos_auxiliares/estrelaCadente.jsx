
import { VFXEmitter, VFXParticles } from "wawa-vfx"

import { BoxGeometry } from "three"

import { DoubleSide, MeshBasicMaterial } from "three"

export default function EstrelaCadente(props) {

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

    const raioDeDistancia = 10

    const retangulo = new BoxGeometry(5,1,1)

    const material = new MeshBasicMaterial({
    color: "white",
    side: DoubleSide
})

    return (

        <group {...props}>

            <VFXParticles

                name="star"

                geometry={retangulo}

                material={material}

                settings={{

                    nbParticles: 1000,

                    gravity: [0, -2, 0],

                    renderMode: "stretchBillboard",

                }
                }
            />

            <VFXEmitter

                emitter="star"

                settings={{

                    loop: true,

                    directionMin: [0, -2, -3],

                    directionMax: [0, -4, -5],

                    spread: 6,

                    speed: [8, 12],

                    size: [0.1, 0.4],

                    startPositionMin: [-8, 15, -8],

                    startPositionMax: [8, 19, 8 ],

                    spawnMode: "continuous",

                    duration: 2,

                    nbParticles: 100,

                    particlesLifetime: [10, 15],

                    colorStart: corAleatoria(20),

                    colorEnd: corAleatoria(20),

                }}
            />

        </group>

    )

}