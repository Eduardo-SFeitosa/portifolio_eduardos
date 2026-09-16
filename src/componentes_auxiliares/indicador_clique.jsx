import "./indicador_clique.scss"

export default function Indicador_clique( {largura = "100vw", altura = "100vh", topo = 0, esquerda = 0}) {

    return (

        <div className={`indicador-clique`} style={{ top : topo, left : esquerda, width : largura, height : altura }}>

            <div className="circulos">

                <span className="onda onda-1" />
                <span className="onda onda-2" />
                <span className="onda onda-3" />

                <span className="centro" />

            </div>

        </div>

    )
}