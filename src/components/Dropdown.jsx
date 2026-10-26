import { useState, useEffect, useRef, useId } from 'react'

function Dropdown({ rotulo, opcoes, valorSelecionado, aoSelecionar }) {
  const [aberto, setAberto] = useState(false)
  const idMenu = useId()
  const containerRef = useRef(null)
  const botaoRef = useRef(null)

  useEffect(() => {
    if (!aberto) return

    function aoClicarFora(evento) {
      if (containerRef.current && !containerRef.current.contains(evento.target)) {
        setAberto(false)
      }
    }

    function aoTeclar(evento) {
      if (evento.key === 'Escape') {
        setAberto(false)
        botaoRef.current.focus()
      }
    }

    document.addEventListener('mousedown', aoClicarFora)
    document.addEventListener('keydown', aoTeclar)

    return () => {
      document.removeEventListener('mousedown', aoClicarFora)
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [aberto])

  function escolher(opcao) {
    aoSelecionar(opcao.valor)
    setAberto(false)
    botaoRef.current.focus()
  }

  const selecionada = opcoes.find((opcao) => opcao.valor === valorSelecionado)

  return (
    <div className="dropdown" ref={containerRef}>
      <span className="dropdown-rotulo">{rotulo}</span>

      <button
        ref={botaoRef}
        className="dropdown-botao"
        aria-expanded={aberto}
        aria-controls={idMenu}
        aria-label={`${rotulo}: ${selecionada.texto}`}
        onClick={() => setAberto(!aberto)}
      >
        <span>{selecionada.texto}</span>
        <span className="dropdown-seta" aria-hidden="true" />
      </button>

      {aberto && (
        <ul id={idMenu} className="dropdown-menu">
          {opcoes.map((opcao) => (
            <li key={opcao.valor}>
              <button
                className={`dropdown-opcao ${
                  opcao.valor === valorSelecionado ? 'selecionada' : ''
                }`}
                aria-current={opcao.valor === valorSelecionado ? 'true' : undefined}
                onClick={() => escolher(opcao)}
              >
                {opcao.texto}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
