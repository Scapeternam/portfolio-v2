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

export const portfolioContent = {
  profile: {
    name: "Tidjan Tokpa",
    role: "Developpeur web fullstack en alternance",
    headline:
      "Je construis des produits web utiles en combinant backend rigoureux, interfaces modernes, automatisation IA et culture produit.",
    summary:
      "Developpeur a la Web@cademie by Epitech, avec une experience terrain en management et une culture MVP/no-code devenue culture produit. Je cherche a transformer cette trajectoire en competence fullstack solide: concevoir, livrer, tester et ameliorer des applications utiles.",
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
    body: "Disponible pour une alternance fullstack de 14 mois et pour echanger sur des projets web, IA, marketplaces ou outils internes.",
  },
  stats: [
    { value: "2025 / 2027", label: "Web@cademie by Epitech" },
    { value: "14 mois", label: "Alternance recherchee" },
    { value: "6 / 2", label: "Rythme entreprise / formation" },
    { value: "6+", label: "Produits et projets suivis" },
  ],
  proofPoints: [
    "Experience operationnelle en environnement a haute pression chez Au Bureau.",
    "Projets Epitech livres en cycles courts avec architecture MVC, API REST et travail GitHub.",
    "Projets personnels orientes SaaS, IA, marketplaces, agence tech et operations terrain.",
  ],
  agency: {
    title: "Teach Agency / Octopus",
    body: "L'agence structure une offre B2B pour PME: creation de sites, refonte, automatisation, integration IA et SaaS sur mesure. Octopus sert de vitrine, portfolio, equipe, contact qualifie et back-office de gestion.",
    details: [
      "Organisation en 3 squads: Front, Back, SEO/Ops.",
      "8 collaborateurs Epitech, prospection terrain et cold calling.",
      "Offres de 300 a 40k selon la complexite: branding, sites, automatisation, IA, SaaS.",
      "Scraping prospects avec Playwright, PagesJaunes, Google Maps, detection CMS et export CSV/Excel.",
    ],
  },
  projects: [
    {
      id: "teach-agency",
      name: "Agence IT Teach",
      type: "Agence web, IA et automatisation",
      status: "Go-to-market en structuration",
      stack: ["Next.js", "Nuxt/Vue", "n8n", "Make", "Claude API", "Playwright"],
      categories: ["Agency", "AI", "Automation"],
      impact:
        "Offre agence pour aider PME, restaurants, cabinets et artisans a moderniser leur presence web et automatiser leurs operations.",
      highlights: [
        "Catalogue: sites vitrines, e-commerce, rebranding, chatbots, RAG et SaaS.",
        "Prospection ciblee: PagesJaunes, Google Maps, GoDaddy/Wix/Squarespace.",
        "Workflow commercial cadence avec qualification, appels et suivi prospects.",
      ],
    },
    {
      id: "trash-spotter",
      name: "Trash Spotter",
      type: "Marketplace anti-depots sauvages",
      status: "MVP planifie / en reserve",
      stack: [
        "Flutter",
        "Supabase",
        "PostGIS",
        "Fastify",
        "TypeScript",
        "Stripe Connect",
      ],
      categories: ["Marketplace", "Mobile", "Operations"],
      impact:
        "Marketplace P2P/B2G pour signaler un depot sauvage, financer une prime en sequestre et payer un nettoyeur apres validation humaine.",
      highlights: [
        "Parcours rapporteur/nettoyeur avec photos, GPS, justificatif decheterie et validation bipartite.",
        "Architecture Supabase/PostGIS, RLS, state machine PostgreSQL et audit log.",
        "Paiement en centimes via Stripe Connect: escrow, capture, transfer, refund et webhooks.",
      ],
    },
    {
      id: "frontalierpro",
      name: "FrontalierPro",
      type: "SaaS frontaliers France / Suisse",
      status: "MVP live et migration cible",
      stack: ["NestJS", "Vue 3", "PostgreSQL", "Docker", "Railway", "Stripe"],
      categories: ["SaaS", "Data", "B2C"],
      impact:
        "Outil dedie aux travailleurs frontaliers pour centraliser les informations, parcours et services utiles entre France et Suisse.",
      highlights: [
        "MVP live utilise comme preuve terrain.",
        "Migration cible vers une architecture NestJS, Supabase, Docker et Vue.",
        "Modele SaaS oriente utilisateurs reels et iterations produit.",
      ],
    },
    {
      id: "health-mate",
      name: "Health Mate",
      type: "Produit IA sante & abonnement",
      status: "Prototype audite",
      stack: [
        "Next.js",
        "Fastify",
        "Claude API",
        "Stripe",
        "Docker",
        "PostgreSQL",
      ],
      categories: ["AI", "SaaS", "Health"],
      impact:
        "Prototype fullstack autour de l'accompagnement sante, combinant IA, paiement et architecture API separee.",
      highlights: [
        "Separation front Next.js et API Fastify.",
        "Integration IA et Stripe comme coeur produit.",
        "Audit technique realise avant toute presentation production.",
      ],
    },
    {
      id: "coursecircuit",
      name: "CourseCircuit",
      type: "Marketplace locale phygitale",
      status: "MVP fonctionnel",
      stack: ["Nuxt", "Vue 3", "Supabase", "PostgreSQL", "MapLibre", "Stripe"],
      categories: ["Marketplace", "Data", "Local"],
      impact:
        "Marketplace producteurs, restaurants, relais et consommateurs pour structurer des circuits locaux avec carte, paiement et workflow metier.",
      highlights: [
        "MVP boucle en plusieurs phases avec parcours principaux couverts.",
        "Carte interactive, Supabase/Postgres et tests Stripe en environnement test.",
        "Approche terrain pour connecter producteurs, relais et clients.",
      ],
    },
    {
      id: "pickup",
      name: "PickUp",
      type: "Marketplace services urbains",
      status: "Produit fonctionnel non lance",
      stack: [
        "React",
        "Vite",
        "TypeScript",
        "Supabase",
        "Stripe Connect",
        "Twilio",
      ],
      categories: ["Marketplace", "Mobile-first", "Operations"],
      impact:
        "Plateforme de services urbains a la demande: livraison, conciergerie, missions terrain et coordination operationnelle.",
      highlights: [
        "Architecture React/Vite avec Supabase et Stripe Connect.",
        "Parcours marketplace multi-pages et logique de mise en relation.",
        "Orientation operations: notifications, paiement, suivi et execution terrain.",
      ],
    },
  ] satisfies PortfolioProject[],
  experience: [
    {
      company: "Connect In",
      role: "Projet Epitech - Laravel, MVC, API et binome GitHub",
      period: "2026",
      brand: "#0f766e",
    },
    {
      company: "My Cinema",
      role: "Projet Epitech - PHP 8.3 natif, POO, API et back-office",
      period: "2026",
      brand: "#7c3aed",
    },
    {
      company: "Au Bureau",
      role: "Manager - caisse, flux, process, equipe et pression operationnelle",
      period: "2023 - 2025",
      brand: "#b45309",
    },
  ] satisfies TimelineEntry[],
  education: [
    {
      school: "Web@cademie by Epitech",
      degree: "Developpement web fullstack",
      period: "2025 - 2027",
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
      skills: ["Vue.js", "Nuxt", "React", "Next.js", "Tailwind", "Vite"],
    },
    {
      label: "Backend",
      skills: ["PHP", "Laravel", "Node.js", "NestJS", "Fastify", "REST API"],
    },
    {
      label: "Data & Infra",
      skills: [
        "PostgreSQL",
        "PostGIS",
        "MySQL",
        "Supabase",
        "Docker",
        "GitHub CI/CD",
      ],
    },
    {
      label: "IA & Produit",
      skills: ["Claude Code", "n8n", "Make", "MVP", "Lean Startup", "Audit"],
    },
  ],
  stack: [
    { label: "Vue.js", slug: "vuedotjs", bg: "#41B883", fg: "#ffffff" },
    { label: "Nuxt", slug: "nuxtdotjs", bg: "#00DC82", fg: "#0a0a0a" },
    { label: "React", slug: "react", bg: "#1FB6CB", fg: "#ffffff" },
    { label: "Next.js", slug: "nextdotjs", bg: "#1f1f1f", fg: "#ffffff" },
    { label: "TypeScript", slug: "typescript", bg: "#2F74C0", fg: "#ffffff" },
    { label: "NestJS", slug: "nestjs", bg: "#E0234E", fg: "#ffffff" },
    { label: "Laravel", slug: "laravel", bg: "#FF2D20", fg: "#ffffff" },
    { label: "Supabase", slug: "supabase", bg: "#3ECF8E", fg: "#0a0a0a" },
    { label: "PostgreSQL", slug: "postgresql", bg: "#336791", fg: "#ffffff" },
    { label: "PostGIS", slug: "postgresql", bg: "#0f766e", fg: "#ffffff" },
    { label: "Docker", slug: "docker", bg: "#2496ED", fg: "#ffffff" },
    {
      label: "GitHub Actions",
      slug: "githubactions",
      bg: "#2088FF",
      fg: "#ffffff",
    },
  ] satisfies StackChip[],
} as const;
