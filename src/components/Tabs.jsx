import { useState, useId, useRef } from 'react'

function Tabs({ abas, rotulo }) {
  const [ativa, setAtiva] = useState(0)
  const idBase = useId()
  const botoes = useRef([])

  function aoTeclar(evento, indice) {
    let novo = null
    if (evento.key === 'ArrowRight') novo = (indice + 1) % abas.length
    if (evento.key === 'ArrowLeft') novo = (indice - 1 + abas.length) % abas.length
    if (evento.key === 'Home') novo = 0
    if (evento.key === 'End') novo = abas.length - 1

    if (novo === null) return

    evento.preventDefault()
    setAtiva(novo)
    botoes.current[novo].focus()
  }

  return (
    <div className="abas">
      <div className="abas-lista" role="tablist" aria-label={rotulo}>
        {abas.map((aba, indice) => (
          <button
            key={aba.titulo}
            ref={(elemento) => (botoes.current[indice] = elemento)}
            id={`${idBase}-aba-${indice}`}
            role="tab"
            aria-selected={ativa === indice}
            aria-controls={`${idBase}-painel-${indice}`}
            tabIndex={ativa === indice ? 0 : -1}
            className={`aba ${ativa === indice ? 'ativa' : ''}`}
            onClick={() => setAtiva(indice)}
            onKeyDown={(evento) => aoTeclar(evento, indice)}
          >
            {aba.titulo}
          </button>
        ))}
      </div>

      {abas.map((aba, indice) => (
        <div
          key={aba.titulo}
          id={`${idBase}-painel-${indice}`}
          role="tabpanel"
          aria-labelledby={`${idBase}-aba-${indice}`}
          hidden={ativa !== indice}
          className="aba-painel"
        >
          {aba.conteudo}
        </div>
      ))}
    </div>
  )
}

export default Tabs
