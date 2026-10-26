import { useState, useEffect, useRef } from 'react'
import ProgressBar from './components/ProgressBar'
import Accordion from './components/Accordion'
import Tabs from './components/Tabs'
import Pagination from './components/Pagination'
import VagaCard from './components/VagaCard'
import Dropdown from './components/Dropdown'
import Toast from './components/Toast'
import { vagas } from './data/vagas'

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

const abasVaga = [
  {
    titulo: 'Descrição',
    conteudo: (
      <p>
        Você vai atuar ao lado do time de produto no desenvolvimento das telas do
        sistema de gestão de clientes da empresa, transformando protótipos em
        interfaces responsivas e acessíveis. O estágio inclui mentoria semanal
        com uma pessoa desenvolvedora sênior.
      </p>
    ),
  },
  {
    titulo: 'Requisitos',
    conteudo: (
      <ul>
        <li>Cursando Engenharia de Software, Ciência da Computação ou áreas afins</li>
        <li>Conhecimento básico de HTML, CSS e JavaScript</li>
        <li>Noções de React e de versionamento com Git</li>
        <li>Disponibilidade de 6 horas por dia</li>
      </ul>
    ),
  },
  {
    titulo: 'Benefícios',
    conteudo: (
      <ul>
        <li>Bolsa-auxílio de R$ 1.800,00</li>
        <li>Vale-transporte e vale-refeição</li>
        <li>Trabalho híbrido, com 2 dias presenciais por semana</li>
        <li>Possibilidade de efetivação ao final do estágio</li>
      </ul>
    ),
  },
]

const VAGAS_POR_PAGINA = 4

const opcoesArea = [
  { valor: 'Todas', texto: 'Todas as áreas' },
  { valor: 'Front-end', texto: 'Front-end' },
  { valor: 'Back-end', texto: 'Back-end' },
  { valor: 'Dados', texto: 'Dados' },
  { valor: 'UX', texto: 'UX / Design' },
]

function App() {
  const [progresso, setProgresso] = useState(0)
  const [enviando, setEnviando] = useState(false)
  const [nomeArquivo, setNomeArquivo] = useState('')
  const [areaSelecionada, setAreaSelecionada] = useState('Todas')
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [toasts, setToasts] = useState([])

  const inputArquivoRef = useRef(null)

  const vagasFiltradas =
    areaSelecionada === 'Todas'
      ? vagas
      : vagas.filter((vaga) => vaga.area === areaSelecionada)

  const totalPaginas = Math.ceil(vagasFiltradas.length / VAGAS_POR_PAGINA)
  const inicio = (paginaAtual - 1) * VAGAS_POR_PAGINA
  const vagasDaPagina = vagasFiltradas.slice(inicio, inicio + VAGAS_POR_PAGINA)

  useEffect(() => {
    if (!enviando) return

    const intervalo = setInterval(() => {
      setProgresso((atual) => Math.min(atual + Math.floor(Math.random() * 12) + 3, 100))
    }, 300)

    return () => clearInterval(intervalo)
  }, [enviando])

  useEffect(() => {
    if (progresso === 100) {
      setEnviando(false)
      mostrarToast('sucesso', `${nomeArquivo} enviado com sucesso!`)
    }
  }, [progresso])

  function mostrarToast(tipo, mensagem) {
    const novoToast = { id: Date.now() + Math.random(), tipo, mensagem }
    setToasts((lista) => [...lista, novoToast])
  }

  function removerToast(id) {
    setToasts((lista) => lista.filter((toast) => toast.id !== id))
  }

  function abrirSeletorDeArquivo() {
    inputArquivoRef.current.click()
  }

  function aoEscolherArquivo(evento) {
    const arquivo = evento.target.files[0]
    evento.target.value = ''

    if (!arquivo) return
    if (arquivo.type !== 'application/pdf') {
      mostrarToast('erro', 'Envie o currículo em formato PDF.')
      return
    }

    setNomeArquivo(arquivo.name)
    setProgresso(0)
    setEnviando(true)
  }

  function mudarArea(novaArea) {
    setAreaSelecionada(novaArea)
    setPaginaAtual(1)

    const quantidade =
      novaArea === 'Todas'
        ? vagas.length
        : vagas.filter((vaga) => vaga.area === novaArea).length

    mostrarToast('info', `${quantidade} vagas encontradas.`)
  }

  function candidatar() {
    if (progresso !== 100) {
      mostrarToast('erro', 'Envie seu currículo antes de se candidatar.')
      return
    }

    mostrarToast('sucesso', 'Candidatura enviada para a TechNova!')
  }

  let rotuloUpload = 'Nenhum currículo enviado'
  if (enviando) rotuloUpload = `Enviando ${nomeArquivo}...`
  else if (progresso === 100) rotuloUpload = `${nomeArquivo} enviado!`

  let textoBotao = 'Escolher PDF'
  if (enviando) textoBotao = 'Enviando...'
  else if (progresso === 100) textoBotao = 'Trocar currículo'

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
        <section className="cartao cartao-largo cartao-upload" aria-labelledby="titulo-upload">
          <div>
            <h2 id="titulo-upload">Seu currículo</h2>
            <p className="subtitulo">Envie o PDF para poder se candidatar</p>
          </div>

          <div>
            <ProgressBar valor={progresso} rotulo={rotuloUpload} />

            <input
              ref={inputArquivoRef}
              type="file"
              accept="application/pdf"
              hidden
              onChange={aoEscolherArquivo}
            />

            <div className="acoes">
              <button
                className="botao"
                onClick={abrirSeletorDeArquivo}
                disabled={enviando}
              >
                {textoBotao}
              </button>
            </div>
          </div>
        </section>

        <section className="cartao cartao-largo" aria-labelledby="titulo-vagas">
          <h2 id="titulo-vagas">Vagas abertas</h2>
          <p className="subtitulo">Estágios na área de tecnologia</p>

          <div className="filtro-vagas">
            <Dropdown
              rotulo="Filtrar por área"
              opcoes={opcoesArea}
              valorSelecionado={areaSelecionada}
              aoSelecionar={mudarArea}
            />
          </div>

          <ul className="lista-vagas">
            {vagasDaPagina.map((vaga) => (
              <VagaCard key={vaga.id} vaga={vaga} />
            ))}
          </ul>

          <p className="resumo-vagas" aria-live="polite">
            Mostrando {inicio + 1}–{inicio + vagasDaPagina.length} de{' '}
            {vagasFiltradas.length} vagas
          </p>

          <Pagination
            totalPaginas={totalPaginas}
            paginaAtual={paginaAtual}
            aoMudarPagina={setPaginaAtual}
          />
        </section>

        <section className="cartao cartao-largo" aria-labelledby="titulo-vaga">
          <h2 id="titulo-vaga">Estágio em Desenvolvimento Front-end</h2>
          <p className="subtitulo">TechNova · Salvador, BA · Híbrido</p>

          <Tabs abas={abasVaga} rotulo="Detalhes da vaga" />

          <div className="acoes">
            <button className="botao" onClick={candidatar}>
              Candidatar-se
            </button>
          </div>
        </section>

        <section className="cartao cartao-largo" aria-labelledby="titulo-faq">
          <h2 id="titulo-faq">Perguntas frequentes</h2>
          <p className="subtitulo">Tire suas dúvidas sobre o estágio</p>

          <Accordion itens={perguntasFaq} />
        </section>
      </main>

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
    </>
  )
}

export default App
