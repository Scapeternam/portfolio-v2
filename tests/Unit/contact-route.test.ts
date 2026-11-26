import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/contact/route";

const valid = {
  reason: "projet",
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Bonjour, une alternance vous intéresse ?",
};

let ipCounter = 0;

function post(body: unknown, ip = `10.0.0.${++ipCounter}`): Promise<Response> {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );
}

describe("POST /api/contact", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "me@example.com");
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    fetchMock.mockReset();
  });

  it("sends the message through Resend with the key kept server-side", async () => {
    const response = await post(valid);

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "Bearer re_test"
    );
    const sent = JSON.parse(init.body as string) as Record<string, unknown>;
    expect(sent.to).toEqual(["me@example.com"]);
    expect(sent.reply_to).toEqual(["ada@example.com"]);
    expect(sent.subject).toBe(
      "Portfolio [Un projet à construire] : message de Ada Lovelace"
    );
  });

  it("returns field errors without calling Resend", async () => {
    const response = await post({ ...valid, email: "faux" });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      errors: { email: "Indiquez une adresse email valide." },
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a body that is not JSON", async () => {
    expect((await post("pas du json")).status).toBe(400);
  });

  it("pretends success for bots that fill the trap field", async () => {
    const response = await post({ ...valid, website: "http://spam.example" });

    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("answers 503 when the server is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    expect((await post(valid)).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("answers 502 when Resend fails", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 500 }));

    expect((await post(valid)).status).toBe(502);
  });

  it("limits one IP to 5 messages", async () => {
    const statuses = [];
    for (let i = 0; i < 6; i++)
      statuses.push((await post(valid, "10.9.9.9")).status);

    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
  });
});
