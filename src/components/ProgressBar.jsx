import { useId } from 'react'

function ProgressBar ({valor, rotulo}) {
    const idRotulo = useId()

    const porcentagem = Math.min (100, Math.max(0,valor))
    const completo = porcentagem === 100

      return (
    <div className="progresso">
      <div className="progresso-topo">
        <span id={idRotulo}>{rotulo}</span>
        <strong>{porcentagem}%</strong>
      </div>

      <div
        className="progresso-trilho"
        role="progressbar"
        aria-labelledby={idRotulo}
        aria-valuenow={porcentagem}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`progresso-preenchimento ${completo ? 'completo' : ''}`}
          style={{ width: `${porcentagem}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar