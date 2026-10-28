import { createContext, useState } from 'react'
import Toast from '../components/Toast'

export const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  function mostrarToast(tipo, mensagem) {
    const novoToast = { id: Date.now() + Math.random(), tipo, mensagem }
    setToasts((lista) => [...lista, novoToast])
  }

  function removerToast(id) {
    setToasts((lista) => lista.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}

      <div className="toasts" aria-live="polite">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            tipo={toast.tipo}
            mensagem={toast.mensagem}
            aoFechar={() => removerToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
