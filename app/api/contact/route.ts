import { NextResponse } from "next/server";

import { isHoneypotFilled, reasonLabel, validateContact } from "@/lib/contact";
import { createRateLimiter } from "@/lib/rate-limit";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";

// 5 messages par IP toutes les 10 minutes.
const limiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 });

export async function POST(request: Request): Promise<NextResponse> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limiter.isLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de messages envoyés. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Un robot a rempli le champ piège : on répond comme si tout allait bien,
  // sans rien envoyer, pour ne pas lui apprendre à contourner le piège.
  if (isHoneypotFilled(body)) return NextResponse.json({ ok: true });

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("contact: RESEND_API_KEY ou CONTACT_TO_EMAIL manquant");
    return NextResponse.json(
      { error: "Le formulaire est indisponible pour le moment." },
      { status: 503 }
    );
  }

  const { reason, name, email, message } = result.data;
  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [to],
        reply_to: [email],
        subject: `Portfolio [${reasonLabel(reason)}] : message de ${name}`,
        text: `${message}\n\n${name} <${email}>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`contact: Resend a répondu ${response.status}`);
      return NextResponse.json(
        { error: "L'envoi a échoué. Réessayez plus tard." },
        { status: 502 }
      );
    }
  } catch {
    console.error("contact: Resend injoignable");
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez plus tard." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
