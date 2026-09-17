export type PortfolioProject = {
  id: string;
  name: string;
  type: string;
  status: string;
  url?: string;
  stack: string[];
  categories: string[];
  impact: string;
  highlights: string[];
};

export type TimelineEntry = {
  company: string;
  role: string;
  period: string;
  brand: string;
};

export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
};

export type CertificationEntry = {
  issuer: string;
  name: string;
  period: string;
};

export type StackChip = {
  label: string;
  slug: string;
  bg: string;
  fg: string;
  iconUrl?: string;
};

export type CvConfig = {
  featured: string[];
  pillStyle: "mono" | "colored";
  maxBullets: number;
  cardDensity: "compact" | "normal" | "spacieux";
  photoSize: "petite" | "moyenne" | "grande";
  showEpitechProjects: boolean;
  epitechMax: number;
};

export type BootcampEntry = {
  name: string;
  duration: string;
  stack: string[];
  period: string;
  brand: string;
};

export const portfolioContent = {
  profile: {
    name: "Tidjan Tokpa",
    role: "Développeur fullstack",
    roleSecondary: "Epitech WAC Promo 2027",
    headline:
      "Je construis des SaaS, marketplaces et outils d'automatisation. Backend rigoureux, interfaces modernes, culture produit et infrastructure.",
    summary:
      "Étudiant à la Web@cademie by Epitech, je combine des projets SaaS, Web3 et marketplaces avec Poulpi, mon agence IT de 8 collaborateurs. Mon objectif : transformer chaque ligne de code en compétence fullstack solide et livrer des applications utiles, du build à la production.",
    availability: "Recherche une alternance de 14 mois",
    rhythm: "6 semaines entreprise / 2 semaines formation",
    location: "Paris, France",
  },
  links: {
    github: "https://github.com/Scapeternam",
    linkedin: "https://www.linkedin.com/in/tidjan-tokpa-59a44b401",
    cv: "/Tidjan-Tokpa-CV.pdf",
  },
  media: {
    portraitPhoto: "/tidjan-portrait-photo.jpg",
    portraitIllustration: "/tidjan-portrait-illustration.png",
  },
  contact: {
    email: "tidjan.tokpa@epitech.eu",
    phone: "07-69-96-73-30",
    location: "Paris, France",
    title: "Parlons alternance, SaaS ou automatisation.",
    body: "Disponible pour une alternance fullstack de 14 mois. Intéressé par les projets web, IA, marketplaces, Web3 et outils internes.",
    formspreeId: "",
  },
  stats: [
    { value: "2025 / 2027", label: "Web@cademie by Epitech" },
    { value: "14 mois", label: "Alternance recherchée" },
    { value: "6 / 2", label: "Rythme entreprise / formation" },
    { value: "15+", label: "Projets et produits suivis" },
  ],
  proofPoints: [
    "8 collaborateurs Epitech gérés au sein de Poulpi (missions 500 à 40 000 euros).",
    "5 produits SaaS/marketplaces construits de zéro : CourseCircuit, FrontalierPro, PickUp, Health Mate, Persona.",
    "Infrastructure self-hosted : Homelab 24/7 avec Docker, n8n, Ollama, Qdrant et PostgreSQL.",
  ],
  agency: {
    title: "Poulpi",
    body: "Poulpi structure une offre B2B pour PME : création de sites, refonte, automatisation, intégration IA et SaaS sur mesure. La plateforme sert de vitrine, portfolio, équipe, contact qualifié et back-office de gestion.",
    details: [
      "Organisation en 3 squads : Front, Back, SEO/Ops.",
      "8 collaborateurs Epitech, prospection terrain et cold calling.",
      "Offres de 300 à 40k selon la complexité : branding, sites, automatisation, IA, SaaS.",
      "Scraping prospects avec Playwright, PagesJaunes, Google Maps, détection CMS et export CSV/Excel.",
    ],
  },
  projects: [
    {
      id: "poulpi",
      name: "Poulpi",
      type: "Agence web, IA et automatisation",
      status: "En structuration",
      stack: ["Next.js", "Nuxt", "n8n", "Playwright", "Supabase", "Docker"],
      categories: ["Agence", "Automatisation", "B2B"],
      impact:
        "Agence IT de 8 collaborateurs Epitech offrant sites, automatisation et IA aux PME, cabinets et restaurants.",
      highlights: [
        "3 squads opérationnelles : Front, Back, SEO/Ops.",
        "Prospection automatisée : PagesJaunes, Google Maps, cold calling.",
        "Workflow commercial avec qualification CRM, appels et suivi prospects.",
      ],
    },
    {
      id: "coursecircuit",
      name: "CourseCircuit",
      type: "Marketplace locale phygitale",
      status: "MVP fonctionnel",
      stack: [
        "Nuxt 4",
        "Vue 3",
        "Supabase",
        "PostgreSQL",
        "MapLibre GL",
        "Stripe",
      ],
      categories: ["Marketplace", "SaaS", "Local"],
      impact:
        "Marketplace producteurs, restaurants, relais et consommateurs pour structurer des circuits alimentaires locaux.",
      highlights: [
        "34 tests passés, RLS Sécurité Row-Level, Stripe E2E validé.",
        "Carte interactive MapLibreGL avec géolocalisation producteurs et relais.",
        "6 phases de build, architecture modulaire avec paiement intégré.",
      ],
    },
    {
      id: "frontalierpro",
      name: "FrontalierPro",
      type: "SaaS travailleurs frontaliers France/Suisse",
      status: "En production",
      url: "https://frontalierpro.com",
      stack: ["NestJS", "Vue 3", "Supabase", "PostgreSQL", "Docker", "Stripe"],
      categories: ["SaaS", "B2C", "Data"],
      impact:
        "Plateforme dédiée aux travailleurs frontaliers : informations, démarches et services centralisés entre France et Suisse.",
      highlights: [
        "Modèle SaaS avec abonnements actifs et utilisateurs réels.",
        "Migration ciblée vers NestJS + Supabase + Docker.",
        "Itérations produit basées sur les retours terrain.",
      ],
    },
    {
      id: "pickup",
      name: "PickUp",
      type: "Marketplace services urbains on-demand",
      status: "Fonctionnel non lancé",
      stack: [
        "React 18",
        "Vite",
        "TypeScript",
        "Supabase",
        "Stripe Connect",
      ],
      categories: ["Marketplace", "Mobile-first", "Opérations"],
      impact:
        "Plateforme de services urbains à la demande : livraison, conciergerie et missions terrain.",
      highlights: [
        "19 pages React codées avec Supabase et Stripe Connect.",
        "Parcours marketplace multi-pages et logique de mise en relation.",
        "Notifications, paiement, suivi et exécution opérationnelle.",
      ],
    },
    {
      id: "homelab-teach",
      name: "Homelab Teach",
      type: "Infrastructure self-hosted 24/7",
      status: "En production",
      stack: [
        "Docker",
        "n8n",
        "Ollama",
        "Qdrant",
        "PostgreSQL",
        "Ubuntu Server",
      ],
      categories: ["Infra", "IA", "DevOps"],
      impact:
        "Serveur personnel 24/7 pour automatisations, IA locale, RAG vault Obsidian et prospection.",
      highlights: [
        "Stack : n8n (workflows), Ollama (LLM local), Qdrant (vector DB), PostgreSQL.",
        "RAG sur le vault Obsidian pour réponses contextuelles.",
        "Automatisation Jarvis : pipeline alternance, scraping prospects, scoring IA.",
      ],
    },
    {
      id: "terre-0",
      name: "Terre-0",
      type: "Marketplace aquaponie domestique",
      status: "MVP en construction",
      stack: ["Nuxt", "Vue 3", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
      categories: ["Marketplace", "E-commerce", "Produit"],
      impact:
        "Marketplace de kits aquaponiques domestiques : pédagogie ouverte, configurateur guidé et achat sans jargon pour rendre l'aquaponie accessible au grand public.",
      highlights: [
        "Configurateur de kits par espace, usage, style et budget.",
        "Logique open source : apprendre gratuitement ou acheter prêt à monter.",
        "Parcours d'achat complet avec Stripe et Supabase.",
      ],
    },
    {
      id: "leonida",
      name: "LEONIDA",
      type: "Jeu 3D navigateur — mini-GTA",
      status: "Prototype jouable",
      stack: ["TypeScript", "Vite", "three.js", "WebGL"],
      categories: ["Game", "3D", "WebGL"],
      impact:
        "Mini-GTA 3D à la troisième personne dans le navigateur : ville procédurale, conduite arcade, trafic IA, police et missions, zéro asset externe et une seule dépendance.",
      highlights: [
        "Ville procédurale instanciée : 7 draw calls pour toute la ville.",
        "Simulation pure testable dans Node sans GPU (54 tests).",
        "Conduite arcade, poursuites 5 étoiles, missions et attract mode.",
      ],
    },
    {
      id: "job-aggregator",
      name: "Job Aggregator",
      type: "Plateforme d'offres d'emploi dev",
      status: "Livré — Epitech 2026",
      stack: ["React", "PocketBase", "n8n", "Ollama", "Docker"],
      categories: ["Data", "IA", "Web"],
      impact:
        "Plateforme type LinkedIn pour offres dev : collecte multi-sources, normalisation, scoring IA local et recherche géolocalisée.",
      highlights: [
        "Collecte France Travail et Adzuna, normalisée et dédupliquée.",
        "Scoring 0-100 en règles pondérées locales, zéro API externe.",
        "3 conteneurs Docker, CI/CD et sécurité documentée.",
      ],
    },
    {
      id: "memecoin-intelligence",
      name: "Memecoin Intelligence",
      type: "Console de recherche Solana",
      status: "MVP local fonctionnel",
      stack: ["Vue 3", "Vite", "TypeScript", "Node.js", "SQLite"],
      categories: ["Web3", "Data", "IA"],
      impact:
        "Console de recherche locale qui relie coins, wallets publics, développeurs et actualités par preuves datées. Aucun ordre signé ni exécuté : outil d'analyse uniquement.",
      highlights: [
        "Collecte réelle DEX Screener, RPC Solana et BBC RSS avec provenance.",
        "Replay déterministe des signaux, mode démo isolé du live.",
        "62 tests + 4 E2E, migration vers un moteur Rust planifiée.",
      ],
    },
    {
      id: "wireframes",
      name: "WireFrames",
      type: "Factory d'apps prospects Poulpi",
      status: "Factory opérationnelle",
      stack: ["Nuxt", "Vue 3", "TypeScript", "GSAP", "n8n", "Supabase"],
      categories: ["Agence", "Automatisation", "Factory"],
      impact:
        "Chaîne de production d'applications prospects indépendantes : d'un CSV au site livré, avec offres par paliers, moteur commercial local et déploiement par prospect.",
      highlights: [
        "3 apps pilotes générées depuis CSV, 323 tests et 54 E2E.",
        "Apps indépendantes par prospect : template préservé, hashes vérifiés.",
        "Pipeline n8n vers Supabase self-hosted pour l'ingestion prospects.",
      ],
    },
  ] satisfies PortfolioProject[],
  experience: [
    {
      company: "Poulpi",
      role: "Fondateur — 8 collaborateurs Epitech, missions 500-40k",
      period: "2026 — présent",
      brand: "#0f766e",
    },
    {
      company: "Au Bureau",
      role: "Manager — caisse, flux, équipe, pression opérationnelle",
      period: "2023 — 2025",
      brand: "#b45309",
    },
  ] satisfies TimelineEntry[],
  epitechProjects: [
    {
      company: "Job Aggregator",
      role: "W-YEP-200 — Plateforme offres d'emploi, React + PocketBase + n8n + Ollama + Docker",
      period: "Juillet 2026 — en cours",
      brand: "#2563eb",
    },
    {
      company: "Persona",
      role: "Newsletter tech personnalisée — n8n + Ollama + PostgreSQL + RGPD",
      period: "Juillet 2026",
      brand: "#ea4b71",
    },
    {
      company: "CodeName",
      role: "W-AIA-200 — Prompt engineering, défense LLM anti-injection, attack strategies",
      period: "Juin 2026",
      brand: "#7c3aed",
    },
    {
      company: "CoreLab",
      role: "W-WEB-201 — LMS MERN en équipe (3), React + Express + MongoDB + Docker + CI/CD",
      period: "Mai — Juin 2026",
      brand: "#0891b2",
    },
    {
      company: "VideOps",
      role: "Pipeline CI/CD Space Invaders — TypeScript + Vitest + Cypress + GitHub Actions",
      period: "Avril 2026",
      brand: "#059669",
    },
    {
      company: "CV Generator",
      role: "W-WEB-101 — Générateur CV avec export PDF, PHP + Bootstrap + Dompdf",
      period: "Avril 2026",
      brand: "#d97706",
    },
    {
      company: "Exam SQL",
      role: "Requêtes complexes PostgreSQL, exercices et révision",
      period: "Avril 2026",
      brand: "#336791",
    },
    {
      company: "Séminaire RAN",
      role: "Remise à niveau — SQL Schema, PHP MVC, Docker (4 jours, équipe)",
      period: "Mars 2026",
      brand: "#dc2626",
    },
    {
      company: "Connect In",
      role: "W-WEB-103 — Réseau social interne, Laravel + MySQL + JWT + Docker",
      period: "Mars 2026",
      brand: "#0f766e",
    },
    {
      company: "POPEYE",
      role: "W-DOP-100 — Microservices Docker, Flask + Redis + PostgreSQL + Node.js worker",
      period: "Février 2026",
      brand: "#2496ed",
    },
    {
      company: "Jekyll Portfolio",
      role: "W-POR-100 — Portfolio dev fullstack, Jekyll + GitHub Pages",
      period: "Janvier — Avril 2026",
      brand: "#1f1f1f",
    },
  ] satisfies TimelineEntry[],
  bootcamps: [
    {
      name: "Piscine MERN",
      duration: "5 jours",
      stack: ["MongoDB", "Express", "React", "Node.js"],
      period: "Milieu 2026",
      brand: "#3ECF8E",
    },
    {
      name: "Piscine Java",
      duration: "8 jours",
      stack: ["Java SE", "POO", "Algorithmique"],
      period: "Milieu 2026",
      brand: "#e76f00",
    },
    {
      name: "Piscine Web (WAC)",
      duration: "15 jours",
      stack: ["Shell", "Git", "HTML/CSS", "JavaScript"],
      period: "Début 2026",
      brand: "#41B883",
    },
  ] satisfies BootcampEntry[],
  education: [
    {
      school: "Web@cademie by Epitech",
      degree: "Développement web fullstack — WAC Promo 2027",
      period: "2025 — 2027",
    },
  ] satisfies EducationEntry[],
  certifications: [
    {
      issuer: "IBM SkillsBuild",
      name: "IBM Granite Models for Software Development",
      period: "2026",
    },
    {
      issuer: "IBM SkillsBuild",
      name: "Lab: Troubleshoot Your Code Using IBM Bob",
      period: "2026",
    },
    {
      issuer: "Certification Claude Code",
      name: "Workflow IA, automatisation et product engineering",
      period: "2026",
    },
  ] satisfies CertificationEntry[],
  skillGroups: [
    {
      label: "Frontend",
      skills: [
        "Vue 3",
        "Nuxt",
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Vite",
      ],
    },
    {
      label: "Backend",
      skills: [
        "NestJS",
        "Node.js",
        "Fastify",
        "Express",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Supabase",
        "Redis",
        "PHP",
        "Laravel",
        "Java",
        "REST API",
      ],
    },
    {
      label: "DevOps & Infra",
      skills: [
        "Docker",
        "GitHub Actions",
        "Linux",
        "n8n",
        "VPS",
        "CI/CD",
        "Ubuntu Server",
      ],
    },
    {
      label: "Web3 & IA",
      skills: [
        "Solana",
        "Anchor",
        "Rust",
        "Ollama",
        "RAG",
        "Qdrant",
        "Playwright",
      ],
    },
  ],
  stack: [
    { label: "Vue.js", slug: "vuedotjs", bg: "#41B883", fg: "#ffffff" },
    { label: "Nuxt", slug: "nuxtdotjs", bg: "#00DC82", fg: "#0a0a0a" },
    { label: "React", slug: "react", bg: "#1FB6CB", fg: "#ffffff" },
    { label: "Next.js", slug: "nextdotjs", bg: "#1f1f1f", fg: "#ffffff" },
    { label: "TypeScript", slug: "typescript", bg: "#2F74C0", fg: "#ffffff" },
    { label: "JavaScript", slug: "javascript", bg: "#F7DF1E", fg: "#0a0a0a" },
    { label: "NestJS", slug: "nestjs", bg: "#E0234E", fg: "#ffffff" },
    { label: "Express", slug: "express", bg: "#1f1f1f", fg: "#ffffff" },
    { label: "PHP", slug: "php", bg: "#777BB4", fg: "#ffffff" },
    { label: "Laravel", slug: "laravel", bg: "#FF2D20", fg: "#ffffff" },
    { label: "Java", slug: "openjdk", bg: "#e76f00", fg: "#ffffff" },
    { label: "Supabase", slug: "supabase", bg: "#3ECF8E", fg: "#0a0a0a" },
    { label: "PostgreSQL", slug: "postgresql", bg: "#336791", fg: "#ffffff" },
    { label: "MySQL", slug: "mysql", bg: "#4479A1", fg: "#ffffff" },
    { label: "MongoDB", slug: "mongodb", bg: "#47A248", fg: "#ffffff" },
    { label: "Docker", slug: "docker", bg: "#2496ED", fg: "#ffffff" },
    { label: "n8n", slug: "n8n", bg: "#EA4B71", fg: "#ffffff" },
    { label: "Solana", slug: "solana", bg: "#9945FF", fg: "#ffffff" },
    {
      label: "GitHub Actions",
      slug: "githubactions",
      bg: "#2088FF",
      fg: "#ffffff",
    },
  ] satisfies StackChip[],
  cv: {
    featured: [
      "poulpi",
      "coursecircuit",
      "frontalierpro",
      "pickup",
      "homelab-teach",
      "wireframes",
    ],
    pillStyle: "colored" as const,
    maxBullets: 1,
    cardDensity: "compact" as const,
    photoSize: "moyenne" as const,
    showEpitechProjects: true,
    epitechMax: 6,
  } satisfies CvConfig,
} as const;
