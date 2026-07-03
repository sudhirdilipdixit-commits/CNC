interface OtpEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
  sendCount: number;
  lastSentAt: number;
}

const store = new Map<string, OtpEntry>();

const OTP_TTL = 10 * 60 * 1000;    // 10 minutes
const MAX_VERIFY_ATTEMPTS = 3;
const MAX_SENDS_PER_WINDOW = 3;
const RESEND_COOLDOWN = 30 * 1000; // 30 seconds

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function canSendOtp(mobile: string): { allowed: boolean; cooldownSeconds?: number } {
  const entry = store.get(mobile);
  const now = Date.now();

  if (!entry || now > entry.expiresAt) return { allowed: true };
  if (entry.sendCount >= MAX_SENDS_PER_WINDOW) return { allowed: false };

  const cooldown = entry.lastSentAt + RESEND_COOLDOWN - now;
  if (cooldown > 0) return { allowed: false, cooldownSeconds: Math.ceil(cooldown / 1000) };

  return { allowed: true };
}

export function storeOtp(mobile: string, otp: string): void {
  const now = Date.now();
  const existing = store.get(mobile);
  store.set(mobile, {
    otp,
    expiresAt: now + OTP_TTL,
    attempts: 0,
    sendCount: existing && now <= existing.expiresAt ? existing.sendCount + 1 : 1,
    lastSentAt: now,
  });
}

export type VerifyResult = "valid" | "invalid" | "expired" | "max_attempts";

export function verifyOtp(mobile: string, otp: string): VerifyResult {
  const entry = store.get(mobile);
  if (!entry) return "expired";
  if (Date.now() > entry.expiresAt) {
    store.delete(mobile);
    return "expired";
  }
  if (entry.attempts >= MAX_VERIFY_ATTEMPTS) return "max_attempts";
  if (entry.otp !== otp) {
    entry.attempts++;
    return "invalid";
  }
  store.delete(mobile);
  return "valid";
}
