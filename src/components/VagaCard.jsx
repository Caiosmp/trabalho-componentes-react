import ProgressBar from './ProgressBar'

function VagaCard({ vaga, match }) {
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

      <ProgressBar valor={match} rotulo="Compatibilidade" />
    </li>
  )
}

export default VagaCard
