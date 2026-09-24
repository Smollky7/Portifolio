export type ServicePageData = {
  slug: string
  eyebrow: string
  title: string
  description: string
  introduction: string
  problems: string[]
  deliveries: { title: string; description: string }[]
  process: string[]
  related: { label: string; href: string }[]
}

export const servicePages: Record<string, ServicePageData> = {
  "criacao-de-sites": {
    slug: "criacao-de-sites",
    eyebrow: "Sites profissionais e landing pages",
    title: "Criação de sites profissionais sob medida",
    description: "Sites profissionais e landing pages responsivas, rápidas e preparadas para SEO, integrações, hospedagem e manutenção.",
    introduction: "Desenvolvo sites para empresas que precisam apresentar seu trabalho com clareza, transmitir confiança e transformar visitas em contatos. O projeto é construído de acordo com a marca, o conteúdo e a operação — sem encaixar o negócio em um modelo genérico.",
    problems: ["Presença digital que não representa a qualidade da empresa", "Site lento, confuso ou difícil de usar no celular", "Dependência de páginas improvisadas para apresentar serviços", "Falta de integração com WhatsApp, formulários ou ferramentas da operação"],
    deliveries: [
      { title: "Sites institucionais", description: "Estrutura clara para apresentar empresa, serviços, diferenciais e caminhos de contato." },
      { title: "Landing pages", description: "Páginas orientadas a uma oferta, campanha, produto ou captação de oportunidades." },
      { title: "Base técnica", description: "Responsividade, desempenho, acessibilidade e SEO técnico considerados desde a implementação." },
      { title: "Evolução contínua", description: "Hospedagem, manutenção, suporte e novas integrações quando o projeto precisar crescer." },
    ],
    process: ["Entendimento do negócio, público e objetivo", "Arquitetura do conteúdo e direção da experiência", "Desenvolvimento responsivo e integrações", "Publicação, validação e acompanhamento"],
    related: [{ label: "Sistemas web", href: "/sistemas-web" }, { label: "Software sob medida", href: "/software-sob-medida" }, { label: "Ver projetos", href: "/projetos" }],
  },
  "sistemas-web": {
    slug: "sistemas-web",
    eyebrow: "Sistemas, plataformas e painéis",
    title: "Sistemas web para organizar e digitalizar operações",
    description: "Desenvolvimento de sistemas web, painéis administrativos, portais e dashboards adaptados aos processos da empresa.",
    introduction: "Quando planilhas, mensagens e ferramentas desconectadas começam a limitar a operação, um sistema web pode centralizar informações, reduzir etapas manuais e tornar o trabalho mais previsível. A solução nasce do fluxo real da empresa, não de uma lista pronta de funcionalidades.",
    problems: ["Informações espalhadas entre planilhas e conversas", "Processos que dependem de conferências e repetições manuais", "Falta de visibilidade sobre clientes, tarefas ou indicadores", "Ferramentas prontas que não acompanham as regras da operação"],
    deliveries: [
      { title: "Sistemas internos", description: "Aplicações para organizar rotinas, cadastros, permissões e fluxos específicos." },
      { title: "Painéis administrativos", description: "Gestão de conteúdo, usuários, produtos, serviços e dados em uma interface central." },
      { title: "Portais e plataformas", description: "Experiências com autenticação e áreas específicas para equipe, clientes ou parceiros." },
      { title: "APIs e banco de dados", description: "Integrações e estruturas de dados pensadas para segurança, consistência e evolução." },
    ],
    process: ["Mapeamento do processo atual e das regras", "Definição das jornadas, dados e arquitetura", "Construção incremental das áreas prioritárias", "Testes, publicação e evolução com uso real"],
    related: [{ label: "Automações", href: "/automacoes" }, { label: "Software sob medida", href: "/software-sob-medida" }, { label: "Conhecer os projetos", href: "/projetos" }],
  },
  automacoes: {
    slug: "automacoes",
    eyebrow: "Automações, APIs e bots",
    title: "Automações para reduzir tarefas repetitivas",
    description: "Automação de processos, integrações com APIs, bots e fluxos de dados para reduzir trabalho manual e conectar ferramentas.",
    introduction: "Automatizar não é apenas executar uma tarefa mais rápido. É retirar etapas repetitivas do caminho, padronizar o tratamento de dados e conectar ferramentas que hoje exigem intervenção constante da equipe.",
    problems: ["Copiar e transformar dados manualmente", "Repetir cadastros em sistemas diferentes", "Depender de lembretes para executar rotinas previsíveis", "Perder tempo conciliando informações entre plataformas"],
    deliveries: [
      { title: "Integrações com APIs", description: "Comunicação segura entre sistemas, plataformas e serviços já utilizados pela operação." },
      { title: "Bots e rotinas", description: "Execução programada ou orientada por eventos para tarefas bem definidas." },
      { title: "Tratamento de dados", description: "Captura, validação, transformação e encaminhamento de informações entre etapas." },
      { title: "Ferramentas auxiliares", description: "Extensões e aplicações que eliminam pequenos atritos recorrentes no trabalho diário." },
    ],
    process: ["Identificação das etapas repetitivas e seus riscos", "Definição das regras e exceções", "Implementação com registros e validações", "Acompanhamento para ajustar o fluxo"],
    related: [{ label: "Sistemas web", href: "/sistemas-web" }, { label: "Software sob medida", href: "/software-sob-medida" }, { label: "Ver cases", href: "/projetos" }],
  },
  "software-sob-medida": {
    slug: "software-sob-medida",
    eyebrow: "Soluções específicas para empresas",
    title: "Software sob medida para necessidades reais",
    description: "Aplicações web ou desktop, sistemas e integrações construídos para fluxos que ferramentas prontas não atendem.",
    introduction: "Software sob medida faz sentido quando a empresa possui um processo próprio, precisa integrar ferramentas ou chegou ao limite das soluções disponíveis. O desenvolvimento parte da necessidade concreta e combina aplicação, dados e automações na medida certa.",
    problems: ["A operação precisa se adaptar demais a uma ferramenta pronta", "Regras específicas não cabem nas opções disponíveis", "Várias ferramentas são usadas para concluir um único processo", "O crescimento exige uma solução que possa evoluir junto"],
    deliveries: [
      { title: "Aplicações web", description: "Soluções acessíveis pelo navegador para equipes, clientes ou operações distribuídas." },
      { title: "Aplicações desktop", description: "Ferramentas instaláveis quando o contexto e os recursos locais tornam essa abordagem adequada." },
      { title: "Integrações", description: "Conexão entre serviços e dados para formar um fluxo coerente de ponta a ponta." },
      { title: "Suporte e manutenção", description: "Acompanhamento técnico para correções, melhorias e novas necessidades após a entrega." },
    ],
    process: ["Descoberta do problema e dos usuários envolvidos", "Recorte de uma primeira versão útil", "Desenvolvimento com validações frequentes", "Publicação, suporte e evolução"],
    related: [{ label: "Criação de sites", href: "/criacao-de-sites" }, { label: "Sistemas web", href: "/sistemas-web" }, { label: "Automações", href: "/automacoes" }],
  },
}
