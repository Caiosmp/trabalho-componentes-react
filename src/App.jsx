import { useState, useEffect } from 'react'
import ProgressBar from './components/ProgressBar'
import Accordion from './components/Accordion'

const perguntasFaq = [
  {
    titulo: 'Como posso me candidatar a uma vaga?',
    conteudo:
      "Para se candidatar a uma vaga, basta clicar no botão 'Candidatar-se' na página da vaga desejada. Certifique-se de ter enviado seu currículo em PDF antes de se candidatar.",
  },
  {
    titulo: 'Preciso ter experiência prévia para me candidatar a uma vaga?',
    conteudo:
      'Não. As vagas são de estágio e muitas aceitam estudantes a partir do 3º semestre. Projetos de faculdade e repositórios no GitHub contam como experiência.',
  },
  {
    titulo: 'Como é calculada a compatibilidade com a vaga?',
    conteudo:
      'Dividimos o número de habilidades que você marcou e que a vaga exige pelo total de habilidades da vaga. Se a vaga pede 4 e você tem 3, o match é de 75%.',
  },
  {
    titulo: 'Posso me candidatar a mais de uma vaga?',
    conteudo:
      'Sim. Você pode se candidatar a quantas vagas quiser, desde que já tenha enviado o seu currículo em PDF.',
  },
  {
    titulo: 'O estágio precisa ser compatível com meu horário de aula?',
    conteudo:
      'Sim. A carga horária máxima de um estágio é de 6 horas por dia, e o horário combinado precisa respeitar o seu período de aulas.',
  },
]


function App() {
  const [progresso, setProgresso] = useState(0)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    if (!enviando) return

    const intervalo = setInterval(() => {
      setProgresso((atual) => Math.min(atual + Math.floor(Math.random() * 12) + 3, 100))
    }, 300)

    return () => clearInterval(intervalo)
  }, [enviando])

    useEffect(() => {
        if (progresso === 100) setEnviando(false)
            }, [progresso])

    function iniciarEnvio() {
        setProgresso(0)
        setEnviando(true)
        }

        let rotuloUpload = 'Nenhum currículo enviado'
        if (enviando) rotuloUpload = 'enviando curriculo.pdf'
        else if (progresso === 100) rotuloUpload = 'Currículo enviado!'
     return (
    <>
      <header className="hero">
        <div className="barra">
          <img className="logo-img" src="/icone-claro.png" alt="" />
          <span className="logo">EstagiaMatch</span>
        </div>

        <div className="hero-texto">
          <h1>
            Encontre o estágio que <span className="destaque">combina com você</span>
          </h1>
          <p>Marque suas habilidades e descubra a compatibilidade com cada vaga.</p>
          <ul className="selos" aria-label="Diferenciais">
            <li>Match por habilidades</li>
            <li>Vagas de TI</li>
            <li>Candidatura em 1 clique</li>
          </ul>
        </div>
      </header>

      <main className="conteudo">
        <section className="cartao" aria-labelledby="titulo-upload">
          <h2 id="titulo-upload">Seu currículo</h2>
          <p className="subtitulo">Envie o PDF para poder se candidatar</p>

          <ProgressBar valor={progresso} rotulo={rotuloUpload} />

          <div className="acoes">
            <button className="botao" onClick={iniciarEnvio} disabled={enviando}>
              {enviando ? 'Enviando...' : 'Enviar currículo'}
            </button>
          </div>
        </section>
            <section className="cartao cartao-largo" aria-labelledby="titulo-faq">
          <h2 id="titulo-faq">Perguntas frequentes</h2>
          <p className="subtitulo">Tire suas dúvidas sobre o estágio</p>

          <Accordion itens={perguntasFaq} />
        </section>
      </main>
    </>
  )
}

export default App
    
