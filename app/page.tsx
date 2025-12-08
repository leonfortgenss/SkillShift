const insights = [
  {
    title: "Current strengths",
    detail: "Weak-foot usage up 6% and hips stay open on exits.",
    accent: "text-success",
  },
  {
    title: "Micro-improvement",
    detail: "Tighten first-touch window to under 1.2s per cone gate.",
    accent: "text-accent-primary",
  },
  {
    title: "What to try next",
    detail: "Record a left-foot wall pass set using the AR ghost to verify alignment.",
    accent: "text-accent-secondary",
  },
];

const focusAreas = [
  {
    title: "Dribbling control",
    delta: "+4% week / +12% month",
    description: "Cone exits smoother — keep the under-2s split per gate.",
  },
  {
    title: "Weak-foot accuracy",
    delta: "+6% week / +15% month",
    description: "Release height stabilized; plant 8–10cm wider to stay balanced.",
  },
  {
    title: "Shooting power",
    delta: "+2% week / +5% month",
    description: "Hip drive improving; bias follow-through angle by +6° this week.",
  },
];

const progressMetrics = [
  {
    label: "Weak-foot usage",
    value: "42%",
    change: "+8%",
  },
  {
    label: "Dribble control",
    value: "87",
    change: "+12%",
  },
  {
    label: "Shooting accuracy",
    value: "78",
    change: "+5%",
  },
  {
    label: "Cone drill speed",
    value: "1.9s",
    change: "-0.2s",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="label-muted">SkillShift</p>
          <h1 className="text-3xl font-semibold">Welcome back, ready to record?</h1>
          <p className="text-secondary mt-1 text-sm">
            AI feedback stays private. Tier and ranked mode adjust only when you opt in.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="pill text-sm text-secondary">Face blur • ON</span>
          <span className="pill text-sm text-secondary">Tone: Analytical</span>
          <span className="pill text-sm text-secondary">Ranked: Off</span>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="label-muted">Momentum score</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-semibold leading-none">86</span>
                <span className="badge">+8.2% vs last week</span>
              </div>
              <p className="text-secondary mt-2">Consistent uploads and sharper cone exits.</p>
            </div>
          </div>
          <div className="glass shadow-soft">
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#1b1f22]">
              <div className="gradient-bar h-full w-[72%]" />
            </div>
            <p className="label-muted mt-2">Upload rhythm is stable. Keep 2–3 clips/week.</p>
          </div>
        </div>

        <div className="card flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="label-muted">Current tier</p>
              <h2 className="text-2xl">Platinum</h2>
              <p className="text-secondary mt-1">Next unlock: Diamond (needs +2.5% weak-foot gain).</p>
            </div>
            <button className="rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-2 text-sm font-semibold text-[#0d0f10] shadow-soft">
              View blockers
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass p-3">
              <p className="label-muted">Typical blocker</p>
              <p className="mt-1 font-semibold">Weak-foot release</p>
              <p className="text-secondary text-sm">Stability drops when cadence speeds up.</p>
            </div>
            <div className="glass p-3">
              <p className="label-muted">Tier path</p>
              <p className="mt-1 font-semibold">Diamond → Elite</p>
              <p className="text-secondary text-sm">Needs consistent 1.8s cone splits.</p>
            </div>
          </div>
        </div>

        <div className="card flex flex-col gap-3">
          <p className="label-muted">Quick actions</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button className="glass flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-text-primary shadow-soft transition hover:scale-[1.01]">
              <div>
                <p>Record with AR overlay</p>
                <p className="text-secondary text-xs">Ghost outline guides cones + ball.</p>
              </div>
              <span className="badge">AR</span>
            </button>
            <button className="glass flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-text-primary shadow-soft transition hover:scale-[1.01]">
              <div>
                <p>Upload a clip</p>
                <p className="text-secondary text-xs">Auto-analysis in under a minute.</p>
              </div>
              <span className="badge">+ Momentum</span>
            </button>
          </div>
          <div className="rounded-xl border border-dashed border-[#1f252a] p-3 text-sm text-secondary">
            Privacy defaults: face-blur on, recordings stay local unless you share.
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="label-muted">Last upload</p>
              <h2 className="text-xl">42s dribble + wall pass set</h2>
              <p className="text-secondary mt-1">Captured with AR ghost framing enabled.</p>
            </div>
            <button className="rounded-full border border-[#1f252a] px-3 py-2 text-sm font-semibold text-text-primary transition hover:border-accent-primary">
              Upload new clip
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="glass p-3">
              <p className="label-muted">Review time</p>
              <p className="mt-1 text-xl font-semibold">32s</p>
              <p className="text-secondary text-sm">Analysis completed automatically.</p>
            </div>
            <div className="glass p-3">
              <p className="label-muted">Flags</p>
              <p className="mt-1 text-xl font-semibold text-[#ff9494]">Hip alignment drift</p>
              <p className="text-secondary text-sm">Appears when sprint exits spike.</p>
            </div>
            <div className="glass p-3">
              <p className="label-muted">Boost</p>
              <p className="mt-1 text-xl font-semibold text-accent-primary">+2.1% momentum</p>
              <p className="text-secondary text-sm">Upload cadence stays consistent.</p>
            </div>
          </div>
        </div>

        <div className="card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Focus for the week</h2>
            <span className="badge">Analytical mode</span>
          </div>
          <div className="grid-auto-fit">
            {focusAreas.map((focus) => (
              <div key={focus.title} className="glass p-3">
                <p className="label-muted">{focus.title}</p>
                <p className="mt-1 font-semibold">{focus.delta}</p>
                <p className="text-secondary text-sm">{focus.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Skill insights</h2>
            <span className="badge">Auto-updated</span>
          </div>
          <div className="mt-3 grid gap-3">
            {insights.map((insight) => (
              <div key={insight.title} className="glass p-3">
                <p className={`label-muted ${insight.accent}`}>{insight.title}</p>
                <p className="text-secondary text-sm">{insight.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Progress preview</h2>
            <span className="badge">Week view</span>
          </div>
          <div className="grid-auto-fit">
            {progressMetrics.map((metric) => (
              <div key={metric.label} className="glass p-3">
                <p className="label-muted">{metric.label}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xl font-semibold">{metric.value}</p>
                  <span className="rounded-full bg-[#0f1619] px-2 py-1 text-xs font-semibold text-accent-primary">
                    {metric.change}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#1b1f22]">
                  <div className="gradient-bar h-full w-[70%]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Weekly growth card</h2>
            <span className="badge">Friday drop</span>
          </div>
          <div className="glass p-4">
            <p className="label-muted">Improvement areas</p>
            <p className="mt-1 font-semibold">Weak-foot release, body angle on sprint exits</p>
            <p className="text-secondary text-sm">3 micro-tasks queued for your next two uploads.</p>
          </div>
          <div className="glass p-4">
            <p className="label-muted">Plateau warnings</p>
            <p className="mt-1 font-semibold text-[#ff9494]">Cadence slows after 4 reps</p>
            <p className="text-secondary text-sm">AI suggests shorter 20s sets to keep pace.</p>
          </div>
          <div className="glass p-4">
            <p className="label-muted">Micro-tasks</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-secondary text-sm">
              <li>Record 3 left-foot wall passes with AR ghost overlay.</li>
              <li>Time cone exits; keep under 1.9s average.</li>
              <li>Upload with “analytical + subtle encouragement” tone to compare.</li>
            </ul>
          </div>
        </div>

        <div className="card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Ranked mode</h2>
            <button className="rounded-full border border-[#1f252a] px-3 py-2 text-sm font-semibold text-text-primary transition hover:border-accent-primary">
              Opt into ranked
            </button>
          </div>
          <p className="text-secondary text-sm">
            Improvement-based leaderboard. Fully private until you toggle it on. Fairness guardrails
            weight recent uploads and camera context.
          </p>
          <div className="grid-auto-fit">
            <div className="glass p-3">
              <p className="label-muted">Peers tracked</p>
              <p className="mt-1 text-xl font-semibold">18</p>
              <p className="text-secondary text-sm">Matched by skill tier + age band.</p>
            </div>
            <div className="glass p-3">
              <p className="label-muted">Current slot</p>
              <p className="mt-1 text-xl font-semibold">#6 (speed tier)</p>
              <p className="text-secondary text-sm">Moves only when you opt in.</p>
            </div>
            <div className="glass p-3">
              <p className="label-muted">Growth delta</p>
              <p className="mt-1 text-xl font-semibold text-accent-primary">+12% month</p>
              <p className="text-secondary text-sm">Improvement-weighted, not streak-based.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
