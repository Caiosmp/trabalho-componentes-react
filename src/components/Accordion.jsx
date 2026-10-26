import {useState, useId} from 'react'

function Accordion ({itens}) {
    const [abertoIndex, setAbertoIndex] = useState (null)

    const idBase = useId()

    function alternar (indice) {
        setAbertoIndex (abertoIndex === indice ? null : indice)
    }
     return (
    <div className="acordeao">
      {itens.map((item, indice) => {
        const aberto = abertoIndex === indice
        const idBotao = `${idBase}-botao-${indice}`
        const idPainel = `${idBase}-painel-${indice}`

        return (
          <div
            className={`acordeao-item ${aberto ? 'aberto' : ''}`}
            key={item.titulo}
          >
            <h3>
              <button
                id={idBotao}
                className="acordeao-botao"
                aria-expanded={aberto}
                aria-controls={idPainel}
                onClick={() => alternar(indice)}
              >
                <span>{item.titulo}</span>
                <span className="acordeao-icone" aria-hidden="true" />
              </button>
            </h3>

            <div
              id={idPainel}
              role="region"
              aria-labelledby={idBotao}
              className="acordeao-painel"
            >
              <div className="acordeao-painel-interno">
                <p>{item.conteudo}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Accordion
