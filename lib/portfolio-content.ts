export type PortfolioProject = {
  id: string;
  name: string;
  type: string;
  status: string;
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
    role: "Développeur fullstack — Epitech WAC Promo 2027",
    headline:
      "Je construis des SaaS, marketplaces et outils d'automatisation. Backend rigoureux, interfaces modernes, culture produit et infrastructure.",
    summary:
      "Étudiant à la Web@cademie by Epitech, je combine des projets SaaS, Web3 et marketplaces avec une agence IT de 8 collaborateurs. Mon objectif : transformer chaque ligne de code en compétence fullstack solide et livrer des applications utiles, du build à la production.",
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
    "8 collaborateurs Epitech gérés au sein de l'agence IT Teach (missions 500 à 40 000 euros).",
    "5 produits SaaS/marketplaces construits de zéro : CourseCircuit, FrontalierPro, PickUp, Health Mate, Persona.",
    "Infrastructure self-hosted : Homelab 24/7 avec Docker, n8n, Ollama, Qdrant et PostgreSQL.",
  ],
  agency: {
    title: "Agence IT Teach / Octopus",
    body: "L'agence structure une offre B2B pour PME : création de sites, refonte, automatisation, intégration IA et SaaS sur mesure. Octopus sert de vitrine, portfolio, équipe, contact qualifié et back-office de gestion.",
    details: [
      "Organisation en 3 squads : Front, Back, SEO/Ops.",
      "8 collaborateurs Epitech, prospection terrain et cold calling.",
      "Offres de 300 à 40k selon la complexité : branding, sites, automatisation, IA, SaaS.",
      "Scraping prospects avec Playwright, PagesJaunes, Google Maps, detection CMS et export CSV/Excel.",
    ],
  },
  projects: [
    {
      id: "agence-it-teach",
      name: "Agence IT Teach",
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
        "34 tests passés, RLS Securite Row-Level, Stripe E2E valide.",
        "Carte interactive MapLibreGL avec géolocalisation producteurs et relais.",
        "6 phases de build, architecture modulaire avec paiement intégré.",
      ],
    },
    {
      id: "frontalierpro",
      name: "FrontalierPro",
      type: "SaaS travailleurs frontaliers France/Suisse",
      status: "En production",
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
      status: "Fonctionnel non lance",
      stack: [
        "React 18",
        "Vite",
        "TypeScript",
        "Supabase",
        "Stripe Connect",
      ],
      categories: ["Marketplace", "Mobile-first", "Operations"],
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
  ] satisfies PortfolioProject[],
  experience: [
    {
      company: "Agence IT Teach",
      role: "Fondateur — 8 collaborateurs Epitech, missions 500-40k",
      period: "2026 — present",
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
      company: "Seminaire RAN",
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
      period: "Fevrier 2026",
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
    {
      school: "Certification Claude Code",
      degree: "Workflow IA, automatisation et product engineering",
      period: "2026",
    },
  ] satisfies EducationEntry[],
  skillGroups: [
    {
      label: "Frontend",
      skills: [
        "Vue 3",
        "Nuxt",
        "React",
        "Next.js",
        "TypeScript",
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
        "PostgreSQL",
        "Supabase",
        "Redis",
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
    { label: "NestJS", slug: "nestjs", bg: "#E0234E", fg: "#ffffff" },
    { label: "Supabase", slug: "supabase", bg: "#3ECF8E", fg: "#0a0a0a" },
    { label: "PostgreSQL", slug: "postgresql", bg: "#336791", fg: "#ffffff" },
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
      "agence-it-teach",
      "coursecircuit",
      "frontalierpro",
      "pickup",
    ],
    pillStyle: "colored" as const,
    maxBullets: 2,
    cardDensity: "compact" as const,
    photoSize: "moyenne" as const,
    showEpitechProjects: true,
    epitechMax: 6,
  } satisfies CvConfig,
} as const;
