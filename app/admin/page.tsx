"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { portfolioContent } from "@/lib/portfolio-content";

const ADMIN_PASSWORD = "bento";

type CvSettings = {
  featured: string[];
  pillStyle: "mono" | "colored";
  maxBullets: number;
  cardDensity: "compact" | "normal" | "spacieux";
  showEpitechProjects: boolean;
  epitechMax: number;
};

const defaultCv: CvSettings = {
  featured: [...portfolioContent.cv.featured],
  pillStyle: portfolioContent.cv.pillStyle,
  maxBullets: portfolioContent.cv.maxBullets,
  cardDensity: portfolioContent.cv.cardDensity,
  showEpitechProjects: portfolioContent.cv.showEpitechProjects,
  epitechMax: portfolioContent.cv.epitechMax,
};

export default function AdminPage(): ReactNode {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cvSettings, setCvSettings] = useState<CvSettings>(defaultCv);

  function handleLogin(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Mot de passe incorrect.");
    }
  }

  const allProjectIds = portfolioContent.projects.map((p) => p.id);

  function toggleFeaturedProject(id: string): void {
    setCvSettings((prev) => {
      const exists = prev.featured.includes(id);
      return {
        ...prev,
        featured: exists
          ? prev.featured.filter((fid) => fid !== id)
          : [...prev.featured, id],
      };
    });
    setSaved(false);
  }

  function updateCvField<K extends keyof CvSettings>(
    field: K,
    value: CvSettings[K]
  ): void {
    setCvSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSave(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cvSettings),
      });
      if (res.ok) setSaved(true);
    } catch {
      setError("Erreur lors de la sauvegarde.");
    } finally {
      setLoading(false);
    }
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="border-foreground/10 bg-background w-full max-w-md rounded-2xl border p-8"
        >
          <h1 className="text-foreground font-serif text-[1.5rem] font-medium tracking-tight">
            Admin — Portfolio
          </h1>
          <p className="text-foreground/55 mt-2 text-[14px] tracking-tight">
            Accès réservé au propriétaire du portfolio.
          </p>
          <label className="mt-6 flex flex-col gap-2">
            <span className="text-foreground/70 text-[13px] font-medium tracking-tight">
              Mot de passe
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-foreground/10 bg-foreground/3 focus-ring rounded-xl border px-4 py-2.5 text-[15px] tracking-tight outline-none"
              autoFocus
            />
          </label>
          {error ? (
            <p className="mt-3 text-[13px] tracking-tight text-red-500">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="focus-ring bg-foreground text-background hover:bg-foreground/90 mt-5 w-full cursor-pointer rounded-xl px-4 py-2.5 text-[14px] font-medium tracking-tight transition-colors"
          >
            Se connecter
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56">
      <h1 className="text-foreground font-serif text-[1.75rem] font-medium tracking-tight">
        Dashboard Admin
      </h1>
      <p className="text-foreground/55 mt-2 text-[14px] tracking-tight">
        Configuration du CV et du portfolio.
      </p>

      <form onSubmit={handleSave} className="mt-8 flex flex-col gap-10">
        {/* CV Section */}
        <section className="border-foreground/10 rounded-2xl border p-6">
          <h2 className="text-foreground text-[15px] font-semibold tracking-tight">
            Configuration CV
          </h2>
          <p className="text-foreground/55 mt-1 text-[13px] tracking-tight">
            Sélectionne les projets à afficher sur le CV et personnalise le rendu.
          </p>

          <div className="mt-5 flex flex-col gap-5">
            <div>
              <p className="text-foreground/70 text-[13px] font-medium tracking-tight mb-2.5">
                Projets affichés sur le CV
              </p>
              <div className="flex flex-wrap gap-2">
                {allProjectIds.map((id) => {
                  const project = portfolioContent.projects.find((p) => p.id === id);
                  const checked = cvSettings.featured.includes(id);
                  return (
                    <label
                      key={id}
                      className={`border-foreground/10 focus-ring inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-1.5 text-[13px] font-medium tracking-tight transition-colors ${
                        checked
                          ? "bg-foreground text-background border-foreground"
                          : "bg-foreground/3 text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFeaturedProject(id)}
                        className="sr-only"
                      />
                      {project?.name ?? id}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-foreground/55 text-[12px] font-medium tracking-tight">
                  Style des compétences
                </span>
                <select
                  value={cvSettings.pillStyle}
                  onChange={(e) =>
                    updateCvField("pillStyle", e.target.value as "mono" | "colored")
                  }
                  className="border-foreground/10 bg-foreground/3 focus-ring rounded-xl border px-4 py-2.5 text-[15px] tracking-tight outline-none"
                >
                  <option value="colored">Couleurs (brand)</option>
                  <option value="mono">Monochrome</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-foreground/55 text-[12px] font-medium tracking-tight">
                  Points cles max par projet
                </span>
                <select
                  value={cvSettings.maxBullets}
                  onChange={(e) =>
                    updateCvField("maxBullets", Number(e.target.value))
                  }
                  className="border-foreground/10 bg-foreground/3 focus-ring rounded-xl border px-4 py-2.5 text-[15px] tracking-tight outline-none"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-foreground/55 text-[12px] font-medium tracking-tight">
                  Densité des cartes projet
                </span>
                <select
                  value={cvSettings.cardDensity}
                  onChange={(e) =>
                    updateCvField(
                      "cardDensity",
                      e.target.value as "compact" | "normal" | "spacieux"
                    )
                  }
                  className="border-foreground/10 bg-foreground/3 focus-ring rounded-xl border px-4 py-2.5 text-[15px] tracking-tight outline-none"
                >
                  <option value="compact">Compact</option>
                  <option value="normal">Normal</option>
                  <option value="spacieux">Spacieux</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-foreground/55 text-[12px] font-medium tracking-tight">
                  Projets Epitech visibles
                </span>
                <select
                  value={cvSettings.showEpitechProjects ? "oui" : "non"}
                  onChange={(e) =>
                    updateCvField(
                      "showEpitechProjects",
                      e.target.value === "oui"
                    )
                  }
                  className="border-foreground/10 bg-foreground/3 focus-ring rounded-xl border px-4 py-2.5 text-[15px] tracking-tight outline-none"
                >
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-foreground/55 text-[12px] font-medium tracking-tight">
                  Nombre max projets Epitech
                </span>
                <select
                  value={cvSettings.epitechMax}
                  onChange={(e) =>
                    updateCvField("epitechMax", Number(e.target.value))
                  }
                  className="border-foreground/10 bg-foreground/3 focus-ring rounded-xl border px-4 py-2.5 text-[15px] tracking-tight outline-none"
                >
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={11}>Tous (11)</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        {saved ? (
          <p className="text-[13px] tracking-tight text-green-500">
            Sauvegarde réussie. Le CV reflète maintenant ces paramètres.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring bg-foreground text-background hover:bg-foreground/90 w-fit cursor-pointer rounded-xl px-6 py-2.5 text-[14px] font-medium tracking-tight transition-colors disabled:opacity-50"
        >
          {loading ? "Sauvegarde..." : "Sauvegarder la configuration"}
        </button>
      </form>
    </main>
  );
}
