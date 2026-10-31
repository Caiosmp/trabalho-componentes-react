# EstagiaMatch

Portal de vagas de estágio em tecnologia feito com React para a atividade de React.js do curso de Engenharia de Software (UCSAL).

O estudante envia o currículo, marca as habilidades que tem e vê a compatibilidade com cada vaga.

## Componentes

- **Barra de Progresso**: envio do currículo e compatibilidade com cada vaga
- **Acordeão**: perguntas frequentes
- **Abas**: detalhes da vaga (descrição, requisitos e benefícios)
- **Paginação**: lista de vagas
- **Menu Suspenso**: filtro por área
- **Notificação Toast**: mensagens de sucesso, erro e informação

## Desafio extra

Estado global com **Context API**: as notificações (toasts) ficam no `ToastContext`.

## Tecnologias

- React 18
- Vite
- CSS puro
- GitHub Codespaces

## Como rodar

```bash
npm install
npm run dev
```

Depois, abra o endereço que aparecer no terminal.

## Estrutura

```
src/
├── components/   componentes da página
├── context/      estado global (ToastContext)
├── data/         lista de vagas
├── App.jsx       componente principal
└── App.css       estilos
```

## Autor

Caio Sampaio
