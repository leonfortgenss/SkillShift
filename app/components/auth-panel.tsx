"use client";

import { useEffect, useState } from "react";
import type { SessionProfile } from "@/lib/mock-auth";

type SessionResult = {
  token: string;
  profile: SessionProfile;
  expiresAt: number;
};

type Props = {
  onSession: (session: SessionResult | null) => void;
};

async function login(email: string, pin: string): Promise<SessionResult> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, pin }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error ?? "Unable to sign in");
  }
  return res.json();
}

async function validate(token: string): Promise<SessionResult> {
  const res = await fetch("/api/auth/session", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("Session expired");
  }
  return res.json();
}

export function AuthPanel({ onSession }: Props) {
  const [email, setEmail] = useState("demo@skillshift.dev");
  const [pin, setPin] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<SessionResult | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("skillshift-token") : null;
    if (!stored) return;
    validate(stored)
      .then((next) => {
        setSession(next);
        onSession(next);
      })
      .catch(() => {
        localStorage.removeItem("skillshift-token");
      });
  }, [onSession]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const next = await login(email, pin);
      setSession(next);
      localStorage.setItem("skillshift-token", next.token);
      onSession(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("skillshift-token");
    setSession(null);
    onSession(null);
  };

  return (
    <div className="card card-strong">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label-muted">Authentication</p>
          <h2 className="mt-1 text-xl">Session control</h2>
          <p className="text-secondary mt-1 text-sm">Sign in with a demo code to unlock the live data feed.</p>
        </div>
        {session ? (
          <span className="badge">Active</span>
        ) : (
          <span className="chip-muted">Private by default</span>
        )}
      </div>

      <div className="divider mt-3" />

      {session ? (
        <div className="mt-3 space-y-3">
          <div className="stat-pill">
            <div>
              <p className="label-muted">Signed in as</p>
              <p className="text-lg font-semibold">{session.profile.name}</p>
              <p className="text-secondary text-sm">{session.profile.email}</p>
            </div>
            <div className="text-right">
              <p className="label-muted">Tier</p>
              <p className="text-success text-lg font-semibold">{session.profile.tier}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-secondary">
            <span className="chip-muted">Dominant foot: {session.profile.dominantFoot}</span>
            <span className="chip-muted">Experience: {session.profile.experience}</span>
          </div>
          <button className="btn-ghost" onClick={logout} type="button">
            Log out
          </button>
        </div>
      ) : (
        <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@skillshift.dev"
              required
            />
          </div>
          <div>
            <label htmlFor="pin">Access code</label>
            <input
              id="pin"
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="6-digit code"
              required
            />
            <p className="text-secondary mt-1 text-xs">Demo codes: 123456 (Platinum) or 3520 (Gold)</p>
          </div>
          {error ? <p className="text-alert text-sm">{error}</p> : null}
          <button className="btn-primary w-full" disabled={loading} type="submit">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      )}
    </div>
  );
}
