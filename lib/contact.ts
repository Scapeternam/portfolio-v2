export const CONTACT_REASONS = [
  {
    value: "alternance",
    label: "Une offre d'alternance",
    placeholder: "L'entreprise, le poste, le rythme et la date de début…",
  },
  {
    value: "projet",
    label: "Un projet à construire",
    placeholder: "Ce que vous voulez construire, pour qui, et vos délais…",
  },
  {
    value: "echange",
    label: "Échanger autour d'un projet",
    placeholder:
      "Le projet qui vous intéresse et ce dont vous aimeriez parler…",
  },
  {
    value: "autre",
    label: "Autre chose",
    placeholder: "Votre message…",
  },
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number]["value"];

export type ContactMessage = {
  reason: ContactReason;
  name: string;
  email: string;
  message: string;
};

export function reasonLabel(reason: ContactReason): string {
  return CONTACT_REASONS.find((r) => r.value === reason)?.label ?? reason;
}

function isReason(value: string): value is ContactReason {
  return CONTACT_REASONS.some((r) => r.value === value);
}

export type ContactField = keyof ContactMessage;

export type ContactValidation =
  | { ok: true; data: ContactMessage }
  | { ok: false; errors: Partial<Record<ContactField, string>> };

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  messageMax: 5000,
} as const;

// Volontairement simple : le vrai contrôle est la réponse de l'expéditeur.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Vérifie les champs du formulaire de contact. Ne garde que motif, nom, email
 * et message : tout autre champ reçu est ignoré (pas de collecte inutile).
 */
export function validateContact(input: unknown): ContactValidation {
  const source =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  const reason = readString(source, "reason");
  const data: ContactMessage = {
    reason: isReason(reason) ? reason : "autre",
    name: readString(source, "name"),
    email: readString(source, "email"),
    message: readString(source, "message"),
  };

  const errors: Partial<Record<ContactField, string>> = {};

  if (!isReason(reason)) errors.reason = "Choisissez l'objet de votre message.";

  if (!data.name) errors.name = "Indiquez votre nom.";
  else if (data.name.length > CONTACT_LIMITS.name)
    errors.name = `${CONTACT_LIMITS.name} caractères au maximum.`;

  if (
    !EMAIL_PATTERN.test(data.email) ||
    data.email.length > CONTACT_LIMITS.email
  )
    errors.email = "Indiquez une adresse email valide.";

  if (data.message.length < CONTACT_LIMITS.messageMin)
    errors.message = `${CONTACT_LIMITS.messageMin} caractères au minimum.`;
  else if (data.message.length > CONTACT_LIMITS.messageMax)
    errors.message = `${CONTACT_LIMITS.messageMax} caractères au maximum.`;

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, data };
}

/** Champ piège invisible : un humain le laisse vide, un robot le remplit. */
export const HONEYPOT_FIELD = "website";

export function isHoneypotFilled(input: unknown): boolean {
  if (typeof input !== "object" || input === null) return false;
  const value = (input as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim() !== "";
}
