import type { Metadata } from "next";
import type { ReactNode } from "react";

import { createMetadata } from "@/lib/metadata";
import { portfolioContent } from "@/lib/portfolio-content";

export const metadata: Metadata = createMetadata({
  title: "Politique de confidentialité",
  description:
    "Données collectées par le formulaire de contact du portfolio de Tidjan Tokpa, finalité, durée de conservation et droits.",
  path: "/confidentialite",
});

// Source éditable : legal/confidentialite.md (à garder identique à cette page).
export default function PrivacyPage(): ReactNode {
  const { profile, contact } = portfolioContent;

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <article className="text-foreground/75 [&_h2]:text-foreground mx-auto flex w-full max-w-160 flex-col gap-4 px-6 pt-44 pb-24 text-[15px] leading-relaxed tracking-tight sm:px-10 sm:pt-56 [&_h2]:mt-6 [&_h2]:text-[17px] [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:pl-5">
        <h1 className="text-foreground font-serif text-[1.75rem] font-medium">
          Politique de confidentialité
        </h1>

        <h2>1. Données collectées</h2>
        <p>
          Ce site ne dépose aucun cookie. Le formulaire de contact collecte
          uniquement les données que vous saisissez :
        </p>
        <ul>
          <li>
            l&apos;objet de votre message (alternance, projet, échange…) ;
          </li>
          <li>votre nom ;</li>
          <li>votre adresse email ;</li>
          <li>votre message.</li>
        </ul>

        <h2>2. Mesure d&apos;audience</h2>
        <p>
          Pour savoir si le site est consulté, j&apos;utilise{" "}
          <strong>Vercel Web Analytics</strong>, sans cookie. Il enregistre de
          façon anonyme la page vue, le site d&apos;où vous venez, le pays et la
          ville, le navigateur, le système et le type d&apos;appareil. Votre
          visite est reconnue par une empreinte calculée à partir de la requête,
          supprimée après 24 heures : elle ne permet ni de vous identifier ni de
          vous suivre sur d&apos;autres sites. Je ne consulte que des
          statistiques globales.
        </p>

        <h2>3. Finalité du formulaire</h2>
        <p>
          Ces données servent uniquement à vous répondre. Elles ne sont ni
          revendues, ni utilisées pour de la prospection, ni enregistrées dans
          une base de données.
        </p>

        <h2>4. Destinataires et sous-traitants</h2>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> (États-Unis) héberge le site, traite
            l&apos;envoi du formulaire et fournit la mesure d&apos;audience.
          </li>
          <li>
            <strong>Resend</strong> (États-Unis) transmet le message par email
            jusqu&apos;à ma boîte de réception.
          </li>
        </ul>

        <h2>5. Durée de conservation</h2>
        <p>
          Le message est conservé dans ma boîte email le temps de notre échange,
          puis supprimé au plus tard 12 mois après le dernier message.
        </p>

        <h2>6. Vos droits</h2>
        <p>
          Conformément au RGPD, vous pouvez demander l&apos;accès, la
          rectification ou l&apos;effacement de vos données, ou vous opposer à
          leur traitement, en écrivant à{" "}
          <a href={`mailto:${contact.email}`} className="focus-ring underline">
            {contact.email}
          </a>
          .
        </p>

        <h2>7. Responsable du traitement</h2>
        <p>
          {profile.name}, {contact.location}.
        </p>

        <p className="text-foreground/60 mt-6 text-[13px]">
          Dernière mise à jour : 26 novembre 2026
        </p>
      </article>
    </main>
  );
}
