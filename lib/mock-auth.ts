import { randomUUID } from "crypto";

export type SessionProfile = {
  email: string;
  name: string;
  experience: string;
  dominantFoot: string;
  tier: string;
};

export type Session = {
  token: string;
  profile: SessionProfile;
  createdAt: number;
  expiresAt: number;
};

const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours
const sessions = new Map<string, Session>();

const allowedPins: Record<string, { pin: string; profile: SessionProfile }> = {
  "demo@skillshift.dev": {
    pin: "123456",
    profile: {
      email: "demo@skillshift.dev",
      name: "Jordan",
      experience: "Academy starter",
      dominantFoot: "Right",
      tier: "Platinum",
    },
  },
  "keeper@skillshift.dev": {
    pin: "3520",
    profile: {
      email: "keeper@skillshift.dev",
      name: "Alex",
      experience: "Club level",
      dominantFoot: "Left",
      tier: "Gold",
    },
  },
};

function purgeExpiredSessions() {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (session.expiresAt <= now) {
      sessions.delete(token);
    }
  }
}

export function createSession(email: string, pin: string) {
  purgeExpiredSessions();
  const allowed = allowedPins[email.toLowerCase()];
  if (!allowed || allowed.pin !== pin) return null;

  const token = Buffer.from(`${randomUUID()}:${email}`).toString("base64url");
  const createdAt = Date.now();
  const session: Session = {
    token,
    profile: allowed.profile,
    createdAt,
    expiresAt: createdAt + SESSION_TTL_MS,
  };
  sessions.set(token, session);
  return session;
}

export function getSession(token?: string | null): Session | null {
  if (!token) return null;
  purgeExpiredSessions();
  const session = sessions.get(token);
  return session ?? null;
}

export function getSessionTtlMs() {
  return SESSION_TTL_MS;
}
