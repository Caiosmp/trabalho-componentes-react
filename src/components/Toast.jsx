import { useEffect } from "react";

const icones = {
  sucesso: '✓',
  erro: '!',
  info: 'i',
}

function Toast({ tipo, mensagem, aoFechar, duracao = 4000 }) {
  useEffect(() => {
    const temporizador = setTimeout(() => aoFechar(), duracao)
    return () => clearTimeout(temporizador)
  }, [])

    return (
    <div
      className={`toast toast-${tipo}`}
      style={{ '--duracao': `${duracao}ms` }}
    >
      <span className="toast-icone" aria-hidden="true">
        {icones[tipo]}
      </span>
      <p className="toast-mensagem">{mensagem}</p>
      <button
        className="toast-fechar"
        aria-label="Fechar notificação"
        onClick={aoFechar}
      >
        ×
      </button>
    </div>
  )
}

export default Toast