import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ContactForm } from "@/components/contact/contact-form";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import { portfolioContent } from "@/lib/portfolio-content";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contacter Tidjan Tokpa, développeur web fullstack : offre d'alternance, projet à construire ou échange autour d'un projet.",
  path: "/contact",
});

export default function ContactPage(): ReactNode {
  const { contact } = portfolioContent;

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-160 px-6 pt-44 pb-24 sm:px-10 sm:pt-56">
        <FadeIn delay={0.5}>
          <div className="border-foreground/5 bg-foreground/1.5 dark:bg-foreground/3 rounded-4xl border p-8 sm:p-12">
            <h1 className="text-foreground font-serif text-[1.75rem] font-medium tracking-tight sm:text-[2rem]">
              {contact.title}
            </h1>
            <p className="text-foreground/70 mt-3 mb-8 text-[16px] leading-normal tracking-tight">
              Une offre d&apos;alternance, un projet à construire ensemble ou
              simplement l&apos;envie d&apos;échanger autour d&apos;une idée :
              choisissez l&apos;objet de votre message et écrivez-moi. Vous
              pouvez aussi m&apos;écrire directement à{" "}
              <a
                href={`mailto:${contact.email}`}
                className="focus-ring underline"
              >
                {contact.email}
              </a>
              .
            </p>
            <ContactForm />
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
