import { SessionProfile } from "./mock-auth";

type Insight = { label: string; detail: string; tone: "success" | "alert" | "muted" };
type Focus = { title: string; delta: string; description: string };
type Metric = { label: string; value: string; change: string; intent: "up" | "down" };

type DashboardPayload = {
  momentum: { score: number; delta: string; summary: string };
  tier: { name: string; next: string; blockers: string[] };
  lastUpload: {
    title: string;
    reviewTime: string;
    flags: string[];
    boost: string;
  };
  insights: Insight[];
  focus: Focus[];
  metrics: Metric[];
  weeklyCard: {
    improvement: string;
    plateau: string;
    microTasks: string[];
  };
  ranked: {
    peers: number;
    slot: string;
    delta: string;
    description: string;
  };
};

export function getDashboardFor(profile: SessionProfile): DashboardPayload {
  return {
    momentum: {
      score: profile.tier === "Gold" ? 78 : 86,
      delta: profile.tier === "Gold" ? "+5.1% vs last week" : "+8.6% vs last week",
      summary: "Uploads are consistent and AR framing is dialed in.",
    },
    tier: {
      name: profile.tier,
      next: profile.tier === "Gold" ? "Platinum" : "Diamond",
      blockers:
        profile.tier === "Gold"
          ? ["Weak-foot release is still peaking late", "Cone exits dip after 4 reps"]
          : ["Left-foot cadence drops under pressure", "Hip angle drifts after sprint exits"],
    },
    lastUpload: {
      title: "42s dribble + wall pass set",
      reviewTime: "32s review",
      flags: ["Hip alignment drift", "Low wrist height"],
      boost: "+2.1% momentum",
    },
    insights: [
      {
        label: "Current strength",
        detail: "Weak-foot usage up 8% and hips stay more open on exits.",
        tone: "success",
      },
      {
        label: "Micro-improvement",
        detail: "Tighten first-touch window to 1.1s per cone gate.",
        tone: "muted",
      },
      {
        label: "Next session",
        detail: "Record a left-foot wall pass set using the AR ghost to confirm alignment.",
        tone: "muted",
      },
    ],
    focus: [
      {
        title: "Dribbling control",
        delta: "+6% week / +14% month",
        description: "Cone exits smoother — hold under 1.9s per gate.",
      },
      {
        title: "Weak-foot accuracy",
        delta: "+8% week / +16% month",
        description: "Release height stabilizing; keep plant 8–10cm wider.",
      },
      {
        title: "Shooting power",
        delta: "+3% week / +6% month",
        description: "Hip drive improving; bias follow-through angle by +6°.",
      },
    ],
    metrics: [
      { label: "Weak-foot usage", value: "44%", change: "+8%", intent: "up" },
      { label: "Dribble control", value: "89", change: "+11%", intent: "up" },
      { label: "Shooting accuracy", value: "78", change: "+5%", intent: "up" },
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
      peers: profile.tier === "Gold" ? 22 : 18,
      slot: profile.tier === "Gold" ? "#12 (control tier)" : "#6 (speed tier)",
      delta: profile.tier === "Gold" ? "+8% month" : "+12% month",
      description:
        "Improvement-based leaderboard. Fully private until you opt in. Fairness guardrails weight recent uploads and camera context.",
    },
  };
}
