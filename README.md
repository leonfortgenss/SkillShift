# SkillShift — AI Football Training Assistant

SkillShift is a modern, athletic-styled web client built with **React** and **shadcn/ui**. The goal is to deliver the teen-focused SkillShift experience: fast uploads, crisp analysis feedback, and progression visuals that feel like a real training tool—not a motivational app.

## Stack choice: React + shadcn/ui
- **Modern UX velocity:** React supports rapid iteration for dashboards, recording, and analysis flows while staying future-friendly for native bridges.
- **shadcn/ui polish:** Accessible, composable primitives that can be themed to the SkillShift palette (#0D0F10, #00E676, #1DE9B6) and card-heavy layouts.
- **Strong theming:** Central tokens for spacing (24–32px containers, 12–16px gaps), radii (16–20px), typography (Inter/SF Pro), and neon accents.
- **Composable building blocks:** Cards, dialogs, charts, toggles, sheets, and tabs that map directly to Tier Progression, Privacy controls (face-blur toggle), Weekly Growth cards, and Ranked Mode opt-in.

## Project setup (recommended)
1. **Scaffold** with Next.js (App Router) and TypeScript: `npx create-next-app@latest skillshift --ts --app`.
2. **Install shadcn/ui** with a dark theme preset; define tokens for the neon-green accents and deep charcoal surfaces.
3. **Icon set:** Use Lucide icons; add custom tier badges and recording overlays as SVGs in `/components/icons`.
4. **Data fetching:** React Query (or SWR) for uploads, analysis results, leaderboards; lightweight client state via Zustand/Context for Momentum Score, Tier card, and toggles.
5. **Media handling:** Add a recording/upload component with AR overlay placeholders; wire to mock API routes under `/app/api/*` until backend endpoints exist.
6. **Animations:** Use Framer Motion for tier level-ups, ghost overlay previews, and subtle chart transitions; keep motion minimal on low-power devices.
7. **Quality gates:** Add ESLint + Prettier + TypeScript strict mode; include Playwright or Cypress for happy-path flows (upload → analysis → progress view).

## Feature build checklist
- **Onboarding / Account Setup:** Card-based selectors for experience, years played, division, dominant foot, goals; submit to create a profile.
- **Home Dashboard:** Current Tier, Momentum Score, Last Upload summary, and Suggested Focus for the Week with spacious layout and strong hierarchy.
- **Recording screen:** AR outlines (stand zone, cone/ball markers), ghost framing overlay, one-tap record/upload actions.
- **Analysis results:** Three bullet insights (strengths, micro-improvement, next-time suggestion) with icons and dynamic accent colors.
- **Progress graphs:** Weak-foot usage, dribbling control, shooting accuracy, cone drill speed; weekly/monthly toggles with trend lines.
- **Tier progression:** Bronze → Silver → Gold → Platinum → Diamond → Elite → NextGen with subtle level-up animation and blockers per tier.
- **Ranked mode:** Opt-in, improvement-based leaderboard emphasizing fairness and inclusivity.
- **Weekly growth card:** Improvement areas, plateau warnings, and micro-tasks; minimal illustrations.
- **Settings:** Privacy (face-blur default ON), video storage policy, profile customization, motivation tone selector (“Analytical only” vs. “Analytical + subtle encouragement”).

## Data, privacy, and safety defaults
- Face-blur **ON by default**; make the toggle prominent in Settings and the recording flow.
- Keep uploads private unless the user opts into Ranked Mode; clearly label ranked uploads.
- Provide clear storage retention text in Settings and before uploading.
- Avoid streak pressure; use Momentum Score and trend deltas instead.

## Next steps
- Initialize the Next.js project and install shadcn/ui with theme tokens.
- Stub API routes for upload, analysis results, and leaderboard data to unblock UI development.
- Build core screens with mock data to validate layout, spacing, and motion before backend wiring.
- Add Storybook (or similar) for isolated component QA of cards, charts, and overlays.
