export type Project = {
  slug: string
  title: string
  category: string
  summary: string
  context: string
  problem: string
  solution: string
  features: string[]
  technologies?: string[]
  images?: string[]
  imageAlts?: string[]
  status?: string
}

export const projects: Project[] = [
  {
    slug: "joao-gabriel-fit",
    title: "João Gabriel Fit",
    category: "Plataforma / Sistema web",
    summary: "Plataforma de acompanhamento fitness e gestão de alunos desenvolvida para centralizar a rotina do profissional e a experiência dos clientes.",
    context: "Uma operação de acompanhamento fitness com diferentes jornadas para o profissional e seus alunos.",
    problem: "Reunir gestão, comunicação e evolução dos alunos em uma experiência única, clara e acessível.",
    solution: "Uma plataforma responsiva com áreas dedicadas à gestão da operação e ao acompanhamento individual.",
    features: ["Painel administrativo", "Gestão de alunos e convites", "Calendário e acompanhamento de progresso", "Medidas e fotos de evolução", "Planos, mensagens e notificações", "Analytics e controle administrativo"],
    technologies: ["Next.js", "React", "TypeScript", "MySQL"],
    images: Array.from({ length: 11 }, (_, index) => `/projects/joao-gabriel-fit/${String(index + 1).padStart(2, "0")}.webp`),
    imageAlts: [
      "Tela de acesso da plataforma João Gabriel Fit",
      "Visão geral do painel da plataforma João Gabriel Fit",
      "Painel administrativo de alunos do João Gabriel Fit",
      "Tela de gerenciamento de convites do João Gabriel Fit",
      "Calendário de acompanhamento do João Gabriel Fit",
      "Ficha de progresso de aluno no João Gabriel Fit",
      "Registro de medidas corporais no João Gabriel Fit",
      "Galeria de fotos de evolução do João Gabriel Fit",
      "Histórico de acompanhamento na plataforma João Gabriel Fit",
      "Gestão de planos na plataforma João Gabriel Fit",
      "Painel de analytics do João Gabriel Fit",
    ],
  },
  {
    slug: "curso-mechas-lucrativas",
    title: "Curso de Mechas Lucrativas",
    category: "Landing page / Produto digital",
    summary: "Experiência comercial para apresentar um curso e mentoria voltados à atuação profissional na área de beleza.",
    context: "Projeto com design planejado no Figma e implementação web em fase final de desenvolvimento.",
    problem: "Organizar uma oferta com bastante conteúdo sem perder clareza, ritmo narrativo e foco na ação.",
    solution: "Landing page responsiva com storytelling, apresentação da especialista, estrutura de conversão, prova social, CTAs e SEO.",
    features: ["Storytelling comercial", "Apresentação da especialista", "CTAs e prova social", "SEO e conteúdo estruturado", "Animações responsivas"],
    status: "Em fase final de desenvolvimento",
  },
  {
    slug: "emannoelle-santos",
    title: "Emannoelle Santos",
    category: "Presença digital / Landing page",
    summary: "Projeto desenvolvido em parceria para fortalecer a presença digital da criadora e estruturar sua apresentação online.",
    context: "Uma colaboração em modelo de parceria que posteriormente gerou novas indicações de trabalhos.",
    problem: "Concentrar a identidade, o trabalho e os caminhos de contato da criadora em uma presença digital própria.",
    solution: "Uma landing page de leitura simples, visual consistente e experiência adaptada a dispositivos móveis.",
    features: ["Apresentação profissional", "Conteúdo responsivo", "Identidade visual aplicada", "Caminhos claros de contato"],
  },
  {
    slug: "linkcentral",
    title: "LinkCentral",
    category: "Plataforma + Automação",
    summary: "Ecossistema para gerenciamento e publicação de produtos, combinando aplicação web, dashboard, analytics e automação.",
    context: "Uma plataforma pública e uma camada de gestão para organizar, publicar e acompanhar produtos.",
    problem: "Reduzir o trabalho manual de cadastro e tornar pesquisa, publicação e acompanhamento mais organizados.",
    solution: "Aplicação com busca, autenticação, dashboard, métricas e API para inserção de produtos, apoiada por automação para captura e tratamento de dados.",
    features: ["Página pública e busca", "Dashboard e autenticação", "Métricas de visualização, pesquisa e clique", "API para inserção de produtos", "Captura e tratamento de links", "Processamento de imagens"],
    technologies: ["MongoDB", "API", "Discord", "Web scraping"],
  },
  {
    slug: "whatsapp-web-auto-name",
    title: "WhatsApp Web Auto Name",
    category: "Extensão / Automação",
    summary: "Extensão para Chrome que adiciona automaticamente a identificação do atendente antes das mensagens enviadas pelo WhatsApp Web.",
    context: "Equipes que compartilham um atendimento precisam identificar com clareza quem enviou cada mensagem.",
    problem: "A identificação manual é repetitiva e pode ser esquecida no fluxo diário de atendimento.",
    solution: "Automatizar a assinatura diretamente no envio, sem tirar o atendente do WhatsApp Web.",
    features: ["Ativar e desativar", "Definir identificação", "Configuração persistente", "Inserção automática", "Prevenção de assinatura duplicada"],
    technologies: ["JavaScript", "Chrome Extension"],
  },
]
