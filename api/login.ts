import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHmac, timingSafeEqual } from "crypto";

// ── Rate limiting store (in-memory, resets on cold start) ──────────────────
// For production at scale, replace with Vercel KV or Upstash Redis.
const attempts = new Map<string, { count: number; lockedUntil: number }>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const WINDOW_MS = 10 * 60 * 1000;  // reset counter after 10 min of no attempts

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress ?? "unknown";
}

// ── Secure HMAC comparison ─────────────────────────────────────────────────
function verifyPasscode(input: string): boolean {
  const secret = process.env.ADMIN_SECRET!;      // Your real password (env var)
  const storedHmac = process.env.ADMIN_HMAC!;    // Pre-computed HMAC (env var)

  if (!secret || !storedHmac) return false;

  const inputHmac = createHmac("sha256", secret)
    .update(input)
    .digest("hex");

  // timingSafeEqual prevents timing attacks
  try {
    return timingSafeEqual(
      Buffer.from(inputHmac, "hex"),
      Buffer.from(storedHmac, "hex")
    );
  } catch {
    return false;
  }
}

// ── Generate a signed session token ───────────────────────────────────────
function generateToken(ip: string): string {
  const secret = process.env.ADMIN_SECRET!;
  const payload = `${ip}:${Date.now()}`;
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = getClientIp(req);
  const now = Date.now();

  // ── Check lockout ────────────────────────────────────────────────────────
  const record = attempts.get(ip);
  if (record) {
    if (record.lockedUntil > now) {
      const mins = Math.ceil((record.lockedUntil - now) / 60000);
      return res.status(429).json({
        success: false,
        error: `Too many attempts. Try again in ${mins} minute(s).`,
        lockedUntil: record.lockedUntil,
      });
    }
    // Reset stale window
    if (now - record.lockedUntil > WINDOW_MS) {
      attempts.delete(ip);
    }
  }

  // ── Artificial delay (300ms) to slow brute force ─────────────────────────
  const { passcode } = req.body ?? {};
  if (typeof passcode !== "string" || passcode.length === 0) {
    return res.status(400).json({ success: false, error: "Missing passcode." });
  }

  setTimeout(() => {
    const correct = verifyPasscode(passcode);

    if (correct) {
      // Clear failed attempts for this IP
      attempts.delete(ip);

      const token = generateToken(ip);
      const expiresAt = now + 4 * 60 * 60 * 1000; // 4 hours

      return res.status(200).json({ success: true, token, expiresAt });
    } else {
      // Record failed attempt
      const current = attempts.get(ip) ?? { count: 0, lockedUntil: 0 };
      current.count += 1;

      if (current.count >= MAX_ATTEMPTS) {
        current.lockedUntil = now + LOCKOUT_MS;
        attempts.set(ip, current);
        return res.status(429).json({
          success: false,
          error: `Account locked for 15 minutes after ${MAX_ATTEMPTS} failed attempts.`,
          lockedUntil: current.lockedUntil,
        });
      }

      attempts.set(ip, current);
      return res.status(401).json({
        success: false,
        error: `Incorrect passcode. ${MAX_ATTEMPTS - current.count} attempt(s) remaining.`,
        attemptsLeft: MAX_ATTEMPTS - current.count,
      });
    }
  }, 300);
}
