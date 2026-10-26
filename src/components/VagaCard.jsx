function VagaCard({ vaga }) {
  return (
    <li className="vaga">
      <div className="vaga-topo">
        <h3>{vaga.titulo}</h3>
        <span className="vaga-area">{vaga.area}</span>
      </div>

      <p className="vaga-info">
        {vaga.empresa} · {vaga.local}
      </p>

      <ul className="vaga-habilidades" aria-label="Habilidades exigidas">
        {vaga.habilidades.map((habilidade) => (
          <li key={habilidade}>{habilidade}</li>
        ))}
      </ul>
    </li>
  )
}

export default VagaCard
