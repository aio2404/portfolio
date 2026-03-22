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
  hint: string;
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
    title: 'n8n social media automation workflows',
    description:
      'Ready-to-deploy n8n templates that automate content publishing on YouTube, TikTok, Instagram and X — from content generation with AI to scheduling and posting.',
    stack: ['n8n', 'OpenAI', 'YouTube API', 'TikTok API', 'Instagram API', 'Webhooks'],
    github: '',
    demo: '',
    slug: 'n8n-social-media-automation',
    metrics: [
      { label: 'Posts published / day', value: '50+' },
      { label: 'Manual work saved', value: '95%' },
      { label: 'Platforms covered', value: '4+' },
    ],
    highlights: [
      'AI content generation',
      'Multi-platform scheduling',
      'Auto-repost logic',
      'Error handling & retry',
    ],
  },
  {
    title: 'AI-powered report generation',
    description:
      'Automated reporting pipeline that collects data from multiple sources, processes it with an LLM, and generates formatted reports delivered by email or Slack.',
    stack: ['n8n', 'OpenAI', 'PostgreSQL', 'APIs', 'Slack'],
    github: '',
    demo: '',
    slug: 'ai-report-generation',
    metrics: [
      { label: 'Reports / week', value: '20+' },
      { label: 'Generation time', value: '<2 min' },
      { label: 'Manual effort', value: '0' },
    ],
    highlights: [
      'Multi-source data aggregation',
      'LLM-powered analysis and formatting',
      'Auto-delivery via email and Slack',
      'Scheduled or event-triggered',
    ],
  },
  {
    title: 'Voice AI call agent',
    description:
      'Automated voice agent that handles inbound calls, qualifies leads, answers FAQ and routes to the right team — built with Vapi and n8n.',
    stack: ['Vapi', 'n8n', 'OpenAI', 'Webhooks', 'CRM'],
    github: '',
    demo: '',
    slug: 'voice-ai-call-agent',
    metrics: [
      { label: 'Calls handled', value: '24/7' },
      { label: 'Qualification rate', value: '80%+' },
      { label: 'Human escalation', value: '-60%' },
    ],
    highlights: [
      'Natural language call handling',
      'Lead qualification workflow',
      'CRM auto-update after call',
      'Multilingual (EN/FR)',
    ],
  },
  {
    title: 'Domaine Berger des Vignes — production website',
    description:
      'Full ownership of a production website: deployment, performance optimization, SEO, observability and editorial workflow.',
    stack: ['Web platform', 'Cloud hosting', 'SEO', 'Observability', 'Performance'],
    github: 'https://github.com/aio2404/domainebergerdesvignes',
    demo: 'https://www.domainebergerdesvignes.com',
    slug: 'domaine-berger-des-vignes',
    metrics: [
      { label: 'PageSpeed', value: '95+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Core Web Vitals', value: 'All green' },
    ],
    highlights: [
      'Production-grade deployment',
      'Structured SEO and metadata',
      'Uptime monitoring',
      'Sustainable publishing workflow',
    ],
  },
  {
    title: 'Client DevOps missions (confidential)',
    description:
      'Multiple long-term DevOps missions in banking and e-commerce: CI/CD modernization, Kubernetes migrations, infrastructure as code, platform hardening. Projects are confidential.',
    stack: ['Kubernetes', 'Terraform', 'Docker', 'Azure', 'Jenkins', 'Python'],
    github: '',
    demo: '',
    slug: 'client-devops-missions',
    metrics: [
      { label: 'Clients', value: '8+' },
      { label: 'Environments migrated', value: '15+' },
      { label: 'Deploy time', value: '-60% avg' },
    ],
    highlights: [
      'Kubernetes cluster setup and migration',
      'CI/CD pipeline design and implementation',
      'IaC with Terraform and Helm',
      'Platform hardening and monitoring',
    ],
  },
  {
    title: 'This portfolio — live AI demo',
    description:
      'This very portfolio is a technical demo: n8n-powered chatbot, Vapi voice agent, live n8n workflow demo, project detail pages with metrics.',
    stack: ['Next.js', 'n8n', 'Vapi', 'TypeScript', 'AWS Amplify'],
    github: 'https://github.com/aio2404/portfolio',
    demo: '',
    slug: 'this-portfolio',
    metrics: [
      { label: 'Sections', value: '8' },
      { label: 'AI integrations', value: '2' },
      { label: 'Deploy auto', value: 'yes' },
    ],
    highlights: [
      'n8n + GPT-4o chatbot',
      'Vapi voice agent (EN/FR)',
      'Live workflow demo',
      'Automated CI/CD deploy',
    ],
  },
];

const frProjects: Project[] = [
  {
    title: "Workflows n8n d'automatisation réseaux sociaux",
    description:
      "Templates n8n prêts à déployer pour automatiser la publication de contenu sur YouTube, TikTok, Instagram et X — de la génération IA à la programmation et la diffusion.",
    stack: ['n8n', 'OpenAI', 'YouTube API', 'TikTok API', 'Instagram API', 'Webhooks'],
    github: '',
    demo: '',
    slug: 'n8n-social-media-automation',
    metrics: [
      { label: 'Posts publiés / jour', value: '50+' },
      { label: 'Travail manuel économisé', value: '95 %' },
      { label: 'Plateformes couvertes', value: '4+' },
    ],
    highlights: [
      "Génération de contenu par IA",
      'Programmation multi-plateforme',
      'Logique de re-publication automatique',
      'Gestion des erreurs et relances',
    ],
  },
  {
    title: "Génération de rapports IA automatisée",
    description:
      "Pipeline de reporting automatisé qui collecte des données depuis plusieurs sources, les traite avec un LLM et génère des rapports formatés livrés par email ou Slack.",
    stack: ['n8n', 'OpenAI', 'PostgreSQL', 'APIs', 'Slack'],
    github: '',
    demo: '',
    slug: 'ai-report-generation',
    metrics: [
      { label: 'Rapports / semaine', value: '20+' },
      { label: 'Temps de génération', value: '<2 min' },
      { label: 'Effort manuel', value: '0' },
    ],
    highlights: [
      "Agrégation de données multi-sources",
      "Analyse et mise en forme par LLM",
      "Livraison automatique par email et Slack",
      "Déclenchement planifié ou événementiel",
    ],
  },
  {
    title: "Agent vocal IA",
    description:
      "Agent vocal automatisé qui gère les appels entrants, qualifie les prospects, répond aux FAQ et oriente vers la bonne équipe — construit avec Vapi et n8n.",
    stack: ['Vapi', 'n8n', 'OpenAI', 'Webhooks', 'CRM'],
    github: '',
    demo: '',
    slug: 'voice-ai-call-agent',
    metrics: [
      { label: 'Appels traités', value: '24/7' },
      { label: 'Taux de qualification', value: '80 %+' },
      { label: 'Escalades humaines', value: '-60 %' },
    ],
    highlights: [
      "Gestion des appels en langage naturel",
      "Workflow de qualification de leads",
      "Mise à jour CRM automatique après appel",
      "Multilingue (EN/FR)",
    ],
  },
  {
    title: "Domaine Berger des Vignes — site en production",
    description:
      "Ownership complet d'un site en production : déploiement, optimisation des performances, SEO, observabilité et workflow éditorial.",
    stack: ['Web platform', 'Cloud hosting', 'SEO', 'Observability', 'Performance'],
    github: 'https://github.com/aio2404/domainebergerdesvignes',
    demo: 'https://www.domainebergerdesvignes.com',
    slug: 'domaine-berger-des-vignes',
    metrics: [
      { label: 'PageSpeed', value: '95+' },
      { label: 'Disponibilité', value: '99,9 %' },
      { label: 'Core Web Vitals', value: 'Tous verts' },
    ],
    highlights: [
      "Déploiement de niveau production",
      "SEO structuré et métadonnées",
      "Monitoring de disponibilité",
      "Workflow éditorial pérenne",
    ],
  },
  {
    title: "Missions DevOps clients (confidentielles)",
    description:
      "Plusieurs missions DevOps longue durée en banque et e-commerce : modernisation CI/CD, migrations Kubernetes, infrastructure as code, durcissement de plateformes. Projets confidentiels.",
    stack: ['Kubernetes', 'Terraform', 'Docker', 'Azure', 'Jenkins', 'Python'],
    github: '',
    demo: '',
    slug: 'client-devops-missions',
    metrics: [
      { label: 'Clients', value: '8+' },
      { label: 'Environnements migrés', value: '15+' },
      { label: 'Temps de déploiement', value: '-60 % en moy.' },
    ],
    highlights: [
      "Mise en place et migration de clusters Kubernetes",
      "Conception et implémentation de pipelines CI/CD",
      "IaC avec Terraform et Helm",
      "Durcissement de plateformes et monitoring",
    ],
  },
  {
    title: "Ce portfolio — démo IA live",
    description:
      "Ce portfolio est lui-même une démo technique : chatbot propulsé par n8n, agent vocal Vapi, démo de workflow n8n en direct, pages de détail de projets avec métriques.",
    stack: ['Next.js', 'n8n', 'Vapi', 'TypeScript', 'AWS Amplify'],
    github: 'https://github.com/aio2404/portfolio',
    demo: '',
    slug: 'this-portfolio',
    metrics: [
      { label: 'Sections', value: '8' },
      { label: 'Intégrations IA', value: '2' },
      { label: 'Déploiement auto', value: 'oui' },
    ],
    highlights: [
      "Chatbot n8n + GPT-4o",
      "Agent vocal Vapi (EN/FR)",
      "Démo de workflow en direct",
      "CI/CD automatisé",
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
      badge: 'DevOps · AI Automation · n8n Expert',
      role: 'DevOps Engineer | AI Automation Specialist | n8n & Make Expert',
      headline:
        'I build reliable automation systems and cloud infrastructures — from CI/CD pipelines to AI-powered workflows that scale in production.',
      availability:
        'Available for any type of project: automation, web development, IT services, cloud infrastructure, AI integrations, DevOps, APIs, and more.',
      ctaProjects: 'See projects',
      ctaContact: 'Contact',
      cards: [
        { title: 'Stack', detail: 'Docker · K8s · AWS · n8n · Make' },
        { title: 'Focus', detail: 'Automation, reliability, AI integrations' },
        { title: 'Goal', detail: 'Less manual work, more reliable systems' },
      ],
    },
    about: {
      eyebrow: 'About',
      title: 'DevOps engineer turned automation specialist',
      intro:
        'I graduated with an engineering degree in computer science in France, then did a year-long VIE in Canada as a DevOps engineer at a startup. Since then I have been freelancing across banking, e-commerce, and tech sectors.',
      positioning:
        'I sit at the intersection of DevOps and AI automation — I can build the infrastructure, the CI/CD pipeline, and the n8n workflow that ties everything together.',
      missionStatement:
        'My goal: reduce manual work, make systems more reliable, and use AI and automation to build things that run themselves.',
      ctaMethod: 'See my process',
      valueTitle: 'What I bring',
      valueLead:
        'I bring a calm and structured way of working that aligns architecture, automation, and business impact.',
      valueProps: [
        'Cloud & infrastructure: AWS, GCP, Azure, OVH — from IaC with Terraform to Kubernetes production clusters.',
        'CI/CD: end-to-end pipelines with Jenkins, GitHub Actions, GitLab CI, Docker, Helm.',
        'AI automation: n8n and Make workflows connected to OpenAI, YouTube, TikTok, Instagram, CRMs, and internal tools.',
        'Content & data automation: AI-powered report generation, social media publishing, content pipelines.',
        'Web & APIs: Node.js, React, REST APIs — I build the integration layer when there is no ready-made connector.',
      ],
      emailLabel: 'Direct email',
    },
    skills: {
      eyebrow: 'Skills',
      title: 'Core technical skills',
      description:
        'Capabilities used in real projects to automate operations, build cloud infrastructure, and connect systems with AI.',
      categories: [
        {
          title: 'DevOps',
          description: 'Pipeline automation, cloud infrastructure, and continuous deployment.',
          items: ['Docker', 'Kubernetes', 'Terraform', 'Helm', 'Jenkins', 'GitHub Actions', 'GitLab CI', 'AWS', 'GCP', 'Azure', 'OVH', 'Linux', 'Python'],
        },
        {
          title: 'AI automation',
          description: 'Designing intelligent workflows that connect APIs, LLMs, and business tools.',
          items: ['n8n', 'Make', 'OpenAI', 'LLM workflows', 'API integrations', 'YouTube API', 'TikTok API', 'Instagram API', 'CRM integrations', 'Webhooks'],
        },
        {
          title: 'Development',
          description: 'Building the integration layer and web services that glue systems together.',
          items: ['Node.js', 'React', 'TypeScript', 'Python', 'Express', 'REST APIs', 'PostgreSQL', 'MySQL'],
        },
        {
          title: 'Reliability',
          description: 'Observability, alerting, and hardening so systems run without supervision.',
          items: ['Monitoring', 'Grafana', 'Prometheus', 'logging', 'system hardening', 'deployment best practices'],
        },
      ],
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Technical projects focused on results',
      description:
        'A selection of public and representative work — automation systems, AI workflows, DevOps infrastructure, and production deployments.',
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
          hint: 'Click the chat bubble at the bottom right ↘',
        },
        {
          title: 'Voice AI Agent',
          description:
            'The microphone bubble (bottom-left) connects to a Vapi voice agent — speak directly to ask about my work.',
          url: '#contact',
          badge: 'Live · Vapi + GPT-4o',
          external: false,
          hint: 'Click the microphone bubble at the bottom left ↙',
        },
        {
          title: 'n8n Social Media Automation',
          description:
            'n8n workflow templates that automate content publishing across YouTube, TikTok, Instagram and X using AI.',
          url: 'https://github.com/aio2404/agent-email-ia',
          badge: 'n8n + OpenAI + Social APIs',
          external: true,
          hint: 'View on GitHub →',
        },
        {
          title: 'Post to X — live n8n demo',
          description:
            'Type a message, click send — watch the n8n workflow post it to X in real time. Full workflow visible.',
          url: '#x-demo',
          badge: 'Live · n8n + X API',
          external: false,
          hint: 'Scroll down to the live demo ↓',
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
      description: 'A clear framework to build automation systems that actually hold up in production.',
      steps: [
        {
          title: 'Discovery & scoping',
          description:
            'Understand the workflow, the tools in place, the data flows and define what should be automated first.',
        },
        {
          title: 'Architecture',
          description:
            'Design a reliable system — choose the right tools (n8n, Make, custom API), map integrations, handle errors.',
        },
        {
          title: 'Build & connect',
          description:
            'Build the automation, connect the APIs, write the glue code where needed.',
        },
        {
          title: 'Test & harden',
          description:
            'Test edge cases, add retry logic, alerts and monitoring so the workflow runs without supervision.',
        },
        {
          title: 'Deliver & document',
          description:
            'Deploy, document, and hand over. The system should be understandable and maintainable by anyone.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's talk about your project",
      description: 'Available for any type of project: automation, web development, IT services, cloud infrastructure, AI integrations, DevOps, APIs, scripts — whatever you need built.',
      summary:
        'I work on all kinds of projects: websites, automations, internal tools, cloud infrastructure, AI workflows, APIs, and IT services. If it involves tech, I can help.',
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
      badge: "DevOps · Automatisation IA · Expert n8n",
      role: "DevOps Engineer | Spécialiste Automatisation IA | Expert n8n & Make",
      headline:
        "Je construis des systèmes d'automatisation fiables et des infrastructures cloud — des pipelines CI/CD aux workflows IA qui tiennent en production.",
      availability:
        "Disponible pour tous types de projets : automatisation, développement web, services informatiques, infrastructure cloud, intégrations IA, DevOps, APIs et plus encore.",
      ctaProjects: 'Voir mes projets',
      ctaContact: 'Contact',
      cards: [
        { title: 'Stack', detail: 'Docker · K8s · AWS · n8n · Make' },
        { title: 'Focus', detail: "Automatisation, fiabilité, intégrations IA" },
        { title: 'Objectif', detail: "Moins de travail manuel, des systèmes plus fiables" },
      ],
    },
    about: {
      eyebrow: 'À propos',
      title: "Ingénieure DevOps reconvertie en spécialiste automatisation",
      intro:
        "Diplômée d'une école d'ingénieurs en informatique en France, j'ai effectué un VIE d'un an au Canada en tant qu'ingénieure DevOps dans une startup. Depuis, je travaille en freelance dans les secteurs bancaire, e-commerce et tech.",
      positioning:
        "Je me situe à l'intersection du DevOps et de l'automatisation IA — je peux construire l'infrastructure, le pipeline CI/CD et le workflow n8n qui relient tout ensemble.",
      missionStatement:
        "Mon objectif : réduire le travail manuel, fiabiliser les systèmes et utiliser l'IA et l'automatisation pour construire des choses qui tournent toutes seules.",
      ctaMethod: 'Découvrir ma méthode',
      valueTitle: "Ce que j'apporte",
      valueLead:
        "J'apporte une approche structurée qui relie architecture, automatisation et impact business.",
      valueProps: [
        "Cloud & infrastructure : AWS, GCP, Azure, OVH — de l'IaC avec Terraform aux clusters Kubernetes en production.",
        "CI/CD : pipelines end-to-end avec Jenkins, GitHub Actions, GitLab CI, Docker, Helm.",
        "Automatisation IA : workflows n8n et Make connectés à OpenAI, YouTube, TikTok, Instagram, CRMs et outils internes.",
        "Automatisation de contenu et de données : génération de rapports IA, publication réseaux sociaux, pipelines de contenu.",
        "Web & APIs : Node.js, React, REST APIs — je construis la couche d'intégration quand il n'existe pas de connecteur prêt à l'emploi.",
      ],
      emailLabel: 'Email direct',
    },
    skills: {
      eyebrow: 'Compétences',
      title: 'Compétences techniques',
      description:
        "Compétences mobilisées sur des projets réels pour automatiser les opérations, construire des infrastructures cloud et connecter des systèmes avec l'IA.",
      categories: [
        {
          title: 'DevOps',
          description: "Automatisation des pipelines, infrastructure cloud et déploiement continu.",
          items: ['Docker', 'Kubernetes', 'Terraform', 'Helm', 'Jenkins', 'GitHub Actions', 'GitLab CI', 'AWS', 'GCP', 'Azure', 'OVH', 'Linux', 'Python'],
        },
        {
          title: 'Automatisation IA',
          description: "Conception de workflows intelligents connectant APIs, LLMs et outils métier.",
          items: ['n8n', 'Make', 'OpenAI', 'Workflows LLM', 'Intégrations API', 'YouTube API', 'TikTok API', 'Instagram API', 'Intégrations CRM', 'Webhooks'],
        },
        {
          title: 'Développement',
          description: "Construction de la couche d'intégration et des services web qui relient les systèmes.",
          items: ['Node.js', 'React', 'TypeScript', 'Python', 'Express', 'REST APIs', 'PostgreSQL', 'MySQL'],
        },
        {
          title: 'Fiabilité',
          description: "Observabilité, alerting et durcissement pour que les systèmes tournent sans supervision.",
          items: ['Monitoring', 'Grafana', 'Prometheus', 'Logging', 'Durcissement système', 'Bonnes pratiques de déploiement'],
        },
      ],
    },
    projects: {
      eyebrow: 'Projets',
      title: 'Projets techniques orientés résultats',
      description:
        "Une sélection de travaux publics et représentatifs — systèmes d'automatisation, workflows IA, infrastructure DevOps et déploiements en production.",
      githubLabel: 'GitHub',
      demoLabel: 'Démo',
      detailsLabel: 'Voir le détail',
      items: frProjects,
    },
    liveDemos: {
      eyebrow: 'Démos live',
      title: 'Voir les automatisations en action',
      description:
        "Exemples interactifs disponibles maintenant — du chatbot IA aux démos de workflows.",
      tryLabel: 'Essayer',
      items: [
        {
          title: 'Assistant Portfolio IA',
          description:
            "Le chatbot de cette page est propulsé par n8n + GPT-4o-mini. Posez-lui n'importe quelle question sur mon profil, ma stack ou mes projets.",
          url: '#contact',
          badge: 'Live · n8n + GPT-4o',
          external: false,
          hint: 'Cliquez sur la bulle de chat en bas à droite ↘',
        },
        {
          title: 'Agent Vocal IA',
          description:
            "La bulle microphone (en bas à gauche) connecte à un agent vocal Vapi — parlez directement pour en savoir plus sur mon travail.",
          url: '#contact',
          badge: 'Live · Vapi + GPT-4o',
          external: false,
          hint: 'Cliquez sur la bulle micro en bas à gauche ↙',
        },
        {
          title: "Automatisation réseaux sociaux n8n",
          description:
            "Templates de workflows n8n qui automatisent la publication de contenu sur YouTube, TikTok, Instagram et X en utilisant l'IA.",
          url: 'https://github.com/aio2404/agent-email-ia',
          badge: 'n8n + OpenAI + Social APIs',
          external: true,
          hint: 'Voir sur GitHub →',
        },
        {
          title: "Poster sur X — démo n8n en direct",
          description:
            "Tapez un message, cliquez sur envoyer — regardez le workflow n8n le publier sur X en temps réel. Workflow complet visible.",
          url: '#x-demo',
          badge: 'Live · n8n + X API',
          external: false,
          hint: 'Descendez vers la démo live ↓',
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
      description: "Un cadre clair pour construire des systèmes d'automatisation qui tiennent vraiment en production.",
      steps: [
        {
          title: 'Découverte & cadrage',
          description:
            "Comprendre le workflow, les outils en place, les flux de données et définir ce qui doit être automatisé en premier.",
        },
        {
          title: 'Architecture',
          description:
            "Concevoir un système fiable — choisir les bons outils (n8n, Make, API sur mesure), cartographier les intégrations, gérer les erreurs.",
        },
        {
          title: 'Construction & connexion',
          description:
            "Construire l'automatisation, connecter les APIs, écrire le code de liaison là où c'est nécessaire.",
        },
        {
          title: 'Test & durcissement',
          description:
            "Tester les cas limites, ajouter la logique de relance, les alertes et le monitoring pour que le workflow tourne sans supervision.",
        },
        {
          title: 'Livraison & documentation',
          description:
            "Déployer, documenter et transmettre. Le système doit être compréhensible et maintenable par n'importe qui.",
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: "Parlons de votre projet",
      description: "Disponible pour tous types de projets : automatisation, développement web, services informatiques, infrastructure cloud, intégrations IA, DevOps, APIs, scripts — tout ce qui touche à la tech.",
      summary:
        "Je travaille sur tous types de projets : sites web, automatisations, outils internes, infrastructure cloud, workflows IA, APIs et services informatiques. Si c'est technique, je peux vous aider.",
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
