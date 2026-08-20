import { Line } from "@react-three/drei"
import { useEffect, useState } from "react"
import { animated, useSpring } from "@react-spring/three"

export default function Linha({ponto_1, ponto_2, atraso, cor="white", tamanho=.5}) {

    const [ponto_final, set_ponto_final] = useState(ponto_1)

    useEffect(() => {

        const timeout = setTimeout(() => {

            let progress = 0

            const animate = () => {

                progress += 0.05

                set_ponto_final([
                    ponto_1[0] + (ponto_2[0] - ponto_1[0]) * progress,
                    ponto_1[1] + (ponto_2[1] - ponto_1[1]) * progress,
                    ponto_1[2] + (ponto_2[2] - ponto_1[2]) * progress,
                ])

                if (progress < 1)
                    requestAnimationFrame(animate)

            }

            animate()

        }, atraso)

        return () => clearTimeout(timeout)

    }, [])
    
    return <Line
            points={[ponto_1, ponto_final]}
            color={cor}
            lineWidth={tamanho}
            />

}