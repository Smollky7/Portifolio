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
  overview?: { eyebrow: string; title: string; paragraphs: string[] }
  decision?: { eyebrow: string; title: string; introduction: string; items: { title: string; description: string }[] }
  considerations?: { eyebrow: string; title: string; items: { title: string; description: string }[] }
  projectLinks?: { title: string; description: string; href: string }[]
  faq?: { question: string; answer: string }[]
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
    overview: {
      eyebrow: "02 — DO PROCESSO AO SISTEMA", title: "Um lugar único para a operação acontecer.",
      paragraphs: ["Um sistema web é uma aplicação acessada pelo navegador. Ele pode reunir cadastros, documentos, permissões, etapas de trabalho e indicadores que hoje estão separados entre planilhas, mensagens e ferramentas diferentes.", "O objetivo não é apenas trocar uma planilha por uma tela. Primeiro é preciso entender quem usa o processo, quais informações circulam, onde surgem erros e quais decisões precisam ficar visíveis. A partir disso, o sistema organiza o fluxo sem obrigar a empresa a adotar funcionalidades que não fazem sentido para sua rotina."],
    },
    decision: {
      eyebrow: "04 — SINAIS DO PROBLEMA", title: "Quando um sistema web começa a fazer sentido.", introduction: "Nem toda operação precisa de um sistema próprio. A necessidade costuma aparecer quando o modo atual de trabalhar deixa de oferecer controle, continuidade ou clareza.",
      items: [
        { title: "Planilhas viraram operação", description: "Arquivos diferentes concentram cadastros, histórico e regras importantes, dificultando saber qual informação está correta." },
        { title: "O processo depende de memória", description: "A equipe precisa lembrar etapas, cobrar atualizações e conferir manualmente se cada atividade foi concluída." },
        { title: "Falta visão compartilhada", description: "Gestão, equipe e clientes enxergam partes diferentes do processo e não possuem um acompanhamento central." },
        { title: "A ferramenta pronta limita", description: "A solução disponível resolve parte do trabalho, mas exige adaptações recorrentes ou não acompanha as regras da empresa." },
      ],
    },
    considerations: {
      eyebrow: "05 — ESCOPO POSSÍVEL", title: "O sistema acompanha o fluxo necessário.",
      items: [
        { title: "Gestão interna", description: "Cadastros, tarefas, etapas, permissões e histórico reunidos em uma interface para a equipe." },
        { title: "Área do cliente", description: "Acesso autenticado para consultar informações, acompanhar solicitações ou interagir com a operação." },
        { title: "Painéis e relatórios", description: "Indicadores construídos a partir dos dados realmente registrados pelo processo, com o contexto necessário para decisões." },
        { title: "Integrações", description: "APIs podem conectar o sistema a serviços existentes, evitando duplicação de cadastro e movimentação manual de dados." },
      ],
    },
    projectLinks: [
      { title: "João Gabriel Fit", description: "Plataforma web com gestão de alunos, acompanhamento e áreas administrativas.", href: "/projetos#joao-gabriel-fit" },
      { title: "LinkCentral", description: "Plataforma com autenticação, dashboard, busca, métricas e API.", href: "/projetos#linkcentral" },
    ],
    faq: [
      { question: "Preciso substituir todas as ferramentas que já uso?", answer: "Não necessariamente. Um sistema pode centralizar somente a parte crítica da operação e integrar ferramentas que continuam adequadas. Essa decisão depende do fluxo atual, dos dados envolvidos e do custo de manter cada etapa separada." },
      { question: "Um sistema web funciona em celular e computador?", answer: "Ele pode ser desenvolvido de forma responsiva para diferentes telas. A experiência e as ações prioritárias de cada dispositivo são definidas conforme quem utiliza o sistema e em qual contexto." },
      { question: "É possível ter usuários com permissões diferentes?", answer: "Sim. Áreas administrativas, equipe, clientes ou parceiros podem ter acessos distintos quando isso faz parte das regras do projeto." },
      { question: "O sistema pode gerar painéis e relatórios?", answer: "Sim, desde que os dados necessários existam e sejam registrados de forma consistente. Antes de criar um painel, é importante definir quais decisões ele deve apoiar." },
      { question: "Qual é a diferença entre sistema web e software sob medida?", answer: "Sistema web descreve principalmente uma aplicação acessada pelo navegador para organizar informações e processos. Software sob medida é a categoria mais ampla: também pode envolver aplicações desktop, integrações, automações ou uma combinação dessas soluções." },
    ],
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
    overview: {
      eyebrow: "02 — O QUE PODE SER AUTOMATIZADO", title: "Regras claras são melhores candidatas.",
      paragraphs: ["Uma boa oportunidade de automação costuma ser repetitiva, ter entradas e saídas reconhecíveis e seguir regras que podem ser descritas. Copiar dados, atualizar cadastros, tratar arquivos, gerar notificações e conectar ferramentas são exemplos possíveis — não uma lista de promessas prontas.", "Antes de automatizar, é preciso entender exceções, qualidade dos dados e impacto de uma falha. Quando o processo ainda muda todos os dias ou depende de julgamento humano constante, organizar o fluxo pode ser mais importante do que automatizá-lo imediatamente."],
    },
    decision: {
      eyebrow: "04 — AVALIAÇÃO", title: "Quando a automação vale a pena — e quando não vale.", introduction: "Automação útil reduz atrito sem esconder problemas. O diagnóstico considera frequência, previsibilidade, risco e manutenção antes de escolher a tecnologia.",
      items: [
        { title: "Bom candidato", description: "Uma tarefa recorrente, baseada em regras e que movimenta dados entre etapas ou ferramentas de forma previsível." },
        { title: "Precisa de cuidado", description: "Um fluxo com muitas exceções, dados inconsistentes ou decisões humanas sensíveis exige preparação antes da automação." },
        { title: "Pode integrar o que existe", description: "Quando há APIs ou meios seguros de comunicação, a automação pode trabalhar junto dos sistemas atuais sem substituí-los." },
        { title: "Precisa continuar observável", description: "Registros, validações e alertas ajudam a acompanhar o fluxo e identificar mudanças nas ferramentas conectadas." },
      ],
    },
    considerations: {
      eyebrow: "05 — FORMAS DE APLICAR", title: "A solução depende do ponto de atrito.",
      items: [
        { title: "Integração entre sistemas", description: "Sincronizar informações entre serviços para evitar cadastros duplicados e movimentações manuais." },
        { title: "Rotinas de dados", description: "Capturar, validar, transformar e encaminhar dados ou arquivos conforme regras definidas." },
        { title: "Notificações e eventos", description: "Acionar mensagens ou tarefas quando uma condição relevante acontece no processo." },
        { title: "Bots e extensões", description: "Apoiar tarefas específicas quando esse formato é realmente mais adequado do que alterar o sistema principal." },
      ],
    },
    projectLinks: [
      { title: "WhatsApp Web Auto Name", description: "Extensão que automatiza uma identificação repetitiva no fluxo de atendimento.", href: "/projetos#whatsapp-web-auto-name" },
      { title: "LinkCentral", description: "Automação de captura e tratamento de dados conectada a uma plataforma web.", href: "/projetos#linkcentral" },
    ],
    faq: [
      { question: "Como identificar uma boa oportunidade de automação?", answer: "Procure tarefas frequentes, repetitivas e baseadas em regras: copiar informações, atualizar cadastros, tratar dados ou disparar ações previsíveis. Depois, verifique exceções, riscos e qualidade das entradas." },
      { question: "Preciso substituir meu sistema atual?", answer: "Não necessariamente. Se a ferramenta oferece API ou outra forma segura de integração, uma automação pode complementar o sistema existente. A viabilidade depende dos acessos e limitações de cada serviço." },
      { question: "Toda tarefa repetitiva deve ser automatizada?", answer: "Não. Uma tarefa rara, instável ou com muitas decisões humanas pode custar mais para automatizar e manter do que para executar de outra forma. Às vezes o primeiro passo é simplificar o processo." },
      { question: "A automação continua funcionando quando uma ferramenta muda?", answer: "Integrações podem exigir manutenção quando APIs, telas, permissões ou regras externas mudam. Por isso o projeto deve considerar registros, tratamento de falhas e uma forma de acompanhamento." },
      { question: "Bots são sempre a melhor solução?", answer: "Não. Bots são uma possibilidade entre várias. Dependendo do problema, uma integração por API, uma rotina programada, uma extensão ou uma pequena aplicação pode ser mais segura e sustentável." },
    ],
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
    overview: {
      eyebrow: "02 — ENTENDENDO A SOLUÇÃO", title: "Software criado a partir do seu processo.",
      paragraphs: ["Software sob medida é uma solução desenvolvida para uma necessidade específica, em vez de obrigar a operação a seguir os limites de um produto pronto. Pode ser uma aplicação web, um programa desktop, uma integração, uma automação ou uma combinação dessas partes.", "Ele faz sentido quando existe um fluxo importante que diferencia a empresa, quando várias ferramentas precisam trabalhar juntas ou quando as opções disponíveis exigem adaptações que geram retrabalho. A definição começa pelo problema e pelas pessoas envolvidas — não por uma lista genérica de funcionalidades."],
    },
    decision: {
      eyebrow: "04 — PRONTO OU SOB MEDIDA", title: "A melhor escolha depende do que precisa ser preservado.", introduction: "Uma solução pronta costuma ser o melhor começo quando atende bem ao processo, possui custo compatível e permite trabalhar sem contornos constantes. Desenvolvimento próprio ganha relevância quando a limitação passa a afetar a operação.",
      items: [
        { title: "Solução pronta", description: "Adequada quando o processo é comum, os recursos disponíveis resolvem a necessidade e adaptar a rotina não compromete o trabalho." },
        { title: "Software sob medida", description: "Faz sentido quando regras próprias, integrações, controle de dados ou evolução específica são parte importante do negócio." },
        { title: "Abordagem combinada", description: "Também é possível manter ferramentas prontas e desenvolver apenas a camada que conecta, organiza ou complementa o que falta." },
        { title: "Decisão por etapas", description: "O primeiro escopo pode priorizar o fluxo de maior impacto, validar o uso e orientar as próximas evoluções." },
      ],
    },
    considerations: {
      eyebrow: "05 — DECISÕES DO PROJETO", title: "Prazo e investimento nascem do escopo.",
      items: [
        { title: "Requisitos", description: "Usuários, regras, integrações, dados e exceções são organizados para transformar a necessidade em um recorte implementável." },
        { title: "Custo e prazo", description: "São influenciados pela quantidade de fluxos, complexidade das regras, integrações externas, migração de dados, interfaces e nível de validação necessário." },
        { title: "Segurança e dados", description: "Autenticação, permissões, armazenamento, backups e exposição de informações são definidos conforme o risco e o contexto da solução." },
        { title: "Continuidade", description: "Manutenção, correções, suporte e evolução podem ser combinados conforme a necessidade do projeto, sem pressupor um formato único." },
      ],
    },
    projectLinks: [
      { title: "João Gabriel Fit", description: "Exemplo de software com áreas de gestão e acompanhamento construídas para uma operação específica.", href: "/projetos#joao-gabriel-fit" },
      { title: "LinkCentral", description: "Exemplo que combina plataforma, API, dados e automação em um mesmo fluxo.", href: "/projetos#linkcentral" },
    ],
    faq: [
      { question: "O que é software sob medida?", answer: "É uma solução desenvolvida a partir de uma necessidade específica. Em vez de adaptar toda a operação a um produto pronto, o escopo considera usuários, regras, dados e integrações do processo que precisa ser resolvido." },
      { question: "Quando uma solução pronta é suficiente?", answer: "Quando ela atende ao fluxo principal, possui custo adequado e não exige contornos frequentes. Usar um produto existente pode ser mais rápido e econômico quando o processo não precisa de diferenciação ou controle específico." },
      { question: "Que tipos de software podem ser desenvolvidos?", answer: "Aplicações web, sistemas internos, painéis, portais, ferramentas desktop, integrações, APIs e automações são possibilidades. A arquitetura é escolhida depois de entender o contexto, não antes." },
      { question: "Como os requisitos são definidos?", answer: "O processo começa com descoberta: objetivo, usuários, fluxo atual, regras, exceções, dados e limitações. Depois é definido um primeiro recorte útil que possa ser desenvolvido e validado sem tentar prever tudo de uma vez." },
      { question: "Como funcionam desenvolvimento e validação?", answer: "A construção pode ser dividida em etapas com validações frequentes das jornadas e regras prioritárias. Isso permite corrigir entendimento cedo e evoluir o produto com base no uso real." },
      { question: "O software pode evoluir depois da primeira versão?", answer: "Sim. Uma solução sob medida pode receber melhorias e novos fluxos. A evolução precisa respeitar a arquitetura, os dados existentes e as prioridades reais da operação." },
      { question: "Existe manutenção e suporte?", answer: "Manutenção, correções e evolução podem fazer parte da continuidade do projeto. O formato é definido conforme criticidade, necessidades e responsabilidades envolvidas, sem pressupor SLA ou pacote padrão." },
      { question: "É possível integrar ferramentas que a empresa já usa?", answer: "Sim, quando essas ferramentas oferecem APIs ou outros meios compatíveis e autorizados. A integração é avaliada considerando acesso, limites técnicos, segurança e dependência do serviço externo." },
      { question: "Quem fica responsável pelo software?", answer: "Responsabilidades sobre hospedagem, acessos, dados, manutenção e evolução devem ser combinadas de forma explícita no projeto. Propriedade e condições de uso também precisam constar no acordo, em vez de serem presumidas." },
      { question: "O que influencia custo e prazo?", answer: "Escopo, número de perfis de usuário, regras, integrações, migração de dados, complexidade das interfaces, requisitos de segurança e profundidade dos testes. Sem mapear esses fatores, qualquer valor ou prazo seria apenas uma estimativa sem base." },
      { question: "Como começar?", answer: "O primeiro passo é descrever o problema atual: quem participa, como o trabalho acontece, onde surgem erros e o que deveria ficar mais simples. A partir dessa conversa é possível avaliar alternativas e definir se o desenvolvimento sob medida realmente faz sentido." },
    ],
    related: [{ label: "Sistemas web", href: "/sistemas-web" }, { label: "Automações", href: "/automacoes" }, { label: "Conhecer os projetos", href: "/projetos" }],
  },
}
