import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

import { ContactCardCtas } from "./contact-card-ctas";
import { FadeIn } from "@/components/ui/motion-primitives";
import { portfolioContent } from "@/lib/portfolio-content";

export function ContactCard(): ReactNode {
  const { contact, links, profile } = portfolioContent;

  return (
    <section className="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <FadeIn>
        <div className="border-foreground/8 bg-background relative w-full overflow-hidden rounded-4xl border p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="text-foreground font-serif text-[2.25rem] leading-[1.05] font-medium tracking-tight sm:text-[2.75rem] lg:text-[3.25rem]">
                  {contact.title}
                </h2>
                <p className="text-foreground/65 mb-6 max-w-[29ch] text-[18px] leading-[1.4] tracking-tight sm:text-[22px]">
                  {contact.body}
                </p>
                <ContactCardCtas />
              </div>

              <div className="border-foreground/8 flex flex-col justify-center gap-6 border-t pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
                <div className="flex items-center gap-3">
                  <SocialIcon
                    href={`mailto:${contact.email}`}
                    label="Email"
                    lucideIcon={Mail}
                  />
                  <SocialIcon
                    href={links.linkedin}
                    label="LinkedIn"
                    lucideIcon={Linkedin}
                  />
                  <SocialIcon
                    href={links.github}
                    label="GitHub"
                    lucideIcon={Github}
                  />
                </div>

                <div className="text-foreground/65 flex flex-col gap-3 text-[13px] tracking-tight sm:text-[14px]">
                  <ContactLine icon={Mail} value={contact.email} />
                  <ContactLine icon={Phone} value={contact.phone} />
                  <ContactLine icon={MapPin} value={contact.location} />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-foreground/70 text-[13px] tracking-tight">
                    2026 &copy; {profile.name}
                  </p>
                  <p className="text-foreground/45 text-[12px] tracking-tight">
                    Portfolio Next.js personnalise avec React Bits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  lucideIcon: LucideIcon,
}: {
  href: string;
  label: string;
  lucideIcon?: ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
}): ReactNode {
  const isExternal = href.startsWith("http");
  const props = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Link
      href={href}
      aria-label={label}
      className="border-foreground/8 hover:border-foreground/15 focus-ring bg-background text-foreground/70 hover:text-foreground inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors"
      {...props}
    >
      {LucideIcon ? (
        <LucideIcon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      ) : null}
    </Link>
  );
}

function ContactLine({
  icon: Icon,
  value,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  value: string;
}): ReactNode {
  return (
    <span className="flex items-center gap-2">
      <Icon
        className="text-foreground/45 h-4 w-4 shrink-0"
        strokeWidth={2.25}
        aria-hidden="true"
      />
      <span className="min-w-0 break-words">{value}</span>
    </span>
  );
}
