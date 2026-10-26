function Pagination({ totalPaginas, paginaAtual, aoMudarPagina }) {
  if (totalPaginas <= 1) return null

  const paginas = Array.from({ length: totalPaginas }, (_, indice) => indice + 1)

  return (
    <nav className="paginacao" aria-label="Paginação das vagas">
      <button
        className="pagina-botao"
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
      >
        ‹ Anterior
      </button>

      <ul className="paginacao-lista">
        {paginas.map((numero) => (
          <li key={numero}>
            <button
              className={`pagina-botao ${numero === paginaAtual ? 'atual' : ''}`}
              onClick={() => aoMudarPagina(numero)}
              aria-label={`Página ${numero}`}
              aria-current={numero === paginaAtual ? 'page' : undefined}
            >
              {numero}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="pagina-botao"
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
      >
        Próxima ›
      </button>
    </nav>
  )
}

export default Pagination
