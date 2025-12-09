"use client";

import { useEffect, useMemo, useState } from "react";
import { AuthPanel } from "./components/auth-panel";
import type { SessionProfile } from "@/lib/mock-auth";

const experienceLevels = ["New to club", "Sunday league", "Academy", "Varsity"] as const;
const goals = ["Faster exits", "Weak-foot accuracy", "1v1 control", "Finishing"] as const;
const divisions = ["Community", "School", "Club", "Select"];
const dominantFeet = ["Right", "Left", "Both"];

type OnboardingState = {
  experience: (typeof experienceLevels)[number] | "";
  yearsPlayed: string;
  division: string;
  dominantFoot: string;
  goals: Set<(typeof goals)[number]>;
};

type Dashboard = {
  momentum: { score: number; delta: string; summary: string };
  tier: { name: string; next: string; blockers: string[] };
  lastUpload: { title: string; reviewTime: string; flags: string[]; boost: string };
  insights: { label: string; detail: string; tone: "success" | "alert" | "muted" }[];
  focus: { title: string; delta: string; description: string }[];
  metrics: { label: string; value: string; change: string; intent: "up" | "down" }[];
  weeklyCard: { improvement: string; plateau: string; microTasks: string[] };
  ranked: { peers: number; slot: string; delta: string; description: string };
};

type SessionResult = { token: string; profile: SessionProfile; expiresAt: number };

async function fetchDashboard(token: string): Promise<{ profile: SessionProfile; dashboard: Dashboard }> {
  const res = await fetch("/api/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("Session expired");
  }
  return res.json();
}

const fallbackDashboard: Dashboard = {
  momentum: {
    score: 86,
    delta: "+9.2% vs last week",
    summary: "Consistent uploads and sharper cone exits.",
  },
  tier: {
    name: "Platinum",
    next: "Diamond",
    blockers: ["Weak-foot release under pace", "Cone exits dip after 4 reps"],
  },
  lastUpload: {
    title: "42 second dribble + wall pass set with AR ghost framing.",
    reviewTime: "2m 45s",
    flags: ["Hip alignment drift"],
    boost: "+4.2 Momentum",
  },
  insights: [
    { label: "Current strength", detail: "Body stays open on lateral cuts.", tone: "success" },
    { label: "Micro-improvement", detail: "Plant wider on weak foot; keep shin angle forward.", tone: "muted" },
    { label: "Next session", detail: "Follow AR cone overlay and time your exits.", tone: "muted" },
  ],
  focus: [
    { title: "Dribbling control", delta: "+10% week", description: "Sub-2s per gate and clean head checks." },
    { title: "Weak-foot accuracy", delta: "+6% month", description: "Knee-height release with tighter window." },
    { title: "Shooting power", delta: "+4%", description: "Hip drive through follow-through angle." },
  ],
  metrics: [
    { label: "Weak-foot usage", value: "46%", change: "+8%", intent: "up" },
    { label: "Dribble control", value: "88", change: "+10%", intent: "up" },
    { label: "Shooting accuracy", value: "79", change: "+5%", intent: "up" },
    { label: "Cone drill speed", value: "1.86s", change: "-0.08s", intent: "down" },
  ],
  weeklyCard: {
    improvement: "Weak-foot release, body angle on sprint exits",
    plateau: "Cadence slows after 4 reps — swap to 20s sets",
    microTasks: [
      "Record 3 left-foot wall passes with AR ghost overlay",
      "Time cone exits; stay under 1.9s average",
      "Upload in 'analytical + subtle encouragement' tone to compare",
    ],
  },
  ranked: {
    peers: 18,
    slot: "#6 (speed tier)",
    delta: "+12% month",
    description:
      "Improvement-based leaderboard. Fully private until you opt in. Fairness guardrails weight recent uploads and camera context.",
  },
};

function useOnboardingState() {
  const [state, setState] = useState<OnboardingState>(
    () =>
      typeof window !== "undefined"
        ? {
            experience: (localStorage.getItem("skillshift-exp") as OnboardingState["experience"]) || "",
            yearsPlayed: localStorage.getItem("skillshift-years") || "",
            division: localStorage.getItem("skillshift-division") || "",
            dominantFoot: localStorage.getItem("skillshift-foot") || "",
            goals: new Set((localStorage.getItem("skillshift-goals") || "").split("|").filter(Boolean) as (typeof goals)[number][]),
          }
        : { experience: "", yearsPlayed: "", division: "", dominantFoot: "", goals: new Set() }
  );

  const save = (next: OnboardingState) => {
    setState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("skillshift-exp", next.experience);
      localStorage.setItem("skillshift-years", next.yearsPlayed);
      localStorage.setItem("skillshift-division", next.division);
      localStorage.setItem("skillshift-foot", next.dominantFoot);
      localStorage.setItem("skillshift-goals", Array.from(next.goals).join("|"));
    }
  };

  return [state, save] as const;
}

function ToggleGrid({
  options,
  selected,
  onSelect,
  label,
}: {
  options: readonly string[];
  selected: string;
  onSelect: (value: string) => void;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <p className="label-muted">{label}</p>
      <div className="pill-grid">
        {options.map((item) => (
          <button
            key={item}
            type="button"
            className={`pill ${selected === item ? "pill-active" : ""}`}
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [session, setSession] = useState<SessionResult | null>(null);
  const [dashboard, setDashboard] = useState<Dashboard>(fallbackDashboard);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [onboarding, setOnboarding] = useOnboardingState();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!session?.token) return;
    setLoadingDashboard(true);
    fetchDashboard(session.token)
      .then((res) => {
        setDashboard(res.dashboard);
        setError(null);
      })
      .catch(() => setError("Session expired. Please sign in again."))
      .finally(() => setLoadingDashboard(false));
  }, [session]);

  const onboardingComplete = useMemo(
    () =>
      Boolean(
        onboarding.experience &&
          onboarding.yearsPlayed &&
          onboarding.division &&
          onboarding.dominantFoot &&
          onboarding.goals.size
      ),
    [onboarding]
  );

  const handleGoalToggle = (goal: (typeof goals)[number]) => {
    const next = new Set(onboarding.goals);
    if (next.has(goal)) next.delete(goal);
    else next.add(goal);
    setOnboarding({ ...onboarding, goals: next });
  };

  const saveOnboarding = () => {
    setSaved(true);
    setOnboarding({ ...onboarding });
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <main className="main-wrap">
      <header className="hero-banner hero-layout">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge">SkillShift</span>
            <span className="chip-muted">Face blur: ON</span>
            <span className="chip-muted">Tone: Analytical</span>
            <span className="chip-muted">Privacy-first recording</span>
          </div>
          <div className="space-y-2">
            <p className="label-muted">AI Football Training OS</p>
            <h1 className="text-4xl leading-tight md:text-5xl">Sharper captures. Measurable jumps. No cringe hype.</h1>
            <p className="text-secondary max-w-2xl text-lg">
              Upload or capture sets with AR framing, get micro-improvements, and see momentum shift without streak anxiety.
            </p>
          </div>
          <div className="action-row">
            <button className="btn-primary">Open recorder</button>
            <button className="btn-ghost">Upload a clip</button>
            <button className="btn-ghost">View blockers</button>
          </div>
          <div className="glass-row">
            <div>
              <p className="label-muted">Momentum score</p>
              <p className="text-3xl font-semibold leading-tight">{dashboard.momentum.score}</p>
              <p className="text-success text-sm">{dashboard.momentum.delta}</p>
            </div>
            <div className="ghost-chip">
              <p className="label-muted">Current tier</p>
              <p className="text-lg font-semibold">{dashboard.tier.name}</p>
              <p className="text-secondary text-sm">Next: {dashboard.tier.next}</p>
            </div>
            <div className="ghost-chip">
              <p className="label-muted">AR overlay</p>
              <p className="text-lg font-semibold">Ghost + cone framing</p>
              <p className="text-secondary text-sm">One-tap capture with privacy locks.</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 space-y-3">
          <div className="card card-strong gradient-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="label-muted">Live session</p>
                <h2 className="text-2xl">Unlock feed with secure sign-in</h2>
                <p className="text-secondary mt-1 text-sm">
                  Demo codes keep everything offline—no external auth needed.
                </p>
              </div>
              <span className="badge">Session</span>
            </div>
            <div className="divider mt-3" />
            <AuthPanel onSession={setSession} />
            {loadingDashboard ? (
              <p className="text-secondary text-sm">Syncing live data…</p>
            ) : error ? (
              <p className="text-alert text-sm">{error}</p>
            ) : session ? (
              <p className="text-success text-sm">Live data unlocked for {session.profile.email}</p>
            ) : (
              <p className="text-secondary text-sm">Sign in with a demo code to see live data.</p>
            )}
          </div>
        </div>
      </header>

      <section className="section-grid">
        <div className="card card-strong">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="label-muted">Rapid onboarding</p>
              <h2 className="text-xl">Train the model on your context</h2>
              <p className="text-secondary mt-1 text-sm">
                Experience, goals, and dominant foot calibrate feedback and AR guidance.
              </p>
            </div>
            {onboardingComplete ? <span className="badge">Saved</span> : <span className="chip-muted">Required</span>}
          </div>
          <div className="grid-auto-fit mt-4">
            <ToggleGrid
              label="Experience"
              options={experienceLevels}
              selected={onboarding.experience}
              onSelect={(value) => setOnboarding({ ...onboarding, experience: value as OnboardingState["experience"] })}
            />
            <ToggleGrid
              label="Division"
              options={divisions}
              selected={onboarding.division}
              onSelect={(value) => setOnboarding({ ...onboarding, division: value })}
            />
            <ToggleGrid
              label="Dominant foot"
              options={dominantFeet}
              selected={onboarding.dominantFoot}
              onSelect={(value) => setOnboarding({ ...onboarding, dominantFoot: value })}
            />
            <div className="space-y-2">
              <p className="label-muted">Years played</p>
              <input
                type="number"
                min="0"
                placeholder="3"
                value={onboarding.yearsPlayed}
                onChange={(e) => setOnboarding({ ...onboarding, yearsPlayed: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <p className="label-muted">Goals</p>
              <div className="pill-grid">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    className={`pill ${onboarding.goals.has(goal) ? "pill-active" : ""}`}
                    onClick={() => handleGoalToggle(goal)}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="action-row mt-4">
            <button className="btn-primary" onClick={saveOnboarding} type="button">
              Save onboarding
            </button>
            <span className="text-secondary text-sm">
              Required to unlock AR guidance and personalized micro-tasks.
            </span>
            {saved ? <span className="text-success text-sm">Saved • synced locally</span> : null}
          </div>
        </div>

        <div className="card">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="label-muted">Last upload</p>
              <h2 className="text-xl">{dashboard.lastUpload.title}</h2>
              <p className="text-secondary mt-1 text-sm">Captured with ghost overlay and privacy locks.</p>
            </div>
            <button className="btn-ghost">Upload new clip</button>
          </div>
          <div className="grid-auto-fit mt-4">
            <div className="metric-tile">
              <p className="label-muted">Review time</p>
              <p className="text-lg font-semibold">{dashboard.lastUpload.reviewTime}</p>
              <p className="text-secondary text-sm">Analysis completed automatically.</p>
            </div>
            <div className="metric-tile">
              <p className="label-muted">Flags</p>
              <p className="text-lg font-semibold text-alert">{dashboard.lastUpload.flags[0]}</p>
              <p className="text-secondary text-sm">Tap into focus drills to close gaps.</p>
            </div>
            <div className="metric-tile">
              <p className="label-muted">Boost</p>
              <p className="text-lg font-semibold text-success">{dashboard.lastUpload.boost}</p>
              <p className="text-secondary text-sm">Momentum rewards consistent cadence.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-grid">
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Focus for the week</h2>
            <span className="badge">Analytical mode</span>
          </div>
          <div className="grid-auto-fit mt-3">
            {dashboard.focus.map((item) => (
              <div key={item.title} className="metric-tile">
                <p className="label-muted">{item.title}</p>
                <p className="text-lg font-semibold">{item.delta}</p>
                <p className="text-secondary text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Skill insights</h2>
            <span className="badge">Auto-updated</span>
          </div>
          <div className="mt-3 grid-auto-fit">
            {dashboard.insights.map((insight) => (
              <div key={insight.label} className="metric-tile">
                <p className={`label-muted ${insight.tone === "success" ? "text-success" : ""}`}>{insight.label}</p>
                <p className="text-secondary text-sm">{insight.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-grid">
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Progress preview</h2>
            <span className="badge">Week</span>
          </div>
          <div className="mt-3 grid-auto-fit">
            {dashboard.metrics.map((metric) => (
              <div key={metric.label} className="metric-tile">
                <p className="label-muted">{metric.label}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">{metric.value}</p>
                  <span className={metric.intent === "down" ? "text-alert" : "text-success"}>{metric.change}</span>
                </div>
                <div className="progress-track mt-1">
                  <div className="progress-fill" style={{ width: metric.intent === "down" ? "58%" : "76%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Weekly growth card</h2>
            <span className="badge">Friday drop</span>
          </div>
          <div className="metric-tile mt-3">
            <p className="label-muted">Improvement areas</p>
            <p className="text-lg font-semibold">{dashboard.weeklyCard.improvement}</p>
            <p className="text-secondary text-sm">3 micro-tasks queued for your next two uploads.</p>
          </div>
          <div className="metric-tile mt-2">
            <p className="label-muted">Plateau warnings</p>
            <p className="text-lg font-semibold text-alert">{dashboard.weeklyCard.plateau}</p>
            <p className="text-secondary text-sm">Shorter sets keep cadence high.</p>
          </div>
          <div className="metric-tile mt-2">
            <p className="label-muted">Micro-tasks</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-secondary text-sm">
              {dashboard.weeklyCard.microTasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-grid">
        <div className="card space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Ranked mode</h2>
            <button className="btn-ghost">Opt into ranked</button>
          </div>
          <p className="text-secondary text-sm">{dashboard.ranked.description}</p>
          <div className="grid-auto-fit">
            <div className="metric-tile">
              <p className="label-muted">Peers tracked</p>
              <p className="text-lg font-semibold">{dashboard.ranked.peers}</p>
              <p className="text-secondary text-sm">Matched by skill tier + age band.</p>
            </div>
            <div className="metric-tile">
              <p className="label-muted">Current slot</p>
              <p className="text-lg font-semibold">{dashboard.ranked.slot}</p>
              <p className="text-secondary text-sm">Moves only when you opt in.</p>
            </div>
            <div className="metric-tile">
              <p className="label-muted">Growth delta</p>
              <p className="text-lg font-semibold text-success">{dashboard.ranked.delta}</p>
              <p className="text-secondary text-sm">Improvement-weighted, not streak-based.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Blockers</h2>
            <span className="badge">Updated with each upload</span>
          </div>
          <ul className="mt-3 space-y-2 text-secondary text-sm">
            {dashboard.tier.blockers.map((item) => (
              <li key={item} className="ghost-chip inline-flex w-full items-center justify-between">
                <span>{item}</span>
                <button className="btn-ghost">View drill</button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
