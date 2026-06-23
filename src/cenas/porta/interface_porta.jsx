import "./interface_porta.css"
import { Html } from "@react-three/drei"

export default function Interface_porta({proximo_caminho, voltar_caminho , ...props}) {
    
  return (

    <Html {...props} style={{ position: "static" }} onClick={console.log("aaa")}>

      <div className="interface-porta">

        <div className="topo">

          <h1>SOBRE MIM</h1>

        </div>

        <div className="fundo-porta">

          <h1>TESTE</h1>

          <p>Desenvolvedor full-stack com foco em aplicacoes interativas, inovadoras e acessiveis</p>

          <br />

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, esse. Ipsum aspernatur facere sunt dolore laborum molestiae cum nemo officia nulla corporis ab officiis possimus, rem sint tempore tenetur? Alias!</p>

    
          <div className="curriculo" onClick={() => console.log("aaa")} >

            <a href="/curriculo/curriculo.pdf" download>Baixar curriculo</a>

          </div>

          <div className="controle-caminhos">

              <h1 className="botao" onClick={() => proximo_caminho("porta")}>AVANCAR PARA JORNADA</h1>

          </div>



        </div>



      </div>
    </Html>
  )
}
