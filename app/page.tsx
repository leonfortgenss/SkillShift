const insights = [
  {
    title: "Current strengths",
    detail: "Body angle is more open and weak-foot usage is up 6% this week.",
    accent: "#1DE9B6",
  },
  {
    title: "Micro-improvement",
    detail: "Tighten first touch when exiting cones; keep touches under 1.2s cadence.",
    accent: "#00E676",
  },
  {
    title: "Next upload",
    detail: "Record a left-foot wall pass set with the AR ghost to check hip alignment.",
    accent: "#69F0AE",
  },
];

const focusAreas = [
  {
    title: "Dribbling control",
    delta: "+4% week / +12% month",
    description: "Cone exits smoother, maintain under-2s split per gate.",
  },
  {
    title: "Weak-foot accuracy",
    delta: "+6% week / +15% month",
    description: "Release height stabilized; keep planting foot 8–10cm wider.",
  },
  {
    title: "Shooting power",
    delta: "+2% week / +5% month",
    description: "Hip drive improving, focus on follow-through angle next session.",
  },
];

export default function Home() {
  return (
    <main className="main-grid">
      <header className="grid-2">
        <div className="card">
          <p className="muted-label">Momentum score</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 40, margin: "4px 0" }}>86</h2>
              <p className="text-secondary">Consistent uploads and sharper cone exits</p>
            </div>
            <span className="badge">+8.2% vs last week</span>
          </div>
        </div>
        <div className="card">
          <p className="muted-label">Current tier</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 32, margin: "4px 0" }}>Platinum</h2>
              <p className="text-secondary">Next unlock: Diamond (needs 2.5% weak-foot gain)</p>
            </div>
            <button className="button-primary">View blockers</button>
          </div>
        </div>
      </header>

      <section className="grid-2">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Last upload</h2>
            <button className="button-primary">Upload new clip</button>
          </div>
          <p className="text-secondary" style={{ marginTop: 8 }}>
            42-second dribble + wall pass set with AR ghost framing.
          </p>
          <div style={{ marginTop: 16 }} className="grid-3">
            <div>
              <p className="muted-label">Review time</p>
              <p style={{ fontWeight: 700 }}>32s</p>
            </div>
            <div>
              <p className="muted-label">Flags</p>
              <p style={{ color: "#FF5252", fontWeight: 700 }}>Hip alignment drift</p>
            </div>
            <div>
              <p className="muted-label">Boost</p>
              <p style={{ color: "#00E676", fontWeight: 700 }}>+2.1% Momentum</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Focus for the week</h2>
            <span className="badge">Analytical mode</span>
          </div>
          <div style={{ marginTop: 12 }} className="grid-3">
            {focusAreas.map((focus) => (
              <div key={focus.title}>
                <p className="muted-label">{focus.title}</p>
                <p style={{ fontWeight: 700 }}>{focus.delta}</p>
                <p className="text-secondary">{focus.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-2">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Skill insights</h2>
            <span className="badge">Auto-updated</span>
          </div>
          <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
            {insights.map((insight) => (
              <div
                key={insight.title}
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: `1px solid ${insight.accent}33`,
                  background: "rgba(255, 255, 255, 0.02)",
                }}
              >
                <p className="muted-label" style={{ color: insight.accent }}>
                  {insight.title}
                </p>
                <p style={{ margin: 0 }} className="text-secondary">
                  {insight.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Ranked mode</h2>
            <button className="button-primary">Opt into ranked</button>
          </div>
          <p className="text-secondary" style={{ marginTop: 8 }}>
            Improvement-based leaderboard. Private by default until you opt in.
          </p>
          <div style={{ marginTop: 14 }} className="grid-3">
            <div>
              <p className="muted-label">Peers tracked</p>
              <p style={{ fontWeight: 700 }}>18</p>
            </div>
            <div>
              <p className="muted-label">Current slot</p>
              <p style={{ fontWeight: 700 }}>#6 (speed tier)</p>
            </div>
            <div>
              <p className="muted-label">Growth delta</p>
              <p style={{ fontWeight: 700, color: "#00E676" }}>+12% month</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
