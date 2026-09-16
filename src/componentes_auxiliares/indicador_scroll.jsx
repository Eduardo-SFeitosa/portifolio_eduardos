import { useEffect, useState } from "react"
import "./indicador_scroll.scss"

export default function Indicador_scroll() {

  const [visivel, set_visivel] = useState(true)

  const mobile = window.innerHeight > window.innerWidth


  useEffect(() => {

    const esconder = () => {
      set_visivel(false)
    }


    window.addEventListener("wheel", esconder, {
      passive: true
    })

    window.addEventListener("touchmove", esconder, {
      passive: true
    })


    return () => {

      window.removeEventListener("wheel", esconder)

      window.removeEventListener("touchmove", esconder)

    }

  }, [])


  if (!visivel) return null


  return (

    <div className="indicador-scroll">

      <span className="texto">
        {mobile ? "ARRASTE" : "SCROLL"}
      </span>

      <div className="indicador-movimento">

        <span></span>

        <span></span>

        <span></span>

      </div>

    </div>

  )
}