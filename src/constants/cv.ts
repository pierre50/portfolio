export const AVAILABLE = true;
export const CAREER_START_YEAR = 2017;

export interface PersonalInfo {
  name: string;
  title: { fr: string; en: string };
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
}

export interface SkillGroup {
  label: { fr: string; en: string };
  items: { fr: string; en: string };
}

export interface Experience {
  role: { fr: string; en: string };
  company: string;
  location: string;
  period: { fr: string; en: string };
  summary: { fr: string; en: string };
  bullets: { fr: string; en: string }[];
}

export interface Project {
  title: string;
  year: string;
  link?: string;
  technologies: string[];
  summary: { fr: string; en: string };
  bullets: { fr: string; en: string }[];
}

export interface Education {
  degree: { fr: string; en: string };
  school: string;
  location: string;
  period: string;
}

export interface Language {
  name: { fr: string; en: string };
  level: { fr: string; en: string };
}

export const PERSONAL_INFO: PersonalInfo = {
  name: "Pierre NICOLAS",
  title: {
    fr: "Lead Développeur Full Stack / Tech Lead JavaScript",
    en: "Lead Full Stack Developer / JavaScript Tech Lead",
  },
  location: "Granville (50), France",
  email: "tenzin50@hotmail.fr",
  phone: "+33 6 02 27 34 38",
  linkedin: "https://www.linkedin.com/in/pierre-nicolas-62b3a9b2/",
  website: "https://pierre50.github.io/",
};

export const PROFILE: { fr: string; en: string } = {
  fr: "Lead développeur full stack avec plus de 7 ans d'expérience dans la conception, l'évolution et la sécurisation d'applications web complexes à fort enjeu métier. Spécialisé dans les architectures JavaScript modernes (React, Node.js, TypeScript), la structuration de codebases à grande échelle et l'automatisation de processus critiques.\n\nHabitué à travailler sur des produits en production à fort trafic, je combine vision technique, exigence de qualité et capacité à faire évoluer des équipes et des architectures dans la durée.",
  en: "Lead Full Stack Developer with over 7 years of experience designing, scaling and securing complex, business-critical web applications. Strong expertise in modern JavaScript architectures (React, Node.js, TypeScript), large-scale codebase structuring and automation of critical business processes.\n\nUsed to working on high-traffic production products, combining strong technical vision, high quality standards and the ability to evolve both teams and architectures over time.",
};

export const SKILLS: SkillGroup[] = [
  {
    label: { fr: "Langages", en: "Languages" },
    items: {
      fr: "JavaScript (ES6+), TypeScript, HTML5, CSS3",
      en: "JavaScript (ES6+), TypeScript, HTML5, CSS3",
    },
  },
  {
    label: { fr: "Front-end", en: "Front-End" },
    items: {
      fr: "React, Next.js, Vue.js, architecture front-end scalable, refonte d'interfaces complexes, formulaires dynamiques avancés, visualisation de données, librairies graphiques, UX orientée produit",
      en: "React, Next.js, Vue.js, scalable front-end architectures, complex UI refactoring, advanced dynamic forms, data visualization, charting libraries, product-oriented UX",
    },
  },
  {
    label: { fr: "Back-end", en: "Back-End" },
    items: {
      fr: "Node.js, GraphQL / GraphQL Yoga, Fastify, Bull/Redis, conception d'API sécurisées, gestion de workers, traitements asynchrones, génération de documents (PDF, XML), optimisation des performances",
      en: "Node.js, GraphQL / GraphQL Yoga, Fastify, Bull/Redis, secure API design, worker management, asynchronous processing, document generation (PDF, XML), performance optimization",
    },
  },
  {
    label: { fr: "Architecture & Qualité", en: "Architecture & Quality" },
    items: {
      fr: "Monorepo, librairies internes partagées, migration JavaScript → TypeScript, structuration de codebases legacy, tests unitaires, documentation technique",
      en: "Monorepo architecture, shared internal libraries, JavaScript → TypeScript migrations, legacy codebase restructuring, unit testing, technical documentation",
    },
  },
  {
    label: { fr: "Automatisation & IA", en: "AI & Automation" },
    items: {
      fr: "Intégration de briques d'IA applicative (chat, assistance contextuelle), automatisation de workflows métiers complexes, aide à la configuration utilisateur",
      en: "Integration of applied AI components (in-app chat, contextual assistance), automation of complex business workflows, user configuration assistance",
    },
  },
  {
    label: { fr: "Intégrations", en: "Integrations" },
    items: {
      fr: "Stripe, DocuSign, Supabase, OpenAI, services tiers métier",
      en: "Stripe, DocuSign, Supabase, OpenAI, third-party business services",
    },
  },
];

export const EXPERIENCE: Experience[] = [
  {
    role: {
      fr: "Lead développeur Full Stack",
      en: "Lead Full Stack Developer",
    },
    company: "Alf",
    location: "Paris",
    period: { fr: "09/2022 – aujourd'hui", en: "09/2022 – Present" },
    summary: {
      fr: "Lead developer sur une plateforme SaaS de digitalisation et d'automatisation de processus juridiques utilisée en production par des équipes métier.",
      en: "Lead developer on a SaaS platform dedicated to the digitalization and automation of legal business processes, used in production by business teams.",
    },
    bullets: [
      {
        fr: "Conception et pilotage de l'architecture front-end (React) et back-end (Node.js / GraphQL) au sein d'un monorepo structuré avec librairies internes partagées.",
        en: "Designed and led the front-end (React) and back-end (Node.js / GraphQL) architecture within a structured monorepo using shared internal libraries.",
      },
      {
        fr: "Refonte complète du moteur de génération de workflows et de documents : passage d'une configuration technique (JSON / HTML) à une approche no-code basée sur des documents Word dynamiques (variables, conditions, boucles).",
        en: "Led a complete redesign of the workflow and document generation engine, shifting from a technical configuration approach (JSON / HTML) to a no-code solution based on dynamic Word documents (variables, conditions, loops).",
      },
      {
        fr: "Réduction significative de la complexité de configuration côté utilisateur et amélioration de la maintenabilité du produit.",
        en: "Significantly reduced user-side configuration complexity while improving overall product maintainability.",
      },
      {
        fr: "Migration progressive d'une large base de code JavaScript vers TypeScript afin de fiabiliser le produit et réduire la dette technique.",
        en: "Drove a progressive migration of a large JavaScript codebase to TypeScript to increase reliability and reduce technical debt.",
      },
      {
        fr: "Intégration de fonctionnalités d'IA (chat applicatif, aides contextuelles) pour accompagner les utilisateurs dans la création et l'exploitation de workflows.",
        en: "Integrated AI-driven features (in-app chat, contextual assistants) to support users in building and operating workflows.",
      },
      {
        fr: "Conception d'un back-end orienté performance, sécurité et scalabilité, avec intégration de services tiers critiques (signature électronique via DocuSign).",
        en: "Designed a back-end focused on performance, security and scalability, including the integration of critical third-party services (electronic signature via DocuSign).",
      },
    ],
  },
  {
    role: {
      fr: "Développeur Front-End",
      en: "Front-End Developer",
    },
    company: "Eulerian Technologies",
    location: "Paris",
    period: { fr: "11/2017 – 08/2022", en: "11/2017 – 08/2022" },
    summary: {
      fr: "Développeur front-end sur une plateforme de collecte, d'analyse et de visualisation de données marketing à fort volume.",
      en: "Front-end developer on a high-volume marketing data collection, analysis and visualization platform.",
    },
    bullets: [
      {
        fr: "Participation à la migration complète de l'application client de Ext JS vers Vue.js, avec refonte progressive de l'interface et amélioration notable de la lisibilité et de la maintenabilité du code.",
        en: "Contributed to the complete migration of the client application from Ext JS to Vue.js, with a progressive UI refactor and significant improvements in code readability and maintainability.",
      },
      {
        fr: "Développement de fonctionnalités avancées de visualisation et d'analyse de données (dashboards, graphiques, métriques temps réel).",
        en: "Developed advanced data visualization and analysis features (dashboards, charts, real-time metrics).",
      },
      {
        fr: "Intégration de librairies graphiques complexes pour l'exploitation de données à grande échelle.",
        en: "Integrated complex charting libraries to enable large-scale data exploration.",
      },
      {
        fr: "Mise en place de parcours d'onboarding interactifs et de guides utilisateurs intégrés à l'application.",
        en: "Designed and implemented interactive onboarding flows and in-app user guides to reduce product learning time.",
      },
      {
        fr: "Ajout de tests unitaires et rédaction de documentation technique pour fiabiliser les composants front-end et faciliter leur évolution.",
        en: "Added unit tests and produced technical documentation to strengthen front-end component reliability and long-term evolution.",
      },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Deviscope",
    year: "2024",
    link: "https://deviscope.fr",
    technologies: ["Next.js", "Fastify", "Supabase", "OpenAI", "Bull/Redis"],
    summary: {
      fr: "Plateforme SaaS solo d'audit et d'estimation de travaux par IA.",
      en: "Solo SaaS platform for AI-powered construction quote auditing and estimation.",
    },
    bullets: [
      {
        fr: "Utilisation de GPT-4o Vision pour extraire et analyser les données de devis PDF.",
        en: "Used GPT-4o Vision to extract and analyze data from PDF quotes.",
      },
      {
        fr: "Vérification de la conformité légale des entreprises via les APIs SIRENE, BODACC et ADEME.",
        en: "Verified legal compliance of companies via SIRENE, BODACC and ADEME APIs.",
      },
      {
        fr: "Moteur de calcul hybride (IA + logique métier déterministe) pour simuler des budgets de rénovation précis, ajustés selon des coefficients régionaux et des bases de prix nationales.",
        en: "Built a hybrid calculation engine (AI + deterministic business logic) to simulate accurate renovation budgets adjusted by regional coefficients and national price references.",
      },
      {
        fr: "Conception et développement de l'ensemble de la stack en solo : front-end Next.js, API Fastify, base de données Supabase, files de traitement asynchrone avec Bull/Redis.",
        en: "Designed and built the full stack solo: Next.js front-end, Fastify API, Supabase database, asynchronous job processing with Bull/Redis.",
      },
    ],
  },
];

export const SKILLS_FLAT: string[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Node.js",
  "GraphQL",
  "Fastify",
  "Bull/Redis",
  "HTML5",
  "CSS3",
];

export const EDUCATION: Education[] = [
  {
    degree: {
      fr: "Master of Science (MSc) Informatique",
      en: "Master of Science (MSc) in Computer Science",
    },
    school: "SUPINFO International University",
    location: "Paris",
    period: "2016 – 2019",
  },
];

export const LANGUAGES: Language[] = [
  {
    name: { fr: "Français", en: "French" },
    level: { fr: "Natif", en: "Native" },
  },
  {
    name: { fr: "Anglais", en: "English" },
    level: { fr: "Courant", en: "Fluent" },
  },
];
