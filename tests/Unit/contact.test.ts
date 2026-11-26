import { describe, expect, it } from "vitest";

import { isHoneypotFilled, validateContact } from "@/lib/contact";
import { createRateLimiter } from "@/lib/rate-limit";

const valid = {
  reason: "projet",
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Bonjour, une alternance vous intéresse ?",
};

describe("validateContact", () => {
  it("accepts a complete message and trims it", () => {
    const result = validateContact({ ...valid, name: "  Ada Lovelace  " });
    expect(result).toEqual({ ok: true, data: valid });
  });

  it("keeps only name, email and message", () => {
    const result = validateContact({ ...valid, phone: "0600000000" });
    expect(result.ok && Object.keys(result.data)).toEqual([
      "reason",
      "name",
      "email",
      "message",
    ]);
  });

  it("reports every invalid field", () => {
    const result = validateContact({
      name: "",
      email: "pas-un-email",
      message: "court",
    });
    expect(result.ok).toBe(false);
    expect(!result.ok && Object.keys(result.errors).sort()).toEqual([
      "email",
      "message",
      "name",
      "reason",
    ]);
  });

  it("rejects an unknown reason", () => {
    const result = validateContact({ ...valid, reason: "spam" });
    expect(!result.ok && Object.keys(result.errors)).toEqual(["reason"]);
  });

  it("rejects a message that is too long", () => {
    const result = validateContact({ ...valid, message: "a".repeat(5001) });
    expect(!result.ok && result.errors.message).toBeTruthy();
  });

  it("rejects input that is not an object", () => {
    expect(validateContact(null).ok).toBe(false);
    expect(validateContact("texte").ok).toBe(false);
  });
});

describe("isHoneypotFilled", () => {
  it("flags a filled trap field only", () => {
    expect(isHoneypotFilled({ ...valid, website: "http://spam.example" })).toBe(
      true
    );
    expect(isHoneypotFilled({ ...valid, website: "" })).toBe(false);
    expect(isHoneypotFilled(valid)).toBe(false);
  });
});

describe("createRateLimiter", () => {
  it("blocks after max hits and resets after the window", () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 2 });
    expect(limiter.isLimited("ip", 0)).toBe(false);
    expect(limiter.isLimited("ip", 10)).toBe(false);
    expect(limiter.isLimited("ip", 20)).toBe(true);
    expect(limiter.isLimited("other", 20)).toBe(false);
    expect(limiter.isLimited("ip", 1001)).toBe(false);
  });
});
