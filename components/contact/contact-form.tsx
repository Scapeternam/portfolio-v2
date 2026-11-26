"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";

import {
  CONTACT_LIMITS,
  CONTACT_REASONS,
  HONEYPOT_FIELD,
  type ContactField,
  type ContactReason,
} from "@/lib/contact";

const DEFAULT_REASON: ContactReason = "alternance";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const INPUT_CLASS =
  "border-foreground/15 bg-foreground/3 focus-ring w-full rounded-xl border px-4 py-2.5 text-[15px] tracking-tight";

export function ContactForm(): ReactNode {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [reason, setReason] = useState<ContactReason>(DEFAULT_REASON);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>(
    {}
  );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    setStatus({ kind: "sending" });
    setErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        errors?: Partial<Record<ContactField, string>>;
      };

      if (response.ok) {
        form.reset();
        setReason(DEFAULT_REASON);
        setStatus({ kind: "sent" });
        return;
      }
      if (result.errors) setErrors(result.errors);
      setStatus({
        kind: "error",
        message: result.error ?? "Vérifiez les champs signalés.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Connexion impossible. Réessayez dans un instant.",
      });
    }
  }

  const sending = status.kind === "sending";
  const placeholder =
    CONTACT_REASONS.find((r) => r.value === reason)?.placeholder ?? "";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <fieldset
        className="flex flex-col gap-2.5"
        aria-describedby={errors.reason ? "contact-reason-error" : undefined}
      >
        <legend className="text-foreground/80 mb-2.5 text-[13px] font-medium tracking-tight">
          Vous m&apos;écrivez pour
        </legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_REASONS.map((option) => (
            <label
              key={option.value}
              className="border-foreground/15 bg-foreground/3 text-foreground/75 has-checked:bg-foreground has-checked:text-background has-checked:border-foreground has-focus-visible:outline-ring inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-[14px] font-medium tracking-tight transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2"
            >
              <input
                type="radio"
                name="reason"
                value={option.value}
                checked={reason === option.value}
                onChange={() => setReason(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.reason ? (
          <p
            id="contact-reason-error"
            className="text-[13px] tracking-tight text-red-700 dark:text-red-400"
          >
            {errors.reason}
          </p>
        ) : null}
      </fieldset>
      <Field
        id="contact-name"
        label="Nom"
        error={errors.name}
        input={
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={CONTACT_LIMITS.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={INPUT_CLASS}
          />
        }
      />
      <Field
        id="contact-email"
        label="Email"
        error={errors.email}
        input={
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={CONTACT_LIMITS.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={INPUT_CLASS}
          />
        }
      />
      <Field
        id="contact-message"
        label="Message"
        error={errors.message}
        input={
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            placeholder={placeholder}
            minLength={CONTACT_LIMITS.messageMin}
            maxLength={CONTACT_LIMITS.messageMax}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            className={`${INPUT_CLASS} resize-y`}
          />
        }
      />

      {/* Champ piège : caché aux humains et aux lecteurs d'écran. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Ne pas remplir</label>
        <input
          id="contact-website"
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="text-foreground/70 text-[13px] leading-normal tracking-tight">
        Votre nom, votre email et votre message servent uniquement à vous
        répondre. Ils ne sont ni revendus ni utilisés pour de la prospection.{" "}
        <Link href="/confidentialite" className="focus-ring underline">
          Politique de confidentialité
        </Link>
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="focus-ring bg-foreground text-background hover:bg-foreground/90 inline-flex h-11 cursor-pointer items-center rounded-xl px-5 text-sm font-medium transition-colors disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? "Envoi…" : "Envoyer le message"}
        </button>
        <p
          role="status"
          aria-live="polite"
          className="text-[14px] tracking-tight"
        >
          {status.kind === "sent" ? (
            <span className="text-green-700 dark:text-green-400">
              Message envoyé. Je vous réponds au plus vite.
            </span>
          ) : status.kind === "error" ? (
            <span className="text-red-700 dark:text-red-400">
              {status.message}
            </span>
          ) : null}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  input,
}: {
  id: string;
  label: string;
  error: string | undefined;
  input: ReactNode;
}): ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-foreground/80 text-[13px] font-medium tracking-tight"
      >
        {label}
      </label>
      {input}
      {error ? (
        <p
          id={`${id}-error`}
          className="text-[13px] tracking-tight text-red-700 dark:text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
