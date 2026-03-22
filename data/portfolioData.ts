export type Language = 'en' | 'fr';

export type SkillCategory = {
  title: string;
  description: string;
  items: string[];
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  github: string;
  demo: string;
  slug: string;
  metrics?: { label: string; value: string }[];
  highlights?: string[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  linkedin?: string;
};

export type LiveDemo = {
  title: string;
  description: string;
  url: string;
  badge: string;
  external: boolean;
};

export const profile = {
  name: 'ALexOps',
  email: 'contact.alexops@proton.me',
  github: 'https://github.com/aio2404',
  linkedin: 'https://www.linkedin.com/in/alexiaberger480',
  bookingUrl: 'https://calendly.com/alexiaberger',
  cvUrl: '/cv-alexia-berger.pdf',
};

export type PortfolioContent = {
  navItems: { id: string; label: string }[];
  header: {
    contactButton: string;
    bookingLabel: string;
    cvLabel: string;
    languageSwitcher: string;
  };
  hero: {
    badge: string;
    role: string;
    headline: string;
    availability: string;
    ctaProjects: string;
    ctaContact: string;
    cards: { title: string; detail: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    positioning: string;
    missionStatement: string;
    ctaMethod: string;
    valueTitle: string;
    valueLead: string;
    valueProps: string[];
    emailLabel: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    categories: SkillCategory[];
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    items: Project[];
    githubLabel: string;
    demoLabel: string;
    detailsLabel: string;
  };
  liveDemos: {
    eyebrow: string;
    title: string;
    description: string;
    items: LiveDemo[];
    tryLabel: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
    items: Testimonial[];
  };
  method: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    summary: string;
    ctaContact: string;
    quickTitle: string;
  };
  footer: {
    tagline: string;
    customizableText: string;
  };
};

const enProjects: Project[] = [
  {
    title: 'AI email automation agent with n8n',
    description:
      'An AI flow that receives incoming emails, prioritizes them, extracts actions, and generates standardized tickets.',
    stack: ['n8n', 'OpenAI', 'Webhook', 'Postgres', 'Docker'],
    github: 'https://github.com/aio2404/agent-email-ia',
    demo: '',
    slug: 'ai-email-automation',
    metrics: [
      { label: 'Emails processed / day', value: '200+' },
      { label: 'Manual triage time saved', value: '−80%' },
      { label: 'Ticket creation time', value: '<3 s' },
    ],
    highlights: [
      'Automatic priority classification via LLM',
      'Action extraction and structured ticket generation',
      'Postgres storage with full audit trail',
      'Slack alert on high-priority items',
    ],
  },
  {
    title: 'CI/CD modernization for microservices',
    description:
      'Automated build, integration, and deployment workflows for microservices on Kubernetes, Docker and Azure.',
    stack: ['Kubernetes', 'Docker', 'Azure', 'Jenkins', 'CI/CD'],
    github: 'https://github.com/aio2404/microservices-cicd',
    demo: '',
    slug: 'cicd-microservices',
    metrics: [
      { label: 'Deploy time', value: '−65%' },
      { label: 'Build failures', value: '−70%' },
      { label: 'Environments covered', value: '3' },
    ],
    highlights: [
      'Full build / test / deploy pipeline',
      'Multi-environment support (dev / staging / prod)',
      'Kubernetes rolling update strategy',
      'Azure Container Registry integration',
    ],
  },
  {
    title: 'DevOps monitoring dashboard',
    description:
      'Unified view of alerts, latency, health and incidents with remediation hooks for operations teams.',
    stack: ['Node.js', 'Grafana', 'Prometheus', 'APIs', 'TypeScript'],
    github: 'https://github.com/aio2404/devops-monitoring-dashboard',
    demo: '',
    slug: 'devops-monitoring-dashboard',
    metrics: [
      { label: 'Mean time to resolve', value: '−50%' },
      { label: 'Alert noise reduction', value: '−60%' },
      { label: 'Services monitored', value: '12+' },
    ],
    highlights: [
      'Unified Grafana + Prometheus stack',
      'Custom alert routing and escalation rules',
      'Automated remediation hooks',
      'Single-pane ops view across all environments',
    ],
  },
  {
    title: 'Automation API connected to Slack, Notion, OpenAI',
    description:
      'Middleware API orchestrating cross-tool flows to improve coordination between product and technical teams.',
    stack: ['TypeScript', 'Node.js', 'Slack API', 'Notion API', 'OpenAI'],
    github: 'https://github.com/aio2404/integration-workflow-api',
    demo: '',
    slug: 'automation-api-slack-notion',
    metrics: [
      { label: 'Tools connected', value: '5+' },
      { label: 'Manual sync tasks eliminated', value: '90%' },
      { label: 'API response time', value: '<200 ms' },
    ],
    highlights: [
      'Slack → Notion bidirectional sync',
      'OpenAI-powered message summarization',
      'Webhook-based event routing',
      'Rate-limited, logged, and observable',
    ],
  },
  {
    title: 'Domaine Berger des Vignes website',
    description:
      'Technical ownership and operationalization of a production site with SEO, stability and publishing workflow considerations.',
    stack: ['Web platform', 'Cloud hosting', 'Observability', 'SEO', 'Performance'],
    github: 'https://github.com/aio2404/domainebergerdesvignes',
    demo: 'https://www.domainebergerdesvignes.com',
    slug: 'domaine-berger-des-vignes',
    metrics: [
      { label: 'PageSpeed score', value: '95+' },
      { label: 'Core Web Vitals', value: 'All green' },
      { label: 'Uptime', value: '99.9%' },
    ],
    highlights: [
      'Performance-optimized production deployment',
      'Structured SEO and metadata setup',
      'Observability and uptime monitoring',
      'Sustainable editorial publishing workflow',
    ],
  },
  {
    title: 'Infrastructure as Code with Terraform and Helm',
    description:
      'Reproducible multi-environment infrastructure with reusable templates, secure state handling, and standards.',
    stack: ['Terraform', 'Helm', 'Terragrunt', 'Vault', 'Modules'],
    github: 'https://github.com/aio2404/terraform-helm-foundation',
    demo: '',
    slug: 'terraform-helm-infrastructure',
    metrics: [
      { label: 'Infra provisioning time', value: '−75%' },
      { label: 'Environments managed', value: '4' },
      { label: 'Manual provisioning steps', value: '0' },
    ],
    highlights: [
      'Reusable Terraform module library',
      'Terragrunt multi-env orchestration',
      'Vault-integrated secret management',
      'GitOps-ready Helm chart structure',
    ],
  },
];

const frProjects: Project[] = [
  {
    title: "Agent IA n8n pour traitement automatique d'emails",
    description:
      'Flux IA qui reçoit des emails entrants, classe la priorité, extrait les actions à mener et génère des tickets selon des règles métiers.',
    stack: ['n8n', 'OpenAI', 'Webhook', 'Postgres', 'Docker'],
    github: 'https://github.com/aio2404/agent-email-ia',
    demo: '',
    slug: 'ai-email-automation',
    metrics: [
      { label: 'Emails traités / jour', value: '200+' },
      { label: 'Temps de tri manuel économisé', value: '−80 %' },
      { label: 'Création de ticket', value: '<3 s' },
    ],
    highlights: [
      'Classification automatique par priorité via LLM',
      "Extraction d'actions et génération de tickets structurés",
      "Stockage Postgres avec piste d'audit complète",
      'Alerte Slack sur les éléments prioritaires',
    ],
  },
  {
    title: 'Pipeline CI/CD complet pour microservices',
    description:
      "Automatisation du build, de l'intégration et du déploiement de microservices sur Kubernetes, Docker et Azure.",
    stack: ['Kubernetes', 'Docker', 'Azure', 'Jenkins', 'CI/CD'],
    github: 'https://github.com/aio2404/microservices-cicd',
    demo: '',
    slug: 'cicd-microservices',
    metrics: [
      { label: 'Temps de déploiement', value: '−65 %' },
      { label: 'Échecs de build', value: '−70 %' },
      { label: 'Environnements couverts', value: '3' },
    ],
    highlights: [
      'Pipeline build / test / déploiement complet',
      'Support multi-environnement (dev / staging / prod)',
      'Stratégie de rolling update Kubernetes',
      'Intégration Azure Container Registry',
    ],
  },
  {
    title: 'Dashboard de monitoring DevOps',
    description:
      'Vue consolidée des alertes, latence, santé applicative et incidents avec automatisation de traitements.',
    stack: ['Node.js', 'Grafana', 'Prometheus', 'APIs', 'TypeScript'],
    github: 'https://github.com/aio2404/devops-monitoring-dashboard',
    demo: '',
    slug: 'devops-monitoring-dashboard',
    metrics: [
      { label: 'Temps moyen de résolution', value: '−50 %' },
      { label: "Réduction du bruit d'alertes", value: '−60 %' },
      { label: 'Services supervisés', value: '12+' },
    ],
    highlights: [
      'Stack Grafana + Prometheus unifiée',
      "Routage d'alertes et escalade personnalisés",
      'Hooks de remédiation automatisés',
      'Vue ops consolidée sur tous les environnements',
    ],
  },
  {
    title: "API d'automatisation connectée à Slack, Notion, OpenAI",
    description:
      'API middleware déclenchant et corrélant des flux cross-outils pour améliorer la coordination produit/technique.',
    stack: ['TypeScript', 'Node.js', 'Slack API', 'Notion API', 'OpenAI'],
    github: 'https://github.com/aio2404/integration-workflow-api',
    demo: '',
    slug: 'automation-api-slack-notion',
    metrics: [
      { label: 'Outils connectés', value: '5+' },
      { label: 'Synchronisations manuelles éliminées', value: '90 %' },
      { label: 'Temps de réponse API', value: '<200 ms' },
    ],
    highlights: [
      'Synchronisation bidirectionnelle Slack ↔ Notion',
      'Résumé de messages via OpenAI',
      "Routage d'événements par webhook",
      'API limitée, journalisée et observable',
    ],
  },
  {
    title: 'Site Domaine Berger des Vignes',
    description:
      "Conception et industrialisation d'un site vitrine orienté production avec visibilité web, performance et maintenance durable.",
    stack: ['Site web', 'Cloud', 'Monitoring', 'SEO', 'Gestion éditoriale'],
    github: 'https://github.com/aio2404/domainebergerdesvignes',
    demo: 'https://www.domainebergerdesvignes.com',
    slug: 'domaine-berger-des-vignes',
    metrics: [
      { label: 'Score PageSpeed', value: '95+' },
      { label: 'Core Web Vitals', value: 'Tous verts' },
      { label: 'Disponibilité', value: '99,9 %' },
    ],
    highlights: [
      'Déploiement production optimisé pour la performance',
      'SEO structuré et gestion des métadonnées',
      'Monitoring et suivi de disponibilité',
      'Workflow éditorial pérenne',
    ],
  },
  {
    title: 'Infrastructure as Code avec Terraform et Helm',
    description:
      'Déploiement reproductible multi-environnements avec modules réutilisables, state sécurisé et conventions claires.',
    stack: ['Terraform', 'Helm', 'Terragrunt', 'Vault', 'Modules'],
    github: 'https://github.com/aio2404/terraform-helm-foundation',
    demo: '',
    slug: 'terraform-helm-infrastructure',
    metrics: [
      { label: 'Temps de provisioning infra', value: '−75 %' },
      { label: 'Environnements gérés', value: '4' },
      { label: 'Étapes manuelles', value: '0' },
    ],
    highlights: [
      'Bibliothèque de modules Terraform réutilisables',
      'Orchestration multi-env avec Terragrunt',
      'Gestion des secrets via Vault',
      'Structure Helm prête pour GitOps',
    ],
  },
];

const testimonialItems: Testimonial[] = [
  {
    name: 'Jean-Marc Dupont',
    role: 'CTO',
    company: 'TechCorp',
    quote:
      'Alexia delivered a robust CI/CD pipeline that cut our deployment time in half. Clear communication, solid technical choices, and a real sense of ownership.',
    linkedin: '',
  },
  {
    name: 'Sophie Laurent',
    role: 'Product Manager',
    company: 'StartupXYZ',
    quote:
      'The n8n automation workflows she designed saved our team several hours every week. She understands both the technical and business sides — rare combination.',
    linkedin: '',
  },
  {
    name: 'Marc Hébert',
    role: 'Engineering Lead',
    company: 'FinTech Inc.',
    quote:
      'Highly recommended for DevOps modernization. Professional, autonomous, and delivers measurable results with minimal hand-holding.',
    linkedin: '',
  },
];

export const portfolioContent: Record<Language, PortfolioContent> = {
  en: {
    navItems: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'demos', label: 'Demos' },
      { id: 'testimonials', label: 'Reviews' },
      { id: 'method', label: 'Process' },
      { id: 'contact', label: 'Contact' },
    ],
    header: {
      contactButton: 'Get in touch',
      bookingLabel: 'Book a call',
      cvLabel: 'Download CV',
      languageSwitcher: 'Français',
    },
    hero: {
      badge: 'Hybrid technical portfolio',
      role: 'DevOps Engineer | AI Automation | Developer',
      headline:
        'I build reliable, automated, and intelligent systems that turn operational complexity into a smooth delivery flow.',
      availability:
        'Available for DevOps, AI automation, CI/CD, migration, and platform enablement missions.',
      ctaProjects: 'See projects',
      ctaContact: 'Contact',
      cards: [
        { title: 'Stack', detail: 'Docker · Kubernetes · Azure · CI/CD' },
        { title: 'Focus', detail: 'Reliability, reproducibility, observability' },
        { title: 'Goal', detail: 'Ship faster with governance and quality' },
      ],
    },
    about: {
      eyebrow: 'About',
      title: 'Hybrid profile, practical and outcome-driven',
      intro:
        'I am a DevOps engineer with hands-on experience in legacy modernization, CI/CD automation, and team accompaniment, with missions in Aix-en-Provence and Montréal.',
      positioning:
        'I connect product, infra, and data teams around measurable delivery and a reliable operating model.',
      missionStatement:
        'I build systems that reduce manual work, improve release confidence, and increase team productivity.',
      ctaMethod: 'See my process',
      valueTitle: 'What I bring',
      valueLead:
        'I bring a calm and structured way of working that aligns architecture, automation, and business impact.',
      valueProps: [
        'Modernization: migration from legacy/mainframe projects to open-source delivery stacks.',
        'Reliability: reproducible, auditable, and traceable CI/CD chains.',
        'Productivity: less repetitive work through scripts, APIs, and low/no-code automations.',
        'Enablement: training and technical support to help teams adopt new processes quickly.',
        'AI: controlled use of LLM workflows to assist analysis, orchestration, and quality.',
      ],
      emailLabel: 'Direct email',
    },
    skills: {
      eyebrow: 'Skills',
      title: 'Core technical skills',
      description:
        'Capabilities used in real projects to industrialize operations and accelerate delivery.',
      categories: [
        {
          title: 'DevOps',
          description: 'Pipeline automation, environment hardening, and continuous deployment.',
          items: ['Linux', 'PowerShell', 'Docker', 'Kubernetes', 'Terraform', 'Helm', 'Azure', 'OpenShift'],
        },
        {
          title: 'Development',
          description:
            'Building practical software pieces that integrate cleanly in operational workflows.',
          items: ['JavaScript', 'TypeScript', 'Python', 'Groovy', 'Angular', 'Flutter', 'APIs'],
        },
        {
          title: 'AI / automation',
          description:
            'Designing intelligent flow orchestration to shorten time-to-solution.',
          items: ['OpenAI', 'n8n', 'Workflows', 'AI agents', 'Integrations'],
        },
        {
          title: 'Cloud & tools',
          description:
            'Reliable operational foundation with versioning, governance, and monitoring.',
          items: ['Git', 'Bitbucket', 'Jenkins', 'GitHub Actions', 'MySQL', 'PostgreSQL', 'Elasticsearch'],
        },
      ],
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Technical projects focused on results',
      description:
        'Examples of interventions where automation, quality and continuous delivery were prioritized.',
      githubLabel: 'GitHub',
      demoLabel: 'Demo',
      detailsLabel: 'See details',
      items: enProjects,
    },
    liveDemos: {
      eyebrow: 'Live demos',
      title: 'See the automations in action',
      description:
        'Interactive examples you can try right now — from AI portfolio assistant to workflow demos.',
      tryLabel: 'Try it',
      items: [
        {
          title: 'AI Portfolio Assistant',
          description:
            'The chatbot on this page is powered by n8n + GPT-4o-mini. Ask it anything about my profile, stack or projects.',
          url: '#contact',
          badge: 'Live · n8n + GPT-4o',
          external: false,
        },
        {
          title: 'Voice AI Agent',
          description:
            'The microphone bubble (bottom-right) connects to a Vapi voice agent — speak directly to ask about my work.',
          url: '#contact',
          badge: 'Live · Vapi + GPT-4o',
          external: false,
        },
        {
          title: 'AI Email Automation',
          description:
            'n8n workflow that classifies, extracts actions and routes incoming emails to structured tickets automatically.',
          url: 'https://github.com/aio2404/agent-email-ia',
          badge: 'GitHub · n8n + OpenAI',
          external: true,
        },
        {
          title: 'Domaine Berger des Vignes',
          description:
            'Production website with 95+ PageSpeed, full observability setup, and sustainable editorial workflow.',
          url: 'https://www.domainebergerdesvignes.com',
          badge: 'Live · Production',
          external: true,
        },
      ],
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What clients and colleagues say',
      description: 'Feedback from people I have worked with on real projects.',
      items: testimonialItems,
    },
    method: {
      eyebrow: 'Work process',
      title: 'Structured, measurable, and evolving approach',
      description: 'A clear framework to ship fast without compromising stability.',
      steps: [
        {
          title: 'Need analysis',
          description:
            'Understand business goals, technical constraints, and define measurable success metrics.',
        },
        {
          title: 'Architecture design',
          description:
            'Build a resilient and maintainable architecture with milestones and traceability.',
        },
        {
          title: 'Automation',
          description:
            'Implement pipelines, scripts, and workflows to reduce manual tasks and improve consistency.',
        },
        {
          title: 'Deployment',
          description:
            'Industrialize production release with rollback strategy, runbooks, and monitoring coverage.',
        },
        {
          title: 'Monitoring and continuous improvement',
          description:
            'Measure, alert, correct, and iterate to optimize reliability and efficiency.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let us discuss your next initiative',
      description: 'Available for architecture, AI automation, migration, and platform maturity programs.',
      summary:
        'I support project scoping, proof of concept, architecture reviews, and DevOps maturity journeys.',
      ctaContact: 'Get in touch',
      quickTitle: 'Quick links',
    },
    footer: {
      tagline: 'Professional portfolio',
      customizableText: 'All sections are fully customizable.',
    },
  },
  fr: {
    navItems: [
      { id: 'home', label: 'Accueil' },
      { id: 'about', label: 'À propos' },
      { id: 'skills', label: 'Compétences' },
      { id: 'projects', label: 'Projets' },
      { id: 'demos', label: 'Démos' },
      { id: 'testimonials', label: 'Avis' },
      { id: 'method', label: 'Méthode' },
      { id: 'contact', label: 'Contact' },
    ],
    header: {
      contactButton: 'Me contacter',
      bookingLabel: 'Réserver un appel',
      cvLabel: 'Télécharger CV',
      languageSwitcher: 'English',
    },
    hero: {
      badge: 'Portfolio technique hybride',
      role: 'DevOps Engineer | AI Automation | Developer',
      headline:
        'Je construis des systèmes fiables, automatisés et intelligents pour transformer la complexité opérationnelle en flux de production fluide.',
      availability:
        'Disponible pour des missions DevOps, automatisation IA, migration, CI/CD et accompagnement technique.',
      ctaProjects: 'Voir mes projets',
      ctaContact: 'Contact',
      cards: [
        { title: 'Stack', detail: 'Docker · Kubernetes · Azure · CI/CD' },
        { title: 'Focus', detail: 'Fiabilité, reproductibilité, observabilité' },
        { title: 'Objectif', detail: 'Accélérer les livraisons avec gouvernance' },
      ],
    },
    about: {
      eyebrow: 'À propos',
      title: 'Profil hybride orienté fiabilité et impact',
      intro:
        "Ingénieure DevOps avec expérience terrain en migration technique, automatisation CI/CD et accompagnement d'équipes, entre Aix-en-Provence et Montréal.",
      positioning:
        "Mon positionnement : relier produit, infra et data autour d'un modèle de livraison fiable, observable et mesurable.",
      missionStatement:
        'Je mets en place des systèmes qui réduisent le travail manuel, renforcent la qualité de livraison et gagnent du temps opérationnel.',
      ctaMethod: 'Découvrir ma méthode',
      valueTitle: "Ce que j'apporte",
      valueLead:
        "J'apporte une approche structurée qui relie architecture, automatisation et résultat business.",
      valueProps: [
        'Modernisation : passage de projets legacy/mainframe vers des stacks open source.',
        'Fiabilité : chaînes CI/CD reproductibles, traçables et industrialisées.',
        'Productivité : réduction des tâches répétitives via scripts, APIs et automatisation low-code/no-code.',
        'Accompagnement : formation et support technique pour fluidifier les changements.',
        "IA : usage maîtrisé des flux LLM pour assister l'analyse et l'orchestration.",
      ],
      emailLabel: 'Email direct',
    },
    skills: {
      eyebrow: 'Compétences',
      title: 'Compétences techniques',
      description:
        "Compétences mobilisées sur des cas concrets d'opérations, de fiabilisation et d'accélération produit.",
      categories: [
        {
          title: 'DevOps',
          description:
            'Automatisation des pipelines, fiabilisation des environnements et livraison continue.',
          items: ['Linux', 'PowerShell', 'Docker', 'Kubernetes', 'Terraform', 'Helm', 'Azure', 'OpenShift'],
        },
        {
          title: 'Développement',
          description:
            "Capacité à construire des briques applicatives qui s'intègrent proprement dans les opérations.",
          items: ['JavaScript', 'TypeScript', 'Python', 'Groovy', 'Angular', 'Flutter', 'APIs'],
        },
        {
          title: 'IA / automatisation',
          description:
            'Conception de flux intelligents pour accélérer la résolution, la prise de décision et la production.',
          items: ['OpenAI', 'n8n', 'Workflows', 'Agents IA', 'Intégrations'],
        },
        {
          title: 'Cloud / outils',
          description:
            "Mise en place d'un socle opérationnel stable avec observabilité, gouvernance et support.",
          items: ['Git', 'Bitbucket', 'Jenkins', 'GitHub Actions', 'MySQL', 'PostgreSQL', 'Elasticsearch'],
        },
      ],
    },
    projects: {
      eyebrow: 'Projets',
      title: 'Projets techniques orientés résultats',
      description:
        "Exemples d'interventions centrées sur l'automatisation, la qualité opérationnelle et la livraison continue.",
      githubLabel: 'GitHub',
      demoLabel: 'Démo',
      detailsLabel: 'Voir le détail',
      items: frProjects,
    },
    liveDemos: {
      eyebrow: 'Démos live',
      title: 'Voir les automatisations en action',
      description:
        'Exemples interactifs disponibles maintenant — du chatbot IA aux démos de workflows.',
      tryLabel: 'Essayer',
      items: [
        {
          title: 'Assistant Portfolio IA',
          description:
            "Le chatbot de cette page est propulsé par n8n + GPT-4o-mini. Posez-lui n'importe quelle question sur mon profil, ma stack ou mes projets.",
          url: '#contact',
          badge: 'Live · n8n + GPT-4o',
          external: false,
        },
        {
          title: 'Agent Vocal IA',
          description:
            'La bulle microphone (en bas à droite) connecte à un agent vocal Vapi — parlez directement pour en savoir plus sur mon travail.',
          url: '#contact',
          badge: 'Live · Vapi + GPT-4o',
          external: false,
        },
        {
          title: 'Automatisation Emails IA',
          description:
            'Workflow n8n qui classe, extrait les actions et route automatiquement les emails entrants vers des tickets structurés.',
          url: 'https://github.com/aio2404/agent-email-ia',
          badge: 'GitHub · n8n + OpenAI',
          external: true,
        },
        {
          title: 'Domaine Berger des Vignes',
          description:
            "Site en production avec PageSpeed 95+, stack d'observabilité complète et workflow éditorial pérenne.",
          url: 'https://www.domainebergerdesvignes.com',
          badge: 'Live · Production',
          external: true,
        },
      ],
    },
    testimonials: {
      eyebrow: 'Témoignages',
      title: 'Ce que disent clients et collègues',
      description: "Retours de personnes avec qui j'ai travaillé sur des projets réels.",
      items: testimonialItems,
    },
    method: {
      eyebrow: 'Méthode de travail',
      title: 'Approche structurée, mesurable et évolutive',
      description: 'Un cadre clair pour livrer vite sans sacrifier la stabilité.',
      steps: [
        {
          title: 'Analyse du besoin',
          description:
            'Comprendre les objectifs business, les contraintes techniques et définir les indicateurs de succès.',
        },
        {
          title: "Conception de l'architecture",
          description:
            'Dessiner une architecture résiliente, sécurisée et maintenable, validée par étapes.',
        },
        {
          title: 'Automatisation',
          description:
            "Mettre en place pipelines, scripts et workflows pour fiabiliser et fluidifier l'exécution.",
        },
        {
          title: 'Déploiement',
          description:
            'Industrialiser la mise en production avec stratégies de release, observabilité et procédures de rollback.',
        },
        {
          title: 'Monitoring et amélioration continue',
          description:
            'Mesurer, alerter, corriger et itérer pour améliorer qualité, performance et coûts.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Discutons de votre prochain projet',
      description:
        "Disponible pour des missions d'architecture, d'automatisation IA, de migration et d'industrialisation.",
      summary:
        "Je réponds aux demandes de cadrage technique, de POC, de revue d'architecture et de montée en maturité DevOps.",
      ctaContact: 'Prendre contact',
      quickTitle: 'Renseignements rapides',
    },
    footer: {
      tagline: 'Portfolio professionnel',
      customizableText: 'Toutes les sections sont personnalisables.',
    },
  },
};

export const getContent = (lang: Language) => portfolioContent[lang];

export const getProjectBySlug = (slug: string, lang: Language) =>
  portfolioContent[lang].projects.items.find((p) => p.slug === slug) ?? null;
